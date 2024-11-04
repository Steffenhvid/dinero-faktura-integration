<template>
    <v-container class="width-100">
        <v-row class="bg-white rounded-lg">
            <v-col cols="12" sm="7">{{ props.invoiceLine.Description }}</v-col>
            <v-col cols="12" sm="1">{{ props.invoiceLine.Quantity }}</v-col>
            <v-col cols="12" sm="1">{{ translateUnit(props.invoiceLine.Unit) }}</v-col>
            <v-col cols="12" sm="1">{{ props.invoiceLine.BaseAmountValue }}</v-col>
            <v-col cols="12" sm="1">{{ props.invoiceLine.Discount }} %</v-col>
            <v-col cols="12" sm="1">{{ props.invoiceLine.TotalAmount }}</v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { InvoiceLine } from '@/types/invoice';
import { availableUnits } from '@/types/product'

const props = defineProps<{
    invoiceLine: InvoiceLine
}>()

function translateUnit(key: string): string | undefined {
    return availableUnits().find(item => item.key = key)?.name;
}

</script>

<style scoped></style>