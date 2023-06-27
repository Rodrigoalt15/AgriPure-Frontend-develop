import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';

import './assets/main.css'
import "primevue/resources/themes/lara-light-indigo/theme.css"; 
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import ToastService from "primevue/toastservice";

import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const app = createApp(App);
// Toast Service
app.use(ToastService);

app.use(router);
app.use(PrimeVue);
app.component('pv-card', Card);
app.component('pv-button', Button);
app.component('pv-inputText', InputText);
app.component('pv-dialog', Dialog);
app.component('pv-data-table', DataTable);
app.component('pv-column', Column);
app.mount('#app')
