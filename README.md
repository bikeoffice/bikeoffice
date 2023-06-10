# **Bikeoffice**

**Tabla de contenido**

-   [**Introducción**](#introducción)
-   [**Historia**](#historia)
-   [**Manual**](#manual)
    -   [**Instalación**](#instalación)
    -   [**NX Monorepo**](#nx-monorepo)
    -   [**Postgres Docker**](#postgres-docker)
    -   [**Comandos de Git**](#comandos-de-git)
-   [**Metodología**](#metodología)
-   [**Descripción Técnica**](#descripción-técnica)
    -   [**Estrategia de Git y Pipeline CI/CD**](#estrategia-de-git-y-pipeline-cicd)
    -   [**Arquitectura de la Aplicación**](#arquitectura-de-la-aplicación)
    -   [**Tecnologías Utilizadas**](#tecnologías-utilizadas)
-   [**Diseño**](#diseño)
    -   [**Componentes**](#componentes)
    -   [**Esquema BBDD**](#esquema-bbdd)
-   [**Calculo Precios**](#calculo-precios)
    -   [**Desarrollo**](#desarrollo)
    -   [**Recurrientes**](#recurrientes)
    -   [**Total al Primer Año**](#total-al-primer-año)
-   [**User Story: Alquiler y Venta**](#user-story-alquiler-y-venta)
    -   [**Login**](#login)
    -   [**Creación Alquiler**](#creación-alquiler)
    -   [**Cobrar Alquiler y Productos**](#cobrar-alquiler-y-productos)
    -   [**Visualización Venta**](#visualización-venta)
-   [**Comparación Temporal**](#comparación-temporal)
    -   [**Clockify**](#clockify)
-   [**Conclusiones**](#conclusiones)
    -   [**Posibles Mejoras**](#posibles-mejoras)

---

# **Introducción**

**Bikeoffice** surge de la idea de entrar en el software enfocado al mundo del ciclismo, donde se observa que los programas de gestión que manejan dichas tiendas tienden a ser desorganizados y desestructurados. Por tanto, venimos a traer valor para una gestión óptima y amigable para el usuario que realiza tareas de gestión en una tienda de bicis enfocada tanto a alquiler, como venta o taller.

---

# **Historia**

Nuestro nombre surge del juego de palabras entre bicicleta y programa de gestión (bike - backoffice) haciéndolo un mix para que tenga gancho (bikeoffice).

Lo cierto es que todo empezó con una idea de proyecto de clase dónde se pretendía construir el backend de un agregador de alquiler de bicicletas. La idea nos gustó y salimos a validar el interés en varias tiendas, dónde pudimos ver que sus principales carencias estaban en la gestión óptima, ya que las bicicletas se alquilaban toda la temporada prácticamente solas debido a la alianza que tienen estas con las agencias de viajes. Es por esto que decidimos construir un backoffice en lugar de un agregador.

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

Nuestra estrategia de Git utiliza los siguientes comandos:

Crear una rama de feature (feature branch):

```sh
$ git checkout -b feat/new-feat
```

Actualizar una rama de feature:

```sh
$ git checkout dev
$ git pull origin dev
$ git checkout -
$ git rebase dev
```

Unir una rama de feature con la rama dev:

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

La rama principal del repositorio utiliza una pipeline de Integración Continua/Entrega Continua (CI/CD) que compila el proyecto y lo despliega en AWS.
Esta estrategia nos permite reflejar el estado actual de la rama principal en todo momento.

Inicialmente, teníamos la idea de tener dos entornos de despliegue, pero debido a costes y debugging no previsto, solo hemos desplegado uno.

En el entorno local, se tenían las ramas de características (o features) a desarrollar. Una vez completada la feature, se hacía merge (en local) haciendo squash de todos los commits en la rama dev.

Para mantener actualizada una rama de características que había perdido sincronización con la rama dev, utilizábamos git rebase en el entorno local.

![gitflow](./images/gitflow.png)

---

## **Arquitectura de la aplicación**

**Capa de presentación:** Una SPA con ReactJS y React Admin para una interfaz de usuario fluida e integración sencilla con la API REST.

**Capa de negocio:** Node.js con ExpressJS para construir la API REST, y Jest y Supertest para pruebas unitarias.

**Capa de datos:** PostgresSQL como gestor de base de datos relacional, Sequelize como ORM.

Docker para empaquetar componentes en contenedores independientes y despliegue en la nube de AWS para aprovechar CI/CD y escalado.

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

# Diseño

![diagrama de componentes](./images/componentes.svg)

## Componentes

-   **`bikeoffice-api`** alberga rutas, middlewares, servicios y repositorios y que recibe las peticiones del bikeoffice-web
-   **`bikeoffice-web`** interractua con el usuario y se encarga de representar datos sacados por el bikeoffice-api
-   **`types`** posee las entidades que representan los modelos guardados en la BBDD, además de sus tipos correspondientes
-   **`sequelize-schema-connector`** libreria custom creada para interractuar con peticiones de react-admin a travez de un schema de la BD en concreto

## Esquema BBDD

---

# Calculo Precios

Para calcular los precios hemos divididos los gastos en 2, recurrientes y de desarrollo.

## Desarrollo

Hemos calculado unas ~70h cadauno a unos 20€ la hora, ya que las posiciones fluctuaban entre desarrollador, administrador, project manager y devops engineer.
Esto hace unos ~2800€, que juntos con los precios de setup, llevarian a un total de **`3000€`**.

## Recurrientes

Gracias a la calculadora de precios de AWS, hemos podido calcular unos 70€/mes por entorno, con las minimas especificaciones.
Realisticamente, se tendrian 2 entornos con unas especificaciones medio decentes lo cual subiria el precio a 100€/mes.
Tema licencias hemos intentado utilizar licencias libres y gratuitas asi que no incumberian costes.
Todo esto sumaria unos **`200€`** al mes de gastos recurrientes.

## Total al Primer Año

**`5400€`**

---

# User Story: Alquiler y Venta

## Login

![Login](./images/login.png)

## Creación Alquiler

![Visualización Alquileres](./images/show-alquileres.png)
![Creación Alquiler](./images/create-alquiler.png)
![Acabar Creación Alquiler](./images/finish-create-alquiler.png)

## Cobrar Alquiler y Productos

![Creación Ticket](./images/tpv.png)
![Añadir Productos y Cobrar](./images/add-items-tpv.png)

## Visualización Venta

![Visualización Ticket Cobrado](./images/closed-ticket.png)

# **Comparación Temporal**

## **Clockify**

Para tener bajo control el tiempo utilizado y para poder comparar nuestras estimaciones hemos usado la herramienta Clockify con las siguientes etiquetas:

-   **Deploy:** Para la configuración de Terraform, github actions y AWS
-   **Refactor:** Para el rediseño y limpieza de la arquitectura
-   **TPV:** Para el desarrollo del modulo de TPV y ticket, tanto en el bikeoffice-api como el bikeoffice-web
-   **Rent:** Para el desarrollo del modulo de Rent y availability, tanto en el bikeoffice-api como el bikeoffice-web
-   **Setup:** Para la configuración inicial del proyecto (git, entornos, nx)
-   **Docs:** Para el tiempo usado para escribir esta documentación
-   **Test:** Para configuración y desarrollo de los tests
-   **Rent-TPV Merge:** Para la unión de los modulos de TPV y Rent, que desarrollamos por separado

![clockify](images/clockify.png)

Nuestra limitación temporal fue de 135 horas.
Nuestra predicción temporal fue de 135 horas igual, para todos los modulos.
El resultado ha sido 135 horas para 2 modulos, ya que no hemos contado que el despliegue y diseño de UI y UX nos hubiese ralentizado tanto.

```yaml
Predicción de Tiempo: 135h

Tiempo Real: 135h
```

---

# Conclusiones

Ha sido un buen proyecto que hemos utilizado para aprender más sobre el dominio de los TPVs virtuales y los alquileres de bicicletas.
También hemos aprovechado para aprender tecnologías y herramientas nuevas, pero sin exagerar.

Hemos tenido múltiples sesiones de entrevistas y discusión de ideas con personas que dominan el sector.
Además, hemos tenido muchas reuniones entre nosotros y una pizarra blanca para decidir flujos, interfaces y diseños.

Hemos pasado muchas horas depurando nuestra pipeline de CI/CD e intentando que todo funcione correctamente con GitHub y AWS.
Esto no lo habíamos calculado en el anteproyecto y, sin duda, con ese tiempo podríamos haber implementado otro módulo.

También hemos tenido que luchar con algunos de los frameworks elegidos, pero eso forma parte del compromiso que tienes con ellos...

Gracias a nuestro conocimiento de Express, hemos podido utilizar nuestra metodología de desarrollo más fácilmente: íbamos implementando funcionalidades y modelos según la interfaz nos las pedía, siguiendo un diseño "outside-in".
Antes, diseñábamos la interfaz y el flujo, y mientras lo implementábamos, íbamos diseñando los detalles.
Como se puede ver en el diagrama de tiempos, una vez mezclados los dos módulos, invertimos tiempo en refactorizar y unificar la arquitectura, como establecimos en nuestra metodología.
Al final, vimos que al ser tan ágiles, podíamos avanzar más rápidamente y con menos comunicación; Aunque ha habido mucha, siempre falta porque no podemos leer los pensamientos de los demás.

En conclusión, ha sido una gran oportunidad de crecimiento y experimentación, tanto a nivel individual y tecnológico como en el trabajo en grupo y con límites de tiempo. Estamos muy felices con el resultado y seguiremos con su desarrollo.

## Posibles mejoras

Tenemos aun 2 modulos por desarrollar. Unas posibles mejoras que se pueden anadir facilmente son un certificado ssl, ademas de un repaso a la seguridad en general de la aplicacion.
Tambien podriamos anadir algun tipo de seguimiento de datos, ya sea guardar el trafico en segun que paginas o donde se hace mas clicks;
Pero a lo mejor conseguimos integrarlo con el modulo de estatisticas, lo que centralizaria todo.

Tambien esta pendiente el tema de poder elegir tus proprios colores de la UI, ademas de poder cambiar informacion de usuario.

Hablando de UI, nos faltan unas sesiones con pizarra blanca y los expertos de sector para unificar las diferentes partes y obtener criticas para asi pulir el diseno.

Hay un monton de mejoras mas que ya hemos contemplado o estan en desarrollo actualmente, pero las pricipales son las comentadas aqui arriba.

ChatGPT

Tenemos aún 2 módulos por desarrollar. Unas posibles mejoras que se pueden añadir fácilmente son un certificado SSL, además de un repaso a la seguridad en general de la aplicación.

También podríamos añadir algún tipo de seguimiento de datos, ya sea guardar el tráfico en algunas páginas o registrar dónde se hace más clic.
Tal vez podamos integrarlo con el módulo de estadísticas, lo que centralizaría todo.

También está pendiente el tema de poder elegir tus propios colores de la UI, además de poder cambiar la información del usuario.

Hablando de la UI, nos faltan algunas sesiones con pizarra blanca y los expertos del sector para unificar las diferentes partes y obtener críticas para así pulir el diseño.

Hay un montón de mejoras más que ya hemos contemplado o que están en desarrollo actualmente, pero las principales son las comentadas anteriormente.
