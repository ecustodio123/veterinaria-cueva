# Veterinaria Cueva

Frontend React/Vite de Veterinaria Cueva en San Miguel, Lima. Se conserva el diseño original: componentes, rutas, tarjetas, carruseles, tipografías, tamaños, responsive y transiciones. La adaptación cambia identidad, contenido y configuración de datos.

## Desarrollo

```sh
npm install
npm run dev
npm run lint
npm run build
```

La dependencia privada `@ecustodio123/kafka-commerce@0.3.0` se instala desde GitHub Packages mediante `GITHUB_PACKAGES_TOKEN` en el entorno. Nunca exponer ese token como variable `VITE_*`.

La tienda usa navegación `embedded` tanto en desarrollo normal como en producción, coordinada con el header de Cueva. Los imports del paquete y de `styles.css` usan los exports estables publicados; el checkout está configurado exclusivamente para WhatsApp.

`npm run dev:commerce-local` conserva la opción de usar el código local de Commerce para desarrollo. Los aliases solo se activan en ese comando de desarrollo: `npm run dev`, `npm run build` y `npm run preview` resuelven el paquete instalado desde GitHub Packages. Incluso un build con `--mode commerce-local` utiliza el paquete publicado.

## Identidad y contacto

Colores en `src/index.css`: verde `#21CF0A`, negro `#000000` y caramelo `#C79D76`. Se conservan los alias CSS anteriores para no alterar el sistema de estilos ni sus reglas estructurales.

Logo oficial: `src/assets/img/brand/logo.png`. Favicon oficial: `src/assets/favicon/favicon.png`. No se modifican los archivos de imagen; las imágenes anteriores permanecen como placeholders para reemplazo posterior. Los logos anteriores no se referencian en la web.

Los datos editables están centralizados en `src/config/business.js`:

- Teléfono/WhatsApp: +51 992 709 298.
- Dirección: Federico Gallese Taricchi 895, San Miguel, Lima.
- Horario: lunes a sábado, de 9:00 a. m. a 6:00 p. m.
- Dirección, teléfono y horario confirmados directamente por el cliente el 14 de octubre de 2026; sus banderas `confirmed` están en `true`.
- Instagram y Facebook proporcionados por el cliente. Correo y TikTok pendientes, sin enlaces inventados.

Se conserva el carrusel de tres banners y las tres preguntas frecuentes originales, con contenido actualizado. No se publican estadísticas inventadas. El componente de testimonios se conserva sin contenido hasta recibir reseñas autorizadas. Solo queda una presentación del equipo: el carrusel existente, preparado pero oculto mientras falten perfiles y fotografías autorizadas.

Los servicios históricos tienen `pendingConfirmation: true` y textos de consulta de disponibilidad. Los servicios sin respaldo permanecen en la configuración con `published: false`; no se muestran al público. Las imágenes y estilos de las tarjetas se mantienen.

## Tienda y Supabase

Completar `.env.example` en un archivo local ignorado por Git con variables específicas de Cueva:

```sh
VITE_CUEVA_SUPABASE_URL=
VITE_CUEVA_SUPABASE_PUBLISHABLE_KEY=
VITE_CUEVA_STORE_ID=
VITE_CUEVA_STORE_VERIFIED=false
```

Se acepta clave pública publishable o JWT anon, nunca `service_role`, `sb_secret_*` ni contraseñas. Las variables genéricas de otros proyectos se ignoran y no existe un ID predeterminado. El ID debe pertenecer a Cueva; puede ser numérico o UUID según el esquema de Supabase.

Activar la bandera solamente después de verificar externamente que el ID pertenece a Cueva y que los permisos RLS son correctos. La bandera no sustituye las políticas de seguridad del servidor. No se aplican cambios de base de datos desde este frontend.

Sin configuración propia verificada, `/tienda` muestra un estado de catálogo no disponible y remite a WhatsApp. No se crea el cliente Supabase ni se consulta inventario.

La tienda pública `/tienda` utiliza exclusivamente `CommerceStore` de Kafka Commerce 0.2.3. Los enlaces “Tienda” del header y footer apuntan a esa ruta. La antigua `/tiendas-prueba` redirige a `/tienda` para mantener los enlaces anteriores. No se muestra navegación de prueba.

Se retiraron el catálogo anterior de Inicio, sus consultas directas de productos, el carrito simulado, su botón del header y sus estilos. Inicio conserva el resto de sus secciones.

Kafka Commerce gestiona catálogo, categorías, búsqueda, favoritos, carrito y checkout por WhatsApp. Se mantienen su tema, su interfaz y la configuración independiente de Cueva, sin modificar el paquete compartido. Carrito y favoritos se separan por ID de tienda. No se añadieron descuentos, productos ni precios ficticios.

## Publicación pendiente

No se ha realizado commit, push ni deploy. Confirmar los servicios históricos y revisar el inventario, reemplazar placeholders y autorizar las reseñas y perfiles antes de publicar. No se inventó un dominio.

## Comparar tipografías

En desarrollo, el botón **Tipografías** de la esquina inferior izquierda permite alternar entre la tipografía actual y dos propuestas gratuitas. La elección se guarda solo en ese navegador. Para fijar la versión publicada, editar `DEFAULT_TYPOGRAPHY` en `src/config/typography.js`. [Instrucciones, propuestas y licencias](docs/TIPOGRAFIAS.md).

## SEO y conexión con Google

El SEO usa el dominio confirmado `https://veterinariacueva.com/`. Cada build genera metadatos por ruta, datos estructurados, robots y sitemap. Ver [configuración, validación del hosting y pasos de Search Console/Analytics](docs/SEO.md) antes de publicar.
