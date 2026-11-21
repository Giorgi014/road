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

	const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
		const storedWishlist = localStorage.getItem("wishlistProductIds");
		if (!storedWishlist) return [];

		try {
			const parsedWishlist: unknown = JSON.parse(storedWishlist);
			if (!Array.isArray(parsedWishlist)) {
				localStorage.removeItem("wishlistProductIds");
				return [];
			}
			return [
				...new Set(
					parsedWishlist.filter(
						(id): id is number =>
							typeof id === "number" &&
							Number.isSafeInteger(id) &&
							id >= 0,
					),
				),
			];
		} catch {
			localStorage.removeItem("wishlistProductIds");
			return [];
		}
	});

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
				setData([]);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	useEffect(() => {
		localStorage.setItem("wishlistProductIds", JSON.stringify(wishlistIds));
	}, [wishlistIds]);

	const toggleWishlist = useCallback((id: number) => {
		setWishlistIds((items) =>
			items.includes(id) ? items.filter((itemId) => itemId !== id) : [...items, id],
		);
	}, []);

	const addCart = useCallback(
		(product: AllProducts, selectedSize: string, selectedColor: string) => {
			setCartItems((item) => {
				const existing = item.find(
					(i) =>
						i.id === product.id &&
						i.selectedSize === selectedSize &&
						i.selectedColor === selectedColor,
				);
				if (existing) return item;
				return [
					...item,
					{ ...product, selectedSize, selectedColor, quantity: 1 },
				];
			});
		},
		[],
	);

	const increaseCart = useCallback(
		(id: number, selectedSize: string, selectedColor: string) => {
			setCartItems((items) =>
				items.map((item) =>
					item.id === id &&
					item.selectedSize === selectedSize &&
					item.selectedColor === selectedColor
						? { ...item, quantity: item.quantity + 1 }
						: item,
				),
			);
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
		() => ({
			data,
			cartItems,
			wishlistIds,
			addCart,
			toggleWishlist,
			increaseCart,
			decreaseCart,
			removeCart,
		}),
		[
			data,
			cartItems,
			wishlistIds,
			addCart,
			toggleWishlist,
			increaseCart,
			decreaseCart,
			removeCart,
		],
	);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
