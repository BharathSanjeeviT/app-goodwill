import { create } from "zustand"
import { useEffect } from 'react';
import { useStorage } from './useStorage';
import { router } from "expo-router";

interface ProductType {
  name: string,
  id: string,
  quantity: number,
  setProduct: (name: string, id: string, quantity: number) => void,
}

interface SiteType {
  site_id: string | null,
  attendenceStatus: boolean | null,
  is_super: boolean | null,
  setAttendenceStatus : (status : boolean) => void,
  setInfo: (site_id: string, attendenceStatus: boolean | null, is_super: boolean) => void,
}

interface AuthType {
  loading: boolean,
  uid: string | null,
  signIn: (id: string | null) => void,
  setLoading: (loading: boolean) => void,
}

interface UpdateItems {
  updatedItems: Array<{
    id: string,
    quantity: number
  }>,
  getUpatedItem: (id: string) => number | undefined,
  initValue: (value: Array<{
    id: string,
    quantity: number
  }>) => void,
  updateItem: (id: string, quantity: number) => void
}

interface ChangedProducts {
  changedOnes: Array<{
    id: string,
    quantity: number
  }>,
  addChangedOne: (id: string, quantity: number) => void,
}

const useSiteStore = create<SiteType>((set) => ({
  site_id: null,
  attendenceStatus: null,
  is_super: null,
  setAttendenceStatus: (status) => set({
    attendenceStatus: status
  }),
  setInfo: (site_id, attendenceStatus, is_super) => set({
    site_id,
    attendenceStatus,
    is_super
  })
}))

const useUpateItemStore = create<ChangedProducts>((set) => ({
  changedOnes: [],
  addChangedOne: (id, quantity) => set((state) => ({
    changedOnes: [...state.changedOnes, { id, quantity }]
  }))
}))

const useUpdateItemStore = create<UpdateItems>((set, get) => ({
  updatedItems: [],
  initValue: (quantity) => set({
    updatedItems: quantity
  }),
  getUpatedItem: (id: string) => {
    const { updatedItems } = get();
    const item = updatedItems.find(item => item.id === id);
    return item ? item.quantity : undefined;
  },
  updateItem: (id, quantity) => set((state) => ({
    updatedItems: state.updatedItems.map(item => item.id === id ? { id, quantity } : item)
  }))
}))

const useSite = () => {
  const { site_id, setInfo, attendenceStatus, setAttendenceStatus, is_super } = useSiteStore(); 
  return { site_id, setInfo, attendenceStatus, setAttendenceStatus, is_super };
}

const useChangedProducts = () => {
  const { changedOnes, addChangedOne } = useUpateItemStore()
  return { changedOnes, addChangedOne };
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

const useProductStore = create<ProductType>((set) => ({
  name: "",
  id: "",
  quantity: 0,
  setProduct: (name: string, id: string, quantity: number) => set({
    name,
    id,
    quantity
  }),
}))

const useUpdatedProducts = () => {
  const { updatedItems, initValue, updateItem, getUpatedItem } = useUpdateItemStore()
  return { updatedItems, initValue, updateItem, getUpatedItem };
}

const useProduct = () => {
  const { name, id, quantity, setProduct } = useProductStore();
  return { name, id, quantity, setProduct };
}

const useSession = () => {
  const { uid, loading, signIn, setLoading } = useAuthStore();
  const [[storageSession, storageLoading], setStorageSession] = useStorage('jdskfh');

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

export {
  useSession,
  useProduct,
  useSite,
  useUpdatedProducts,
  useChangedProducts
};
