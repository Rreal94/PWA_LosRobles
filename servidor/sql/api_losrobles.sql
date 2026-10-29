-- =============================================================================
-- Usuario de aplicación para la API de la PWA Los Robles
-- Materia: Proyecto II (continuidad de Diseño y gestión de base de datos)
-- Alumno: Raúl Cruz Real Gómez (209705902)
-- Principio de mínimo privilegio: la API solo lee catálogos y escribe en las
-- tablas donde el flujo del vecino realmente necesita registrar información.
-- =============================================================================

DROP USER IF EXISTS 'api_losrobles'@'localhost';
CREATE USER 'api_losrobles'@'localhost' IDENTIFIED BY 'Api_LosRobles#26';

GRANT SELECT ON `los_robles_db`.* TO 'api_losrobles'@'localhost';
GRANT INSERT ON `los_robles_db`.`reporte_incidencia` TO 'api_losrobles'@'localhost';
GRANT UPDATE (`estado_reporte`) ON `los_robles_db`.`reporte_incidencia` TO 'api_losrobles'@'localhost';
GRANT INSERT ON `los_robles_db`.`pago` TO 'api_losrobles'@'localhost';
GRANT INSERT ON `los_robles_db`.`aviso_comunicado` TO 'api_losrobles'@'localhost';

FLUSH PRIVILEGES;
