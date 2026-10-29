import puppeteer from 'puppeteer-core';

const navegador = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--lang=es-MX'],
  defaultViewport: { width: 1440, height: 1000, deviceScaleFactor: 2 }
});

const pagina = await navegador.newPage();
await pagina.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 2500));
await pagina.screenshot({ path: '/tmp/ev_login.png' });

await pagina.type('input[type="email"]', 'pedro.gonzalez@losrobles.mx');
await pagina.type('input[type="password"]', 'losrobles123');
await pagina.click('button[type="submit"]');
await new Promise(r => setTimeout(r, 3500));
await pagina.screenshot({ path: '/tmp/ev_dashboard.png' });

const clic = await pagina.evaluate(() => {
  const boton = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Base de Datos'));
  if (boton) { boton.click(); return true; }
  return false;
});
console.log('clic Base de Datos:', clic);
await new Promise(r => setTimeout(r, 3000));
await pagina.screenshot({ path: '/tmp/ev_bd.png' });
await pagina.screenshot({ path: '/tmp/ev_bd_full.png', fullPage: true });

console.log('titulo:', await pagina.title());
await navegador.close();
