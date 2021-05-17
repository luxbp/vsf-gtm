import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import createProductData from '../helper/createProductData';
import {
  PRODUCT_SET_RELATED,
  PRODUCT_SET_PAGED_PRODUCTS
} from '@vue-storefront/core/modules/catalog/store/product/mutation-types';
import Vue from 'vue';

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const payload = mutation.payload;
  if (type.endsWith(PRODUCT_SET_RELATED)) { // Related Products
    let products = payload.items || [];
    Vue.prototype.$gtm.trackEvent({
      event: "eec.impressions",
      eecEventName: "Impression Views",
      ecommerce: {
        impressions: products.map((product, index) => createProductData(product, { position: index }))
      },
    });
  }

  if (type.endsWith(PRODUCT_SET_PAGED_PRODUCTS)) { // Category Pages
    let products = payload.items || [];
    Vue.prototype.$gtm.trackEvent({
      event: "eec.impressions",
      eecEventName: "Impression Views",
      ecommerce: {
        impressions: products.map((product, index) => createProductData(product, { position: index }))
      },
    });
  }
  // todo featured carousel impression
})
