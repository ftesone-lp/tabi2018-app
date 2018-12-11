<template>
    <q-page class="flex flex-center">
        <highcharts :options="chartOptions" ref="chart" />
    </q-page>
</template>

<style>
</style>

<script>
import Highcharts from 'highcharts'
import axios from 'axios'

export default {
    name: 'Chart',
    props: ['medidas'],
    data() {
        return {
            chartSeries: {
                haSembradas: [],
                haCosechadas: [],
            },
            ultimasMedidas: {
                sembradaCosechada: this.medidas.sembradaCosechada,
            },
            chartOptions: {
                colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
    '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
   '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
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
                    // enabled: false,
                    align: 'right',
                    // x: -30,
                    verticalAlign: 'top',
                    // y: 25,
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
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();

        axios
            .get('http://localhost')
            .then(response => {
                var jsonResponse = JSON.parse(JSON.stringify(response.data));
                this.chartOptions.xAxis.categories = response.data.x;

                for (let serie of response.data.haSembradas) {
                    this.chartSeries.haSembradas.push(JSON.parse(JSON.stringify(serie)));
                }

                for (let serie of response.data.haCosechadas) {
                    this.chartSeries.haCosechadas.push(JSON.parse(JSON.stringify(serie)));
                }

                this.updateChart();
            })
        ;

        var vue = this;
        window.setInterval( function () {
            if (vue.medidas.sembradaCosechada != vue.ultimasMedidas.sembradaCosechada) {
                vue.ultimasMedidas.sembradaCosechada = vue.medidas.sembradaCosechada;
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
        updateChart() {
            this.chartOptions.series = JSON.parse(JSON.stringify(this.chartSeries[this.medidas.sembradaCosechada]));
        }
    }
}
</script>
