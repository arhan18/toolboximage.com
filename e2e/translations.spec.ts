import { test, expect } from '@playwright/test';

const LANG_CHECKS: { url: string; present: string[] }[] = [
  { url: '/es/compressor/', present: ['Compresor', 'Suelta tus imágenes'] },
  { url: '/es/tools/converter/', present: ['Formato Destino', 'Descargar'] },
  { url: '/es/tools/resizer/', present: ['Ancho', 'Ajustar'] },
  { url: '/fr/tools/resizer/', present: ['Largeur', 'Préréglages'] },
  { url: '/de/tools/resizer/', present: ['Breite', 'Voreinstellungen'] },
  { url: '/fr/tools/converter/', present: ['Format de Sortie', 'Télécharger'] },
  { url: '/de/tools/converter/', present: ['Zielformat', 'Herunterladen'] },
  { url: '/fr/compressor/', present: ['Compresseur', 'Déposez vos images'] },
  { url: '/de/compressor/', present: ['Kompressor', 'Ziehen Sie Ihre Bilder'] },
  { url: '/ja/compressor/', present: ['圧縮ツール', '画像をドロップ'] },
  { url: '/hi/compressor/', present: ['कंप्रेसर', 'अपनी इमेज ड्रॉप'] },
  { url: '/es/image-tools/', present: ['Todas las Herramientas de Imagen'] },
  { url: '/es/faq/', present: ['Preguntas frecuentes'] },
  { url: '/es/about/', present: ['Acerca de'] },
];

test.describe('Translations render correctly per language', () => {
  for (const { url, present } of LANG_CHECKS) {
    test(`${url} has translated content`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'load' });

      for (const text of present) {
        await expect(page.locator('body')).toContainText(text, { timeout: 10000 });
      }
    });
  }
});

test.describe('Blog post title translations', () => {
  const BLOG_CHECKS: { url: string; text: string }[] = [
    { url: '/es/blog/why-client-side/', text: 'Por qué creamos ToolBox Image' },
    { url: '/fr/blog/why-client-side/', text: 'Pourquoi nous avons conçu' },
    { url: '/de/blog/why-client-side/', text: 'Warum wir ToolBox Image' },
  ];

  for (const { url, text } of BLOG_CHECKS) {
    test(`${url} has translated title`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'load' });
      await expect(page.locator('h1')).toContainText(text, { timeout: 10000 });
    });
  }
});
