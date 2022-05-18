import { FirebaseErrorProps, firebaseErrors } from './erros';

const verifyCodeError = (error: unknown): string => {
  const { code, message } = error as FirebaseErrorProps;

  return firebaseErrors[code] ? firebaseErrors[code] : message;
};

export { verifyCodeError };
