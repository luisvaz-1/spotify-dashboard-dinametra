# Dinametra Front-End Test: Spotify Dashboard

## Descripción

Dashboard interactivo que visualiza datos de la API de Spotify. Incluye gráficos, filtros y diseño responsivo, siguiendo mejores prácticas y criterios de accesibilidad.

## Demo

[Enlace a la demo en vivo](https://mi-dashboard-demo.vercel.app)

## Capturas de pantalla

![Carga inicial](./screenshots/initial-load.png)
![Aplicando filtros](./screenshots/with-filters.png)

## Instrucciones de instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/usuario/dinametra-spotify-dashboard.git
   cd dinametra-spotify-dashboard
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` con tus credenciales de Spotify:
   ```
   VITE_SPOTIFY_CLIENT_ID=...
   VITE_SPOTIFY_REDIRECT_URI=...
   ```
4. Inicia la app:
   ```bash
   npm run dev
   ```

## Enfoque

- **Autenticación OAuth2**: Implementada con redirección e intercambio de token.
- **Obtención y manejo de datos**: Uso de hooks personalizados y servicios para fetch.
- **Visualización**: Uso de Recharts para gráficos de barras y pastel, con tooltips y leyendas personalizadas.
- **Filtros**: Por país y género (según disponibilidad de la API).
- **Responsividad**: Layout adaptativo con CSS Grid y Flexbox.
- **Accesibilidad**: Navegación por teclado, roles ARIA, foco visible.
- **Manejo de errores**: Mensajes amigables y fallback visual.
- **Pruebas**: Unitarias para componentes críticos.
- **Documentación**: Código comentado y modular.

## Suposiciones

- La API de Spotify puede limitar algunos filtros (género, país) según el endpoint.
- El usuario debe autenticarse con su cuenta de Spotify.
- La app está orientada a visualización de datos de artistas y géneros populares.

## Problemas conocidos

- El token de autenticación de Spotify puede expirar rápidamente.
- Algunos datos (géneros, países) pueden no estar disponibles para todos los usuarios.

## Tecnologías

- React + TypeScript
- Vite
- Recharts
- Styled Components
- Jest + React Testing Library
