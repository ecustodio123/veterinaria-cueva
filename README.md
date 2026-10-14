# Veterinaria Cueva

Proyecto independiente iniciado a partir de Enros Vet. La interfaz, imágenes y lógica originales se mantienen como base para la futura adaptación a Veterinaria Cueva.

Este proyecto tiene su propio repositorio Git; los cambios aquí no modifican Enros. No se copiaron las credenciales ni el archivo `.env` de Enros. Configura tus propios servicios y tienda antes de conectar el catálogo.

## Configuración heredada de la base

Frontend público de Enro's Vet construido con React y Vite. La web consume productos de Kafka Core desde Supabase en modo solo lectura.

## Variables de entorno

Crear un archivo `.env` local basado en `.env.example`:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_STORE_ID=
VITE_WHATSAPP_PHONE=
```

No usar `service_role`, contraseña de base de datos ni secretos privados en este frontend. La app solo debe utilizar la anon/publishable key pública de Supabase.

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

Para validar producción:

```bash
npm run lint
npm run build
```

## Tienda actual

El catálogo usa temporalmente:

```js
export const CURRENT_STORE_ID = 1
```

La configuración vive en `src/config/store.js`. Más adelante puede reemplazarse por resolución por slug, dominio o configuración remota.

## Lectura de productos

La app reutiliza un cliente centralizado en `src/lib/supabase.js` y consulta productos desde `src/services/products.js`.

La función `getPublicProducts()` lee la tabla `products` filtrando:

- `store_id = 1`
- `active = true`

Los productos se ordenan por `created_at desc`. Los productos con `available = false` se muestran como “Agotado”, sin ocultarse.

## Imágenes

Las imágenes se leen desde Supabase Storage en el bucket público:

```text
product-images
```

El helper `src/services/productImages.js` resuelve cada `image_path` con:

```js
supabase.storage.from('product-images').getPublicUrl(imagePath)
```

El frontend solo lee imágenes. No sube, edita ni elimina archivos.

## Kafka Commerce

La ruta `/tiendas-prueba` renderiza `@ecustodio123/kafka-commerce@0.1.0`, instalado desde GitHub Packages.

Esa vista usa:

- `CommerceStore`
- `@ecustodio123/kafka-commerce/styles.css`
- el cliente compartido de `src/lib/supabase.js`
- `VITE_STORE_ID` como tienda de prueba
- `VITE_WHATSAPP_PHONE` para checkout por WhatsApp

Kafka Commerce filtra productos por `store_id`, muestra solo `active = true`, habilita búsqueda/filtros/carrito y prepara checkout por WhatsApp desde el frontend público.

Para instalar dependencias privadas desde GitHub Packages, el entorno debe tener:

```bash
GITHUB_PACKAGES_TOKEN=token_con_read_packages
```

El token no debe guardarse en `.env` de Vite ni exponerse como variable `VITE_*`.

El theme de Kafka Commerce se configuró con la identidad visual actual del proyecto:

- rojo principal `#f00000`
- naranja de apoyo `#f09010`
- fondo blanco y superficie suave `#fbfaf8`
- texto `#171717`
- borde cálido `#ece7df`
- radio `8px`
- tipografía heredada del sitio

## Seguridad y RLS

Este proyecto actúa como usuario `anon`. Supabase debe permitir lectura pública de productos visibles, por ejemplo productos con `active = true`, y lectura pública del bucket `product-images`.

Política orientativa de solo lectura para productos activos:

```sql
create policy "Public active products are readable"
on public.products
for select
to anon
using (active = true);
```

Este repositorio no implementa:

- login
- roles
- CRUD
- dashboard
- subida de imágenes
- pagos
- carrito
- órdenes
- backend propio
