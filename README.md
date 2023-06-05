# **Bikeoffice**

**Tabla de contenidos**

-   [**Bikeoffice**](#Bikeoffice)
-   [**Introducción**](#introducción)
-   [**Historia**](#historia)
-   [**Metodología**](#metodología)
-   [**GitFlow**](#gitflow)
-   [**Descripción técnica**](#descripción-técnica)
    -   [**Arquitectura de la aplicación**](#arquitectura-de-la-aplicación)
    -   [**Posibles tecnologías**](#posibles-tecnologías)
-   [**Diseño**](#diseño)
    -   [**Componentes**](#componentes)
    -   [**Esquema BBDD**](#esquema-bbdd)
-   [**Implementación**](#implementacion)
    -   [**Tecnologías y Herramientas Elegidas**](#tecnologías-y-herramientas-elegidas)
    -   [**Backend**](#backend)
    -   [**Frontend**](#frontend)
-   [**Pruebas**](#pruebas)
-   [**Comparación Temporal**](#comparación-temporal)
    -   [**Diagrama de Gant**](#gant)
    -   [**Clockify**](#clockify)
    -   [**Justificación temporal**](#justificación-temporal)
-   [**Conclusiones**](#conclusiones)
    -   [**Posibles mejoras**](#posibles-mejoras)
-   [**Dificultades**](#dificultades)

---

# **Introducción**

**Bikeoffice** surge de la idea de entrar en el software enfocado al mundo del ciclismo, donde se observa que los programas de gestión que manejan dichas tiendas tienden a ser desorganizados y desestructurados. Por tanto, venimos a traer valor para una gestión óptima y amigable para el usuario que realiza tareas de gestión en una tienda de bicis enfocada tanto a alquiler, como venta o taller.

---

# **Historia**
Nuestro nombre surge del juego de palabras entre bicicleta y programa de gestión (bike - backoffice) haciéndolo un mix para que tenga gancho (bikeoffice).

Lo cierto es que todo empezó con una idea de proyecto de clase dónde se pretendía construir el backend de un agregador de alquiler de bicicletas. La idea nos gustó y salimos a validar el interés en varias tiendas, dónde pudimos ver que sus principales carencias estaban en la gestión óptima, ya que las bicicletas se alquilaban toda la temporada prácticamente solas debido a la alianza que tienen estas con las agencias de viajes. Es por esto que decidimos contruir un backoffice en lugar de un agregador.

---

# **Metodología**

Para realizar este proyecto se va a seguir una metodología de desarrollo ágil, basada en el modelo incremental.

Este modelo de desarrollo consiste en realizar un análisis previo de cada característica a implementar, junto con el diseño, ya sea gráfico o de comportamiento. 
Una vez completada esta primera etapa, se pasa a la implementación de la misma. Esta etapa se considera acabada cuando la característica está integrada en el sistema (en entorno de desarrollo) y cumple los objetivos establecidos, sin romper las características existentes.

Finalmente se realiza una retrospectiva sobre el trabajo realizado, donde se evalúan posibilidades de mejora en la implementación, las dificultades que se han encontrado y se valora la posibilidad de vuelta al análisis y consecuente implementación en caso de no obtener los resultados deseados.

Este segundo análisis será más informado gracias al feedback de la implementación existente y a la retrospectiva. Por lo tanto se espera un resultado más pulido y bajo control, además de mejoras en rendimiento y/o de usabilidad.

 ![metodologia](./images/metodologia.png)

---
# **GitFlow**

En cuanto al versionado del proyecto, haremos uso de la herramienta git.
Utilizaremos 2 entornos desplegados: producción y desarrollo (o staging), más nuestro entorno de desarrollo local.
Los dos entornos desplegados contarán con una pipeline de despliegue continuo (CD) y el entorno de desarrollo contará también con una pipeline de integración continua (CI).

Usaremos una estrategia de ramas donde cada entorno tendrá una rama que representará el estado actual del software desplegado. 
En el entorno local se tendrán las ramas de características (o features) a desarrollar. Una vez completada la feature, se hará merge o PR haciendo squash de todos los commits en la rama de staging solo si se cumple el pipeline CI.
Para actualizar una rama de característica que ha perdido la sincronización con la rama de staging, se usará git rebase en local.
Cuando se quieran desplegar los cambios de staging a producción, se hará un merge o PR de la rama staging a la rama main.

![gitflow](./images/gitflow.png)

---
# **Arquitectura de la aplicación**

![arquitectura](./images/arquitectura.png)

El proyecto consiste en la realización de una aplicación web, que será accesible desde cualquier navegador web, basada en una arquitectura de tres capas, donde cada una es una unidad independiente que puede ser desplegada por sí sola.

La arquitectura de tres capas nos va a permitir desacoplar la capa de presentación de la de negocio y datos, gracias al uso de la arquitectura REST, donde expondremos una interfaz que proporcionará las acciones necesarias para cumplir con la lógica de negocio de la aplicación y poder acceder a los datos que sean necesarios, respetando los métodos expuestos por la interfaz.

La capa de presentación se encarga de mostrar al usuario el panel de control y administración, donde este puede realizar las tareas de gestión de stock, ventas, reservas y reparaciones de taller.
 Para la implementación de esta capa se hará uso del lenguaje Javascript en entorno cliente con la librería ReactJS, donde se desarrollará una SPA para proporcionar una experiencia de usuario más fluida, como si fuera una aplicación de escritorio. Además, la aplicación hará uso del Framework React Admin, el cuál nos va a permitir una fácil integración con la API REST y nos dará muchas facilidades para manejar componentes de administración, paneles, tablas… con llamadas a las capas de negocio y datos de forma simplificada debido al uso de populares librerías del ecosistema de React como son React-query (para facilitar la integración con la API), React Router (para la gestión de rutas), React-hook-form (para el manejo de formularios) y MUI (para el uso de componentes predefinidos y reutilizables).

La capa de negocio, donde se manejan las peticiones y respuestas además del procesamiento de la información obtenida a través de la capa de datos.
Se comunica con la capa de presentación con el protocolo HTTP/S y crea, lee, edita o elimina la información del sistema gestor de base de datos al cuál se conecta.
Para implementar dicha capa se usa node JS, el cuál nos permite ejecutar Javascript en el servidor, y también se va a hacer uso del Framework minimalista Express JS para conseguir todas las facilidades a la hora de construir una API REST como son el routing, peticiones y respuestas… Además se hará uso de otras librerías como son el ORM Sequelize, para hacer un mapeo de objeto relacional donde representaremos las tablas de la base de datos como si fueran objetos Javascript para trabajar con un mayor nivel de abstracción. También se hará uso de la librerías Jest y supertest para simular el software con casos test de unidad y de integración automáticos que nos den garantía y robustez a la hora de probar el funcionamiento de la aplicación. 

La capa de datos es la encargada de acceder a la información de negocio. Esta está formada por Postgresql, un sistema gestor de base de datos relacional muy potente y Open Source por el cuál apuestan muchas grandes empresas del sector gracias a su robustez, versatilidad y otras necesidades como el potente manejo de concurrencia que ofrece y la gran habilidad para hacer escrituras veloces, siendo el más rápido de entre sus competidores.

Ambas capas harán uso de la tecnología de Docker, la cuál nos permitirá empaquetar cada componente en un contenedor como una unidad independiente, donde van a ser desplegados en la nube y en concreto se va a apostar por la infraestructura que se proporciona en AWS, la cuál da facilidades para el despliegue, CI/CD y escalado

---
# **Posibles tecnologías**

---

## AWS setup
```sh
$ aws configure
AWS Access Key ID [None]: XXXXXXXXXXXXXXXXXX
AWS Secret Access Key [None]: xXxXxXxXxXxXxXxXxXxXxXxX
Default region name [None]: us-east-1
Default output format [None]: text
```

```sh
$ aws ecr create-repository --repository-name bikeoffice-ecr --region us-east-1
```

## Docker pg locally
```sh
$ docker run --name some-postgres -e POSTGRES_DB=bikeoffice -e POSTGRES_USER=bikeoffice -e POSTGRES_PASSWORD=bikeoffice -p 5432:5432  -d postgres
```

Connect to db
```sh
$ psql user=bikeoffice
```

Change db
```sh
$ \c bikeoffice
```

## Install NX monorepo globally
```sh
$ npm install --global nx@latest
```

## NX monorepo commands
```sh
$ nx run-many -t serve
```
