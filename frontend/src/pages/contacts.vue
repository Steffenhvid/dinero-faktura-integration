<template>
    <v-container>
        <v-data-table :headers="headers" :items="contacts" :loading="loading" :error="error" class="elevation-1">
            <template v-slot:item.name="{ item }">
                <v-icon icon="mdi-account" size="small" class="mr-1"></v-icon>
                {{ item.name }}
            </template>
            <template v-slot:item.address="{ item }">
                <v-icon icon="mdi-map-marker" size="small" class="mr-1"></v-icon>
                {{ item.street }}, {{ item.zipCode }} {{ item.city }}, {{ item.countryKey }}
            </template>
            <template v-slot:item.phone="{ item }">
                <v-icon icon="mdi-phone" size="small" class="mr-1"></v-icon>
                {{ item.phone }}
            </template>
            <template v-slot:item.email="{ item }">
                <v-icon icon="mdi-email" size="small" class="mr-1"></v-icon>
                {{ item.email }}
            </template>
        </v-data-table>
    </v-container>
</template>

<script setup lang="ts">
import { fetchContacts } from '@/services/contactsService';
import { Contact } from '@/types/contact';
import { onMounted, ref } from 'vue';

const contacts = ref<Contact[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const headers = [
    { title: 'Name', key: 'name' },
    { title: 'Address', key: 'address' },
    { title: 'Phone', key: 'phone' },
    { title: 'Email', key: 'email' },
]

const loadContacts = async () => {
    loading.value = true
    error.value = null
    try {
        contacts.value = await fetchContacts();
    } catch (err: any) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadContacts()
})
</script>

<style scoped></style>