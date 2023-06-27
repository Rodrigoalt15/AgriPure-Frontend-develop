<template>
  <pv-card class="card-container">
    <template #header>
      <div class="image-container">
        <img :src="plantData.image" alt="Plant Image" />
      </div>
    </template>
    <template #title>{{ plantData.name }}</template>
    <template #content>
      <PvButton
        label="Details"
        rounded
        style="width: 90%; background-color: #cf8509; border-color: transparent"
        @click="onDetailsButtonClick"
      />
    </template>
  </pv-card>
</template>

<style>
.image-container {
  display: flex;
  justify-content: center;
  max-width: 280px;
  padding: 10px 5%;
}

.card-container {
  filter: drop-shadow(13px 12px 7px rgba(0, 0, 0, 0.25));
  background-color: #148414;
  max-width: 300px;
  text-align: center;
}

.image-container img {
  width: 100%;
  max-width: 270px;
  max-height: 200px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  background-color: #148414;
}

.p-card * {
  box-sizing: border-box;
  color: #fff;
}

.card-container.p-card {
  background-color: #242424 !important;
}

.card-container .p-card-body {
  background-color: #148414;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.card-container .p-card-header {
  background-color: #148414;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
</style>

<script>
import Card from "primevue/card";
import Button from "primevue/button";
import { useRouter } from "vue-router";

export default {
  props: {
    plantData: {
      type: Object,
      required: true,
    },
  },
  components: {
    PvCard: Card,
    PvButton: Button,
    PVImage: Image,
  },
  setup(props, context) {
    const router = useRouter();

    return {};
  },
  methods: {
    onDetailsButtonClick() {
      this.$emit("detailsButtonClick", this.plantData.id);
    },
  },
};
</script>
