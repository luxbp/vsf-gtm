import createProductData from '../helper/createProductData';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import Vue from 'vue';
import { ORDER_LAST_ORDER_WITH_CONFIRMATION } from '@vue-storefront/core/modules/order/store/mutation-types'
import createAffiliation from '../helper/createAffiliation'

/**
 * Order Placed
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const payload = mutation.payload;

  if (type.endsWith(ORDER_LAST_ORDER_WITH_CONFIRMATION)) {
    const cartHistory = Object.assign({}, state.cart);
    const orderId = payload.confirmation.backendOrderId;
    const products = payload.order.products.map((product, index) => createProductData(product, { position: index }));
    const currency = currentStoreView().i18n.currencyCode;
    store.dispatch(
      'user/getOrdersHistory',
      { refresh: true, useCache: false }
    ).then(() => {
      const orderHistory = state.user.orders_history;

      // in the event this is empty, tag manager should pull order and tax from CartStateSubscriber
      if (!orderHistory && cartHistory.platformTotals) {
        Vue.prototype.$gtm.trackEvent({
          event: "eec.purchase",
          eecEventName: "Purchase",
          ecommerce: {
            currencyCode: currency || 'USD',
            purchase: {
              actionField: {
                id: payload.confirmation.orderNumber || orderId,
                affiliation: createAffiliation(products) || payload.order.affiliation || currentStoreView().storeCode,
                revenue: cartHistory.platformTotals.subtotal - Math.abs((cartHistory.platformTotals.base_discount_amount || 0)),
                tax: cartHistory.platformTotals.tax_amount,
                shipping: cartHistory.platformTotals.shipping_amount,
                coupon: cartHistory.platformTotals.coupon_code
              },
              products,
            },
          },
        });
        return;
      }

      const order = orderHistory.items.find((order) => (order['entity_id'] || '').toString() === orderId);
      if (order) {
        Vue.prototype.$gtm.trackEvent({
          event: "eec.purchase",
          eecEventName: "Purchase",
          ecommerce: {
            currencyCode: currency || 'USD',
            purchase: {
              actionField: {
                id: payload.confirmation.orderNumber || orderId,
                affiliation: createAffiliation(products) || payload.order.affiliation || currentStoreView().storeCode || order.store_name,
                revenue: order.subtotal - Math.abs((order.base_discount_amount || 0)),
                tax: order.tax_amount,
                shipping: order.shipping_amount,
                coupon: order.coupon_code,
              },
              products,
            },
          },
        });
      }
    })
  }
})
