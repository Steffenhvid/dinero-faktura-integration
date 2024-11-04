<template>
    <div class="product-component">
        <v-card v-if="product" @click="toggleDetails" :class="{ expanded: showDetails }" elevation="2"
            class="mb-2 full-width-card">
            <div class="card-content">
                <v-card-text class="pa-4">
                    <v-row no-gutters align="center">
                        <v-col cols="12" sm="2" class="text-subtitle-1 font-weight-medium">
                            {{ product.Name || 'No Name' }}
                        </v-col>
                        <v-col cols="12" sm="7" class="text-body-2">
                            Ref: {{ product.ExternalReference || 'N/A' }}
                        </v-col>
                        <v-col cols="12" sm="2" class="text-sm-right text-body-2">
                            Amount: {{ formatNumber(product.BaseAmountValue) }}
                        </v-col>
                        <v-col cols="12" sm="1" class="text-sm-right text-body-2">
                            <v-icon icon="mdi-information"></v-icon>
                        </v-col>
                    </v-row>
                </v-card-text>

                <div class="details-container" :style="{ maxHeight: detailsHeight }">
                    <v-divider></v-divider>
                    <v-card-text class="pa-4">
                        <v-row dense cols="12" sm="6" md="4">
                            <v-col v-for="(value, key) in detailedProduct" :key="key" cols="12" sm="6" md="4">
                                <div class="text-caption font-weight-medium">{{ formatLabel(key) }}:</div>
                                <div>{{ formatValue(key, value) }}</div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </div>
            </div>
        </v-card>
        <v-alert v-else type="warning" class="mb-2">No product data available.</v-alert>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import { Product } from '@/types/product';

export default defineComponent({
    name: 'ProductComponent',
    props: {
        product: {
            type: Object as PropType<Product>,
            required: true
        }
    },
    setup(props) {
        const showDetails = ref(false);
        const detailsHeight = computed(() => showDetails.value ? '1000px' : '0px');

        const detailedProduct = computed(() => {
            if (!props.product) return {};
            const { Name, ExternalReference, BaseAmountValue, ProductGuid, ...details } = props.product;
            return details;
        });

        const toggleDetails = () => {
            showDetails.value = !showDetails.value;
        };

        const formatNumber = (value: number): string => {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(value);
        };

        const formatLabel = (key: string): string => {
            return key.replace(/([A-Z])/g, ' $1').trim();
        };

        const formatValue = (key: string, value: any): string => {
            if (value === null || value === undefined) return 'N/A';
            if (typeof value === 'number') {
                return formatNumber(value);
            }
            return value.toString();
        };

        return {
            showDetails,
            detailsHeight,
            detailedProduct,
            toggleDetails,
            formatNumber,
            formatLabel,
            formatValue
        };
    }
});
</script>

<style scoped>
.v-card {
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.v-card:hover {
    background-color: #f5f5f5;
}

.v-card.expanded {
    background-color: #e0e0e0;
}

.v-col {
    padding: 0 12px;
}
</style>