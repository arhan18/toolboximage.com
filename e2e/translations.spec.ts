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
  /* Rotator translations */
  { url: '/es/tools/rotator/', present: ['Girar', 'Ángulo Personalizado'] },
  { url: '/fr/tools/rotator/', present: ['Pivoter', 'Angle Personnalisé'] },
  { url: '/de/tools/rotator/', present: ['Drehen', 'Benutzerdefinierter Winkel'] },
  { url: '/it/tools/rotator/', present: ['Ruota', 'Angolo Personalizzato'] },
  { url: '/pt/tools/rotator/', present: ['Girar', 'Ângulo Personalizado'] },
  { url: '/ja/tools/rotator/', present: ['回転', 'カスタム角度'] },
  { url: '/hi/tools/rotator/', present: ['घुमाएं'] },
  { url: '/tr/tools/rotator/', present: ['Döndür', 'Özel Açı'] },
  /* Converter more languages */
  { url: '/it/tools/converter/', present: ['Formato Destinazione', 'Scarica'] },
  { url: '/pt/tools/converter/', present: ['Formato de Destino', 'Baixar'] },
  { url: '/ja/tools/converter/', present: ['変換先形式', 'ダウンロード'] },
  { url: '/hi/tools/converter/', present: ['लक्ष्य प्रारूप', 'डाउनलोड'] },
  /* Resizer more languages */
  { url: '/it/tools/resizer/', present: ['Larghezza', 'Scarica'] },
  { url: '/pt/tools/resizer/', present: ['Largura', 'Baixar'] },
  { url: '/fr/image-tools/', present: ['Tous les Outils d\'Image'] },
  { url: '/de/image-tools/', present: ['Alle Bildtools'] },
  /* Watermark translations (UI falls back to EN) */
  { url: '/es/tools/watermark/', present: ['Watermark Text', 'Apply Watermark'] },
  { url: '/fr/tools/watermark/', present: ['Watermark Text', 'Download'] },
  { url: '/de/tools/watermark/', present: ['Watermark Text', 'Apply Watermark'] },
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
