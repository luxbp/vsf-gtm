import createProductData from '../helper/createProductData';
import Vue from 'vue';

/**
 * Product Interaction
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith('cart/cart/DEL')) {
    Vue.prototype.$gtm.trackEvent({
      event: "eec.remove",
      eecEventName: "Remove from Cart",
      ecommerce: {
        remove: {
          actionField: {
            list: state.source, // 'fall collection' // Where the add to cart happened. use 'product detail page' if not from a list
          },
          products: [createProductData(mutation.payload.product)],
        },
      },

    })
  }
})
