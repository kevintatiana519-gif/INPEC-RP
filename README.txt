# INPEC (ROL) — Registro de Arrestos (simulado)
Proyecto estático **100% gratuito** para una web de roleplay, inspirado en el estilo institucional, sin usar símbolos oficiales.

> ⚠️ **Aviso legal**: Este material es ficticio y no está afiliado ni autorizado por el INPEC real. No utilices nombres, datos o imágenes de personas reales.

## Archivos
- `index.html` — estructura accesible y responsive
- `style.css` — estilos tipo institucional (no oficiales)
- `script.js` — datos falsos, filtros, y ordenamiento
- `logo.svg` — emblema RP **propio** (similar pero distinto del oficial)

## Uso local
1. Abre `index.html` con tu navegador.
2. Edita `script.js` (const `datos`) para añadir/quitar **registros ficticios**.
3. Cambia colores en `:root` dentro de `style.css` si quieres personalizar.

## Publicar gratis — GitHub Pages
1. Crea cuenta en GitHub y un repositorio público (ej. `inpec-rp`).
2. Sube estos archivos a la raíz.
3. En Settings → Pages → "Deploy from a branch". Branch: `main`, carpeta `/root` → Save.
4. Abre el enlace que genera (puede tardar 1–2 minutos).

## Publicar gratis — Netlify Drop
1. Abre https://app.netlify.com/drop
2. Arrastra la carpeta del proyecto.
3. Obtendrás un enlace público inmediato.

## Personalización
- Cambia/añade **estados** en CSS (`.state.en-juicio`, `.state.condenado`, `.state.libre`).
- Agrega más columnas (por ejemplo, “Juzgado”, “Defensor”) modificando la tabla y `script.js`.
- Reemplaza `logo.svg` por otro de tu autoría si deseas un estilo diferente.
