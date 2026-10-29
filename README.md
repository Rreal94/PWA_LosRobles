# PWA Los Robles - Gestión Vecinal
**Sprint 4: aplicación React 18 conectada a MySQL 8.0 vía API REST**  
Aplicación web progresiva para la administración de la colonia **Residencial Los Robles**, Zapopan, Jalisco. Proyecto II, Unidad 3.

## Descripción

La PWA conserva sus cinco vistas de la etapa anterior (login, panel de administración, tablón de avisos, cuotas y reportes de incidencias), pero ahora los datos ya no viven en `localStorage`. Cada pantalla consulta la API de Express, que a su vez lee y escribe en la base `los_robles_db` alojada en MySQL 8.0. El cambio de esta unidad fue justamente ese puente, porque antes los datos se perdían al cerrar el navegador y el panel de tesorería mostraba cifras inventadas.

## Equipo de desarrollo (marco Scrum)

| Integrante | Rol en el proyecto | Responsabilidad en el Sprint 4 |
| :--- | :--- | :--- |
| **Raúl Cruz Real Gómez** (209705902) | Scrum Master, backend y base de datos | Esquema MySQL, usuario de aplicación con privilegios mínimos, 11 endpoints de Express |
| **José Alfredo Rodríguez González** | Product Owner y frontend | Sustitución de `localStorage` por llamadas `fetch`, formularios y estados de carga |
| **Socorro Alejandra Espinoza Villanueva** | QA y documentación | Pruebas de aceptación con `GET` y `POST`, capturas de evidencias, redacción del reporte |

## Arquitectura del Sprint 4

```
React 18 (Vite)  --fetch-->  API Express + mysql2  --pool-->  MySQL 8.0 los_robles_db
```

- **`servidor/`**: API REST en Node.js con Express y `mysql2/promise`. Valida las contraseñas con `bcryptjs` sobre los hashes guardados en la columna `password_hash` y limita los errores del motor con un manejador central.
- **`src/`**: componentes de React. `src/api/cliente.js` concentra las peticiones con un tiempo límite de 5 segundos. `Login.jsx` autentica contra `/api/auth/login` y `DashboardAdmin.jsx` calcula los indicadores con el padrón real de cinco viviendas.
- **`servidor/sql/`**: script de creación del usuario `api_losrobles` con `SELECT` general, `INSERT` en avisos, pagos y reportes, y `UPDATE` únicamente sobre la columna `estado_reporte`.
- **`scripts/capturar_evidencias.mjs`**: automatización con puppeteer-core para tomar las capturas que acompañan el reporte de la actividad.

## Requisitos

- Node.js 18 o superior
- MySQL 8.0 con la base `los_robles_db` importada (6 tablas más la vista `vista_adeudos_vecinos`)

## Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Rreal94/PWA_LosRobles.git
   cd PWA_LosRobles
   ```

2. Prepara la API:
   ```bash
   cd servidor
   npm install
   cp .env.example .env      # escribe la contraseña del usuario api_losrobles entre comillas
   mysql -u root -p < sql/api_losrobles.sql
   node scripts/generar_hashes.js   # imprime los UPDATE con el hash real de los cinco usuarios
   npm start
   ```
   La API responde en `http://localhost:4000/api/salud`.

3. En otra terminal, levanta el frontend:
   ```bash
   npm install
   npm run dev
   ```
   Vite sirve la aplicación en `http://localhost:5173` y reenvía `/api` al puerto 4000.

4. Compilación para producción:
   ```bash
   npm run build
   ```

## Usuarios de prueba

La contraseña de los cinco perfiles es `losrobles123`, ya cifrada con bcrypt en la base.

| Nombre | Rol | Correo | Casa |
| :--- | :--- | :--- | :--- |
| Don Pedro González | Administrador | `pedro.gonzalez@losrobles.mx` | 101 |
| Doña Laura Gómez | Tesorero | `laura.gomez@losrobles.mx` | 102 |
| Don Jaime Morales | Secretario | `jaime.morales@losrobles.mx` | 205 |
| Jorge Navarro Ríos | Vecino | `jorge.navarro@losrobles.mx` | 312 |
| Mariana Ochoa Del Real | Inquilino | `mariana.ochoa@losrobles.mx` | 418 |

El formulario de acceso conserva dos botones de demostración con Jorge Navarro y Mariana Ochoa para revisar la aplicación sin escribir el correo completo.

## Historias de usuario cubiertas

| Sprint | ID | Historia | Pts | Estado | Evidencia funcional |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | US-001 | Autenticación con selección de rol | 3 | Terminada | Login validado con bcrypt contra la tabla `usuario` |
| 1 | US-002 | Navegación responsiva | 2 | Terminada | Barra superior adaptativa en las cinco vistas |
| 1 | US-005 | Directorio de emergencias de Zapopan | 2 | Terminada | Enlaces `tel:` a policía, bomberos y cruz verde |
| 2 | US-003 | Pago de cuotas y recibo PDF | 6 | Terminada | Alta en `pago` y comprobante generado con jsPDF |
| 2 | US-004 | Panel de tesorería comunitaria | 5 | Terminada | Indicadores calculados con `adeudos` y la vista de adeudos |
| 3 | US-006 | Tablón oficial con filtros | 5 | Terminada | Cinco avisos leídos desde `aviso_comunicado` |
| 3 | US-008 | Ciclo de vida de incidencias | 5 | Terminada | Seis reportes con cambio de estado vía `PATCH` |
| 4 | US-011 | Persistencia en base de datos | 3 | Terminada | Los datos sobreviven al recargar y a cerrar el navegador |

## Estructura del repositorio

```
PWA_LosRobles/
├── src/                 Componentes y estilos de React
├── servidor/            API Express, rutas, conexión y scripts SQL
├── scripts/             Automatización de capturas de evidencia
├── app/                 Recursos estáticos de la PWA
├── index.html           Punto de entrada de Vite
└── vite.config.mjs      Proxy de /api hacia el puerto 4000
```

## Referencias

- Abramov, D. y Nabors, R. (2023). *Presentación de React*. React Docs.
- Atlassian. (2025). *Revisión del sprint: guía paso a paso*. Guía Ágil de Atlassian.
- Mozilla. (2025). *Fetch API*. MDN Web Docs.
- Oracle. (2024). *MySQL 8.0 Reference Manual*.
- Provos, N. y Mazières, D. (1999). A Future-Adaptable Password Scheme. *Proceedings of the 1999 USENIX Annual Technical Conference*.
- Schwaber, K. y Sutherland, J. (2020). *La Guía Definitiva de Scrum: Las Reglas del Juego*. Scrum Guides.
