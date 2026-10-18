# PWA Los Robles – Aplicación de Gestión Vecinal
**Ciclo Completo de Sprints (Sprint 1, 2 y 3) · React 18 + JavaScript Modular + PWA**  
Aplicación web progresiva para la gestión y administración vecinal de la colonia **Residencial Los Robles** en Zapopan, Jalisco.

---

## 👥 Equipo de Desarrollo (Marco Scrum)
| Integrante | Rol en el Proyecto |
| :--- | :--- |
| **Raúl Cruz Real Gómez** (Código: 209705902) | Fullstack Developer – React 18, Componentización y Arquitectura |
| **José Alfredo Rodríguez González** | Frontend & UI – Diseño responsivo y maquetación |
| **Socorro Alejandra Espinoza Villanueva** | QA & Scrum Master – Pruebas de aceptación y refinamiento de Backlog |

---

## 🚀 Innovaciones y Avances en React 18 (Fase 3 - Sprints Consolidados)

La aplicación evolucionó desde prototipos estáticos hacia una arquitectura reactiva basada en **React 18**:
* **Componentes Funcionales y Hooks Nativos:** Empleo de `useState` para gestión de estados locales interactivos y `useEffect` para sincronización y persistencia local (`localStorage`).
* **Sprint 1 (Control de Acceso y SOS):** Autenticación de doble rol (Vecino y Administrador) mediante `Login.jsx` y directorio telefónico de emergencias de Zapopan con enlaces `tel:` directos en `DirectorioSOS.jsx` (US-001, US-002, US-005).
* **Sprint 2 (Cuotas y Finanzas con jsPDF):** Pasarela digital de pago de cuota de mantenimiento ($500 MXN) con validación de pago único y generación reactiva de comprobante en formato PDF descargable en el navegador mediante `jsPDF` en `PagoCuotas.jsx` (US-003, US-004).
* **Sprint 3 (Incidencias y Tablón Interactivo):**
  * `ReporteFallas.jsx`: Ciclo de vida completo de incidencias en áreas comunes con actualización reactiva de estatus en tiempo real (**Reportado** ➔ **En atención** ➔ **Resuelto**) para Don Pedro (US-008).
  * `TablonAvisos.jsx`: Tablón dinámico con buscador instantáneo por palabras clave y filtro por nivel de prioridad (Alta, Media, Baja) (US-006).

---

## 📋 Resumen de Historias de Usuario Consolidadas

| Sprint | ID | Historia de Usuario | Pts | Estado | Entregable Funcional |
| :---: | :---: | :--- | :---: | :---: | :--- |
| **1** | US-001 | Autenticación con selección de rol | 3 | ✅ | Control de sesión y persistencia local de usuario activo. |
| **1** | US-002 | Navegación responsiva adaptativa | 2 | ✅ | Barra de navegación superior con diseño adaptativo móvil. |
| **1** | US-005 | Directorio de emergencias Zapopan | 2 | ✅ | Marcado telefónico directo a policía, bomberos y cruz verde. |
| **2** | US-003 | Pago de cuotas y recibo PDF | 6 | ✅ | Formulario reactivo y generación de recibo oficial con jsPDF. |
| **2** | US-004 | Panel de tesorería comunitaria | 5 | ✅ | Panel financiero para Doña Laura con métricas de recaudación. |
| **3** | US-006 | Tablón oficial con filtros | 5 | ✅ | Publicación de acuerdos con búsqueda en vivo y selector de prioridad. |
| **3** | US-008 | Ciclo de vida de incidencias | 5 | ✅ | Gestión de fallas con máquina de estados reactiva. |

---

## 🔑 Credenciales de Prueba para Demostración

| Perfil | Nombre / Rol | Correo Electrónico | Contraseña |
| :--- | :--- | :--- | :--- |
| 👔 **Administrador** | Don Pedro García (Presidente) | `pedro@losrobles.mx` | `losrobles123` |
| 💼 **Administrador** | Doña Laura Sánchez (Tesorera) | `laura@losrobles.mx` | `losrobles123` |
| 🏠 **Vecina** | Rosa Martínez (Robles Norte 14) | `rosa@losrobles.mx` | `losrobles123` |
| 🏠 **Vecino** | José González (Robles Sur 08) | `jose@losrobles.mx` | `losrobles123` |
| 🏠 **Vecina** | Marta Pérez (Paseo Cedros 22) | `marta@losrobles.mx` | `losrobles123` |

*También puedes utilizar los accesos rápidos de un solo toque en la pantalla de bienvenida.*

---

## 💻 Instrucciones para Ejecutar la Aplicación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Rreal94/PWA_LosRobles.git
   cd PWA_LosRobles
   ```
2. Ejecuta un servidor local o abre directamente el archivo en tu navegador:
   ```bash
   # Opción recomendada:
   npx serve .
   # O simplemente abre index.html en cualquier navegador moderno
   ```

---

## 📚 Referencias Oficiales
* Abramov, D. y Nabors, R. (2023). *Presentación de React*. React Docs.
* Atlassian. (2025). *Revisión del sprint: guía paso a paso*. Guía Ágil de Atlassian.
* Cupo, M. (2025). *¿Qué es una revisión de sprint? Definición, objetivos y consejos*. Monday Blog.
* Dash, S. N. (2025). *Entendiendo la revisión del sprint en la metodología ágil*. MPUG Magazine.
* Schwaber, K. y Sutherland, J. (2020). *La Guía Definitiva de Scrum: Las Reglas del Juego*. Scrum Guides.
