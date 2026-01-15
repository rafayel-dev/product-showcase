import { Card as AntCard, Button, Rate, Tooltip } from "antd";
import { FiCheck, FiPlus } from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
import type { CartItem, Product } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import toast from "../../utils/toast";
import { useState } from "react";

/* ================= TYPES ================= */
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, image, rating, price } = product;
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const itemToAdd: CartItem = {
      ...product,
      selectedSize: "M",
      selectedColor: "Default",
      quantity: 1,
    };
    setAdded(true);
    addToCart(itemToAdd);
    toast.success("পণ্য কার্টে যোগ হয়েছে 🛒");
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const itemToAdd: CartItem = {
      ...product,
      selectedSize: "M",
      selectedColor: "Default",
      quantity: 1,
    };
    addToCart(itemToAdd);
    navigate("/checkout");
  };

  return (
    <AntCard
      hoverable
      className="relative transition-all! duration-300! border! border-violet-500/50! overflow-hidden! rounded-lg! cursor-auto!"
      cover={
        <Link to={`/product/${id}`}>
          <div className="aspect-square overflow-hidden">
            <img alt={title} src={image} className="object-cover" />
            <div className="absolute top-2 left-2 bg-violet-600/70 text-white backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded font-nunito">
              15% Off
            </div>
          </div>
        </Link>
      }
    >
      <div className="flex items-center justify-between mb-1">
        <Rate
          allowHalf
          defaultValue={rating}
          disabled
          style={{ fontSize: "16px" }}
        />
        <div className="text-lg font-bold text-black font-nunito">${price}</div>
      </div>
      <Link to={`/product/${id}`}>
        <h5 className="text-xl font-bold text-gray-900 hover:text-violet-500 transition-all duration-300 font-nunito">
          {title}
        </h5>
      </Link>
      <div className="flex justify-between items-center">
        <Button
          type="primary"
          className="bg-violet-500! hover:bg-violet-600! font-bold!"
          onClick={handleBuyNow}
        >
          <span className="font-nunito">Buy Now</span>
        </Button>
        <Tooltip title={added ? "Already added" : "Add to cart"}>
          <Button
            shape="circle"
            className={`w-8! h-8!
    flex! items-center! justify-center!
    transition-all duration-300
    ${
      added
        ? "bg-violet-500! text-white! cursor-not-allowed! border-violet-500!"
        : "bg-black! text-white! hover:bg-gray-900! border-violet-600!"
    }`}
            onClick={handleAddToCart}
          >
            {added ? <FiCheck size={20} /> : <FiPlus size={22} />}
          </Button>
        </Tooltip>
      </div>
    </AntCard>
  );
};

export default ProductCard;
