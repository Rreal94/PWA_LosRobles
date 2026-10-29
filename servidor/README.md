# API Los Robles

Servicio REST que conecta la PWA de React 18 con la base de datos `los_robles_db`
en MySQL 8.0. Forma parte de la Actividad Integradora 3 de Proyecto II.

## Requisitos

- Node.js 18 o superior
- MySQL 8.0 con la base `los_robles_db` importada
- Usuario de aplicación creado con `sql/api_losrobles.sql`

## Puesta en marcha

```bash
cd servidor
npm install
cp .env.example .env
node scripts/generar_hashes.js   # imprime los UPDATE con hash real
npm start
```

La API queda disponible en `http://localhost:4000`.

## Endpoints

| Método | Ruta | Consulta que ejecuta |
| --- | --- | --- |
| GET | `/api/salud` | `SELECT DATABASE(), VERSION()` |
| POST | `/api/auth/login` | `usuario` + `vivienda`, validación con bcrypt |
| GET | `/api/auth/vecinos` | padrón unido con `vivienda` |
| GET | `/api/avisos` | `aviso_comunicado` unido con `usuario` |
| POST | `/api/avisos` | alta de comunicado |
| GET | `/api/cuotas/adeudos` | vista `vista_adeudos_vecinos` |
| GET | `/api/cuotas/usuario/:id` | cuotas con suma de pagos aprobados |
| GET | `/api/pagos/usuario/:id` | historial de pagos del colono |
| GET | `/api/reportes` | `reporte_incidencia` unido con `usuario` |
| POST | `/api/reportes` | alta de incidencia |
| PATCH | `/api/reportes/:id/estado` | cambio de `estado_reporte` |

## Criterio de seguridad

El usuario `api_losrobles` solo tiene `SELECT` general, `INSERT` en
`reporte_incidencia`, `pago` y `aviso_comunicado`, y `UPDATE` únicamente sobre la
columna `estado_reporte`. No puede alterar contraseñas ni borrar registros.
