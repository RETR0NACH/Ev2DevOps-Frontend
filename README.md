# /front_despacho/README.md

# Frontend Administrativo - Innovatech Chile

Interfaz de usuario moderna y responsiva para la administración centralizada de Ventas y Despachos.

## 🚀 Tecnologías Utilizadas
- **Librería:** React.js con Vite (Build Tool ultra rápido).
- **Estilos:** Tailwind CSS / PostCSS.
- **Servidor de Producción:** Nginx (dentro de contenedor).

## 📦 Componentes Creados (Entregables Técnicos)
1. **Dockerfile Frontend:**
   - **Multi-stage:** Etapa de compilación (Node.js) y etapa de servicio (Nginx).
   - **Hardening de Nginx:** Configurado para escuchar en el puerto `8080` con usuario `nginx` no privilegiado.
2. **Workflow de Despliegue:**
   - Integración con Amazon ECR para el versionamiento de la interfaz.
   - Actualización automática del contenedor en la instancia EC2 pública tras cada push a `deploy`.
3. **Configuración de Red:** Diseñado para comunicarse con los microservicios backend a través de la red interna de Docker o mediante IPs privadas en AWS.

## 🌐 Acceso
En producción (AWS), el servicio es accesible a través de la IP pública de la instancia EC2 en el puerto configurado en el Security Group.