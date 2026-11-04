import { useCallback, useEffect, useMemo, useState } from "react";
import { DataContext } from "@/context/data/data-context";
import type {
	AllProducts,
	CartItem,
	DataProviderProps,
	ProductDataResponse,
} from "@/types";

export const DataProvider = ({ children }: DataProviderProps) => {
	const [data, setData] = useState<AllProducts[] | null>(null);

	const [cartItems, setCartItems] = useState<CartItem[]>(() => {
		const storedCart = localStorage.getItem("cartItems");
		if (!storedCart) return [];

		try {
			const parsedCart = JSON.parse(storedCart);
			return Array.isArray(parsedCart) ? (parsedCart as CartItem[]) : [];
		} catch {
			localStorage.removeItem("cartItems");
			return [];
		}
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch("/data.json");
				const dataResponse: ProductDataResponse = await res.json();
				setData(dataResponse.allProducts ?? []);
			} catch (err) {
				console.error(err);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	const addCart = useCallback((product: AllProducts) => {
		setCartItems((item) => {
			const existing = item.find((i) => i.id === product.id);
			if (existing) {
				return item;
			}
			return [...item, { ...product, quantity: 1 }];
		});
	}, []);

	const removeCart = useCallback((id: number) => {
		setCartItems((item) => item.filter((i) => i.id !== id));
	}, []);

	const value = useMemo(
		() => ({ data, cartItems, addCart, removeCart }),
		[data, cartItems, addCart, removeCart],
	);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
