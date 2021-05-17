import createProductData from '../helper/createProductData';
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import Vue from 'vue';

declare const dataLayer;

/**
 * Product Interaction
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const currency = currentStoreView().i18n.currencyCode;
  if (type.endsWith('cart/cart/ADD')) {
    Vue.prototype.$gtm.trackEvent({
      event: "eec.add",
      eecEventName: "Add to Cart",
      ecommerce: {
        add: {
          actionField: {
            list: state.source // 'fall collection' // Where the add to cart happened. use 'cart' if the removal happened on the cart page
          },
          products: [createProductData(mutation.payload.product)]
        },
      },
    })
  }
})
