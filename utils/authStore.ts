import { create } from "zustand"
import { useEffect } from 'react';
import { useStorage } from './useStorage';
import { router } from "expo-router";

interface AuthType {
  loading: boolean,
  uid: string | null,
  signIn: (id: string | null) => void,
  setLoading: (loading: boolean) => void,
}

const useAuthStore = create<AuthType>((set) => ({
  uid: null,
  loading: true,
  signIn: (uid: string | null) => set({
    uid,
  }),
  setLoading: (loading: boolean) => set({
    loading,
  }),
}))

const useSession = () => {
  const { uid, loading, signIn, setLoading } = useAuthStore();
  const [[storageSession, storageLoading], setStorageSession] = useStorage('broker');

  useEffect(() => {
    if (!storageLoading) {
      signIn(storageSession);
      setLoading(false);
    }
  }, [storageLoading, storageSession, setLoading, signIn]);

  const signInWithStorage = (token: string | null) => {
    signIn(token);
    setStorageSession(token);
    router.push("/")
  };

  return { uid, loading, signIn: signInWithStorage };
};

export { useSession };
