interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

interface StorageOption {
  capacity: string;
  price: number;
}

interface SimilarProduct {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

interface Specs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface ProductData {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: Specs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: SimilarProduct[];
  imageUrl: string;
  colorName: string;
  storageCapacity: string;
}

export interface CartItem {
  id?: string;
  name?: string;
  brand?: string;
  imageUrl?: string;
  basePrice?: number;
  colorName: string;
  storageCapacity: string;
  price: number;
}

export interface AppContextProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}
