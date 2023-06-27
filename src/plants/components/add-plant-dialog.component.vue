<template>
    <PvDialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</PvDialog>
  </template>
  
  <script>
import InputText from "primevue/inputtext";
import { PlantsApiService } from "@/plants/services/plants-api.service";
import  Dialog  from "primevue/dialog";
const plantsApiService = new PlantsApiService();

export default {
  components: {
    PvInputText: InputText,
    PvDialog: Dialog,
  },
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      visible: false
    };
  },
  methods: {
    searchPlants() {
      this.searchResults = [
        { id: 1, name: "Plant 1" },
        { id: 2, name: "Plant 2" },
        { id: 3, name: "Plant 3" },
      ];
    },
    addPlant(plantId) {
      // Aquí emitirías el evento "plantAdded" con el ID de la planta seleccionada
      this.$emit("plantAdded", plantId);
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>

  
  <style scoped>
  .add-plant-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .dialog-content {
    background-color: white;
    padding: 20px;
  }
  
  .dialog-content h3 {
    margin-top: 0;
  }
  
  .dialog-content button {
    margin-top: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  </style>
  