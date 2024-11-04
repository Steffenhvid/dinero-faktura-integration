<template>
    <v-container>
        <v-data-table :headers="headers" :items="invoices" :items-per-page="5" class="elevation-1">
            <template v-slot:item="{ item, index }">
                <tr @click="toggleExpand(index, item.Guid)">
                    <td>{{ item.ContactName }}</td>
                    <td>{{ item.Description }}</td>
                    <td class="text-right">{{ item.Date }}</td>
                    <td class="text-right">{{ item.PaymentDate }}</td>
                    <td class="text-right">{{ item.TotalExclVat }}</td>
                    <td class="text-right">{{ item.Currency }}</td>
                </tr>
                <tr v-show="expandedRow === index">
                    <td colspan="6" class="pa-0">
                        <v-expand-transition>
                            <div v-if="expandedRow === index" class="pa-4 bg-grey-lighten-3">
                                <v-row v-for="product in expandedInvoice?.ProductLines" dense>
                                    <InvoiceLineComponent :invoice-line="product" />
                                </v-row>
                            </div>
                        </v-expand-transition>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script setup lang="ts">
import { fetchInvoiceByGuid, fetchInvoices } from '@/services/invoiceService';
import InvoiceLineComponent from '@/components/InvoiceLineComponent.vue';
import { Invoice } from '@/types/invoice';
import { onMounted, ref } from 'vue';
import 'vue-json-pretty/lib/styles.css'

const invoices = ref<Invoice[]>([]);
const loading = ref(true);
const loadingDetails = ref(false);
const error = ref<string | null>(null);

const expandedRow = ref<number | null>(null)
const expandedInvoice = ref<Invoice | null>(null);

interface Header {
    width: string,
    title: string,
    key: string,
    align: "start" | "end" | "center" | undefined
}

const headers: Header[] = [
    { align: 'start', width: '15%', title: 'Kontakt', key: 'ContactName' },
    { align: 'start', width: '45%', title: 'Beskrivelse', key: 'Description' },
    { align: 'end', width: '10%', title: 'Forfaldsdato', key: 'PaymentDate' },
    { align: 'end', width: '10%', title: 'Oprettelses dato', key: 'Date' },
    { align: 'end', width: '10%', title: 'Total (Eks. moms)', key: 'TotalExclVat' },
    { align: 'end', width: '10%', title: 'Valuta', key: 'Currency' }
];

const loadInvoices = async () => {
    loading.value = true
    error.value = null
    try {
        invoices.value = await fetchInvoices();
    } catch (err: any) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

const toggleExpand = async (index: number, guid: string) => {
    if (expandedRow.value === index) {
        expandedRow.value = null;
        expandedInvoice.value = null;
    } else {
        expandedRow.value = index;
        loadingDetails.value = true;
        try {
            expandedInvoice.value = await fetchInvoiceByGuid(guid);
        } catch (err: any) {
            error.value = err.message;
        } finally {
            loadingDetails.value = false;
        }
    }
}


onMounted(() => {
    loadInvoices()
});
</script>

<style scoped>
pre {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>