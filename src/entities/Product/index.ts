export type {
    Product, ITabs, IAdds,
} from './model/types/productSchema';

export type { ProductDetailsSchema } from './model/types/productDetailsSchema';
export { CategoryType, BrandType } from './model/types/productSchema';
export { BrandList, CategoryList } from './model/types/productSchema';
export { ProductList } from './ui/ProductList/ProductList';
export { ProductDetails } from './ui/ProductDetails/ProductDetails';

export { getProductDetailsData } from './model/selectors/productDetails';
