import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { getBusinessSchema, getSeo, getSeoTags, seoPages, siteUrl } from '../src/config/seo.js'

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const marker = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/

function renderHead(path) {
  const seo = getSeo(path)
  const tags = getSeoTags(path).map(([tag, attrs]) => `<${tag} data-cueva-seo ${Object.entries(attrs).map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(' ')} />`)
  if (seoPages[path]) tags.push(`<script data-cueva-seo type="application/ld+json">${JSON.stringify(getBusinessSchema()).replaceAll('<', '\\u003c')}</script>`)
  return `<!-- seo:start -->\n<title>${escapeHtml(seo.title)}</title>\n${tags.join('\n')}\n<!-- seo:end -->`
}

// Static route heads also work for link previews that do not execute React.
export function seoPlugin() {
  let outDir
  return {
    name: 'cueva-seo',
    enforce: 'post',
    configResolved(config) { outDir = resolve(config.root, config.build.outDir) },
    transformIndexHtml(html) { return html.replace(marker, renderHead('/')) },
    writeBundle() {
      const template = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      for (const path of [...Object.keys(seoPages).filter(path => path !== '/'), '/tiendas-prueba']) {
        writeFileSync(resolve(outDir, `${path.slice(1)}.html`), template.replace(marker, renderHead(path)))
      }
      writeFileSync(resolve(outDir, '404.html'), template.replace(marker, renderHead('/404')))
      writeFileSync(resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
      const urls = Object.keys(seoPages).map(path => `<url><loc>${siteUrl}${path === '/' ? '/' : path}</loc></url>`).join('\n')
      writeFileSync(resolve(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
    },
  }
}
