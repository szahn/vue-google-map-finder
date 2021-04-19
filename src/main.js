import Vue from 'vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vuex from 'vuex'
Vue.use(Vuex)
import storeFactory from './stores/store'

import VAnimateCss from 'v-animate-css';
Vue.use(VAnimateCss);

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars);

Vue.component('font-awesome-icon', FontAwesomeIcon)

import * as VueGoogleMaps from 'gmap-vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: Options.GoogleApiKey,
    libraries: 'places,drawing,visualization'
  },
  installComponents: true
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

import Options from './options'
import router from './router'

import App from './App.vue'

import GmapCluster from 'gmap-vue/dist/components/cluster'


document.addEventListener('DOMContentLoaded', function() {
    Vue.component('GmapCluster', GmapCluster);

    new Vue({
      router,
      render: h => h(App),
      store: storeFactory
    }).$mount('#app-vueport');
    

});

