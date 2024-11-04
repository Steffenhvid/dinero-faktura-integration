<!-- src/components/ExternalData.vue -->
<template>
    <div>
        <h1>External Data</h1>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <pre v-else>{{ data }}</pre>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import api from '@/services/api';

export default defineComponent({
    name: 'ExternalData',
    setup() {
        const data = ref(null);
        const loading = ref(true);
        const error = ref<string | null>(null);

        const fetchData = async () => {
            try {
                const response = await api.get('/external-data');
                data.value = response.data.Collection;
            } catch (err: any) {
                error.value = err.response?.data?.error || 'An error occurred';
            } finally {
                loading.value = false;
            }
        };

        onMounted(() => {
            fetchData();
        });

        return {
            data,
            loading,
            error,
        };
    },
});
</script>

<style scoped>
/* Add your styles here */
</style>