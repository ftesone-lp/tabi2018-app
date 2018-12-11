<template>
    <q-page class="flex flex-center">
        <svg id="map" ref="map" :width="map.width" :height="map.height"></svg>
    </q-page>
</template>

<style>
</style>

<script>
// import * as d3 from 'd3'
// import * as topojson from 'topojson'

export default {
    name: 'Map',
    data() {
        return {
            map: {
                width: 0,
                height: 0
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();

        // var v = this;
        // var svg = d3.select(this.$el);

        // var path = d3.geoPath().projection(null);

        // d3.json('./assets/topojson/departamentos-buenos_aires.json', function (error, ok) {
        //     console.log(ok);
        // });

        // d3.json('./assets/topojson/departamentos-buenos_aires.topojson', (error, ok) => {
        //     svg.append('g')
        //         .attr('class', 'departamento')
        //         .selectAll('path')
        //         .data(topojson.feature(ok, ok.objects['departamentos-buenos_aires']).features)
        //         .enter()
        //         .append('path')
        //         .attr('d', path)
        //     ;
        // })
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.map.width  = this.$el.offsetWidth;
            this.map.height = this.$el.offsetHeight;
        }
    }
}
</script>
