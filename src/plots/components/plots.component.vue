<script setup>
import { ref } from 'vue';
import { PlotsApiService } from '../services/plots-api.service';

import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';


const plotsService = new PlotsApiService();
const visible = ref(false);
let quantity = ref(0)

function increment_quantity() {
  quantity.value++;
}
function decrement_quantity() {
  if (quantity.value > 0) {
    quantity.value--;
  }
}

const loading = ref(false);
let area = ref('');
let name = ref('');
let detail = ref('');

const load = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    visible.value = false;
    console.log(quantity.value, name.value, area.value, detail.value);
    plotsService.create(
      {
        quantity: quantity.value,
        name: name.value,
        area: area.value,
        detail: detail.value
      }
    )
      .then((response) => {
        console.log(response.data.id);
        //this.$toast.add({
        //  severity: "success",
        //  summary: "Successful",
        //  detail: "Plot",
        //  life: 3000,
        //});
        console.log(response);
      });
    quantity.value = ""
    name.value = ""
    area.value = ""
    detail.value = ""

  }, 1500);
};
</script>

<template>
  <div class="card text-center">
    <Toolbar class="bgBody">
      <template #start>
        <h1 class="text-white-alpha-90">My Plots:</h1>

      </template>
      <template #end>
        <Button icon="pi pi-plus" @click="visible = true" severity="success" label="Add Parcel" class="w-9rem" />
      </template>
    </Toolbar>
    <div class="card flex justify-content-center bgBody">
      <Image src="plot.png" alt="Image" width="800" />
    </div>
  </div>

  <div class="">
    <pv-dialog v-model:visible="visible" style="{ width: '650px'}" header="Cauliflower Patch" :modal="true"
      class="p-fluid ">
      <div class="card ">
        <div class="formgrid grid ">
          <div class="field col text-center bg-green">
            <img src="caulifo.png" class="imgCaulifo mt-3 col-fixed" alt="">
            <div class="col-fixed">
              <h1 for="firstname2">Cauliflower</h1>
              <Button label="Details" class="mb-4" severity="warning"></Button>

            </div>
          </div>
          <div class="field col">
            <label for="Quantity">Quantity: </label>
            <input readonly id="Quantity" type="text" :value="quantity"
              class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
            <div class="text-center pt-2">
              <Button icon="pi pi-plus" @click="increment_quantity" class="mx-2" />
              <Button icon="pi pi-minus" @click="decrement_quantity" class="mx-auto" severity="danger" />
              <InputText class="mt-3" placeholder="Name:" v-model="name" id="name"></InputText>
              <InputText class="mt-3" placeholder="Area:" v-model="area" id="area"></InputText>
              <InputText class="mt-3 b" placeholder="Detail:" v-model="detail" id="detail"></InputText>
              <div class="card flex justify-content-center button-content my-3 mx-auto">
                <Button type="button" severity="success" label="Agregar" icon="pi pi-plus" :loading="loading"
                  @click="load" rounded="" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </pv-dialog>
  </div>
</template>

<style scoped>
.body-div {
  box-sizing: border-box;

  width: 961px;
  height: 723px;
  left: 253px;
  top: 26px;
  background: #242424;
  border-radius: 17.2222px;
}

.bg-green {
  background-color: #148414;
  border-radius: 5%;
}

.imgCaulifo {
  height: 200px;
  width: 428;
}

.button-content {
  max-width: 150px;
}

.col-fixed h1 {
  color: aliceblue;
}

.title-h1 {
  padding-left: 2rem;
  padding-top: 2rem;
  /* Backroung */
  color: #FDFDFD;
}

.bgBody {
  background-color: #242424;
}
</style>
