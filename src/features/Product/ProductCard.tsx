import { Rate, Tooltip } from "antd";
import { FiCheck, FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import AppButton from "../../components/common/AppButton";
import AppCard from "../../components/common/AppCard";
import { useCart } from "../../hooks/useCart";
import type { CartItem, Product } from "../../types";

import toast from "../../utils/toast";

/* ================= TYPES ================= */
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, image, rating, price } = product;
  const { addToCart, openCart, cartItems } = useCart();
  const navigate = useNavigate();

  const isAdded = cartItems.some((item) => item.id === id);

  const hasDiscount = !!product.hasDiscount;
  const finalPrice = hasDiscount
    ? (product.discountType === 'flat'
      ? price - (product.discountValue || 0)
      : price - (price * (product.discountValue || 0)) / 100)
    : price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const itemToAdd: CartItem = {
      ...product,
      selectedSize: product.specifications?.availableSizes?.[0] || "M",
      selectedColor: product.specifications?.availableColors?.[0] || "Default",
      quantity: 1,
      price: finalPrice,
    };
    addToCart(itemToAdd);
    toast.success("পণ্য কার্টে যোগ হয়েছে 🛒");
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const itemToAdd: CartItem = {
      ...product,
      selectedSize: product.specifications?.availableSizes?.[0] || "M",
      selectedColor: product.specifications?.availableColors?.[0] || "Default",
      quantity: 1,
      price: finalPrice,
    };
    addToCart(itemToAdd);
    navigate("/checkout");
  };

  return (
    <AppCard
      hoverable
      bordered={false}
      className="relative overflow-hidden! cursor-auto! border-violet-500/50!"
      cover={
        <Link to={`/product/${id}`}>
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <img alt={title} src={image} className="object-cover w-full h-full transition-transform duration-300 hover:scale-102" />
            {hasDiscount && (
              <div className="absolute top-2 left-2 bg-violet-600/70 text-white backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded font-nunito">
                🔥{product.discountType === 'flat' ? `৳${product.discountValue} Off` : `${product.discountValue}% Off`}
              </div>
            )}
          </div>
        </Link>
      }
    >
      <div className="flex items-center justify-between mb-1">
        <Rate
          allowHalf
          defaultValue={rating}
          disabled
          style={{ fontSize: 14 }}
        />
        <div className="flex items-center gap-1">
          {hasDiscount && (
            <div className="text-xs font-bold text-gray-500 font-nunito line-through">
              ৳{price}
            </div>
          )}
          <div className="text-lg font-bold text-violet-600 font-nunito">
            ৳{finalPrice}
          </div>
        </div>
      </div>
      <Link to={`/product/${id}`}>
        <h5 className="text-lg font-bold text-gray-900 hover:text-violet-500 transition-all duration-300 font-nunito truncate" title={title}>
          {title}
        </h5>
      </Link>
      <div className="flex justify-between items-center">
        <AppButton
          type="primary"
          className="font-bold!"
          onClick={handleBuyNow}
        >
          <span className="font-nunito">Buy Now</span>
        </AppButton>
        <Tooltip
          placement="top"
          trigger="hover"
          color="#8E51FF"
          title={
            isAdded ? (
              <span
                className="cursor-pointer"
                onClick={openCart}
              >
                View Cart
              </span>
            ) : (
              "Add to cart"
            )
          }
        >
          <span>
            <AppButton
              shape="circle"
              disabled={isAdded}
              className={`w-10! h-10! flex! items-center! justify-center! ${isAdded
                ? "cursor-not-allowed! bg-violet-600! text-white!"
                : "bg-black! text-white! hover:bg-gray-900! border-violet-600!"
                }`}
              onClick={handleAddToCart}
            >
              {isAdded ? <FiCheck size={20} /> : <FiPlus size={22} />}
            </AppButton>
          </span>
        </Tooltip>
      </div>
    </AppCard>
  );
};

export default ProductCard;
