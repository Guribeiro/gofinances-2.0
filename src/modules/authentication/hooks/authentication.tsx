import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import { CLIENT_ID, REDIRECT_URI } from '@env';

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

type AuthenticationContextData = {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
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

        setUser({
          id,
          email,
          name,
          photo: picture,
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

      if (credentials) {
        const name = credentials.fullName!.givenName!;

        const userAuthenticatedWithApple: User = {
          id: credentials.user,
          email: credentials.email!,
          name,
          photo: `https://ui-avatars.com/api/?name=${name}&length=1`,
        };
        setUser(userAuthenticatedWithApple);
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ user, signInWithGoogle, signInWithApple }}
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
