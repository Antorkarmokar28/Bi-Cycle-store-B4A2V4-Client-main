import { useGetProductQuery } from "@/redux/features/product/productsApi";

const ProductCard = () => {
  const { data } = useGetProductQuery(undefined);
  console.log(data);
  return (
    <div>

    </div>
  );
};

export default ProductCard;
