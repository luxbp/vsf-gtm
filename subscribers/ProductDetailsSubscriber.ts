import createProductData from '../helper/createProductData';
import rootStore from '@vue-storefront/core/store'
import { KEY } from '../index';
import Vue from 'vue';

declare const dataLayer;

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith('recently-viewed/recently-viewed/ADD')) {
    Vue.prototype.$gtm.trackEvent({
      event: "eec.detail",
      eecEventName: "Product Detail View",
      ecommerce: {
        detail: {
          actionField: {
            list: state.source, // 'fall collection' // This should be empty if the page is just a single product detail page and not a list like search results or collections
          },
          products: [createProductData(mutation.payload.product, {
            source: rootStore.state[KEY].source || null
          })]
        },
      },
    })
  }
})
