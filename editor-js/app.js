// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';

import App from './App.vue';

import './css/base.css';
import './css/container.css';
import './css/editor.css';
import './css/inputs.css';
import './styles.scss';

Vue.use(VueResource);

Vue.component(App.name, App);

import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import lang_en from './translations/messages.en.json';

const messages = {
    'en': lang_en,
};

const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
});


// Start the application
new Vue({
    el: '#app',
    i18n,
});
