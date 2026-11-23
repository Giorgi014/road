import { useCallback, useEffect, useMemo, useState } from "react";
import { DataContext } from "@/context/data/data-context";
import type {
  AllProducts,
  CartItem,
  DataProviderProps,
  ProductDataResponse,
} from "@/types";

type UserProductData = {
  owner: string | null;
  cartItems: CartItem[];
  wishlistIds: number[];
};

const EMPTY_USER_DATA: UserProductData = {
  owner: null,
  cartItems: [],
  wishlistIds: [],
};
const LEGACY_CART_KEY = "cartItems";
const LEGACY_WISHLIST_KEY = "wishlistProductIds";
const EMPTY_CART: CartItem[] = [];
const EMPTY_WISHLIST: number[] = [];

const getUserStorageKey = (email: string, key: string) =>
  `road:${encodeURIComponent(email)}:${key}`;

const parseWishlist = (stored: string | null) => {
  if (!stored) return [];
  try {
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return [
      ...new Set(
        parsed.filter(
          (id): id is number =>
            typeof id === "number" && Number.isSafeInteger(id) && id >= 0,
        ),
      ),
    ];
  } catch (error) {
    console.error("Unable to read saved wishlist.", error);
    return [];
  }
};

const parseCart = (stored: string | null): CartItem[] => {
  if (!stored) return [];
  try {
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => {
      const cartItem = item as CartItem;
      return {
        ...cartItem,
        selectedSize: cartItem.selectedSize ?? cartItem.size?.[0] ?? "",
        selectedColor: cartItem.selectedColor ?? cartItem.color?.[0] ?? "",
      };
    });
  } catch (error) {
    console.error("Unable to read saved cart.", error);
    return [];
  }
};

const loadUserProductData = (email: string): UserProductData => {
  const cartKey = getUserStorageKey(email, LEGACY_CART_KEY);
  const wishlistKey = getUserStorageKey(email, LEGACY_WISHLIST_KEY);

  try {
    let storedCart = localStorage.getItem(cartKey);
    let storedWishlist = localStorage.getItem(wishlistKey);

    if (storedCart === null && storedWishlist === null) {
      storedCart = localStorage.getItem(LEGACY_CART_KEY);
      storedWishlist = localStorage.getItem(LEGACY_WISHLIST_KEY);
      if (storedCart !== null) localStorage.setItem(cartKey, storedCart);
      if (storedWishlist !== null)
        localStorage.setItem(wishlistKey, storedWishlist);
      localStorage.removeItem(LEGACY_CART_KEY);
      localStorage.removeItem(LEGACY_WISHLIST_KEY);
    }

    return {
      owner: email,
      cartItems: parseCart(storedCart),
      wishlistIds: parseWishlist(storedWishlist),
    };
  } catch (error) {
    console.error("Unable to load account cart and wishlist.", error);
    return { ...EMPTY_USER_DATA, owner: email };
  }
};

export const DataProvider = ({
  children,
  userEmail,
}: DataProviderProps & { userEmail: string | null }) => {
  const [data, setData] = useState<AllProducts[] | null>(null);
  const [userProductData, setUserProductData] = useState<UserProductData>(() =>
    userEmail ? loadUserProductData(userEmail) : EMPTY_USER_DATA,
  );
  const cartItems =
    userProductData.owner === userEmail && userEmail
      ? userProductData.cartItems
      : EMPTY_CART;
  const wishlistIds =
    userProductData.owner === userEmail && userEmail
      ? userProductData.wishlistIds
      : EMPTY_WISHLIST;

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
    if (!userEmail) {
      try {
        localStorage.removeItem(LEGACY_CART_KEY);
        localStorage.removeItem(LEGACY_WISHLIST_KEY);
      } catch (error) {
        console.error(
          "Unable to clear unassigned cart and wishlist data.",
          error,
        );
      }
    }
  }, [userEmail]);

  useEffect(() => {
    if (!userEmail || userProductData.owner !== userEmail) return;
    try {
      localStorage.setItem(
        getUserStorageKey(userEmail, LEGACY_CART_KEY),
        JSON.stringify(userProductData.cartItems),
      );
      localStorage.setItem(
        getUserStorageKey(userEmail, LEGACY_WISHLIST_KEY),
        JSON.stringify(userProductData.wishlistIds),
      );
    } catch (error) {
      console.error("Unable to save account cart and wishlist.", error);
    }
  }, [userEmail, userProductData]);

  const toggleWishlist = useCallback(
    (id: number) => {
      if (!userEmail) return;
      setUserProductData((current) => {
        if (current.owner !== userEmail) return current;
        const wishlistIds = current.wishlistIds.includes(id)
          ? current.wishlistIds.filter((itemId) => itemId !== id)
          : [...current.wishlistIds, id];
        return { ...current, wishlistIds };
      });
    },
    [userEmail],
  );

  const addCart = useCallback(
    (product: AllProducts, selectedSize: string, selectedColor: string) => {
      if (!userEmail) return;
      setUserProductData((current) => {
        if (current.owner !== userEmail) return current;
        const existing = current.cartItems.find(
          (i) =>
            i.id === product.id &&
            i.selectedSize === selectedSize &&
            i.selectedColor === selectedColor,
        );
        if (existing) return current;
        return {
          ...current,
          cartItems: [
            ...current.cartItems,
            { ...product, selectedSize, selectedColor, quantity: 1 },
          ],
        };
      });
    },
    [userEmail],
  );

  const increaseCart = useCallback(
    (id: number, selectedSize: string, selectedColor: string) => {
      if (!userEmail) return;
      setUserProductData((current) =>
        current.owner !== userEmail
          ? current
          : {
              ...current,
              cartItems: current.cartItems.map((item) =>
                item.id === id &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            },
      );
    },
    [userEmail],
  );

  const removeCart = useCallback(
    (id: number, selectedSize: string, selectedColor: string) => {
      if (!userEmail) return;
      setUserProductData((current) =>
        current.owner !== userEmail
          ? current
          : {
              ...current,
              cartItems: current.cartItems.filter(
                (i) =>
                  i.id !== id ||
                  i.selectedSize !== selectedSize ||
                  i.selectedColor !== selectedColor,
              ),
            },
      );
    },
    [userEmail],
  );

  const decreaseCart = useCallback(
    (id: number, selectedSize: string, selectedColor: string) => {
      if (!userEmail) return;
      setUserProductData((current) =>
        current.owner !== userEmail
          ? current
          : {
              ...current,
              cartItems: current.cartItems.map((cartItem) =>
                cartItem.id === id &&
                cartItem.selectedSize === selectedSize &&
                cartItem.selectedColor === selectedColor &&
                cartItem.quantity > 1
                  ? { ...cartItem, quantity: cartItem.quantity - 1 }
                  : cartItem,
              ),
            },
      );
    },
    [userEmail],
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
