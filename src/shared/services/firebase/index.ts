/* eslint-disable import/no-duplicates */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import FIREBASE_CONFIG from './config';

const app = initializeApp(FIREBASE_CONFIG);

export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage();
