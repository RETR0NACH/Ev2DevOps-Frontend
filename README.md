# 💻 Frontend Administrativo - Innovatech Chile

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

## 📖 Descripción del Proyecto

Este repositorio contiene la interfaz de administración centralizada de **Innovatech Chile**. Es una Single Page Application (SPA) moderna, responsiva y de alto rendimiento, diseñada para la gestión operativa de ventas y la logística de despachos en tiempo real.

Como pieza fundamental de nuestra arquitectura de 3 capas, este componente actúa como el punto de entrada principal, interactuando con múltiples microservicios a través de una capa de seguridad y proxy inverso.

---

## 🚀 Stack Tecnológico

### Desarrollo Frontend
* **Core:** React.js con **Vite** para una experiencia de desarrollo y compilación ultra rápida.
* **Estilos:** Tailwind CSS para un diseño moderno, modular y responsivo.
* **Gestión de Estado:** Hooks de React (`useState`, `useEffect`) y comunicación mediante **Axios**.

### Infraestructura & Despliegue
* **Servidor de Producción:** Nginx optimizado para servir contenido estático y actuar como Gateway.
* **Contenerización:** Docker (Imagen ligera basada en Alpine).
* **Seguridad:** Hardening de contenedor con usuario **Non-root**.
* **Cloud:** Alojado en instancia **EC2 Pública** dentro de AWS, orquestado mediante Amazon ECR y GitHub Actions.

---

## 🛠️ Ingeniería de Software y DevOps

Este frontend no es solo una página estática; incorpora conceptos avanzados de ingeniería de sistemas:

1. **Proxy Inverso (Nginx Gateway):**
   * Configuración de Nginx para interceptar peticiones hacia `/api/v1/ventas` y `/api/v1/despachos`.
   * Esto permite la comunicación con microservicios en **IPs Privadas** de AWS sin exponer los backends a internet, aplicando el principio de **Zero Trust Architecture**.
2. **Hardening de Seguridad:**
   * El contenedor ha sido configurado para escuchar en el puerto **8080** y ejecutarse bajo el usuario `nginx`, eliminando riesgos de seguridad asociados a procesos con privilegios de administrador.
3. **Pipeline CI/CD Automatizado:**
   * **Build:** Generación de archivos optimizados (dist) con Node.js.
   * **Push:** Almacenamiento de versiones inmutables en **Amazon ECR**.
   * **Deploy:** Actualización automática en caliente en AWS mediante **SSM**, garantizando cero tiempo de inactividad.

---

## ⚙️ Configuración del Entorno

El proyecto utiliza variables de entorno inyectadas durante la construcción (build-time) para definir las rutas de la API:

| Variable | Descripción |
| :--- | :--- |
| `VITE_API_VENTAS` | Ruta relativa hacia el microservicio de Ventas (`/api/v1/ventas`) |
| `VITE_API_DESPACHOS` | Ruta relativa hacia el microservicio de Despachos (`/api/v1/despachos`) |

---

## 💻 Guía de Uso Local

Para ejecutar el frontend en tu entorno de desarrollo:

1. Instala las dependencias:
   ```bash
   npm install
   ```

## Inicia el servidor de desarrollo:

Bash
npm run dev
Para probar la configuración de producción localmente con Docker:

Bash
docker build -t front-despacho .
docker run -d -p 80:8080 front-despacho
## 🌿 Flujo de Trabajo y Colaboración
Mantenemos un estándar de calidad mediante el siguiente flujo de Git:

Rama de Desarrollo: deploy.

Rama de Producción: main.

Proceso: Cada cambio significativo requiere un Pull Request y su posterior Merge a main para detonar el despliegue automático a la nube.

### Panel de Administración Central - Innovatech Chile.
