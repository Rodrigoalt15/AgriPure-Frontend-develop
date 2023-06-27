<script>
import { PlotsApiService } from '../services/plots-api.service';
export default {
    data() {
        return {
            plots: [],
            plot: {},
            plotsApi: null,
            deletePlotDialog: false,
            deletePlotsDialog: false,
            editPlotDialog: false,
            submitted: false,
            //filters: {}
        };
    },
    async created() {
        this.plotsApi = new PlotsApiService();
        const response = await this.plotsApi.getAll();
        this.plots = response.data
        console.log(this.plots)
        //this.initFilters();

    },
    methods: {
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            };
        },
        editPlot(plot) {
            console.log(plot);
            this.plot = { ...plot };
            console.log(this.plot);
            this.editPlotDialog = true;
        },
        confirmDeletePlot(plot) {
            this.plot = plot;
            this.deletePlotDialog = true;
        },
        deletePlot() {
            this.plotsApi.delete(this.plot.id).then((response) => {
                this.plots = this.plots.filter(
                    (t) => t.id !== this.plot.id
                );
                this.deletePlotDialog = false;
                this.Plot = {};
                //this.$toast.add({
                //    severity: "success",
                //    summary: "Successful",
                //    detail: "Tutorial Deleted",
                //    life: 3000,
                //});
                console.log(response);
            });
        },
        hideDialog() {
            this.editPlotDialog = false;
            this.submitted = false;
        },
        getStorablePlot(displayablePlot) {
            return {
                quantity: displayablePlot.quantity,
                name: displayablePlot.name,
                area: displayablePlot.area,
                detail: displayablePlot.detail,
                id: displayablePlot.id
            };
        },
        findIndexById(id) {
            console.log(`current id: ${id}`);
            return this.plots.findIndex((plot) => plot.id === id);
        },
        savePlot() {
            this.submitted = true;
            if (this.plot.name.trim()) {
                if (this.plot.id) {
                    console.log(this.plot);
                    this.plot = this.getStorablePlot(this.plot);
                    this.plotsApi
                        .update(this.plot.id, this.plot)
                        .then((response) => {
                            console.log(response.data.id);
                            this.plots[this.findIndexById(response.data.id)] = this.getDisplayablePlot(response.data);
                            //this.$toast.add({
                            //    severity: "success",
                            //    summary: "Successful",
                            //    detail: `Tutorial Updated`,
                            //    life: 3000,
                            //});
                            console.log(response);
                        });
                } else {
                    this.plot.id = 0;
                    console.log(this.plot);
                    this.plot = this.getStorablePlot(this.plot);
                    this.plotsApi
                        .create(this.plot)
                        .then((response) => {
                            this.plot = this.getDisplayablePlot(response.data);
                            this.plots.push(this.plot);
                            //this.$toast.add({
                            //    severity: "success",
                            //    summary: "Successful",
                            //    detail: "Tutorial Created",
                            //    life: 3000,
                            //});
                            console.log(response);
                        });
                }
                this.editPlotDialog = false;
                this.plot = {};
            }
        }

    }

};
</script>

<template>
    <pv-data-table ref="dt" :value="plots" dataKey="id" :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tutorials"
        responsiveLayout="scroll">
        <template #header>
            <div class="table-header flex flex-column md:flex-row md:justify-content-between">
                <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Manage Plots</h5>
            </div>
        </template>

        <pv-column selectionMode="multiple" style="width: 3rem" :exportable="false"></pv-column>
        <pv-column field="id" header="Id" :sortable="true" style="min-width: 12rem"></pv-column>
        <pv-column field="name" header="Name" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="area" header="Area" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="quantity" header="Quantity" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="detail" header="Detail" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
                <pv-button icon="pi pi-pencil" class="p-button-text p-button-rounded" @click="editPlot(slotProps.data)" />
                <pv-button icon="pi pi-trash" class="p-button-text p-button-rounded"
                    @click="confirmDeletePlot(slotProps.data)" />
            </template>
        </pv-column>
    </pv-data-table>

    <pv-dialog v-model:visible="deletePlotDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="plot">
                Are you sure you want to delete <b></b>?
            </span>
        </div>
        <template #footer>
            <pv-button :label="'No'.toUpperCase()" icon="pi pi-times" class="p-button-text"
                @click="deletePlotDialog = false" />
            <pv-button :label="'Yes'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="deletePlot" />
        </template>
    </pv-dialog>


    <pv-dialog v-model:visible="editPlotDialog" :style="{ width: '450px' }" header="Plot Information" :modal="true"
        class="p-fluid">
        <div class="field mt-3">
            <span class="p-float-label">
                <pv-inputText type="text" id="name" v-model.trim="plot.name" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !plot.name }" />
                <label for="name">Name</label>
                <small class="p-error" v-if="submitted && !plot.name">
                    Name is required.
                </small>
            </span>
        </div>
        <div class="field ">
            <span class="p-float-label">
                <pv-inputText type="text" id="area" v-model.trim="plot.area" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !plot.area }" />
                <label for="area">Area</label>
                <small class="p-error" v-if="submitted && !plot.area">
                    area is required.
                </small>
            </span>
        </div>
        <div class="field ">
            <span class="p-float-label">
                <pv-inputText type="text" id="detail" v-model.trim="plot.detail" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !plot.detail }" />
                <label for="detail">Detail</label>
                <small class="p-error" v-if="submitted && !plot.detail">
                    Detail is required.
                </small>
            </span>
        </div>
        <div class="field ">
            <span class="p-float-label">
                <pv-inputText type="text" id="quantity" v-model.trim="plot.quantity" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !plot.quantity }" />
                <label for="quantity">Quantity</label>
                <small class="p-error" v-if="submitted && !plot.quantity">
                    Quantity is required.
                </small>
            </span>
        </div>

        <template #footer>
            <pv-button :label="'Cancel'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
            <pv-button :label="'Save'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="savePlot" />
        </template>
    </pv-dialog>
</template>

<style scoped>
.fontBlack {
    color: black;
}

.w-25 {
    max-width: 25%;
}

.h-75 {
    max-height: 75%;
}
</style>

<!--
    <pv-data-table ref="dt" :value="plots" v-model:selection="selectedTutorials" dataKey="id" :paginator="true"
        :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tutorials"
        responsiveLayout="scroll">
        <template #header>
            <div class="table-header flex flex-column md:flex-row md:justify-content-between">
                <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Manage Tutorials</h5>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <pv-inputText v-model="filters['global'].value" placeholder="Buscar" />
                </span>
            </div>
        </template>

        <pv-column selectionMode="multiple" style="width: 3rem" :exportable="false"></pv-column>
        <pv-column field="id" header="Id" :sortable="true" style="min-width: 12rem"></pv-column>
        <pv-column field="name" header="Name" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="area" header="Area" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="quantity" header="Quantity" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="detail" header="Detail" :sortable="true" style="min-width: 16rem"></pv-column>   
        <pv-column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
                <pv-button icon="pi pi-pencil" class="p-button-text p-button-rounded"
                    @click="editTutorial(slotProps.data)" />
                <pv-button icon="pi pi-trash" class="p-button-text p-button-rounded"
                    @click="confirmDeleteTutorial(slotProps.data)" />
            </template>
        </pv-column>
    </pv-data-table>
-->
<!--
    <div class="grid">
        <Card class="col-4 mx-4 my-3" v-for=" (i, index) in arr " :key="index" style="width: 25em">
            <template #title > Advanced Card </template>
            <template #subtitle> Card subtitle </template>
            <template #content>
                <label class="fontBlack" for="Quantity">Quantity: </label>
                <input readonly id="Quantity" type="text" :value="quantity" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-25">
                <Button icon="pi pi-plus" @click="increment_quantity" class="mx-2 h-75" />
                <Button icon="pi pi-minus" @click="decrement_quantity" class="mx-auto" severity="danger" />
                <div class="text-center pt-2">
                    <label class="fontBlack" for="Quantity">Quantity: </label>
                    <input readonly id="Quantity" type="text" :value="quantity" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-50">
                    <label class="fontBlack" for="Quantity">Quantity: </label>
                    <input readonly id="Quantity" type="text" :value="quantity" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-50">
                    <label class="fontBlack" for="Quantity">Quantity: </label>
                    <input readonly id="Quantity" type="text" :value="quantity" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-50">
                    <InputText class="mt-3" placeholder="Name:" v-model="name" id="name"></InputText>
                    <InputText class="mt-3" placeholder="Area:" v-model="area" id="area"></InputText>
                    <InputText class="mt-3 b" placeholder="Detail:" v-model="detail" id="detail"></InputText>

                </div>
            </template>
            <template class="text-center" #footer>
                <Button icon="pi pi-check" label="Save" />
                <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" />
            </template>
        </Card>
    </div>
-->