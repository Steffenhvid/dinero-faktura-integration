<template>
    <div v-if="editingProduct">
        <CreateProductModal @cancel="editingProduct = false" @submitProduct="handleCreateProduct"
            style="padding-top: 100px;" />
    </div>
    <v-container v-else>
        <v-row>
            <v-btn @click="openProductModal">Tilføj et nyt produkt</v-btn>
        </v-row>
        <v-row>
            <v-list style="width: 100%;">
                <v-list-item v-for="product in products">
                    <ProductComponent :product="product" />
                </v-list-item>
            </v-list>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Product } from '@/types/product';
import ProductComponent from '@/components/ProductComponent.vue';
import CreateProductModal from '@/components/CreateProductModal.vue';
import { fetchProducts, createProduct } from '@/services/productService';


const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const editingProduct = ref(false);

const loadProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
        products.value = await fetchProducts();
    } catch (err: any) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

const openProductModal = () => {
    editingProduct.value = !editingProduct.value;
};

const handleCreateProduct = async (product: Product) => {
    editingProduct.value = false;
    error.value = null;
    try {
        await createProduct(product);
        products.value.push(product);
    } catch (err: any) {
        error.value = err.message;
    }
};

onMounted(() => {
    loadProducts();
});

</script>

<style scoped></style>