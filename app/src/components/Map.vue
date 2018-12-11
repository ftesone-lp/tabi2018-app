<template>
    <q-page class="flex flex-center">
        <highmaps :options="chartOptions" />
    </q-page>
</template>

<style>
</style>

<script>
import Highcharts from 'highcharts-vue'

export default {
    name: 'Chart',
    data() {
        return {
            topology: null,
            data: [
                ['DE.SH', 728],
                ['DE.BE', 710],
                ['DE.MV', 963],
                ['DE.HB', 541],
                ['DE.HH', 622],
                ['DE.RP', 866],
                ['DE.SL', 398],
                ['DE.BY', 785],
                ['DE.SN', 223],
                ['DE.ST', 605],
                ['DE.NW', 237],
                ['DE.BW', 157],
                ['DE.HE', 134],
                ['DE.NI', 136],
                ['DE.TH', 704],
                ['DE.', 361]
            ],
            chartOptions: {
                chart: {
                    map: 'countries/it/it-all'
                },
                series: [{
                    data: [1,2,3]
                }]
            }
        }
    },
    mounted() {
        fetch('./assets/topojson/provincias.json')
            .then(r => r.json())
            .then(json => this.topology = json)
    }
}
</script>
