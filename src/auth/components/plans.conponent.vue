<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'plans-component',
});
</script>

<template>
  <div class="bg-container">
    <div class="main-container">
      <h1 class="typography">Choose a plan to get started</h1>
      <div class="cards-container">
        <pv-card class="mini-card typography">
          <template #header>
            <div class="header">
              <span>FREE</span>
              <span class="price">$0</span>
            </div>
          </template>
          <template #content>
              <p>In the free plan, you will access the following benefits:</p>
            <ul>
              <li>Administration of up to 10 plants.</li>
              <li>Creation of three plots</li>
              <li>Generation of dates of fumigation and fertilization of plants</li>
              <li>Visualization of the vegetation index</li>
            </ul>
            <div class="btn-container">
              <RouterLink to="/login">
              <pv-button severity="success" color="basic">Acquire</pv-button>
              </RouterLink>
            </div>
          </template>
        </pv-card>
        <pv-card class="mini-card typography">
          <template #header>
            <div class="header">
              <span>PREMIUM</span>
              <span class="price">$5</span>
            </div>
          </template>
          <template #content>
            <p>In the premium plan, you will access the following benefits:</p>
            <ul>
              <li>Everything we already offered in the free plan</li>
              <li>Unlimited plant management</li>
              <li>Creation of unlimited plots</li>
              <li>Weather forecast</li>
            </ul>
            <div class="btn-container">
              <RouterLink to="/login">
            <pv-button severity="success" color="basic">Acquire</pv-button>
              </RouterLink>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background-color: rgb(44, 43, 43);
}

.main-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.cards-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.cards-container > * + * {
  margin-left: 1rem;
}

.mini-card {
  max-width: 24rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 1rem;
  background-color: rgb(63, 63, 63);
  color:white;
}

.p-card .p-card-body {
  padding: 0;
}

.btn-container {
  margin-top: auto;
}

.btn-container button {
  background: rgb(47, 153, 47);
  width: 100%;
  margin-top: 1rem;
}

.typography {
  font-family: 'Montserrat', sans-serif;
  color: white;
  line-height: 100%;
}

.typography p {
  text-align: center;
  font-size: 1rem;
  line-height: 100%;
}

.typography li {
  font-size: 1rem;
  margin: 1.2rem 0;
}

h1 {
  text-align: center;
  font-size: 3rem;
  margin: 3rem 2rem;
  font-style: italic;
}

.header {
  display: flex;
  justify-content: center;
}

.header span {
  text-align: center;
  font-size: 2.5rem;
  padding: 1rem 0;
}

.header .price {
  font-size: 3rem;
  margin: 1.2rem 0;
}

@media (max-width: 599.98px) {
  h1 {
    font-size: 2.5rem;
  }

  .cards-container {
    align-items: center;
    flex-direction: column;
  }

  .cards-container > * + * {
    margin-left: 0;
    margin-top: 1rem;
  }
}

</style>
