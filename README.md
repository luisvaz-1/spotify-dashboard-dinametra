# Dinametra Spotify Dashboard

**Panel interactivo que visualiza datos de la API de Spotify**. Incluye gráficos, filtros y diseño responsivo, siguiendo mejores prácticas de desarrollo, accesibilidad y pruebas.

---

##  Demo en Vivo

[🔗 Ver la demo desplegada](TU-ENLACE-DEMO-AQUI)

---

##  Capturas de Pantalla

| Carga inicial | Aplicando filtros |
|:-------------:|:----------------:|
| ![Carga inicial](./screenshots/initial-load.png) | ![Aplicando filtros](./screenshots/with-filters.png) |

---

##  Instrucciones de Instalación

1. **Clona el repositorio**  
   ```bash
   git clone git@github.com:luisvaz-1/spotify-dashboard-dinametra.git
   cd spotify-dashboard-dinametra
   ```
2. **Instala dependencias**  
   ```bash
   npm install
   ```
3. **Configura variables de entorno**  
   Crea un archivo `.env` en la raíz del proyecto con:
   ```
   SPOTIFY_CLIENT_ID=tu_client_id
   SPOTIFY_CLIENT_SECRET=tu_client_secret
   ```
   >  Para obtener estas credenciales, regístrate en [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).

4. **Inicia el servidor backend**  
   ```bash
   npm run server
   ```
   *(opcional: en otra terminal)*

5. **Inicia la aplicación frontend**  
   ```bash
   npm run dev
   ```

6. **Abre [http://localhost:5173](http://localhost:5173) en tu navegador.**

---

##  Enfoque y arquitectura

- **Frontend:** React + TypeScript + Vite, componentes funcionales, hooks personalizados y modularidad.
- **Backend:** ExpressJS como proxy seguro a la API de Spotify (manejo de token y cacheo).
- **Gráficas:** [Recharts](https://recharts.org/) para barras y pastel, con tooltips y leyendas personalizadas.
- **Filtros:** Por país y género (según disponibilidad de la API).
- **Estilos:** CSS moderno, diseño responsivo con Flexbox y CSS Grid.
- **Accesibilidad:** Roles ARIA, navegación por teclado, foco visible, etiquetas semánticas.
- **Errores:** Mensajes amigables y fallback visual.
- **Pruebas:** Unitarias con Jest y Testing Library.
- **Documentación:** Código comentado y limpio.

---

##  Estructura del Proyecto

```
/server
  index.js           # Backend Express (proxy Spotify)
  .env               # Variables de entorno API
/src
  /components        # Componentes reutilizables (charts, loader, error)
  /hooks             # Hooks personalizados (useAlbums, useGenres)
  /pages             # Página principal (App.tsx)
  /assets            # Imágenes, capturas, logos
  index.css          # Estilos globales
  main.tsx
/tests
  ...               # Pruebas unitarias
```

---

##  Funcionalidades principales

- **Visualización de datos de nuevos lanzamientos de Spotify** (por país).
- **Gráfico de barras:** Popularidad de álbumes.
- **Gráfico de pastel:** Distribución de géneros musicales.
- **Filtros dinámicos:** Selección de país, actualización automática.
- **Responsivo:** Optimizado para móvil, tablet y escritorio.
- **Accesible:** Compatible con lectores de pantalla, navegación por teclado, foco visible.
- **Manejo de errores:** UX amigable si la API falla o no hay datos.
- **Pruebas:** Componentes críticos testeados.

---

##  Suposiciones y limitaciones

- Spotify limita algunos filtros (género, país) según endpoint y región.
- El usuario **no necesita autenticarse**: se usa el flujo client credentials para obtener datos públicos.
- El token de autenticación puede caducar si la app queda inactiva.
- Algunos datos de género o país pueden estar incompletos según la API.

---

##  Accesibilidad y compatibilidad

- Navegación **100% con teclado**.
- Compatible con **lectores de pantalla** (roles, labels, foco).
- Probado en **Chrome, Firefox y Safari**.
- Contraste de color adecuado.

---

##  Ejecución de pruebas

```bash
npm run test
```
Las pruebas unitarias se encuentran en la carpeta `/tests` y cubren componentes principales y hooks.

---

##  Contribuciones

¡Pull requests y sugerencias son bienvenidas!  
Por favor lee el archivo [CONTRIBUTING.md](./CONTRIBUTING.md) para detalles antes de contribuir.

---

##  Licencia

MIT

---

## 👨‍💻 Autor

Luis Vaz  
[GitHub](https://github.com/luisvaz-1)