import {mergeConfig} from 'vite';
import path from 'node:path';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import common from './vite.common.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const r = (p) => path.resolve(__dirname, p);

const SITE_URL = 'https://rude-gestures.vercel.app';

export default mergeConfig(common, {
    mode: 'production',
    base: '/',
    publicDir: r('resources/template'),
    build: {
        outDir: r('public'),
        emptyOutDir: true,
        manifest: false,
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name].[hash]-chunk.js',
                entryFileNames: 'assets/js/[name].[hash].js',
                assetFileNames: 'assets/[ext]/[name].[hash][extname]',
            },
        },
    },
    // vite-ssg 設定
    ssgOptions: {
        script: 'async',
        formatting: 'minify',
        // 顯式列出所有要 prerender 的 routes：首頁 + 404 + 所有 /gesture/:id
        async includedRoutes() {
            const {gestures} = await import('./resources/js/data/gestures.js');
            return [
                '/',
                '/404',
                ...gestures.map((g) => `/gesture/${g.id}`),
            ];
        },
        mock: true,
        // build 完成後產生 sitemap.xml + robots.txt 到 public/
        async onFinished() {
            const {gestures} = await import('./resources/js/data/gestures.js');
            const outDir = r('public');
            const today = new Date().toISOString().split('T')[0];

            const urls = [
                {loc: '/', priority: '1.0', changefreq: 'weekly'},
                ...gestures.map((g) => ({
                    loc: `/gesture/${g.id}`,
                    priority: '0.8',
                    changefreq: 'monthly',
                })),
            ];

            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

            const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

            fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
            fs.writeFileSync(path.join(outDir, 'robots.txt'), robots);
            console.log(`[sitemap] generated ${urls.length} URLs in sitemap.xml + robots.txt`);
        },
    },
});
