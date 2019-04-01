tabi2018-app
================

## Trabajo final de la materia Tecnologías Aplicadas para Business Intelligence - Cursada 2018

Para ejecutar el proyecto es necesario tener instalado docker.

Para crear la imagen con tag `tabi2018/ftesone-app:latest` debe ejecutarse el siguiente comando desde la carpeta raíz del repositorio:

```bash
bash ./docker/bin/build.sh
```

Para ejecutar la aplicación sobre el puerto 8080 de la máquina anfitriona:

```bash
bash ./docker/bin/run.sh
```

Para ejecutar la aplicación sobre el puerto *PORT* de la máquina anfitriona:

```bash
bash ./docker/bin/run.sh PORT
```

Si la aplicación backend se ejecuta en un host distinto a `http://localhost:8000`, es necesario modificar la configuración en *app/src/services/config/index.js*
