export interface ProductOptionItem {
  id: string;
  label: string;
  value?: string;
}

export interface ProductOption {
  id: string;
  name: string;
  values: ProductOptionItem[];
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  media: string;
  price: number;
  compareAtPrice: number;
  options: string[];
}

export type ProductStatus = 'active' | 'draft' | 'archived';
export interface Product {
  _id: string;
  title: string;
  description: string;
  slug: string;
  price: number;
  media: string[];
  compareAtPrice: number;
  tags: string[];
  status: ProductStatus;
  options: ProductOption[];
  categoryId: string;
  variants: ProductVariant[];
}
