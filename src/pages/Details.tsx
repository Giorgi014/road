import { useState } from "react";
import { ProductImage } from "@/components/products/product-details/ProductImage";
import { useData } from "@/context/data/use-data";
import { useParams } from "react-router-dom";
import { ProductInfo } from "@/components/products/product-details/ProductInfo";

function Details() {
  const { data, addCart } = useData();
  const { id } = useParams();

  const details = data?.find((item) => item.id === Number(id));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!details) {
    return (
      <article>
        <h1>Loading...</h1>
      </article>
    );
  }

  const activeImage = selectedImage ?? details.src;

  return (
    <article className="mt-19 p-5 w-full max-w-[1920px] md:flex md:flex-row justify-start md:items-start gap-5 flex-col items-center">
      <section className="flex md:w-[50%] w-full lg:flex-row flex-col-reverse gap-4">
        <div className="flex lg:flex-col flex-row gap-4 lg:pr-2.5 pb-2.5 lg:pb-0 lg:overflow-y-auto overflow-x-auto lg:max-h-125">
          {details.images.map((img, index) => (
            <ProductImage
              key={img}
              id={index}
              src={img}
              alt={`${details.name} - ${index + 1}`}
              isSelected={activeImage === img}
              onSelect={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div className="relative w-full lg:flex-1 h-[clamp(20rem,60vw,31.25rem)] md:max-w-lg overflow-hidden rounded-2xl border border-(--border)/40 bg-(--bg-panel-alt)/60 backdrop-blur-sm">
          <img
            src={activeImage}
            alt={details.name}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[90%] w-auto object-contain transition-opacity duration-300"
          />
        </div>
      </section>
      <ProductInfo details={details} addCart={addCart} />
    </article>
  );
}

export default Details;
