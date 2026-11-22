import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ProfileNavigation,
  WishlistFilters,
  WishlistHeader,
} from "@/components";
import {
  getWishlistCategory,
  type WishlistCategory,
} from "@/components/profile/wishlist/constants";
import { WishlistProductCard } from "@/components/ui";
import { useData } from "@/context/data";
import { OPTIONS } from "@/data";
import type { OptionsType } from "@/types";

const Wishlist = () => {
  const { data, cartItems, wishlistIds, addCart, toggleWishlist } = useData();
  const [category, setCategory] = useState<WishlistCategory>("all");
  const [sort, setSort] = useState<OptionsType>({
    ...OPTIONS[0],
    label: "Recently Added",
  });
  const [shareMessage, setShareMessage] = useState("");

  const allWishlistProducts = useMemo(
    () =>
      wishlistIds.flatMap(
        (id) => data?.find((product) => product.id === id) ?? [],
      ),
    [data, wishlistIds],
  );

  const wishlistProducts = useMemo(() => {
    const filtered =
      category === "all"
        ? [...allWishlistProducts]
        : allWishlistProducts.filter(
            (product) => getWishlistCategory(product) === category,
          );

    switch (sort.value) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "name-asc":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [allWishlistProducts, category, sort.value]);

  const categoryCounts = useMemo<Record<WishlistCategory, number>>(
    () => ({
      all: allWishlistProducts.length,
      apparel: allWishlistProducts.filter(
        (product) => getWishlistCategory(product) === "apparel",
      ).length,
      accessories: allWishlistProducts.filter(
        (product) => getWishlistCategory(product) === "accessories",
      ).length,
      gear: allWishlistProducts.filter(
        (product) => getWishlistCategory(product) === "gear",
      ).length,
    }),
    [allWishlistProducts],
  );

  const handleShare = async () => {
    const shareData = {
      title: "My ROAD Wishlist",
      text: allWishlistProducts.map((product) => product.name).join(", "),
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.title}: ${shareData.text} ${shareData.url}`,
        );
        setShareMessage("Wishlist link copied.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      console.error("Unable to share wishlist.", error);
      setShareMessage("Wishlist could not be shared.");
    }
  };

  const addProductToCart = (product: (typeof allWishlistProducts)[number]) => {
    const size = product.size[0];
    const color = product.color[0];
    if (size && color) addCart(product, size, color);
  };

  const addAllToCart = () => {
    for (const product of allWishlistProducts) {
      if (!cartItems.some((item) => item.id === product.id)) {
        addProductToCart(product);
      }
    }
  };

  const hasProductsToAdd = allWishlistProducts.some(
    (product) => !cartItems.some((item) => item.id === product.id),
  );

  return (
    <main className="mx-auto mt-19 flex w-full max-w-[1600px] flex-col items-center gap-5 p-5 lg:flex-row lg:items-start lg:justify-between">
      <ProfileNavigation />

      <section className="w-full min-w-0 rounded-2xl border border-ink-400/40 bg-ink-800/60 p-5 backdrop-blur-sm sm:p-6">
        <WishlistHeader
          itemCount={wishlistIds.length}
          shareMessage={shareMessage}
          canAddAll={hasProductsToAdd}
          onShare={handleShare}
          onAddAll={addAllToCart}
        />

        <WishlistFilters
          category={category}
          categoryCounts={categoryCounts}
          sort={sort}
          onCategoryChange={setCategory}
          onSortChange={setSort}
        />

        {data === null ? (
          <p className="py-16 text-center text-sm text-white/50">
            Loading your wishlist...
          </p>
        ) : wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {wishlistProducts.map((product) => (
              <WishlistProductCard
                key={product.id}
                product={product}
                isInCart={cartItems.some((item) => item.id === product.id)}
                onRemove={() => toggleWishlist(product.id)}
                onAddToCart={() => addProductToCart(product)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-400/50 px-5 py-16 text-center">
            <h2 className="font-display text-sm uppercase text-white">
              {wishlistIds.length === 0
                ? "Your wishlist is empty"
                : "No items in this category"}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-white/50">
              Save pieces you love and they will be waiting here for you.
            </p>
            <Link
              to="/marketplace"
              className="mt-5 flex cursor-pointer items-center gap-2 rounded-lg bg-(image:--pill-grad) px-4 py-2.5 text-xs uppercase tracking-wide text-white transition-opacity hover:opacity-85"
            >
              Explore Marketplace
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default Wishlist;
