import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAG7J5AzE5rIbzQY6OIK6jSpHU-NmVXdjA",
  authDomain: "deepflix-cc642.firebaseapp.com",
  projectId: "deepflix-cc642",
  storageBucket: "deepflix-cc642.firebasestorage.app",
  messagingSenderId: "49500029926",
  appId: "1:49500029926:web:02b4c76fac2284b2fe4c27",
  measurementId: "G-D6W8XZW28V"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;