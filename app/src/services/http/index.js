import axios from 'axios';
import config from '@/services/config';

export default {
    regiones: callback => axios.get(config.api+'/regiones').then(callback),
    provincias: callback => axios.get(config.api+'/provincias').then(callback),
    cultivos: callback => axios.get(config.api+'/cultivos').then(callback),
    decadas: callback => axios.get(config.api+'/decadas').then(callback),
    chart: (endpoint, callback) => axios.get(config.api+endpoint).then(callback),
}
