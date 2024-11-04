<template>

    <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Fakturering</v-toolbar-title>

        <v-spacer></v-spacer>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
        <v-list-item :to="{ path: '/' }">Startside</v-list-item>
        <v-list-item :to="{ path: '/invoices' }">Fakturaer</v-list-item>
        <v-list-item :to="{ path: '/products' }">Produkter</v-list-item>
        <v-list-item :to="{ path: '/contacts' }">Contacts</v-list-item>
    </v-navigation-drawer>


</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)
</script>

<style scoped></style>