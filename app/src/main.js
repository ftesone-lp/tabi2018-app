import Vue from 'vue'
import App from './App.vue'

import './styles/quasar.styl'
import 'quasar-framework/dist/quasar.ie.polyfills'
import lang from 'quasar-framework/i18n/es'
import 'quasar-extras/animate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/ionicons'
import 'quasar-extras/mdi'
import Quasar from 'quasar'

import HighchartsVue from 'highcharts-vue'

Vue.use(Quasar, {
  config: {}, i18n: lang
 })

Vue.use(HighchartsVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
