import type { AllProducts } from "./products";

export type CartItem = AllProducts & {
	quantity: number;
	selectedSize: string;
	selectedColor: string;
};

export interface DataContextType {
	data: AllProducts[] | null;
	cartItems: CartItem[];
	addCart: (
		product: AllProducts,
		selectedSize: string,
		selectedColor: string,
	) => void;
	decreaseCart: (
		id: number,
		selectedSize: string,
		selectedColor: string,
	) => void;
	removeCart: (
		id: number,
		selectedSize: string,
		selectedColor: string,
	) => void;
}
