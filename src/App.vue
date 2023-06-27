<script>
import { defineComponent } from 'vue';
import PlansComponent from './auth/components/plans.conponent.vue'

export default defineComponent({
  components: [PlansComponent],
});
</script>

<template>
  <RouterView></RouterView>
  <!-- <plans-component></plans-component> -->
</template>
