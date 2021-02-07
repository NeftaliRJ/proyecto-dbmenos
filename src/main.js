import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/reset.css';

import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.filter('str_limit', function (value, size) {
  if (!value) return '';
  value = value.toString();

  if (value.length <= size) {
    return value;
  }
  return value.substr(0, size) + '...';
});

Vue.filter('get_participants', function (array) {
  let validItem = 0;
  const regexUUID = '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$';
  
  array.forEach(item => {
    let stringArray = item.split('/');
    if(new RegExp(regexUUID).test(stringArray[stringArray.length -1])){
      validItem++;
    }
  });
  return validItem;
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
