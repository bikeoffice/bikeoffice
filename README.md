# **Bikeoffice**

**Tabla de contenidos**

-   [**Bikeoffice**](#Bikeoffice)
-   [**Introducción**](#introducción)
-   [**Historia**](#historia)
-   [**Manual**](#manual)
    -   [**Pre-requisitos**](#pre-requisitos)
    -   [**Instalación**](#instalación)
    -   [**Uso**](#uso)
-   [**Metodología**](#metodología)
-   [**Descripción técnica**](#descripción-técnica)
    -   [**Partes interesadas y requisitos funcionales/no funcionales**](#partes-interesadas-y-requisitos-funcionalesno-funcionales)
    -   [**Diagrama de casos de uso**](#diagrama-de-casos-de-uso)
    -   [**Arquitectura de la aplicación**](#arquitectura-de-la-aplicación)
    -   [**Posibles tecnologías**](#posibles-tecnologías)
-   [**Diseño**](#diseño)
    -   [**Componentes**](#componentes)
    -   [**Esquema BBDD**](#esquema-bbdd)
    -   [**Ejemplo Real**](#ejemplo-real)
-   [**Implementacion**](#implementacion)
    -   [**Tecnologías y Herramientas Elegidas**](#tecnologías-y-herramientas-elegidas)
    -   [**Backend**](#backend)
    -   [**Frontend**](#frontend)
-   [**Pruebas**](#pruebas)
    -   [**Coverage**](#coverage)
    -   [**Pruebas Esquema BBDD**](#pruebas-esquema-bbdd)
        -   [**Create**](#create)
        -   [**Read**](#read)
        -   [**Update**](#update)
        -   [**Delete**](#delete)
-   [**Comparación Temporal**](#comparación-temporal)
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
