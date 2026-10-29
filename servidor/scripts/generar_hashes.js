import bcrypt from "bcryptjs";

const PASSWORD_DEMO = "losrobles123";
const correos = [
  "pedro.gonzalez@losrobles.mx",
  "laura.gomez@losrobles.mx",
  "jaime.morales@losrobles.mx",
  "jorge.navarro@losrobles.mx",
  "mariana.ochoa@losrobles.mx"
];

const hash = await bcrypt.hash(PASSWORD_DEMO, 12);

console.log(`-- Hash bcrypt generado para la contraseña "${PASSWORD_DEMO}"`);
for (const correo of correos) {
  console.log(
    `UPDATE usuario SET password_hash = '${hash}' WHERE correo = '${correo}';`
  );
}
