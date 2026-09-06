**PWA Los Robles – Aplicación de Gestión Vecinal**  
**Sprint 1 · HTML + CSS + JavaScript**  
Aplicación web para la gestión vecinal de la colonia **Residencial Los Robles**.  
   
 Desarrollada con tecnologías básicas como parte del Sprint 1 del proyecto.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSdYxZ4/mJjEsxE8W8GbCFuCLTOzVXsAAPzFuVZ3dXw9AQDgtesBxPEF3bv7x0IAAAAASUVORK5CYII=)  
**👥 Equipo de desarrollo**  
| | |  
|-|-|  
| **Integrante** | **Rol** |   
| José Alfredo Rodríguez González | Frontend – Diseño y programación del cliente |   
| Raúl Cruz Real Gómez | Backend – Servidor y base de datos |   
| Socorro Alejandra Espinoza Villanueva | QA – Pruebas y documentación |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSeYxKS/kJkED6bwYAVvImwJtszMVu0BAPAXx1rd1fn1BACA164HHDwF+DpPyKwAAAAASUVORK5CYII=)  
**🚀 ¿Cómo abrir la aplicación?**  
1. Descarga o clona este repositorio  
2. Abre la carpeta app-los-robles/  
3. Haz doble clic en **index.html**  
4. La aplicación se abre en el navegador  
*No necesitas instalar nada. Funciona en cualquier navegador moderno.*  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AUBBAsUfyVTCg9UygEBVsWGAjJK2CbjNzVGcAAPzFtapV7V9PAAB47X4AEWIEM8iQs0EAAAAASUVORK5CYII=)  
**🔑 Credenciales de prueba**  
| | | |  
|-|-|-|  
| **Rol** | **Correo** | **Contraseña** |   
| 👔 Administrador | [pedro@losrobles.mx](mailto:pedro@losrobles.mx "mailto:pedro@losrobles.mx") | losrobles123 |   
| 👔 Administrador | [laura@losrobles.mx](mailto:laura@losrobles.mx "mailto:laura@losrobles.mx") | losrobles123 |   
| 🏠 Vecino | [rosa@losrobles.mx](mailto:rosa@losrobles.mx "mailto:rosa@losrobles.mx") | losrobles123 |   
| 🏠 Vecino | [jose@losrobles.mx](mailto:jose@losrobles.mx "mailto:jose@losrobles.mx") | losrobles123 |   
| 🏠 Vecino | [marta@losrobles.mx](mailto:marta@losrobles.mx "mailto:marta@losrobles.mx") | losrobles123 |   
   
*Todos los vecinos usan la misma contraseña: * *losrobles123*  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OMQ2AABAAsSNBACPiUML0NpGACyywEZJWQZeZ2aszAAD+4l6rrTq+ngAA8Nr1AL/SBEZwuCSwAAAAAElFTkSuQmCC)  
**✅ Historias de usuario implementadas (Sprint 1)**  
| | | |  
|-|-|-|  
| **ID** | **Historia** | **Estado** |   
| US-001 | Registro e inicio de sesión | ✅ Completada |   
| US-002 | Tipos de usuario (admin / vecino) | ✅ Completada |   
| US-003 | Pago de cuotas mensuales | ✅ Completada |   
| US-004 | Panel de administración financiero | ✅ Completada |   
| US-005 | Directorio de emergencias | ✅ Completada |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSPBCj7fFwtCmJHAjAU2QtIq6DIzW7UHAMBfnGt1V8fHEQAA3rsexOkF3va0dq8AAAAASUVORK5CYII=)  
**📁 Estructura del proyecto**  
app-los-robles/  
 │  
 ├── index.html              ← Pantalla de login y registro  
 ├── dashboard-vecino.html   ← Panel del vecino  
 ├── dashboard-admin.html    ← Panel del administrador  
 │  
 ├── css/  
 │   └── estilos.css         ← Todos los estilos de la aplicación  
 │  
 ├── js/  
 │   ├── datos.js            ← Datos del sistema y funciones de localStorage  
 │   ├── auth.js             ← Login, registro y manejo de sesión  
 │   ├── vecino.js           ← Lógica del panel del vecino  
 │   └── admin.js            ← Lógica del panel del administrador  
 │  
 └── README.md               ← Este archivo  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AUBBAsUfyVTCg9UygEBVsWGAjJK2CbjNzVGcAAPzFtapV7V9PAAB47X4AEWIEM8iQs0EAAAAASUVORK5CYII=)  
**💡 Funciones de la aplicación**  
**Para el vecino:**  
- ✅ Iniciar sesión y registrarse  
- ✅ Ver el estado de su cuota del mes actual  
- ✅ Pagar su cuota con simulación de pasarela de pago  
- ✅ Ver comprobante con número de referencia  
- ✅ Consultar historial completo de pagos  
- ✅ Acceder al directorio de emergencias  
**Para el administrador:**  
- ✅ Ver resumen financiero del mes (tarjetas + barra de progreso)  
- ✅ Ver cuántos vecinos pagaron y cuántos tienen adeudo  
- ✅ Ver lista completa de vecinos con su estado de pago  
- ✅ Filtrar vecinos por estado (pagados / con adeudo)  
- ✅ Ver directorio de emergencias  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OQQmAABRAsSfYxZo/khWsYQLPJrCCNxG2BFtmZquOAAD4i3Ot7mr/egIAwGvXA4qjBdKlX6OKAAAAAElFTkSuQmCC)  
**🛠️ Tecnologías utilizadas**  
| | |  
|-|-|  
| **Tecnología** | **Uso** |   
| HTML5 | Estructura de cada página |   
| CSS3 + Flexbox | Estilos y diseño responsivo |   
| JavaScript ES5/ES6 | Lógica, navegación y renderizado dinámico |   
| localStorage | Persistencia de datos entre sesiones |   
| sessionStorage | Manejo seguro de la sesión activa |   
   
*Sin frameworks, sin librerías externas, sin servidor. 100% tecnologías nativas.*  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAABRAsSdYxKa/jL0MIR7FCt5E2BJsmZmt2gMA4C+Otbqr8+sJAACvXQ85SAYUQNBTfQAAAABJRU5ErkJggg==)  
**📅 Sprint 1 – Planificación**  
| | |  
|-|-|  
| **Concepto** | **Detalle** |   
| Fechas | 01 – 05 de septiembre de 2026 |   
| Puntos comprometidos | 23 story points |   
| Historias completadas | 5 de 5 |   
| Horas estimadas | 53 horas |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAUBBAwSf8GGLWDWFDY3ixgjcRZhLMNjNHdQYAwF9cq1rV/vUEAIDX7gcRXAQ2s/16gwAAAABJRU5ErkJggg==)  
**📚 Referencias**  
- Schwaber, K., y Sutherland, J. (2020). *La Guía Scrum*. Scrum.org.  
- Cohn, M. (2004). *User stories applied*. Addison-Wesley.  
- MDN Web Docs. (2024). *localStorage*. [https://developer.mozilla.org/es/docs/Web/API/Window/localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage "https://developer.mozilla.org/es/docs/Web/API/Window/localStorage")  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSd4NIGJjPWxpgGsYQVvImwJtszMXp0BAPAX91pt1fH1BACA164HhZwEOFrXVOsAAAAASUVORK5CYII=)  
*Gestión de Proyectos de Desarrollo Web · Equipo 1 · * *Septiembre* * 2026*  
