<template>
    <q-layout id="q-app" view="lHh Lpr lFf">
        <q-layout-header>
            <q-toolbar
                color="primary"
                :glossy="$q.theme === 'mat'"
                :inverted="$q.theme === 'ios'"
            >
                <q-btn
                    flat
                    dense
                    round
                    @click="leftDrawerOpen = !leftDrawerOpen"
                    aria-label="Menu"
                    icon="menu"
                />

                <q-toolbar-title>
                    AGRICULTURA
                    <div slot="subtitle">TECNOLOGÍAS APLICADAS PARA BUSINESS INTELLIGENCE</div>
                </q-toolbar-title>
            </q-toolbar>
        </q-layout-header>

        <q-layout-drawer
            v-model="leftDrawerOpen"
            :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
        >
            <q-list
                no-border
                link
                inset-delimiter
            >
                <q-list no-border link inset-delimiter>
                    <q-list-header>Mapas</q-list-header>

                    <q-collapsible icon="ion-map" label="Regiones">
                        <q-list no-border inset-delimiter>
                            <q-item>
                                <q-item-main>
                                    <q-btn flat class="full-width" align="left" label="VER TODAS LAS REGIONES" @click="filtrarRegion(null)" />
                                </q-item-main>
                            </q-item>
                            <q-item-separator />
                            <q-list-header>Filtrar por Región</q-list-header>
                            <q-item v-for="region in listados.regiones">
                                <q-item-main>
                                    <q-btn flat class="full-width" align="left" :label="region.nombre" @click="filtrarRegion(region)" />
                                </q-item-main>
                            </q-item>
                            <q-item-separator />
                            <q-list-header>Filtrar por Provincia</q-list-header>
                            <q-item v-for="provincia in listados.provincias">
                                <q-item-main>
                                    <q-btn flat class="full-width" align="left" :label="provincia.nombre" @click="filtrarProvincia(provincia)" />
                                </q-item-main>
                            </q-item>
                        </q-list>
                    </q-collapsible>

                    <q-collapsible icon="ion-leaf" label="Cultivos">
                        <q-list no-border inset-delimiter>
                            <q-item>
                                <q-item-main>
                                    <q-btn flat class="full-width" align="left" label="VER TODOS LOS CULTIVOS" @click="filtrarCultivo(null)" />
                                </q-item-main>
                            </q-item>
                            <q-item-separator />
                            <q-list-header>Filtrar por Cultivo</q-list-header>
                            <q-item v-for="cultivo in listados.cultivos">
                                <q-item-main>
                                    <q-btn flat class="full-width" align="left" :label="cultivo.nombre" @click="filtrarCultivo(cultivo)" />
                                </q-item-main>
                            </q-item>
                        </q-list>
                    </q-collapsible>

                    <q-collapsible icon="ion-calendar" label="Décadas">
                        <q-list no-border inset-delimiter>
                            <q-item>
                                <q-item-main>
                                    <q-btn flat class="full-width" align="left" label="VER TODAS LAS DÉCADAS" @click="filtrarDecada(null)" />
                                </q-item-main>
                            </q-item>
                            <q-item-separator />
                            <q-list-header>Filtrar por Década</q-list-header>
                            <q-item v-for="decada in listados.decadas">
                                <q-item-main>
                                    <q-btn flat class="full-width" align="left" :label="decada.decada" @click="filtrarDecada(decada.decada)" />
                                </q-item-main>
                            </q-item>
                        </q-list>
                    </q-collapsible>
                </q-list>
            </q-list>
        </q-layout-drawer>

        <q-page-container :style="'width: '+chartWidth+'%;'" v-if="!filtros.cultivo">
            <StackChart :medidas="medidas.sembradaCosechada" :endpoint="endpoint" :width="chartWidth" />
        </q-page-container>

        <q-page-container :style="'width: '+chartWidth+'%;'" v-if="filtros.cultivo">
            <BarsChart :medidas="medidas.rinde" :endpoint="endpoint" :width="chartWidth" />
        </q-page-container>

        <q-layout-footer>
            <q-toolbar
                color="primary"
                :glossy="$q.theme === 'mat'"
                :inverted="$q.theme === 'ios'"
            >
                <q-toolbar-title class="uppercase">
                    REGIÓN/PROVINCIA: {{ filtros.region ? filtros.region.nombre : filtros.provincia ? filtros.provincia.nombre : 'TODAS' }}<br />
                    CULTIVO: {{ filtros.cultivo ? filtros.cultivo.nombre : 'TODOS' }}<br />
                    DÉCADA: {{ filtros.decada ? filtros.decada : 'TODAS' }}
                </q-toolbar-title>
                <div class="chart-width-slider">
                    Ancho de gráfico:
                    <q-slider v-model="chartWidth" :min="100" :max="1000" :step="50" snap color="white" />
                </div>
                <div v-if="!filtros.cultivo">
                    <q-radio color="white" keep-color v-model="medidas.sembradaCosechada" val="haSembradas" label="Superficie Sembrada" />
                    <q-radio color="white" keep-color v-model="medidas.sembradaCosechada" val="haCosechadas" label="Superficie Cosechada" />
                </div>
                <div v-if="filtros.cultivo" style="display: flex">
                    <div style="margin: auto;">Rinde:</div>
                    <div>
                        <div>
                            <q-radio color="white" keep-color v-model="medidas.rinde" val="1000000" label="kq/m2" />
                            <q-radio color="white" keep-color v-model="medidas.rinde" val="10000" label="q/m2" />
                            <q-radio color="white" keep-color v-model="medidas.rinde" val="1000" label="t/m2" />
                        </div>
                        <div>
                            <q-radio color="white" keep-color v-model="medidas.rinde" val="100" label="kg/Ha" />
                            <q-radio color="white" keep-color v-model="medidas.rinde" val="1" label="q/Ha" />
                            <q-radio color="white" keep-color v-model="medidas.rinde" val="0.1" label="t/Ha" />
                        </div>
                    </div>
                </div>
            </q-toolbar>
        </q-layout-footer>
    </q-layout>
</template>

<script>
import http from '@/services/http'
import StackChart from '@/components/StackChart.vue'
import BarsChart from '@/components/BarsChart.vue'

const host = 'http://localhost:8000'

export default {
    name: 'Agricultura',
    components: {
        StackChart,
        BarsChart
    },
    data () {
        return {
            leftDrawerOpen: this.$q.platform.is.desktop,
            listados: {
                regiones: null,
                provincias: null,
                cultivos: null,
                decadas: null,
            },
            filtros: {
                region: null,
                provincia: null,
                cultivo: null,
                decada: null,
            },
            medidas: {
                sembradaCosechada: 'haSembradas',
                rinde: '1',
            },
            endpoint: '/',
            chartWidth: 100,
        }
    },
    watch: {
        chartWidth: function () {
            let endpoint = this.endpoint;
            this.endpoint = '';
            this.endpoint = endpoint;
        }
    },
    mounted() {
        http.regiones(response => this.listados.regiones = response.data)

        http.provincias(response => this.listados.provincias = response.data)

        http.cultivos(response => this.listados.cultivos = response.data)

        http.decadas(response => this.listados.decadas = response.data)
    },
    methods: {
        filtrarRegion(region) {
            this.filtros.region = region;

            this.filtros.provincia = null;

            this.actualizarEndpoint();
        },
        filtrarProvincia(provincia) {
            this.filtros.provincia = provincia;

            this.filtros.region = null;

            this.actualizarEndpoint();
        },
        filtrarCultivo(cultivo) {
            this.filtros.cultivo = cultivo;

            this.actualizarEndpoint();
        },
        filtrarDecada(decada) {
            this.filtros.decada = decada;

            this.actualizarEndpoint();
        },
        actualizarEndpoint() {
            this.medidas.rinde = '1';

            let endpoint   = this.filtros.cultivo ? '/cultivo/'+this.filtros.cultivo.id : '/';
            let parametros = [];

            if (this.filtros.region) {
                parametros.push('region='+this.filtros.region.id);
            } else if (this.filtros.provincia) {
                parametros.push('provincia='+this.filtros.provincia.id);
            }

            if (this.filtros.decada) {
                parametros.push('decada='+this.filtros.decada);
            }

            if (parametros.length > 0) {
                endpoint += '?'+parametros.join('&');
            }

            this.endpoint = endpoint;
        },
    }
}
</script>

<style>
    .chart-width-slider {
        min-width: 150px;
        margin: auto 20px;
        text-align: center;
    }
</style>
