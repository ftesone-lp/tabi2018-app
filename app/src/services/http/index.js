import axios from 'axios';

const regiones = axios
    .get('http://localhost/regiones')
    .then(response => response)
;

export default regiones
