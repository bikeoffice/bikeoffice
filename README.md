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
