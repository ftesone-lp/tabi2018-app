<template>
    <q-page class="flex flex-center">
        <highcharts :options="chartOptions" />
    </q-page>
</template>

<style>
</style>

<script>
import Highcharts from 'highcharts'
import http from '@/services/http'

export default {
    name: 'StackChart',
    props: ['medidas', 'endpoint'],
    data() {
        return {
            rinde: [],
            chartOptions: {
                colors: [
                    '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5',
                    '#c42525', '#a6c96a', '#4572a7', '#aa4643', '#89a54e', '#80699b', '#3d96ae', '#db843d',
                    '#92a8cd', '#a47d7c', '#b5ca92', '#2b908f', '#90ee7e', '#f45b5b', '#7798bf', '#aaeeee',
                    '#ff0066', '#eeaaee', '#55bf3b', '#df5353', '#8085e9', '#8d4654', '#7cb5ec', '#f7a35c',
                ],
                credits: {
                    enabled: false
                },
                chart: {
                    type: 'column',
                    width: 600,
                    height: 400,
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    min: 0,
                    title: { text: '' },
                    stackLabels: {
                        enabled: true
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    floating: false,
                    backgroundColor: 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}'
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: false,
                        }
                    }
                },
                series: []
            }
        }
    },
    watch: {
        medidas: function (newValue) {
            if (this.chartOptions.series.length >= 2) {
                this.chartOptions.series[3].data = JSON.parse(JSON.stringify(this.rinde.map(v => v * this.medidas)))
            }
        },
        endpoint: function (newValue) {
            this.loadChart();
        },
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();

        this.loadChart();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            var v = this;

            window.setTimeout( function () {
                v.chartOptions.chart.width  = v.$el.offsetWidth;
                v.chartOptions.chart.height = v.$el.offsetHeight;
            }, 500);
        },
        loadChart() {
            http.chart(this.endpoint, response => {
                var jsonResponse = JSON.parse(JSON.stringify(response.data));
                this.chartOptions.xAxis.categories = response.data.x;

                this.chartOptions.series = JSON.parse(JSON.stringify(response.data.data));

                this.rinde = JSON.parse(JSON.stringify(this.chartOptions.series[3].data));

                this.chartOptions.series[0].name = 'Hectáreas sembradas';
                this.chartOptions.series[1].name = 'Hectáreas cosechadas';
                this.chartOptions.series[2].name = 'Toneladas producción';
                this.chartOptions.series[3].name = 'Rinde';
            });
        },
    }
}
</script>
