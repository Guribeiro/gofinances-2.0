import { createContext, ReactNode, useCallback, useContext } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '@shared/services/firebase';

type UpdateNameProps = {
  userId: string;
  name: string;
};

type ProfileContextData = {
  updateName(props: UpdateNameProps): Promise<void>;
};

const ProfileContext = createContext<ProfileContextData>(
  {} as ProfileContextData,
);

type ProfileProviderProps = {
  children: ReactNode;
};

const ProfileProvider = ({ children }: ProfileProviderProps): JSX.Element => {
  const updateName = useCallback(async ({ userId, name }: UpdateNameProps) => {
    try {
      const docUserRef = doc(database, 'users', userId);

      const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

      await updateDoc(docUserRef, {
        name,
        photo,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }, []);
  return (
    <ProfileContext.Provider value={{ updateName }}>
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
