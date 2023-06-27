<script>
import plantsComponent from "@/plants/components/plants.component.vue";
import toolbarComponent from "@/Toolbar/components/toolbar.component.vue";
export default {
    components: {
        toolbarComponent,
    },
    data() {
        return {}
    },
};
</script>

<template>
    <main>
        <span>Home</span>
        <RouterLink to="/login">
            Login
        </RouterLink>
        <toolbarComponent></toolbarComponent>
    </main>
</template>
