import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useState } from 'react';

//getters and setters for the secure-store from the app
const setStorageItem = async (key: string, token: string | null) => {
  if (token === null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, token);
  }
}
const getStorageItem = async (key: string) => {
  const val = await SecureStore.getItemAsync(key);
  return val;
}

//custom hook to modify the value and update via getters and setters of the ss
export const useStorage = (key: string):
  [[string | null, boolean], (value: string | null) => void] => {

  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const val = await getStorageItem(key);
      setValue(val)
      setLoading(false)
    })();
  }, [key]);

  const setStoredValue = useCallback(
    (newValue: string | null) => {
      setValue(newValue);
      setStorageItem(key, newValue);
    }, [key]);

  return [
    [value, loading],
    setStoredValue
  ];
};
