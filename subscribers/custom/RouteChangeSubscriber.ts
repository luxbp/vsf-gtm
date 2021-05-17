import * as types from '@vue-storefront/core/modules/order/store/mutation-types';
import Vue from 'vue';

declare const dataLayer;

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  let keys = ['name', 'path', 'fullPath', 'query', 'params', 'meta'];
  let pick = (obj, keys) => {
    return keys.map(k => k in obj ? { [k]: obj[k] } : {})
      .reduce((res, o) => Object.assign(res, o), {});
  };

  if (type.endsWith('route/ROUTE_CHANGED')) {
    let route = mutation.payload;
    Vue.prototype.$gtm.trackEvent({
      event: 'virtualPageView',
      currentVirtualPage: route.to.name,
      page: {
        to: pick(route.to, keys),
        from: pick(route.from, keys)
      }
    });
  }
});
