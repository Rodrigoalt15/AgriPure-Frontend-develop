<template>
    <div class="toolbar-container">
        <div class="toolbar">
            <div class="logo-container">
                <img class="logo" src="src/assets/logo.png" alt="logo" />
                <br>
                <p>AgriPure</p>
            </div>
            <button @click="selectedTab = 'plants'" :class="selectedTab === 'plants' ? 'selected' : ''">Plants</button>
            <button @click="selectedTab = 'calendar'" :class="selectedTab === 'calendar' ? 'selected' : ''">Calendar</button>
            <button @click="selectedTab = 'plots'" :class="selectedTab === 'plots' ? 'selected' : ''">Plots</button>
            <button @click="selectedTab = 'plotsView'" :class="selectedTab === 'plotsView' ? 'selected' : ''">Plots Manage</button>
            <button @click="selectedTab = 'forecast'" :class="selectedTab === 'forecast' ? 'selected' : ''">Forecast</button>
            <button @click="selectedTab = 'professional'"  :class="selectedTab === 'professional' ? 'selected' : ''">Professional</button>
        </div>
        <div class="view-container">
            <component :is="selectedTab + '-component'" />
        </div>
    </div>
</template>

<script>
import PlantsComponent from "@/plants/components/plants.component.vue";
import ProfessionalComponent from "@/professional/components/professional.component.vue";
import PlotsComponent from "@/plots/components/plots.component.vue";
import PlotsViewComponent from "@/plots/components/plotsView.component.vue";
export default {
    name: "toolbar.component",
    components: {
        'plants-component': PlantsComponent,
        'professional-component': ProfessionalComponent,
        'plots-component': PlotsComponent,
        'plotsView-component': PlotsViewComponent,
    },
    data() {
        return {
            selectedTab: "plants",
        };
    },
    methods: {
    
    },
};
</script>

<style>
.toolbar-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-left:20px;
}

.toolbar {
    display: flex;
    flex-direction: column;
    width: 10%;
    padding: 20px 0;
    background-color: #242424;
    border-radius: 20px;
    justify-content: flex-start;
    align-items: center;
}

.toolbar button {
    padding: 10px 15px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    color: white;
    margin-right: 10px;
}

.toolbar button.selected {
    background-color: #ccc;
}
.view-container {
    flex: 1;
    padding-left: 20px;    
}


.logo-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.logo-container p {
    margin: 0;
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
}
</style>
