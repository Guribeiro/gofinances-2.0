/* eslint-disable consistent-return */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { verifyCodeError } from '@shared/utils/errors/firebase';
import {
  requestMediaLibraryPermissionsAsync,
  requestCameraPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  launchCameraAsync,
} from 'expo-image-picker';
import { database, storage } from '@shared/services/firebase';
import { Platform } from 'react-native';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useAuthentication } from '@modules/authentication/hooks/authentication';

type UpdateNameProps = {
  userId: string;
  name: string;
};

type ProfileContextData = {
  loading: boolean;
  updateName(props: UpdateNameProps): Promise<void>;
  launchMediaLibrary(): Promise<void>;
  launchCamera(): Promise<void>;
};

const ProfileContext = createContext<ProfileContextData>(
  {} as ProfileContextData,
);

type ProfileProviderProps = {
  children: ReactNode;
};

const ProfileProvider = ({ children }: ProfileProviderProps): JSX.Element => {
  const { user } = useAuthentication();
  const [loading, setLoading] = useState(false);

  const updateName = useCallback(async ({ userId, name }: UpdateNameProps) => {
    try {
      setLoading(true);
      const docUserRef = doc(database, 'users', userId);

      await updateDoc(docUserRef, {
        name,
      });
    } catch (error) {
      throw new Error(error as string);
    } finally {
      setLoading(false);
    }
  }, []);

  const requestMediaLibraryPermissions = useCallback(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error(
          'Desculpe, não temos permissão de acesso às suas fotos',
        );
      }
    }
  }, []);

  const requestCameraPermissions = useCallback(async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await requestCameraPermissionsAsync();

        if (status !== 'granted') {
          throw new Error(
            'Desculpe, não temos permissão de acesso à sua câmera',
          );
        }
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }, []);

  const launchMediaLibrary = useCallback(async (): Promise<void> => {
    try {
      await requestMediaLibraryPermissions();
      const imagePickerResult = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (imagePickerResult.cancelled) return;

      setLoading(true);

      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', imagePickerResult.uri, true);
        xhr.send(null);
      });

      const name = 'avatar';

      const userReceiptImagesRef = ref(storage, `${user.id}/profile/${name}`);

      const { ref: storageRef } = await uploadBytes(userReceiptImagesRef, blob);

      const url = await getDownloadURL(storageRef);

      const photo = {
        url,
        name,
      };

      const docUserRef = doc(database, 'users', user.id);

      await updateDoc(docUserRef, {
        photo,
      });
    } catch (error) {
      const message = verifyCodeError(error);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [requestMediaLibraryPermissions, user.id]);

  const launchCamera = useCallback(async (): Promise<void> => {
    try {
      await requestCameraPermissions();

      const imagePickerResult = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (imagePickerResult.cancelled) return;

      setLoading(true);

      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = e => {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', imagePickerResult.uri, true);
        xhr.send(null);
      });

      const name = 'avatar';

      const userReceiptImagesRef = ref(storage, `${user.id}/profile/${name}`);

      const { ref: storageRef } = await uploadBytes(userReceiptImagesRef, blob);

      const url = await getDownloadURL(storageRef);

      const photo = {
        url,
        name,
      };

      const docUserRef = doc(database, 'users', user.id);

      await updateDoc(docUserRef, {
        photo,
      });
    } catch (error) {
      const message = verifyCodeError(error);
      throw new Error(message);
    } finally {
      setLoading(true);
    }
  }, [requestCameraPermissions, user.id]);

  return (
    <ProfileContext.Provider
      value={{ loading, updateName, launchMediaLibrary, launchCamera }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

function useProfile(): ProfileContextData {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile should be used within an ProfileProvider');
  }

  return context;
}

export { useProfile, ProfileProvider };
