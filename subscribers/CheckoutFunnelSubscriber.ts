import Vue from 'vue'
import createProductData from '../helper/createProductData';
import rootStore from '@vue-storefront/core/store'

/**
 * Order Placed
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith('route/ROUTE_CHANGED')) {
    const data = mutation.payload.to;

    if (data.name !== 'checkout') return;

    let cart = rootStore.state.cart
    let totals = (cart.platformTotals || {})

    if (data.hash.length === 0) {
      setTimeout(() => {
        Vue.prototype.$gtm.trackEvent({
          event: "eec.checkout",
          eecEventName: "Checkout 1",
          ecommerce: {
            checkout: {
              actionField: {
                step: "1", // 1 // The checkout step (starting at 1).
                // option: "{{checkout.payment_method}}", // Visa // extra metadata (e.g. shipping or payment method)
              },
              products: Object.assign([], cart.cartItems).map((product, index) => createProductData(product, {position: index})),
            },
          },
        })
      }, 2000)
    }

    if(data.hash === '#shippingMethod') {
      Vue.prototype.$gtm.trackEvent({
        event: "eec.checkout",
        eecEventName: "Checkout 2",
        ecommerce: {
          checkout: {
            actionField: {
              step: "2", // 1 // The checkout step (starting at 1).
            },
            products: Object.assign([], cart.cartItems).map((product, index) => createProductData(product, {position: index})),
          },
        },
      })
    }

    // when on payment submit shipping selection
    if (data.hash === '#payment') {
      Vue.prototype.$gtm.trackEvent({
        event: "eec.checkout",
        eecEventName: "Checkout 3",
        ecommerce: {
          checkout: {
            actionField: {
              step: "3", // 1 // The checkout step (starting at 1).
              // option: "{{checkout.shipping}}", // @todo set shipping method
            },
            products: Object.assign([], cart.cartItems).map((product, index) => createProductData(product, {position: index})),
          },
        },
      })
    }

    // when on order review submit payment info
    if (data.hash === '#orderReview') {
      Vue.prototype.$gtm.trackEvent({
        event: "eec.checkout",
        eecEventName: "Checkout 4",
        ecommerce: {
          checkout: {
            actionField: {
              step: "4", // 1 // The checkout step (starting at 1).
              // option: "{{checkout.payment_method}}", //@todo set payment method
            },
            products: Object.assign([], cart.cartItems).map((product, index) => createProductData(product, {position: index})),
          },
        },
      })
    }
  }
})
