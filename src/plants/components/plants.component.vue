<template>
  <div class="plants-view">
    <div v-if="currentView === 'plants-list'">
      <div class="header-container">
        <h2 style="color: white">Good morning User</h2>
        <span class="p-input-icon-right">
          <i class="pi pi-search" :style="iconStyle" />
          <PvInputText
            v-model="value1"
            type="text"
            placeholder="Search for plants"
            :style="inputStyle"
            class="custom-input"
          />
          <button class="search-btn" @click="showSearch">Search</button>
        </span>
      </div>
      <h2 style="display: flex; color: white; margin-left: 5%">Your plants:</h2>
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
    <div v-else-if="currentView === 'search-plants'">
      <search-plants-component
        :plants="plants"
        @returnToPlantsList="currentView = 'plants-list'"
      />
    </div>
    <div v-else>
      <plants-details-component
        ref="detailsComponent"
        :plantData="plantDetails"
        @backButtonClick="currentView = 'plants-list'"
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
.search-btn {
  margin-left: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #45a049;
}
</style>

<script>
import InputText from "primevue/inputtext";
import plantsCardComponent from "@/plants/components/plants-card.component.vue";
import "primeicons/primeicons.css";
import authApiService from "@/auth/services/auth-api.service";
import { PlantsApiService } from "@/plants/services/plants-api.service";
const plantsApiService = new PlantsApiService();
import PlantsDetailsComponent from "@/plants/components/plants-details.component.vue";
import SearchPlantsComponent from "@/plants/components/search-plants.component.vue";

export default {
  components: {
    plantsCardComponent,
    PvInputText: InputText,
    PlantsDetailsComponent,
    SearchPlantsComponent,
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
  methods: {
    getCurrentUserId() {
      const response = JSON.parse(localStorage.getItem("userData"));
      return response.id;
    },
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
    showSearch() {
      this.currentView = "search-plants";
    },
    async fetchPlantDetails(plantId) {
      try {
        const response = await plantsApiService.getById(plantId);
        this.plantDetails = response.data;
      } catch (error) {
        console.error("Error al obtener detalles de la planta:", error);
      }
    },
  },
  async created() {
    const response = await authApiService.getSavedPlantsByUserId(
      this.getCurrentUserId()
    );
    this.plants = response.data;
    this.groupedPlants = this.chunkArray(this.plants, 3);
  },
};
</script>
