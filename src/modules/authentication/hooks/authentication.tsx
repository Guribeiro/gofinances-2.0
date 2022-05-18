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
} from 'firebase/auth';
import { auth, database } from '@shared/services/firebase';

import { CLIENT_ID, REDIRECT_URI } from '@env';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

type User = {
  id: string;
  info: Info;
};

type Info = {
  name: string;
  email: string;
  photo?: string;
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
  user: User;
  signUp(props: SignUpProps): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signInWithCredentials(props: SignInWithCredentialsProps): Promise<void>;
};

type Type = 'success' | 'dismiss';

type AuthorizationResponse = {
  type: Type;
  params: {
    access_token: string;
  };
};

type UserInfo = {
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
  const [user, setUser] = useState<User>({} as User);

  const signUp = useCallback(
    async ({ name, email, password, photo }: SignUpProps) => {
      try {
        const { user: signedUser } = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        const userPhoto =
          photo || `https://ui-avatars.com/api/?name=${name}&length=1`;

        const docUserRef = doc(database, 'users', signedUser.uid);

        const userInfo: Info = {
          name,
          email,
          photo: userPhoto,
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
          (await response.json()) as UserInfo;

        const docUserRef = doc(database, 'users', id);

        onSnapshot(docUserRef, docData => {
          if (docData.exists()) {
            const docUserInfo = docData.data() as UserInfo;

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
                  photo: picture,
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

        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        onSnapshot(docUserRef, docData => {
          if (docData.exists()) {
            const docUserInfo = docData.data() as UserInfo;

            const userAuthenticated: User = {
              id: credentials.user,
              info: docUserInfo,
            };

            setUser(userAuthenticated);
          } else {
            const authenticatedUserInfo: Info = {
              email: credentials.email!,
              name,
              photo,
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
          const docUserInfo = docData.data() as UserInfo;

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

  const loadPersistedAuth = useCallback(() => {
    onAuthStateChanged(auth, observedUser => {
      if (observedUser) {
        const name = observedUser.displayName!;

        const photo =
          observedUser.photoURL ||
          `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userAuthenticated: User = {
          id: observedUser.uid,
          info: {
            name,
            email: observedUser.email!,
            photo,
          },
        };
        setUser(userAuthenticated);
      }
    });
  }, []);

  useEffect(() => {
    loadPersistedAuth();
  }, [loadPersistedAuth]);

  useEffect(() => {
    if (!user.id) {
      return;
    }

    const docUserRef = doc(database, 'users', user.id);

    const unsubscribe = onSnapshot(docUserRef, docData => {
      const docUserInfo = docData.data() as Info;

      setUser({
        id: user.id,
        info: docUserInfo,
      });
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        signUp,
        signInWithGoogle,
        signInWithApple,
        signInWithCredentials,
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
