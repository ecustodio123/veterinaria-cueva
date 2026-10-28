# SEO básico — Veterinaria Cueva

Dominio canónico confirmado: https://veterinariacueva.com/ (sin www).

## Implementación

- `src/config/seo.js`: títulos, descripciones y canonical de Inicio, Servicios, Tienda, Nosotros y Contacto; Open Graph, Twitter y JSON-LD `VeterinaryCare`/`LocalBusiness` con datos confirmados de `business.js`. No incluye reseñas, precios, coordenadas ni servicios inventados. Si cambian los horarios, actualizar también `openingHours` del esquema.
- `build/seo.js`: genera durante `npm run build` un HTML por ruta (`servicios.html`, etc.) con metadatos presentes en el código fuente, además de `robots.txt`, `sitemap.xml` y `404.html`. Publicar **todo** `dist`, no solo `index.html` y assets. El servidor debe servir las rutas limpias desde esos HTML antes de aplicar un fallback SPA.
- `Seo.jsx`: mantiene el mismo head al navegar dentro de React. El sitemap contiene exclusivamente las cinco URLs públicas, sin filtros, búsquedas, carrito, hashes ni `/tiendas-prueba`.
- Imagen social local optimizada en `public/social-cueva.webp`; favicon, idioma español y viewport se conservan.
- Rutas desconocidas muestran una página no encontrada con `noindex`, sin canonical. La ruta histórica `/tiendas-prueba` conserva la redirección de React a `/tienda` y su HTML inicial tiene `noindex` y canonical al destino.
- No se añaden Analytics, cookies, etiquetas de verificación falsas ni nuevas dependencias.

## Revisión de contenido y límites

Las cinco páginas tienen encabezado principal, secciones H2 y tarjetas H3. Commerce añade su propio H1 al de la página Tienda; pertenece al paquete compartido y no se altera su DOM ni estilos desde SEO. Todas las imágenes tienen `alt`; se mantienen vacíos los fondos decorativos y las imágenes de tarjetas cuyo título adyacente ya las describe. Las fotografías del equipo llevan el nombre del profesional.

El contenido principal sigue renderizado en React; **estos HTML no son prerenderizado del contenido**. Google puede ejecutar JavaScript, pero requiere una fase de renderizado y las respuestas públicas de Supabase para Servicios/Staff. Los metadatos sí están disponibles sin ejecutar JavaScript. Verificar el HTML renderizado con la inspección de URL de Search Console. No se garantiza indexación ni resultados enriquecidos.

Permanece el aviso de bundle JavaScript superior a 500 KB (aprox. 2,09 MB sin comprimir / 1,14 MB gzip, incluye Commerce). Los dos slides antiguos aún pesan aproximadamente 724 KB y 1 MB. No son bloqueos de rastreo, pero conviene medir Core Web Vitals con datos reales después de publicar; no se realizó un rediseño ni una reestructuración del paquete.

Antes de estos cambios, el dominio publicado devolvía el HTML de Inicio también para `/robots.txt`, `/sitemap.xml` y una URL inexistente (HTTP 200). Esto debe comprobarse otra vez tras publicar. No se ha cambiado el hosting desde este trabajo.

## Publicación y Search Console

1. Publicar el build completo y comprobar HTTPS y una única variante de dominio. Configurar redirecciones HTTP y www → `https://veterinariacueva.com`, preservando rutas.
2. Verificar que `/servicios`, `/tienda`, `/nosotros` y `/contacto` sirven su propio título/canonical **en Ver código fuente**, no el de Inicio. Comprobar también las variantes con barra final. El canonical siempre apunta a la variante sin barra, excepto Inicio.
3. Configurar el hosting para servir `404.html` con estado HTTP **404** en URLs inexistentes. Vite Preview puede seguir respondiendo 200 por su fallback de desarrollo; el `noindex` de React no sustituye el estado 404 del servidor. Configurar `/tiendas-prueba` → `/tienda` como **301** si el hosting lo permite.
4. Confirmar `/robots.txt` como texto y `/sitemap.xml` como XML, ambos HTTP 200, con cinco URLs de producción. No bloquear assets JS/CSS ni Supabase. Previews de staging deben usar autenticación o `X-Robots-Tag: noindex` desde el hosting; no publicar una configuración de staging en el dominio final.
5. Crear una propiedad **Dominio** en Search Console para `veterinariacueva.com`; agregar el registro TXT de verificación que Google entregue en DNS. No hace falta modificar código para esa modalidad.
6. Enviar `https://veterinariacueva.com/sitemap.xml`. Inspeccionar las cinco URLs mediante la prueba en vivo: respuesta, HTML renderizado, canonical y Servicios/Staff. Solicitar indexación después de comprobarlas.
7. Validar el JSON-LD con Schema Markup Validator y la prueba de resultados enriquecidos de Google. Comprobar teléfono, dirección y horario con la ficha real de Google Business Profile.
8. Para Analytics, crear posteriormente una propiedad GA4 y obtener su ID `G-...`. Elegir una sola integración (gtag o Tag Manager), preparar consentimiento cuando corresponda y probar páginas vistas de navegación SPA sin duplicados. No se instala seguimiento en esta etapa.

Referencias: [SEO para JavaScript de Google](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [datos de negocios locales](https://developers.google.com/search/docs/appearance/structured-data/local-business), [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro).
