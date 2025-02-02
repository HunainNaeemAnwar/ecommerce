// types.ts
export interface ProductProps {
  _id: string;
  title: string;
  price: number;
  oldprice?: number;
  ratings?: number;
  images: any[]; // Adjust according to your image type
  description?: string;
  colors?: string[];
  sizes?: string[];
  reviews?: any[]; // Adjust according to your review type
  details?: string;
  faqs?: any[]; // Adjust according to your FAQ type
  slug?: {
    current: string;
  };
  // Include any other properties your product may have
}

export interface CartProduct extends ProductProps {
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}
