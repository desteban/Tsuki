# Tsuki

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/github/license/desteban/Tsuki.svg)

**Tsuki** es un **cliente HTTP multiplataforma** de **código abierto**. Con Tsuki, puedes realizar peticiones HTTP sin la necesidad de crear una cuenta, **manteniendo tu privacidad** y control total sobre lo que sucede en segundo plano. Gracias a su naturaleza de código abierto, puedes ver, modificar y contribuir al código, haciendo que todos sean parte del desarrollo y mejora de la herramienta.

Desarrollado con *Electron* para garantizar compatibilidad en diversas plataformas y *React* para crear una interfaz de usuario con tecnologías modernas, **Tsuki** es ideal tanto para desarrolladores como para cualquier usuario que necesite realizar pruebas o interacciones con APIs de manera eficiente.

## Características principales:
- **Multiplataforma**: Funciona en Windows, macOS y Linux gracias a Electron.
- **Código abierto**: Puedes revisar el código, hacer aportes y mejorar el proyecto con la comunidad.
- **Privacidad**: Realiza peticiones HTTP sin registrarte ni compartir tus datos.


## Instalación
> [!IMPORTANT]
> Debes tener instalado [Node.js](https://nodejs.org/es/download) y algún gestor de paquetes como **npm** o [pnpm](https://pnpm.io/es/installation)

Instalar todas las dependencias del proyecto

### npm
``` bash
npm install
```

### pnpm
```bash
pnpm install
```

## Como usar

Al utilizar electron podemos levantar el proyecto en modo de desarrollo o podemos generar un ejecutable para poder instalarlo en varios sistemas operativos.

### Desarrollo

Al levantar el proyecto el modo de desarrollo se abrirá una nueva ventana en la cual se ejecuta la aplicación en tiempo real.

> [!NOTE]
> Cuando levantamos el proyecto se nos mostrará una url la cual podemos poner en un navegador web

#### npm
```bash
npm run dev
```

#### pnpm
```bash
pnpm dev
```

> [!TIP]
> Puedes ejecutar scripts del package.json con Node.js
```bash
node --run {nombre_del_script}
```

### Ejecutable

**Electron** permite generar un archivo ejecutable específico para el sistema operativo en el que se realice el *build* de la aplicación. Esto significa que si compilas la aplicación en **Windows**, se **generará** un archivo ejecutable **(.exe)** compatible con ese sistema operativo.


#### npm
```bash
npm run build
```

#### pnpm
```bash
pnpm build
```