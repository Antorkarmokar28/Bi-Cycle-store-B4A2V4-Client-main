import { useGetProductQuery } from "@/redux/features/product/product";

const ProductCard = () => {
  const { data } = useGetProductQuery(undefined);
  console.log(data);
  return (
    <div>

    </div>
  );
};

export default ProductCard;
