import createProductCategoryName from './createProductCategoryName';
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default (product, opts: Record<string, any> = {}) => {
  const view = currentStoreView();
  const categories = (product.category || []).map(x => x.name);
  return {
    id: product.parentId || product.id, // 'P12345' // use product id not variant id
    name: product.name, // 'awesome t-shirt'
    quantity: product.qty || opts.qty, // 1 // the quantity REMOVED from the cart (not the quantity remaining in the cart)
    brand: product.brand || view.storeCode, // my-store // if there are multiple brands use the brand variable here
    price: product.price, // 10.0 // make sure the price is a number ie 10.00 not $10.00
    variant: product.sku.split('-')[1] || null,
    category: createProductCategoryName(product), // 'clothes/shirts/t-shirts' // max five levels of hierarchy
    // requires product-scoped custom dimensions:
    sku: product.parentSku || product.sku,
    description: product.meta_description,
    imageURL: window.location.origin + product.image,
    productURL: window.location.origin + '/' + product.url_key,
    categories: categories.length ? categories : [createProductCategoryName(product)], // ['mens', 't-shirts']
    currentCategory: createProductCategoryName(product), // 't-shirts',
    variantId: product.id
  }
}
