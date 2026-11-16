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
			return Array.isArray(parsedCart)
				? (parsedCart as CartItem[]).map((item) => ({
						...item,
						selectedSize: item.selectedSize ?? item.size[0] ?? "",
						selectedColor: item.selectedColor ?? item.color[0] ?? "",
					}))
				: [];
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

	const addCart = useCallback(
		(product: AllProducts, selectedSize: string, selectedColor: string) => {
			setCartItems((item) => {
				const existing = item.find(
					(i) =>
						i.id === product.id &&
						i.selectedSize === selectedSize &&
						i.selectedColor === selectedColor,
				);
				if (existing) {
					return item.map((i) =>
						i === existing ? { ...i, quantity: i.quantity + 1 } : i,
					);
				}
				return [
					...item,
					{ ...product, selectedSize, selectedColor, quantity: 1 },
				];
			});
		},
		[],
	);

	const removeCart = useCallback(
		(id: number, selectedSize: string, selectedColor: string) => {
			setCartItems((item) =>
				item.filter(
					(i) =>
						i.id !== id ||
						i.selectedSize !== selectedSize ||
						i.selectedColor !== selectedColor,
				),
			);
		},
		[],
	);

	const decreaseCart = useCallback(
		(id: number, selectedSize: string, selectedColor: string) => {
			setCartItems((item) =>
				item.map((cartItem) =>
					cartItem.id === id &&
					cartItem.selectedSize === selectedSize &&
					cartItem.selectedColor === selectedColor &&
					cartItem.quantity > 1
						? { ...cartItem, quantity: cartItem.quantity - 1 }
						: cartItem,
				),
			);
		},
		[],
	);

	const value = useMemo(
		() => ({ data, cartItems, addCart, decreaseCart, removeCart }),
		[data, cartItems, addCart, decreaseCart, removeCart],
	);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
