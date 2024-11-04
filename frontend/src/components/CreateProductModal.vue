<template>
    <div class="backdrop">
        <v-form @submit.prevent="submit">
            <v-container class="container">
                <v-row><v-text-field v-model="product.Name" label="Product navn"></v-text-field></v-row>
                <v-row><v-text-field v-model="product.ProductNumber" label="Varekode"></v-text-field></v-row>
                <v-row>
                    <v-text-field v-model="product.Quantity" type="number" label="Mængde"> </v-text-field>
                    <v-select v-model="product.Unit" :items="unit" item-title="name" item-value="key" label="Enhed">
                    </v-select>
                </v-row>
                <v-row><v-text-field v-model="product.AccountNumber" type="number" label="Konto"></v-text-field></v-row>
                <v-row><v-text-field v-model="product.BaseAmountValue" type="number"
                        label="Enhedspris"></v-text-field></v-row>
                <v-row><v-text-field v-model="product.BaseAmountValueInclVat" type="number"
                        label="Enhedpris ink. moms"></v-text-field></v-row>
                <v-row><v-text-field v-model="product.TotalAmount" type="number"
                        label="Total pris"></v-text-field></v-row>
                <v-row><v-text-field v-model="product.TotalAmountInclVat" type="number"
                        label="Total pris ink. moms"></v-text-field></v-row>
                <v-row><v-text-field v-model="product.ExternalReference"
                        label="Kommentar til produkt"></v-text-field></v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-btn type="submit" color="primary" block>Tilføj Product</v-btn>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-btn color="secondary" block @click="cancel">Annuler</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script lang="ts">
import { reactive, watch } from 'vue'
import { Product, createEmptyProduct, availableUnits } from '@/types/product';

export default {
    emits: ['cancel', 'submitProduct'],
    setup(props, { emit }) {
        const product = reactive<Product>(createEmptyProduct())
        const unit = availableUnits()
        const submit = () => { emit('submitProduct', product) }

        const cancel = () => { emit('cancel') }

        watch(() => product.BaseAmountValue, (newBaseAmount) => {
            product.BaseAmountValueInclVat = newBaseAmount * 1.25
            product.TotalAmount = newBaseAmount * product.Quantity
        })

        watch(() => product.Quantity, (newQuantity) =>
            product.TotalAmount = newQuantity * product.BaseAmountValue
        )

        watch(() => product.TotalAmount, (newTotalAmount) => product.TotalAmountInclVat = newTotalAmount * 1.25)


        return {
            product,
            unit,
            submit,
            cancel
        }
    }
}

</script>

<style>
.container {
    background-color: white;
    border-radius: 5px;
}

.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}
</style>