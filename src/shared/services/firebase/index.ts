/* eslint-disable import/no-duplicates */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import FIREBASE_CONFIG from './config';

const app = initializeApp(FIREBASE_CONFIG);

const database = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

export const auth = getAuth(app);
export const storage = getStorage();
export { database };
