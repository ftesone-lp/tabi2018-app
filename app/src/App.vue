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

        <q-page-container>
            <Chart :medidas="medidas" :endpoint="endpoint" />
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
                <div v-if="!filtros.cultivo">
                    <q-radio color="white" keep-color v-model="medidas.sembradaCosechada" val="haSembradas" label="Superficie Sembrada" />
                    <q-radio color="white" keep-color v-model="medidas.sembradaCosechada" val="haCosechadas" label="Superficie Cosechada" />
                </div>
                <div v-if="filtros.cultivo">
                    <q-checkbox color="white" keep-color v-model="medidas.sembrada" label="Superficie Sembrada" />
                    <q-checkbox color="white" keep-color v-model="medidas.cosechada" label="Superficie Cosechada" />
                    <q-checkbox color="white" keep-color v-model="medidas.produccion" label="Producción" />
                    <q-checkbox color="white" keep-color v-model="medidas.rinde" label="Rinde" />
                </div>
            </q-toolbar>
        </q-layout-footer>
    </q-layout>
</template>

<script>
// import http from './services/http'
import axios from 'axios'
import Chart from './components/Chart.vue'

export default {
    name: 'Agricultura',
    components: {
        Chart
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
                sembrada: true,
                cosechada: true,
                produccion: true,
                rinde: true,
            },
            endpoint: '/',
        }
    },
    mounted() {
        axios
            .get('http://localhost/regiones')
            .then(response => this.listados.regiones = response.data)

        axios
            .get('http://localhost/provincias')
            .then(response => this.listados.provincias = response.data)

        axios
            .get('http://localhost/cultivos')
            .then(response => this.listados.cultivos = response.data)

        axios
            .get('http://localhost/decadas')
            .then(response => this.listados.decadas = response.data)
    },
    methods: {
        filtrarRegion(region) {
            this.filtros.region = region;

            this.filtros.provincia = null;

            this.endpoint = this.filtros.region ? '/region/'+this.filtros.region.id : '/';
        },
        filtrarProvincia(provincia) {
            this.filtros.provincia = provincia;

            this.filtros.region = null;
        },
        filtrarCultivo(cultivo) {
            this.filtros.cultivo = cultivo;
        },
        filtrarDecada(decada) {
            this.filtros.decada = decada;
        },
    }
}
</script>

<style>
</style>
