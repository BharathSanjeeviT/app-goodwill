import { create } from "zustand";
import { useEffect } from "react";
import { useStorage } from "./useStorage";
import { router } from "expo-router";

interface ProductType {
	name: string;
	id: string;
	quantity: number;
	setProduct: (name: string, id: string, quantity: number) => void;
}

interface SiteType {
	site_id: string | null;
	attendenceStatus: boolean | null;
	is_super: boolean | null;
	setAttendenceStatus: (status: boolean) => void;
	setInfo: (
		site_id: string,
		attendenceStatus: boolean | null,
		is_super: boolean,
	) => void;
}

interface AuthType {
	loading: boolean;
	uid: string | null;
	signIn: (id: string | null) => void;
	setLoading: (loading: boolean) => void;
}

interface UpdateItems {
	updatedItems: Array<{
		product: string;
		quantity: number;
	}>;
	getUpatedItem: (product: string) => number | undefined;
	initValue: (
		value: Array<{
			product: string;
			quantity: number;
		}>,
	) => void;
	updateItem: (product: string, quantity: number) => void;
}

interface ChangedProducts {
	changedOnes: Array<{
		product: string;
		quantity: number;
	}>;
	addChangedOne: (product: string, quantity: number) => void;
}

const useSiteStore = create<SiteType>((set) => ({
	site_id: null,
	attendenceStatus: null,
	is_super: null,
	setAttendenceStatus: (status) =>
		set({
			attendenceStatus: status,
		}),
	setInfo: (site_id, attendenceStatus, is_super) =>
		set({
			site_id,
			attendenceStatus,
			is_super,
		}),
}));

const useUpateItemStore = create<ChangedProducts>((set) => ({
	changedOnes: [],
	addChangedOne: (product, quantity) =>
		set((state) => ({
			changedOnes: state.changedOnes.some((item) => item.product === product)
				? state.changedOnes.map((item) =>
					item.product === product ? { product, quantity } : item,
				)
				: [...state.changedOnes, { product, quantity }],
		})),
}));

const useUpdateItemStore = create<UpdateItems>((set, get) => ({
	updatedItems: [],
	initValue: (quantity) =>
		set({
			updatedItems: quantity,
		}),
	getUpatedItem: (id: string) => {
		const { updatedItems } = get();
		const item = updatedItems.find((item) => item.product === id);
		return item ? item.quantity : undefined;
	},
	updateItem: (product, quantity) =>
		set((state) => ({
			updatedItems: state.updatedItems.map((item) =>
				item.product === product ? { product, quantity } : item,
			),
		})),
}));

const useAuthStore = create<AuthType>((set) => ({
	uid: null,
	loading: true,
	signIn: (uid: string | null) =>
		set({
			uid,
		}),
	setLoading: (loading: boolean) =>
		set({
			loading,
		}),
}));

const useProductStore = create<ProductType>((set) => ({
	name: "",
	id: "",
	quantity: 0,
	setProduct: (name: string, id: string, quantity: number) =>
		set({
			name,
			id,
			quantity,
		}),
}));

const useSite = () => {
	const { site_id, setInfo, attendenceStatus, setAttendenceStatus, is_super } =
		useSiteStore();
	return { site_id, setInfo, attendenceStatus, setAttendenceStatus, is_super };
};

const useChangedProducts = () => {
	const { changedOnes, addChangedOne } = useUpateItemStore();
	return { changedOnes, addChangedOne };
};

const useUpdatedProducts = () => {
	const { updatedItems, initValue, updateItem, getUpatedItem } =
		useUpdateItemStore();
	return { updatedItems, initValue, updateItem, getUpatedItem };
};

const useProduct = () => {
	const { name, id, quantity, setProduct } = useProductStore();
	return { name, id, quantity, setProduct };
};

const useSession = () => {
	const { uid, loading, signIn, setLoading } = useAuthStore();
	const [[storageSession, storageLoading], setStorageSession] =
		useStorage("dfghjk");

	useEffect(() => {
		if (!storageLoading) {
			signIn(storageSession);
			setLoading(false);
		}
	}, [storageLoading, storageSession, setLoading, signIn]);

	const signInWithStorage = (token: string | null) => {
		signIn(token);
		setStorageSession(token);
		router.push("/");
	};

	return { uid, loading, signIn: signInWithStorage };
};

const getstartend = (date: Date) => {
	const start = new Date(date.getFullYear(), date.getMonth(), 1);
	const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	start.setHours(0, 0, 0, 0);
	end.setHours(23, 59, 59, 999);
	console.log(start, end);
	return { start, end };
};

function utcToIst(utcTimeStr: string): Date {
    const utcDate = new Date(utcTimeStr); // 'Z' indicates UTC time
    const istOffsetMs = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // 5 hours and 30 minutes in milliseconds
    const istDate = new Date(utcDate.getTime() + istOffsetMs);
    
    return istDate;
}

export {
	useSession,
	useProduct,
	useSite,
	useUpdatedProducts,
	useChangedProducts,
	utcToIst,
	getstartend,
};
