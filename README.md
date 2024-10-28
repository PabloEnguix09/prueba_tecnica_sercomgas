# Prueba Sercomgas
Este repositorio es una prueba técnica para la posición de Desarrollador full-stack en Sercomgas. Este repositorio contiene el back-end, realizado con Node.js, TypeScript, Fastify, PostgreSQL y TypeORM y testeado con Jest; y el front-end realizado con React, TypeScript y Bootstrap.
***
## Tabla de contenido
- [1. Tecnologías utilizadas](#1-tecnologías-utilizadas)
- [2. Comandos](#2-comandos)
- [3. Instalación del back-end](#3-instalación-del-back-end)
- [4. Instalación del front-end](#4-instalación-del-front-end)
- [5. Arranque de la web](#5-arranque-de-la-web)
- [6. Arquitectura](#6-arquitectura)
- [7. Estructura de archivos](#7-estructura-de-archivos)
***

## 1. Tecnologías utilizadas

- [React](https://reactjs.org/): 
He utilizado React para crear componentes para la interfaz de usuario. Es una biblioteca de JavaScript para construir interfaces de usuario. Se utiliza para crear componentes reutilizables, es decir, piezas de código que se pueden reutilizar en diferentes partes de la aplicación. Sus componentes se renderizan en el navegador y se actualizan automáticamente cuando los datos cambian. La elección de React facilita el desarrollo de aplicaciones de una sola página (SPA) con actualizaciones rápidas y eficientes del DOM.

- [React Router](https://reactrouter.com/en/main): 
Como forma de navegar entre las diferentes rutas de la aplicación, he utilizado la librería de React Router. Se utiliza para crear rutas dinámicas y controlar el historial de navegación.

- [Bootstrap](https://getbootstrap.com/): He utilizado Bootstrap para crear el estilo de la interfaz de usuario de una forma sencilla y rápida, ya que no era necesario crear un estilo propio. Bootstrap es un framework de CSS que facilita la creación de interfaces responsivas y atractivas. Fue implementado para agilizar el diseño de la interfaz y asegurar que la aplicación sea visualmente consistente y accesible en múltiples dispositivos.

- [TypeScript](https://www.typescriptlang.org/): He utilizado TypeScript como lenguaje de programación para realizar tanto el frontend como el backend. TypeScript es un superconjunto de JavaScript que permite el uso de tipado estático, lo cual ayuda para mejorar la robustez del código, facilitando la detección de errores en tiempo de desarrollo y mejorando la experiencia de desarrollo gracias a una mejor autocompletación y documentación en el editor.

- [Fastify](https://www.fastify.io/): He utilizado Fastify como framework de backend para la aplicación. Fastify es un framework de Node.js que proporciona una forma sencilla de crear aplicaciones web. Es ideal para crear APIs de forma sencilla y escalable.

- [PostgreSQL](https://www.postgresql.org/download/): He utilizado PostgreSQL como motor de base de datos para la aplicación por su estabilidad y eficiencia. PostgreSQL es un sistema de gestión de bases de datos relacionales de código abierto.

- [TypeORM](https://github.com/typeorm/typeorm): He utilizado TypeORM como ORM (Object Relational Mapping) para realizar las consultas de la base de datos de manera intuitiva, permitiendo el uso de modelos de datos como clases de TypeScript. Además, simplifica las operaciones de migración y sincronización de datos con la base de datos.

- [Jest](https://jestjs.io/): He utilizado Jest para realizar las pruebas unitarias de la aplicación, permitiendo la creación de tests de forma sencilla y automatizada, facilitando la detección de errores y asegurando la calidad del código. Jest es un marco de pruebas en JavaScript que facilita la escritura y ejecución de pruebas unitarias y de integración.

- [ESLint](https://eslint.org/): He utilizado ESLint como linter para mantener la consistencia del estilo y seguir las mejores prácticas de codificación. ESLint es un linter de JavaScript que ayuda a detectar y corregir problemas de codificación.

- [Prettier](https://prettier.io/): He utilizado Prettier para formatear y mejorar la legibilidad del código. Prettier es una herramienta de formateo de código que asegura una apariencia uniforme en todo el proyecto siguiendo una serie de reglas recomendadas, así como reglas personalizadas. Prettier ha sido configurado junto con ESLint.

## 2. Comandos

### 2.1. Comandos del back-end

- `npm test`: Ejecuta los tests, muestra los resultados y recoge las coberturas.
- `npm start`: Inicia el servidor. Para ello debes realizar una build antes.
- `npm run dev`: Inicia el servidor en modo de desarrollo. Esto hace que el servidor se reinicie cuando hay cambios en el código.
- `npm run build`: Crea una build del proyecto.
- `npm run typeorm`: Migración de la base de datos.
- `npm run migrate-db`: Ejecuta la migración de datos. Para ello debes realizar una build antes.

### 2.2. Comandos del front-end

- `npm start`: Inicia el servidor, el cual se abre en el navegador y se reinicia cuando hay cambios en el código.
- `npm run build`: Crea una build del proyecto.

## 3. Instalación del back-end

1. Descargar las dependencias necesarias. Para ello ejecuta los siguientes comandos desde la carpeta raíz:
   ```
   cd api
   npm install
   ```
2. Descarga [PostgreSQL](https://www.postgresql.org/download/)
3. Crea dos bases de datos, una llamada `sercomgas` y la otra llamada `testDb`. Puedes hacerlo desde una aplicación como [pgAdmin](https://www.pgadmin.org/download/) o con comandos mediante `psql` de la siguiente forma
   ```
   psql -h <your host name> -U <your useranme>
   CREATE DATABASE sercomgas;
   CREATE DATABASE testDb
   ```
4. Prepara una build con
   ```
   npm run build
   ```

Si quieres comprobar que los tests funcionan simplemente ejecuta
```
npm test
```
> [!WARNING]
> _Recuerda tener el servidor **cerrado** para poder ejecutar los tests_
***
## 4. Instalación del front-end

1. Descargar las dependencias necesarias. Para ello ejecuta los siguientes comandos desde la carpeta raíz:
   ```
   cd app
   npm install
   ```
***
## 5. Arranque de la web

1. Abre una terminal en la carpeta raíz y ejecuta
   ```
   cd api
   npm start
   ```
2. Abre otra terminal en la carpeta raíz y ejecuta
   ```
   cd app
   npm start
   ```

## 6. Arquitectura

Para el back-end se ha utilizado una arquitectura modular basada en capas, también conocida como arquitectura de tres capas en algunos contextos. Este tipo de arquitectura organiza el código en capas de responsabilidad separadas, lo que facilita la escalabilidad, el mantenimiento y la comprensión del proyecto. Esta arquitectura sigue principios de **Domain-Driven Design (DDD)** y **Separation of Concerns (SoC)**, por lo que es ideal para aplicaciones que requieren claridad, mantenimiento y posibilidad de expansión en proyectos de tamaño pequeño a mediano.

La arquitectura de tres capas tiene varios beneficios, entre los que se encuentran:

1. **Modularidad**: La arquitectura modular permite dividir el código en módulos (base de datos, librerías, rutas) que permiten trabajar en cada sección de forma independiente.

2. **Organización** en capas: Cada capa cumple con una responsabilidad específica: la base de datos maneja la persistencia de datos, `lib` co
ntiene los tipos y interfaces, y las rutas manejan las solicitudes HTTP.
3. **Escalabilidad**: La separación en módulos facilita añadir nuevas entidades, rutas o tipos sin afectar otras partes de la aplicación.

4. **Mantenibilidad**: La organización clara permite localizar rápidamente las funcionalidades y actualizarlas de forma controlada.

Para el front-end se ha utilizado una arquitectura modular basada en componentes. Esta arquitectura es muy común en aplicaciones frontend modernas construidas con React y TypeScript. La arquitectura de componentes organiza el código en diferentes capas según su función y responsabilidad dentro de la aplicación, lo que facilita la escalabilidad, el mantenimiento y el trabajo colaborativo en proyectos React.

Los beneficios de la arquitectura de componentes son:

1. Modularidad: Esta arquitectura es modular, con el código dividido en componentes y servicios independientes, lo que permite escalar y reutilizar elementos fácilmente.

2. Separación de Responsabilidades: Cada carpeta tiene una responsabilidad clara, desde componentes de UI hasta servicios de lógica de negocio, manteniendo la lógica de cada sección encapsulada y separada.

3. Escalabilidad y Mantenibilidad: La separación en capas permite que la aplicación sea fácil de mantener y escalar. Nuevas funcionalidades pueden añadirse sin necesidad de modificar significativamente la estructura existente.

## 7. Estructura de archivos

```
api/
    |- src/
        |- db/
            |- entities/
        |- lib/
        |- routes/
        |- tests/
-------------------------
app/
    |- public/
    |- src/
        |- components/
        |- css/
        |- layouts/
        |- services/
        |- types/
```

Estos directorios contienen los archivos de la aplicación. Cada directorio contiene el contenido correspondiente al aislado de la arquitectura.

Los directorios que se encuentran dentro de la carpeta `api/src/` son:

- `db/`: Contiene los archivos de la base de datos. En la carpeta `entities/` se encuentran los archivos de las tablas de la base de datos.

- `lib/`: Contiene las clases de TypeScript de las entidades.

- `routes/`: Contiene las rutas de la aplicación. Cada entidad tiene su archivo de rutas correspondiente.

- `tests/`: Contiene los archivos de pruebas unitarias.

Los directorios que se encuentran dentro de la carpeta `app/` son:

- `public/`: Contiene aquellos archivos que se tienen que reusar en ambas partes de la aplicación, haciendo que su importación sea sencilla.

- `src/`: Contiene los archivos de la aplicación. 
    - `components/`: Contiene los componentes de la aplicación, de forma que se puedan reutilizar en diferentes partes de la aplicación.
    - `css/`: Contiene los archivos de estilos de la aplicación.
    - `layouts/`: Contiene las diferentes vistas de la aplicación, facilitando el desarrollo de esta aplicación SPA.
    - `services/`: Contiene las funciones de la aplicación. Entre ellas, se encuentran las consultas de la base de datos, funciones para convertir datos en objetos y viceversa, así como el custom hook `useLocalStorage`, el cual maneja el almacenamiento local de la aplicación y permite compartir datos entre diferentes partes de la aplicación, así como reducir significativamente las llamadas a la base de datos.
    - `types/`: Contiene los tipos de la aplicación.

## 8. Mejoras

- Mejorar la documentación de la aplicación.
- Mejorar la seguridad de la aplicación.
