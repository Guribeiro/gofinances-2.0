/* eslint-disable consistent-return */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, database } from '@shared/services/firebase';

import { CLIENT_ID, REDIRECT_URI } from '@env';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

type User = {
  id: string;
  info: Info;
};

export type Photo = {
  url: string;
  name: string;
};

type Info = {
  name: string;
  email: string;
  photo: Photo;
};

type SignInWithCredentialsProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
  photo?: string;
};

type AuthenticationContextData = {
  persistedLoading: boolean;
  user: User;
  signUp(props: SignUpProps): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signInWithCredentials(props: SignInWithCredentialsProps): Promise<void>;
  signOutUser(): Promise<void>;
};

type Type = 'success' | 'dismiss';

type AuthorizationResponse = {
  type: Type;
  params: {
    access_token: string;
  };
};

type GoogleUserInfo = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

const AuthenticationContext = createContext<AuthenticationContextData>(
  {} as AuthenticationContextData,
);

interface AuthenticationProviderProps {
  children: ReactNode;
}

const AuthenticationProvider = ({
  children,
}: AuthenticationProviderProps): JSX.Element => {
  const [persistedLoading, setPersistedLoading] = useState(false);
  const [user, setUser] = useState<User>({} as User);

  const signOutUser = useCallback(async () => {
    try {
      setUser({} as User);
      await signOut(auth);
    } catch (error) {
      throw new Error(error as string);
    }
  }, []);

  const signUp = useCallback(
    async ({ name, email, password, photo }: SignUpProps) => {
      try {
        const { user: signedUser } = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        const url =
          photo || `https://ui-avatars.com/api/?name=${name}&length=1`;

        const docUserRef = doc(database, 'users', signedUser.uid);

        const userInfo: Info = {
          name,
          email,
          photo: {
            url,
            name: url,
          },
        };

        await setDoc(docUserRef, userInfo);
      } catch (error) {
        throw new Error(error as string);
      }
    },
    [],
  );

  const signInWithGoogle = useCallback(async () => {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );

        const { id, email, name, picture } =
          (await response.json()) as GoogleUserInfo;

        const docUserRef = doc(database, 'users', id);

        onSnapshot(docUserRef, docData => {
          if (docData.exists()) {
            const docUserInfo = docData.data() as Info;

            const userAuthenticated: User = {
              id,
              info: docUserInfo,
            };

            setUser(userAuthenticated);
          } else {
            setDoc(docUserRef, {
              email,
              name,
              photo: picture,
            }).then(() => {
              setUser({
                id,
                info: {
                  email,
                  name,
                  photo: {
                    url: picture,
                    name: picture,
                  },
                },
              });
            });
          }
        });
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }, []);

  const signInWithApple = useCallback(async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      const docUserRef = doc(database, 'users', credentials.user);

      if (credentials) {
        const name = credentials.fullName!.givenName!;

        const url = `https://ui-avatars.com/api/?name=${name}&length=1`;

        onSnapshot(docUserRef, docData => {
          if (docData.exists()) {
            const docUserInfo = docData.data() as Info;

            const userAuthenticated: User = {
              id: credentials.user,
              info: docUserInfo,
            };

            setUser(userAuthenticated);
          } else {
            const authenticatedUserInfo: Info = {
              email: credentials.email!,
              name,
              photo: {
                url,
                name: url,
              },
            };

            setDoc(docUserRef, authenticatedUserInfo).then(() => {
              setUser({
                id: credentials.user,
                info: authenticatedUserInfo,
              });
            });
          }
        });
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }, []);

  const signInWithCredentials = useCallback(
    async ({ email, password }: SignInWithCredentialsProps) => {
      try {
        const { user: signedUser } = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        const docUserRef = doc(database, 'users', signedUser.uid);

        onSnapshot(docUserRef, docData => {
          const docUserInfo = docData.data() as Info;

          const userAuthenticated: User = {
            id: signedUser.uid,
            info: docUserInfo,
          };

          setUser(userAuthenticated);
        });
      } catch (error) {
        throw new Error(error as string);
      }
    },
    [],
  );

  useEffect(() => {
    const loadPersistedAuth = async () => {
      try {
        setPersistedLoading(true);
        const unsubscribe = onAuthStateChanged(auth, observedUser => {
          if (observedUser) {
            const docUserRef = doc(database, 'users', observedUser.uid);

            const unsubscribeSnapshot = onSnapshot(docUserRef, docData => {
              const docUserInfo = docData.data() as Info;

              setUser({
                id: docData.id,
                info: docUserInfo,
              });
            });

            return () => unsubscribeSnapshot();
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      } finally {
        setPersistedLoading(false);
      }
    };

    loadPersistedAuth();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        persistedLoading,
        user,
        signUp,
        signInWithGoogle,
        signInWithApple,
        signInWithCredentials,
        signOutUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

function useAuthentication(): AuthenticationContextData {
  const context = useContext(AuthenticationContext);

  if (!context)
    throw new Error(
      'useAuthentication should be used within an AuthenticationProvider',
    );

  return context;
}

export { AuthenticationProvider, useAuthentication };
