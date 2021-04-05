import Vue from 'vue';
import sweetalert2 from 'vue-sweetalert2';
import VueTheMask from 'vue-the-mask';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false;
Vue.use(sweetalert2, VueTheMask);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
