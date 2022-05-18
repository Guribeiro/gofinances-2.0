import { FirebaseOptions } from 'firebase/app';
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEANSUREMENT_ID,
} from '@env';

const FIREBASE_CONFIG: FirebaseOptions = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEANSUREMENT_ID,
};

export default FIREBASE_CONFIG;
