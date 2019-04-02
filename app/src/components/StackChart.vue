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
    props: ['medidas', 'endpoint', 'width'],
    data() {
        return {
            chartSeries: {
                haSembradas: [],
                haCosechadas: [],
            },
            ultimasMedidas: {
                sembradaCosechada: this.medidas,
            },
            chartOptions: {
                colors: [
                    '#2f7ed8', '#0d233a', '#8bbc21', '#c41111', '#1aadce', '#492970', '#f28f43', '#77a1e5',
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
                        stacking: 'normal',
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
        endpoint: function (newValue) {
            this.loadChart();
        },
        width: function (newValue) {
            this.handleResize();
        },
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();

        this.loadChart();

        var vue = this;
        window.setInterval( function () {
            if (vue.medidas != vue.ultimasMedidas) {
                vue.ultimasMedidas = vue.medidas;
                vue.updateChart();
            }
        }, 500);
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

                this.chartSeries.haSembradas  = [];
                this.chartSeries.haCosechadas = [];

                for (let serie of response.data.haSembradas) {
                    this.chartSeries.haSembradas.push(JSON.parse(JSON.stringify(serie)));
                }

                for (let serie of response.data.haCosechadas) {
                    this.chartSeries.haCosechadas.push(JSON.parse(JSON.stringify(serie)));
                }

                this.updateChart();
            });
        },
        updateChart() {
            this.chartOptions.series = JSON.parse(JSON.stringify(this.chartSeries[this.medidas]));
        },
    }
}
</script>
