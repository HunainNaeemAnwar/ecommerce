// Counter.tsx
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface CounterProps {
  quantity: number;
  setQuantity: (qty: number) => void;
}

const Counter: React.FC<CounterProps> = ({ quantity, setQuantity }) => {
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center  justify-between px-1 lg:px-4  py-2 bg-gray-200 rounded-full ">
      <button onClick={decreaseQuantity} className="p-2  ">
        <FaMinus />
      </button>
      <span>{quantity}</span>
      <button onClick={increaseQuantity} className="p-2  ">
        <FaPlus />
      </button>
    </div>
  );
};

export default Counter;
