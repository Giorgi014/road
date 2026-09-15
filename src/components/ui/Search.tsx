import { useData } from "@/context/data/use-data";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchedProduct } from "./SearchedProduct";

type SearchProps = {
  onClose: () => void;
};

export const SearchValue = ({ onClose }: SearchProps) => {
  const { data } = useData();
  const [searchProduct, setSearchProduct] = useState("");
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    const query = searchProduct.trim().toLowerCase();
    if (!query || !data) return [];

    return data.filter((product) => product.name.toLowerCase().includes(query));
  }, [data, searchProduct]);

  const goToProduct = (id: number, name: string) => {
    navigate(`product/${id}/${name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-99999 flex items-start justify-center bg-ink-900/85 backdrop-blur-sm">
      <div className="w-[90%] max-w-170 mt-20 lg:mt-10 flex flex-col gap-3">
        <div className="relative flex items-center rounded-full border border-ink-400 bg-ink-800/70 backdrop-blur-xl transition-colors focus-within:border-electric-400">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border-none bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/30"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <Search className="absolute right-5 cursor-pointer" />
        </div>

        {filteredProducts.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto rounded-2xl border border-ink-400/40 bg-ink-800/70 backdrop-blur-xl">
            {filteredProducts.map((product) => (
              <SearchedProduct
                key={product.id}
                isNew={product.isNew}
                {...product}
                alt={product.name}
                onClick={() => goToProduct(product.id, product.name)}
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/10 z-9999999 cursor-pointer"
        onClick={onClose}
      >
        <X size={18} />
      </button>
    </div>
  );
};
