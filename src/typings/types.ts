export interface IDrawerItem {
  title: string;
  icon: string;
  link: string;
  href?: string;
  group?: string;
  children?: IDrawerItem[];
}

// export interface MenuBaseItemData
export const locationTypes = ["外送", "外帶"] as const;
export type locationType = typeof locationTypes[number];

export interface Store {
  id: number;
  name: string;
  city: string;
  district: string;
  phone: string;
  address: string;
}

export interface PickupInfo {
  location:
    | {
        type: "外送";
        address: string;
        store: never;
      }
    | {
        type: "外帶";
        store: Store;
        address: never;
      };
  pickupTime: string;
}

export type ComboInfo = Omit<Required<Product>, "price" | "introduction">;

interface Product {
  id: number;
  name: string;
  price: number;
  introduction?: string;
  description?: string;
  imageUrl?: string;
}

export interface MemberData {
  id: number;
  name: string;
  carrier: string;
}

export interface Combo extends Product {
  items: ComboItem[];
}

// 套餐選項
export interface ComboItem extends Product {
  options: ComboItemOption[];
}

export interface ComboItemOption extends Exclude<Product, "price"> {
  options: ProductItem[];
}

export type ProductItem = ProductSubOption[];

export type ProductSubOption = Product;

type SelectedProduct = Pick<Product, "id" | "name" | "price">;

export interface OptionSelectedCombo extends SelectedProduct {
  items: SelectedComboItem[];
}

export interface SelectedComboItem extends SelectedProduct {
  selected: SelectedProductItem;
}

export interface SelectedProductItem extends SelectedProduct {
  options: SelectedProductSubItem[];
}

export type SelectedProductSubItem = SelectedProduct;

export interface OrderData {
  id: number;
  email: string;
  name: string;
  phone: string;
  pickupTime: string;
  comments: string;
  carrier: string | null;
  store: Store | null;
  address: string;
}

export interface FullOrderData extends OrderData {
  products: OptionSelectedCombo[];
}

export interface Member {
  id: number;
  gender: string | null;
  email: string;
  carrier: string | null;
  birthday: string | null;
  active: boolean;
  name: string | null;
  cellphone: string | null;
}
