# **Bikeoffice**

**Tabla de contenido**

-   [**Introducción**](#introducción)
-   [**Historia**](#historia)
-   [**Metodología**](#metodología)
-   [**Descripción Técnica**](#descripción-técnica)
    -   [**Estrategia de Git y Pipeline CI/CD**](#estrategia-de-git-y-pipeline-cicd)
    -   [**Arquitectura de la Aplicación**](#arquitectura-de-la-aplicación)
    -   [**Tecnologías Utilizadas**](#tecnologías-utilizadas)
-   [**Manual**](#manual)
    -   [**Instalación**](#instalación)
    -   [**NX Monorepo**](#nx-monorepo)
    -   [**Postgres Docker**](#postgres-docker)
    -   [**Comandos de Git**](#comandos-de-git)

---

# **Introducción**

**Bikeoffice** es un software de gestión diseñado específicamente para tiendas de bicicletas que ofrece una solución organizada y estructurada. Nuestro objetivo es proporcionar una herramienta amigable para los usuarios que realizan tareas de gestión en una tienda de bicicletas, ya sea enfocada en alquiler, venta o taller.

---

# **Historia**

La idea de Bikeoffice surgió como un proyecto de clase para desarrollar el backend de un agregador de alquiler de bicicletas. Durante la validación de interés en varias tiendas, nos dimos cuenta de que la gestión eficiente era una de las principales necesidades, ya que las bicicletas se alquilaban durante toda la temporada principalmente a través de agencias de viajes. Por lo tanto, decidimos desarrollar un software de gestión en lugar de un agregador.

---

# **Metodología**

Para este proyecto, utilizamos una metodología de desarrollo ágil basada en el modelo incremental.

El proceso comenzó con un análisis detallado de cada característica a implementar, incluyendo su diseño tanto gráfico como de comportamiento. Una vez completada esta etapa, pasamos a la implementación de cada característica. Consideramos que una característica estaba completa cuando estaba integrada en el sistema (en un entorno de desarrollo) y cumplía con los objetivos establecidos, sin afectar las características existentes.

Luego, realizamos una retrospectiva del trabajo realizado, evaluando posibles mejoras en la implementación, identificando dificultades y considerando la posibilidad de volver al análisis e implementación si los resultados no cumplían con nuestras expectativas.

Este segundo análisis se basó en el feedback obtenido de la implementación existente y de la retrospectiva. Esperábamos obtener un resultado más pulido, bajo control y con mejoras en rendimiento y usabilidad.

![metodologia](./images/metodologia.png)

---

# Descripción Técnica

## **Estrategia de Git y Pipeline CI/CD**

La rama principal del repositorio utiliza una pipeline de Integración Continua/Entrega Continua (CI/CD) que compila el proyecto y lo despliega en AWS. Inicialmente, teníamos la idea de tener dos entornos de despliegue, pero debido a problemas de costos y debugging no previstos, finalmente solo desplegamos un entorno.

Esta estrategia nos permite reflejar el estado actual de la rama principal en todo momento.

En el entorno local, se crearon ramas de características (o "features") para el desarrollo. Una vez que se completaba una característica, se realizaba un merge (en el entorno local) fusionando todos los commits en la rama "dev".

Para mantener actualizada una rama de características que había perdido sincronización con la rama "dev", utilizábamos el comando "git rebase" en el entorno local.

![gitflow](./images/gitflow.png)

---

## **Arquitectura de la aplicación**

**Capa de presentación:** Utilizamos ReactJS y React Admin para desarrollar una aplicación de página única (SPA) que proporciona una interfaz de usuario fluida e integración sencilla con la API REST.

**Capa de negocio:** Utilizamos Node.js con ExpressJS para construir la API REST, y Jest y Supertest para realizar pruebas unitarias.

\*\*Capa de

datos:\*\* Utilizamos PostgreSQL como sistema de gestión de bases de datos relacionales, y Sequelize como ORM (Mapeo Objeto-Relacional).

Además, utilizamos Docker para empaquetar los componentes en contenedores independientes y realizar el despliegue en la nube de AWS para aprovechar las capacidades de despliegue, CI/CD y escalado.

![arquitectura](./images/arquitectura.png)

---

## **Tecnologías Utilizadas**

| Frontend                                                            | Backend                                                                                                                                                 | Testing                                              | Transversal                              |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------- |
| [React](https://reactjs.org/)                                       | [Express](http://expressjs.com/)                                                                                                                        | [Jest](https://jestjs.io/es-ES/)                     | [Day.js](https://day.js.org/)            |
| [React Admin](https://github.com/marmelab/react-admin)              | [Sequelize](https://sequelize.org/)                                                                                                                     | [Supertest](https://www.npmjs.com/package/supertest) | [tslib](https://www.typescriptlang.org/) |
| [Material-UI](https://mui.com/)                                     | [sequelize-crud](https://github.com/lalalilo/express-crud-router-sequelize-v6-connector)                                                                | [Axios](https://axios-http.com/es/docs/intro)        | [Terraform](https://terraform.io)        |
| [react-dom](https://reactjs.org/)                                   | [sequelize-schema-crud](./sequelize-schema-connector/package.json)                                                                                      |                                                      |                                          |
| [react-big-calendar](https://github.com/jquense/react-big-calendar) | [express-crud-router](https://github.com/lalalilo/express-crud-router)                                                                                  |                                                      |                                          |
| [simpleRestProvider](https://github.com/marmelab/react-admin)       | [crypto-js](http://github.com/brix/crypto-js), [cors](https://github.com/expressjs/cors), y [cookie-parser](https://github.com/expressjs/cookie-parser) |                                                      |                                          |
|                                                                     | [pg](https://github.com/brianc/node-postgres)                                                                                                           |                                                      |                                          |

---

# Manual

## Instalación

```sh
$ npm i
$ npm i -g nx
$ npm run setup
```

## NX Monorepo

Hemos utilizado la herramienta NX para tener todos los proyectos en el mismo repositorio y para unificar el control de versiones de las dependencias.

Para ejecutar todos los proyectos en el entorno local:

```sh
$ nx run-many -t serve
```

Para compilar todos los proyectos:

```sh
$ nx run-many -t build
```

## Postgres Docker

La base de datos se puede instalar tanto en el entorno local como en un contenedor Docker. Para mayor comodidad, hemos utilizado un contenedor Docker en el entorno local, mientras que en producción utilizamos el servicio RDS de AWS.

Crear y arrancar el contenedor Docker:

```sh
$ docker run --name bikeoffice-psql -e POSTGRES_DB=bikeoffice -e POSTGRES_USER=bikeoffice -e POSTGRES_PASSWORD=bikeoffice -p 5432:5432  -d postgres
```

Conectarse a la base de datos:

```sh
$ docker exec -it bikeoffice-psql psql -U bikeoffice
```

## Comandos de Git

Nuestra estrategia de Git utiliza los siguientes comandos

:

Crear una rama de características (feature branch):

```sh
$ git checkout -b feat/new-feat
```

Unir una rama de características con la rama "dev":

```sh
$ git checkout dev
$ git merge --squash feat/new-feat
$ git commit -m "feat/new-feat"
```

Desplegar los cambios a producción:

```sh
$ git checkout main
$ git merge dev
$ git push origin main
```

### Hooks

Hemos configurado un hook de pre-commit que ejecuta Prettier en los archivos que están preparados (staged) para realizar el commit.
