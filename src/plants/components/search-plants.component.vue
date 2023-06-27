<template>
  <div class="plants-view">
    <div v-if="currentView === 'plants-list'">
      <div class="header-container">
        <h2 style="color: white">Search for plants</h2>
        <span class="p-input-icon-right">
          <i class="pi pi-search" :style="iconStyle" />
          <PvInputText
            v-model="value1"
            type="text"
            placeholder="Search for plants"
            :style="inputStyle"
            class="custom-input"
          />
        </span>
      </div>
      <h2 style="display: flex; color: white; margin-left: 5%">All plants:</h2>
      <div class="cards-container">
        <div
          class="row"
          v-for="(row, rowIndex) in groupedPlants"
          :key="'row-' + rowIndex"
        >
          <plants-card-component
            v-for="plant in row"
            :key="plant.id"
            :plantData="plant"
            @detailsButtonClick="showDetails"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <plants-details-component
        ref="detailsComponent"
        :plantData="plantDetails"
        @backButtonClick="currentView = 'plants-list'"
      />
    </div>
    <div class="button-container">
      <PvButton
        severity="help"
        label=" Return to Your Plants"
        @click="returnToYourPlants"
        style="align-items: center !important"
      />
    </div>
  </div>
</template>

<style>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 5%;
  padding-bottom: 20px;
  border-bottom: 1px solid #373737;
}

.plants-view {
  padding: 20px 0;
  max-width: 70%;
  border-radius: 20px;
  background-color: #242424;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 50px 50px 50px;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.custom-input {
  width: 400px;
  border-radius: 20px !important;
  height: 40px;
}
.p-input-icon-left,
.p-input-icon-right {
  position: relative;
  display: inline-block;
  margin: auto;
}
.button-container {
  display: flex;
  justify-content: center;
}
</style>

<script>
import InputText from "primevue/inputtext";
import plantsCardComponent from "@/plants/components/plants-card.component.vue";
import "primeicons/primeicons.css";
import { PlantsApiService } from "@/plants/services/plants-api.service";
const plantsApiService = new PlantsApiService();
import PlantsDetailsComponent from "@/plants/components/plants-details.component.vue";
import Button from "primevue/button";

export default {
  name: "search-plants-component",
  components: {
    plantsCardComponent,
    PvInputText: InputText,
    PlantsDetailsComponent,
    PvButton: Button,
  },
  data() {
    return {
      iconStyle: {
        color: "white",
      },
      inputStyle: {
        backgroundColor: "#373737",
      },
      currentView: "plants-list",
      groupedPlants: [],
      plantDetails: {},
    };
  },
  async created() {
    const response = await plantsApiService.getAll();
    this.plants = response.data;
    this.groupedPlants = this.chunkArray(this.plants, 3);
  },
  methods: {
    chunkArray(array, chunkSize) {
      const result = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
      }
      return result;
    },
    showDetails(plantId) {
      this.currentView = "plants-details";
      this.fetchPlantDetails(plantId);
    },
    async fetchPlantDetails(plantId) {
      try {
        const response = await plantsApiService.getById(plantId);
        this.plantDetails = response.data;
      } catch (error) {
        console.error("Error al obtener detalles de la planta:", error);
      }
    },
    returnToYourPlants() {
      this.$emit("returnToPlantsList");
    },
  },
};
</script>
