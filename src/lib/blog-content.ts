import type { LangCode } from '../i18n';

export interface BlogTranslation {
  title: Record<LangCode, string>;
  description: Record<LangCode, string>;
  tags: Record<LangCode, string[]>;
  body: Record<LangCode, string>;
}

function t(
  title: Record<LangCode, string>,
  description: Record<LangCode, string>,
  tags: Record<LangCode, string[]>,
  body: Record<LangCode, string>,
): BlogTranslation {
  return { title, description, tags, body };
}

const en = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

const es = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

const fr = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

const de = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

const it = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

const pt = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

const ru = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

const zh = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

const ja = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

const ko = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

const ar = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

const hi = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

const tr = (strings: TemplateStringsArray, ...values: unknown[]): string => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) result += String(values[i]);
  }
  return result;
};

export const blogTranslations: Record<string, BlogTranslation> = {
  'why-client-side': t(
    {
      en: 'Why we built ToolBox Image to run entirely in your browser',
      es: 'Por qué creamos ToolBox Image para que funcione completamente en tu navegador',
      fr: 'Pourquoi nous avons conçu ToolBox Image pour fonctionner entièrement dans votre navigateur',
      de: 'Warum wir ToolBox Image gebaut haben, um vollständig in Ihrem Browser zu laufen',
      it: 'Perché abbiamo creato ToolBox Image per funzionare interamente nel tuo browser',
      pt: 'Por que criamos o ToolBox Image para funcionar inteiramente no seu navegador',
      ru: 'Почему мы создали ToolBox Image для работы полностью в вашем браузере',
      zh: '为什么我们构建 ToolBox Image 使其完全在浏览器中运行',
      ja: 'ToolBox Imageをブラウザだけで完結するように作った理由',
      ko: '완전히 브라우저에서 작동하는 ToolBox Image를 만든 이유',
      ar: 'لماذا بنينا ToolBox Image ليعمل بالكامل في متصفحك',
      hi: 'हमने ToolBox Image को पूरी तरह से आपके ब्राउज़र में चलने के लिए क्यों बनाया',
      tr: "ToolBox Image'i neden tamamen tarayıcınızda çalışacak şekilde oluşturduk",
    },
    {
      en: 'A walkthrough of the architecture behind a privacy-first image toolkit — and why the browser turned out to be the right place for it.',
      es: 'Un recorrido por la arquitectura detrás de un conjunto de herramientas de imágenes centrado en la privacidad — y por qué el navegador resultó ser el lugar adecuado.',
      fr: 'Une présentation de l\'architecture derrière une boîte à outils d\'images respectueuse de la vie privée — et pourquoi le navigateur s\'est avéré être le bon endroit.',
      de: 'Ein Rundgang durch die Architektur hinter einem datenschutzorientierten Bildwerkzeugkasten — und warum der Browser der richtige Ort dafür ist.',
      it: 'Un\'analisi dell\'architettura alla base di un kit di strumenti per immagini incentrato sulla privacy — e perché il browser si è rivelato il posto giusto.',
      pt: 'Um passeio pela arquitetura por trás de um kit de ferramentas de imagem focado em privacidade — e por que o navegador se mostrou o lugar certo.',
      ru: 'Обзор архитектуры, лежащей в основе набора инструментов для работы с изображениями, ориентированного на конфиденциальность — и почему браузер оказался правильным выбором.',
      zh: '隐私优先图像工具包背后的架构解析 — 以及为什么浏览器是最合适的选择。',
      ja: 'プライバシー優先の画像ツールキットの背後にあるアーキテクチャの解説 — そしてブラウザが最適な場所である理由。',
      ko: '프라이버시 중심 이미지 도구 키트의 아키텍처 살펴보기 — 브라우저가 왜 최적의 장소인지 알아봅니다.',
      ar: 'نظرة على الهندسة المعمارية وراء مجموعة أدوات الصور التي تركز على الخصوصية — ولماذا كان المتصفح المكان المناسب لها.',
      hi: 'गोपनीयता-प्रथम इमेज टूलकिट के पीछे की आर्किटेक्चर की एक झलक — और क्यों ब्राउज़र इसके लिए सही जगह साबित हुआ।',
      tr: 'Gizlilik odaklı bir görüntü araç setinin arkasındaki mimariye bir bakış — ve tarayıcının neden bunun için doğru yer olduğu.',
    },
    {
      en: ['privacy', 'architecture', 'webassembly', 'client-side'],
      es: ['privacidad', 'arquitectura', 'webassembly', 'lado-del-cliente'],
      fr: ['confidentialité', 'architecture', 'webassembly', 'côté-client'],
      de: ['datenschutz', 'architektur', 'webassembly', 'client-seitig'],
      it: ['privacy', 'architettura', 'webassembly', 'lato-client'],
      pt: ['privacidade', 'arquitetura', 'webassembly', 'lado-do-cliente'],
      ru: ['конфиденциальность', 'архитектура', 'webassembly', 'на-стороне-клиента'],
      zh: ['隐私', '架构', 'webassembly', '客户端'],
      ja: ['プライバシー', 'アーキテクチャ', 'webassembly', 'クライアントサイド'],
      ko: ['프라이버시', '아키텍처', 'webassembly', '클라이언트-사이드'],
      ar: ['خصوصية', 'هندسة-معمارية', 'webassembly', 'جانب-العميل'],
      hi: ['गोपनीयता', 'आर्किटेक्चर', 'webassembly', 'क्लाइंट-साइड'],
      tr: ['gizlilik', 'mimari', 'webassembly', 'istemci-tarafı'],
    },
    {
      en: `<p>Most free online image tools work the same way: you upload a file to their server, the server processes it, and you download the result. That model is simple to build, but it comes with hidden costs — your privacy, their server bills, and limits on file size and throughput.</p>
<p>ToolBox Image takes a different approach. The entire application — decoding, encoding, compression, resizing, format conversion — runs in your browser. There is no server to upload to. Your images never leave your device. This architecture was a deliberate choice, and it shaped every decision we made about the product.</p>
<h2>Why the browser-first approach?</h2>
<p>The obvious alternative is a traditional server-side architecture. You upload an image, the server runs it through a tool like ImageMagick or Sharp, and sends the result back. This works, but it creates a set of problems that are hard to solve:</p>
<ul>
<li><strong>Privacy.</strong> Users have to trust that you won't store, analyse, or leak their images. For sensitive documents — medical images, design mockups, personal photos — that trust is hard to earn.</li>
<li><strong>Cost.</strong> Every compression runs on your infrastructure. The more successful you are, the more you pay. This creates pressure to limit file sizes, add queues, or introduce paid tiers.</li>
<li><strong>Latency.</strong> Uploading a 100 MB file over a slow connection takes minutes before processing even starts. For users in regions with poor connectivity, the tool is effectively unusable.</li>
<li><strong>Scale.</strong> A single server can handle dozens of concurrent compressions. But what about thousands? You need auto-scaling groups, load balancers, CDN upload endpoints — all of which add complexity and cost.</li>
</ul>
<p>The browser-first model solves all of these at once. Processing is free (the user's CPU cycles), private (no data leaves the device), and infinitely scalable (every user brings their own hardware).</p>
<h2>Making it work: WebAssembly and Web Workers</h2>
<p>Ten years ago, running image codecs in the browser was impossible. Today, WebAssembly lets us compile C and Rust libraries directly to a format the browser can execute at near-native speed. We compile Mozilla's mozJPEG, Google's libwebp, and the libaom AVIF encoder — all written in C — to WebAssembly. The browser runs them as efficiently as if they were installed natively.</p>
<p>But single-threaded encoding is slow for large batches. That is where Web Workers come in. Each worker runs on a separate CPU core, and we spawn as many workers as the device has cores. On a modern laptop with 8 cores, that means 8 images compressing simultaneously. A batch of 200 photos that would take minutes on a single thread finishes in seconds.</p>
<h2>What we gave up</h2>
<p>The browser-first approach is not free. The most significant trade-off is memory. The browser tab has access to the device's RAM, but a single tab crashing because an image exceeded available memory is a bad experience. We cap individual files at 100 MB and batch sizes at 200 files to stay within safe limits.</p>
<p>We also gave up server-side features like persistent storage, email delivery, and analytics. There is no database of compressed images, no email newsletter, no tracking of which formats users prefer. This is philosophically consistent with our privacy stance, but it means we cannot offer features like "recent compressions" or "saved presets between sessions."</p>
<h2>What's next</h2>
<p>The browser is becoming a legitimate runtime for performance-sensitive applications. As WebAssembly gains garbage collection, threading, and SIMD support, more of the application stack can move client-side. We are exploring WebGPU for even faster pixel processing and the File System Access API for seamless folder integration.</p>
<p>For now, the compressor is live and processing thousands of images per day — all of them staying right where they belong.</p>`,
      es: `<p>La mayoría de las herramientas gratuitas de imágenes en línea funcionan igual: subes un archivo a su servidor, el servidor lo procesa y descargas el resultado. Ese modelo es simple de construir, pero tiene costos ocultos: tu privacidad, sus facturas de servidor y límites en el tamaño de archivo y rendimiento.</p>
<p>ToolBox Image adopta un enfoque diferente. Toda la aplicación — decodificación, codificación, compresión, redimensionamiento, conversión de formato — se ejecuta en tu navegador. No hay ningún servidor al que subir archivos. Tus imágenes nunca salen de tu dispositivo. Esta arquitectura fue una elección deliberada y moldeó cada decisión que tomamos sobre el producto.</p>
<h2>¿Por qué el enfoque basado en el navegador?</h2>
<p>La alternativa obvia es una arquitectura tradicional de servidor. Subes una imagen, el servidor la procesa con una herramienta como ImageMagick o Sharp y devuelve el resultado. Esto funciona, pero crea una serie de problemas difíciles de resolver:</p>
<ul>
<li><strong>Privacidad.</strong> Los usuarios tienen que confiar en que no almacenarás, analizarás o filtrarás sus imágenes. Para documentos sensibles — imágenes médicas, maquetas de diseño, fotos personales — esa confianza es difícil de ganar.</li>
<li><strong>Costo.</strong> Cada compresión se ejecuta en tu infraestructura. Cuanto más éxito tengas, más pagas. Esto crea presión para limitar tamaños de archivo, añadir colas o introducir niveles de pago.</li>
<li><strong>Latencia.</strong> Subir un archivo de 100 MB en una conexión lenta lleva minutos antes de que comience el procesamiento. Para usuarios en regiones con mala conectividad, la herramienta es efectivamente inutilizable.</li>
<li><strong>Escalabilidad.</strong> Un solo servidor puede manejar docenas de compresiones concurrentes. ¿Pero qué pasa con miles? Necesitas grupos de autoescalado, balanceadores de carga, endpoints CDN — todo lo cual añade complejidad y costo.</li>
</ul>
<p>El modelo basado en navegador resuelve todo esto de una vez. El procesamiento es gratuito (los ciclos de CPU del usuario), privado (ningún dato sale del dispositivo) e infinitamente escalable (cada usuario aporta su propio hardware).</p>
<h2>Cómo funciona: WebAssembly y Web Workers</h2>
<p>Hace diez años, ejecutar códecs de imagen en el navegador era imposible. Hoy, WebAssembly nos permite compilar bibliotecas de C y Rust directamente a un formato que el navegador puede ejecutar a velocidad casi nativa. Compilamos mozJPEG de Mozilla, libwebp de Google y el codificador AVIF libaom — todos escritos en C — a WebAssembly. El navegador los ejecuta tan eficientemente como si estuvieran instalados de forma nativa.</p>
<p>Pero la codificación de un solo hilo es lenta para lotes grandes. Ahí es donde entran los Web Workers. Cada worker se ejecuta en un núcleo de CPU independiente, y generamos tantos workers como núcleos tenga el dispositivo. En un portátil moderno con 8 núcleos, eso significa 8 imágenes comprimiéndose simultáneamente. Un lote de 200 fotos que llevaría minutos en un solo hilo termina en segundos.</p>
<h2>Lo que sacrificamos</h2>
<p>El enfoque basado en el navegador no es gratuito. La concesión más significativa es la memoria. La pestaña del navegador tiene acceso a la RAM del dispositivo, pero que una sola pestaña se bloquee porque una imagen superó la memoria disponible es una mala experiencia. Limitamos los archivos individuales a 100 MB y los lotes a 200 archivos para mantenernos dentro de límites seguros.</p>
<p>También sacrificamos funciones del lado del servidor como almacenamiento persistente, entrega de correos electrónicos y análisis. No hay base de datos de imágenes comprimidas, no hay boletín informativo, no hay seguimiento de qué formatos prefieren los usuarios. Esto es filosóficamente coherente con nuestra postura de privacidad, pero significa que no podemos ofrecer funciones como "compresiones recientes" o "ajustes guardados entre sesiones".</p>
<h2>Qué sigue</h2>
<p>El navegador se está convirtiendo en un entorno de ejecución legítimo para aplicaciones sensibles al rendimiento. A medida que WebAssembly obtenga recolección de basura, subprocesos y soporte SIMD, más partes de la pila de aplicaciones pueden moverse al lado del cliente. Estamos explorando WebGPU para un procesamiento de píxeles aún más rápido y la API de Acceso al Sistema de Archivos para una integración perfecta de carpetas.</p>
<p>Por ahora, el compresor está activo y procesa miles de imágenes al día — todas permaneciendo exactamente donde deben estar.</p>`,
      fr: `<p>La plupart des outils de traitement d'images en ligne gratuits fonctionnent de la même manière : vous téléchargez un fichier sur leur serveur, le serveur le traite, et vous téléchargez le résultat. Ce modèle est simple à construire, mais il a des coûts cachés — votre vie privée, leurs factures de serveur, et des limites sur la taille des fichiers et le débit.</p>
<p>ToolBox Image adopte une approche différente. L'ensemble de l'application — décodage, encodage, compression, redimensionnement, conversion de format — s'exécute dans votre navigateur. Il n'y a pas de serveur pour télécharger. Vos images ne quittent jamais votre appareil. Cette architecture était un choix délibéré, et elle a façonné chaque décision que nous avons prise concernant le produit.</p>
<h2>Pourquoi l'approche navigateur d'abord ?</h2>
<p>L'alternative évidente est une architecture traditionnelle côté serveur. Vous téléchargez une image, le serveur la traite avec un outil comme ImageMagick ou Sharp, et renvoie le résultat. Cela fonctionne, mais crée un ensemble de problèmes difficiles à résoudre :</p>
<ul>
<li><strong>Vie privée.</strong> Les utilisateurs doivent faire confiance au fait que vous ne stockerez, n'analyserez ou ne divulguerez pas leurs images. Pour les documents sensibles — images médicales, maquettes de design, photos personnelles — cette confiance est difficile à gagner.</li>
<li><strong>Coût.</strong> Chaque compression s'exécute sur votre infrastructure. Plus vous avez de succès, plus vous payez. Cela crée une pression pour limiter les tailles de fichiers, ajouter des files d'attente ou introduire des niveaux payants.</li>
<li><strong>Latence.</strong> Télécharger un fichier de 100 Mo sur une connexion lente prend des minutes avant même que le traitement ne commence. Pour les utilisateurs dans des régions avec une mauvaise connectivité, l'outil est effectivement inutilisable.</li>
<li><strong>Évolutivité.</strong> Un seul serveur peut gérer des dizaines de compressions simultanées. Mais des milliers ? Vous avez besoin de groupes d'auto-scaling, d'équilibreurs de charge, de points de terminaison CDN — tout cela ajoute de la complexité et du coût.</li>
</ul>
<p>Le modèle basé sur le navigateur résout tout cela à la fois. Le traitement est gratuit (cycles CPU de l'utilisateur), privé (aucune donnée ne quitte l'appareil) et infiniment évolutif (chaque utilisateur apporte son propre matériel).</p>
<h2>Comment ça marche : WebAssembly et Web Workers</h2>
<p>Il y a dix ans, exécuter des codecs d'image dans le navigateur était impossible. Aujourd'hui, WebAssembly nous permet de compiler des bibliothèques C et Rust directement dans un format que le navigateur peut exécuter à une vitesse quasi-native. Nous compilons mozJPEG de Mozilla, libwebp de Google et l'encodeur AVIF libaom — tous écrits en C — en WebAssembly. Le navigateur les exécute aussi efficacement que s'ils étaient installés nativement.</p>
<p>Mais l'encodage monothread est lent pour les grands lots. C'est là que les Web Workers entrent en jeu. Chaque worker s'exécute sur un cœur CPU séparé, et nous créons autant de workers que l'appareil a de cœurs. Sur un ordinateur portable moderne avec 8 cœurs, cela signifie 8 images compressées simultanément. Un lot de 200 photos qui prendrait des minutes sur un seul thread se termine en secondes.</p>
<h2>Ce que nous avons sacrifié</h2>
<p>L'approche basée sur le navigateur n'est pas gratuite. Le compromis le plus important est la mémoire. L'onglet du navigateur a accès à la RAM de l'appareil, mais un seul onglet qui plante parce qu'une image a dépassé la mémoire disponible est une mauvaise expérience. Nous plafonnons les fichiers individuels à 100 Mo et les tailles de lots à 200 fichiers pour rester dans des limites sûres.</p>
<p>Nous avons également sacrifié les fonctionnalités côté serveur comme le stockage persistant, la livraison d'e-mails et les analyses. Il n'y a pas de base de données d'images compressées, pas de newsletter, pas de suivi des formats préférés des utilisateurs. C'est philosophiquement cohérent avec notre position sur la vie privée, mais cela signifie que nous ne pouvons pas offrir des fonctionnalités comme "compressions récentes" ou "préréglages sauvegardés entre sessions".</p>
<h2>Prochaines étapes</h2>
<p>Le navigateur devient un environnement d'exécution légitime pour les applications sensibles aux performances. Alors que WebAssembly gagne le ramasse-miettes, le multithreading et le support SIMD, une plus grande partie de la pile applicative peut passer côté client. Nous explorons WebGPU pour un traitement des pixels encore plus rapide et l'API File System Access pour une intégration transparente des dossiers.</p>
<p>Pour l'instant, le compresseur est en ligne et traite des milliers d'images par jour — toutes restant là où elles doivent être.</p>`,
      de: `<p>Die meisten kostenlosen Online-Bildtools funktionieren auf die gleiche Weise: Sie laden eine Datei auf deren Server hoch, der Server verarbeitet sie, und Sie laden das Ergebnis herunter. Dieses Modell ist einfach zu erstellen, hat aber versteckte Kosten — Ihre Privatsphäre, deren Serverrechnungen und Grenzen bei Dateigröße und Durchsatz.</p>
<p>ToolBox Image verfolgt einen anderen Ansatz. Die gesamte Anwendung — Dekodierung, Kodierung, Komprimierung, Größenänderung, Formatkonvertierung — läuft in Ihrem Browser. Es gibt keinen Server zum Hochladen. Ihre Bilder verlassen nie Ihr Gerät. Diese Architektur war eine bewusste Entscheidung und hat jede Entscheidung beeinflusst, die wir über das Produkt getroffen haben.</p>
<h2>Warum der Browser-First-Ansatz?</h2>
<p>Die naheliegende Alternative ist eine traditionelle Server-Architektur. Sie laden ein Bild hoch, der Server verarbeitet es mit einem Tool wie ImageMagick oder Sharp und sendet das Ergebnis zurück. Das funktioniert, schafft aber eine Reihe von Problemen, die schwer zu lösen sind:</p>
<ul>
<li><strong>Datenschutz.</strong> Benutzer müssen darauf vertrauen, dass Sie ihre Bilder nicht speichern, analysieren oder preisgeben. Für sensible Dokumente — medizinische Bilder, Design-Mockups, persönliche Fotos — ist dieses Vertrauen schwer zu gewinnen.</li>
<li><strong>Kosten.</strong> Jede Komprimierung läuft auf Ihrer Infrastruktur. Je erfolgreicher Sie sind, desto mehr zahlen Sie. Dies erzeugt Druck, Dateigrößen zu begrenzen, Warteschlangen hinzuzufügen oder kostenpflichtige Stufen einzuführen.</li>
<li><strong>Latenz.</strong> Das Hochladen einer 100 MB-Datei über eine langsame Verbindung dauert Minuten, bevor die Verarbeitung überhaupt beginnt. Für Benutzer in Regionen mit schlechter Konnektivität ist das Tool praktisch unbrauchbar.</li>
<li><strong>Skalierung.</strong> Ein einzelner Server kann Dutzende gleichzeitiger Komprimierungen bewältigen. Aber was ist mit Tausenden? Sie benötigen Auto-Scaling-Gruppen, Load-Balancer, CDN-Upload-Endpunkte — all das erhöht Komplexität und Kosten.</li>
</ul>
<p>Das Browser-First-Modell löst all dies auf einmal. Die Verarbeitung ist kostenlos (CPU-Zyklen des Benutzers), privat (keine Daten verlassen das Gerät) und unendlich skalierbar (jeder Benutzer bringt seine eigene Hardware mit).</p>
<h2>Wie es funktioniert: WebAssembly und Web Workers</h2>
<p>Vor zehn Jahren war es unmöglich, Bildcodecs im Browser auszuführen. Heute ermöglicht uns WebAssembly, C- und Rust-Bibliotheken direkt in ein Format zu kompilieren, das der Browser mit nahezu nativer Geschwindigkeit ausführen kann. Wir kompilieren Mozillas mozJPEG, Googles libwebp und den AVIF-Encoder libaom — alle in C geschrieben — zu WebAssembly. Der Browser führt sie so effizient aus, als wären sie nativ installiert.</p>
<p>Aber die Single-Thread-Kodierung ist für große Stapel langsam. Hier kommen Web Workers ins Spiel. Jeder Worker läuft auf einem separaten CPU-Kern, und wir erstellen so viele Worker, wie das Gerät Kerne hat. Auf einem modernen Laptop mit 8 Kernen bedeutet das 8 gleichzeitig komprimierte Bilder. Ein Stapel von 200 Fotos, der auf einem einzelnen Thread Minuten dauern würde, ist in Sekunden erledigt.</p>
<h2>Was wir aufgegeben haben</h2>
<p>Der Browser-First-Ansatz ist nicht kostenlos. Der bedeutendste Kompromiss ist der Speicher. Der Browser-Tab hat Zugriff auf den RAM des Geräts, aber ein einzelner Tab, der abstürzt, weil ein Bild den verfügbaren Speicher überschritten hat, ist eine schlechte Erfahrung. Wir begrenzen einzelne Dateien auf 100 MB und Stapelgrößen auf 200 Dateien, um innerhalb sicherer Grenzen zu bleiben.</p>
<p>Wir haben auch Server-seitige Funktionen wie persistenten Speicher, E-Mail-Zustellung und Analysen aufgegeben. Es gibt keine Datenbank mit komprimierten Bildern, keinen E-Mail-Newsletter, keine Verfolgung, welche Formate Benutzer bevorzugen. Dies ist philosophisch konsistent mit unserer Datenschutzhaltung, bedeutet aber, dass wir keine Funktionen wie "letzte Komprimierungen" oder "gespeicherte Einstellungen zwischen Sitzungen" anbieten können.</p>
<h2>Was als nächstes kommt</h2>
<p>Der Browser wird zu einer legitimen Laufzeitumgebung für leistungsempfindliche Anwendungen. Da WebAssembly Garbage Collection, Threading und SIMD-Unterstützung erhält, kann mehr des Anwendungsstapels clientseitig verlagert werden. Wir erkunden WebGPU für noch schnellere Pixelverarbeitung und die File System Access API für nahtlose Ordnerintegration.</p>
<p>Vorerst ist der Kompressor live und verarbeitet täglich Tausende von Bildern — alle bleiben genau dort, wo sie hingehören.</p>`,
      it: `<p>La maggior parte degli strumenti gratuiti per immagini online funzionano allo stesso modo: carichi un file sul loro server, il server lo elabora e scarichi il risultato. Quel modello è semplice da costruire, ma comporta costi nascosti — la tua privacy, le loro fatture del server e limiti sulla dimensione dei file e sulla velocità effettiva.</p>
<p>ToolBox Image adotta un approccio diverso. L'intera applicazione — decodifica, codifica, compressione, ridimensionamento, conversione di formato — viene eseguita nel tuo browser. Non c'è un server a cui caricare i file. Le tue immagini non lasciano mai il tuo dispositivo. Questa architettura è stata una scelta deliberata e ha plasmato ogni decisione che abbiamo preso sul prodotto.</p>
<h2>Perché l'approccio browser-first?</h2>
<p>L'alternativa ovvia è un'architettura tradizionale lato server. Carichi un'immagine, il server la elabora con uno strumento come ImageMagick o Sharp e rimanda il risultato. Funziona, ma crea una serie di problemi difficili da risolvere:</p>
<ul>
<li><strong>Privacy.</strong> Gli utenti devono fidarsi che non memorizzerai, analizzerai o divulgherai le loro immagini. Per documenti sensibili — immagini mediche, mockup di design, foto personali — quella fiducia è difficile da guadagnare.</li>
<li><strong>Costo.</strong> Ogni compressione viene eseguita sulla tua infrastruttura. Più successo hai, più paghi. Questo crea pressione per limitare le dimensioni dei file, aggiungere code o introdurre livelli a pagamento.</li>
<li><strong>Latenza.</strong> Caricare un file da 100 MB su una connessione lenta richiede minuti prima che l'elaborazione inizi. Per gli utenti in regioni con scarsa connettività, lo strumento è effettivamente inutilizzabile.</li>
<li><strong>Scalabilità.</strong> Un singolo server può gestire decine di compressioni simultanee. Ma cosa succede con migliaia? Hai bisogno di gruppi di auto-scaling, bilanciatori di carico, endpoint CDN — tutto ciò aggiunge complessità e costi.</li>
</ul>
<p>Il modello browser-first risolve tutto questo in una volta. L'elaborazione è gratuita (cicli CPU dell'utente), privata (nessun dato lascia il dispositivo) e infinitamente scalabile (ogni utente porta il proprio hardware).</p>
<h2>Come funziona: WebAssembly e Web Workers</h2>
<p>Dieci anni fa, eseguire codec di immagini nel browser era impossibile. Oggi, WebAssembly ci permette di compilare librerie C e Rust direttamente in un formato che il browser può eseguire a velocità quasi nativa. Compiliamo mozJPEG di Mozilla, libwebp di Google e il codificatore AVIF libaom — tutti scritti in C — in WebAssembly. Il browser li esegue con la stessa efficienza di se fossero installati nativamente.</p>
<p>Ma la codifica a thread singolo è lenta per lotti grandi. È qui che entrano in gioco i Web Worker. Ogni worker viene eseguito su un core CPU separato, e generiamo tanti worker quanti sono i core del dispositivo. Su un laptop moderno con 8 core, ciò significa 8 immagini che si comprimono simultaneamente. Un lotto di 200 foto che richiederebbe minuti su un singolo thread si completa in secondi.</p>
<h2>Cosa abbiamo sacrificato</h2>
<p>L'approccio browser-first non è gratuito. Il compromesso più significativo è la memoria. La scheda del browser ha accesso alla RAM del dispositivo, ma una singola scheda che si blocca perché un'immagine ha superato la memoria disponibile è una brutta esperienza. Limitiamo i singoli file a 100 MB e le dimensioni dei lotti a 200 file per rimanere entro limiti sicuri.</p>
<p>Abbiamo anche sacrificato funzionalità lato server come archiviazione persistente, consegna di email e analisi. Non c'è un database di immagini compresse, nessuna newsletter, nessun monitoraggio di quali formati gli utenti preferiscono. Questo è filosoficamente coerente con la nostra posizione sulla privacy, ma significa che non possiamo offrire funzionalità come "compressioni recenti" o "impostazioni salvate tra sessioni".</p>
<h2>Cosa c'è dopo</h2>
<p>Il browser sta diventando un runtime legittimo per applicazioni sensibili alle prestazioni. Man mano che WebAssembly ottiene garbage collection, threading e supporto SIMD, più parti dello stack applicativo possono spostarsi lato client. Stiamo esplorando WebGPU per un'elaborazione dei pixel ancora più veloce e l'API File System Access per un'integrazione perfetta delle cartelle.</p>
<p>Per ora, il compressore è attivo e elabora migliaia di immagini al giorno — tutte rimanendo esattamente dove devono stare.</p>`,
      pt: `<p>A maioria das ferramentas gratuitas de imagens online funciona da mesma forma: você envia um arquivo para o servidor deles, o servidor processa e você baixa o resultado. Esse modelo é simples de construir, mas tem custos ocultos — sua privacidade, as contas de servidor deles e limites no tamanho do arquivo e na taxa de transferência.</p>
<p>O ToolBox Image adota uma abordagem diferente. Todo o aplicativo — decodificação, codificação, compressão, redimensionamento, conversão de formato — é executado no seu navegador. Não há servidor para enviar arquivos. Suas imagens nunca saem do seu dispositivo. Essa arquitetura foi uma escolha deliberada e moldou cada decisão que tomamos sobre o produto.</p>
<h2>Por que a abordagem baseada no navegador?</h2>
<p>A alternativa óbvia é uma arquitetura tradicional de servidor. Você envia uma imagem, o servidor a processa com uma ferramenta como ImageMagick ou Sharp e envia o resultado de volta. Isso funciona, mas cria uma série de problemas difíceis de resolver:</p>
<ul>
<li><strong>Privacidade.</strong> Os usuários precisam confiar que você não armazenará, analisará ou vazará suas imagens. Para documentos sensíveis — imagens médicas, maquetes de design, fotos pessoais — essa confiança é difícil de conquistar.</li>
<li><strong>Custo.</strong> Cada compressão é executada em sua infraestrutura. Quanto mais sucesso você tem, mais paga. Isso cria pressão para limitar tamanhos de arquivo, adicionar filas ou introduzir níveis pagos.</li>
<li><strong>Latência.</strong> Enviar um arquivo de 100 MB em uma conexão lenta leva minutos antes mesmo do processamento começar. Para usuários em regiões com conectividade ruim, a ferramenta é efetivamente inutilizável.</li>
<li><strong>Escala.</strong> Um único servidor pode lidar com dezenas de compressões simultâneas. Mas e milhares? Você precisa de grupos de autoescalonamento, balanceadores de carga, endpoints de CDN — tudo isso adiciona complexidade e custo.</li>
</ul>
<p>O modelo baseado no navegador resolve tudo isso de uma vez. O processamento é gratuito (ciclos de CPU do usuário), privado (nenhum dado sai do dispositivo) e infinitamente escalável (cada usuário traz seu próprio hardware).</p>
<h2>Como funciona: WebAssembly e Web Workers</h2>
<p>Dez anos atrás, executar codecs de imagem no navegador era impossível. Hoje, o WebAssembly nos permite compilar bibliotecas C e Rust diretamente em um formato que o navegador pode executar em velocidade quase nativa. Compilamos o mozJPEG da Mozilla, o libwebp do Google e o codificador AVIF libaom — todos escritos em C — para WebAssembly. O navegador os executa tão eficientemente quanto se estivessem instalados nativamente.</p>
<p>Mas a codificação de thread único é lenta para lotes grandes. É aí que entram os Web Workers. Cada worker é executado em um núcleo de CPU separado, e geramos tantos workers quanto o dispositivo tem núcleos. Em um laptop moderno com 8 núcleos, isso significa 8 imagens comprimindo simultaneamente. Um lote de 200 fotos que levaria minutos em um único thread termina em segundos.</p>
<h2>O que sacrificamos</h2>
<p>A abordagem baseada no navegador não é gratuita. A troca mais significativa é a memória. A aba do navegador tem acesso à RAM do dispositivo, mas uma única aba travando porque uma imagem excedeu a memória disponível é uma experiência ruim. Limitamos arquivos individuais a 100 MB e lotes a 200 arquivos para permanecer dentro de limites seguros.</p>
<p>Também sacrificamos recursos do lado do servidor como armazenamento persistente, entrega de e-mail e análises. Não há banco de dados de imagens comprimidas, nenhum boletim informativo, nenhum rastreamento de quais formatos os usuários preferem. Isso é filosoficamente consistente com nossa postura de privacidade, mas significa que não podemos oferecer recursos como "compressões recentes" ou "configurações salvas entre sessões".</p>
<h2>O que vem a seguir</h2>
<p>O navegador está se tornando um ambiente de execução legítimo para aplicações sensíveis a desempenho. À medida que o WebAssembly ganha coleta de lixo, threading e suporte SIMD, mais partes da pilha de aplicativos podem se mover para o lado do cliente. Estamos explorando WebGPU para processamento de pixels ainda mais rápido e a API File System Access para integração perfeita de pastas.</p>
<p>Por enquanto, o compressor está ativo e processando milhares de imagens por dia — todas permanecendo exatamente onde deveriam estar.</p>`,
      ru: `<p>Большинство бесплатных онлайн-инструментов для работы с изображениями работают одинаково: вы загружаете файл на их сервер, сервер обрабатывает его, и вы скачиваете результат. Эту модель просто создать, но у неё есть скрытые затраты — ваша конфиденциальность, счета за сервер и ограничения на размер файлов и пропускную способность.</p>
<p>ToolBox Image использует другой подход. Всё приложение — декодирование, кодирование, сжатие, изменение размера, конвертация форматов — работает в вашем браузере. Нет сервера для загрузки. Ваши изображения никогда не покидают ваше устройство. Эта архитектура была осознанным выбором и повлияла на каждое решение, которое мы приняли о продукте.</p>
<h2>Почему подход с优先тетом браузера?</h2>
<p>Очевидная альтернатива — традиционная серверная архитектура. Вы загружаете изображение, сервер обрабатывает его с помощью инструмента вроде ImageMagick или Sharp и отправляет результат обратно. Это работает, но создаёт ряд проблем, которые трудно решить:</p>
<ul>
<li><strong>Конфиденциальность.</strong> Пользователи должны доверять, что вы не будете хранить, анализировать или разглашать их изображения. Для конфиденциальных документов — медицинских снимков, дизайн-макетов, личных фото — это доверие трудно заслужить.</li>
<li><strong>Стоимость.</strong> Каждое сжатие выполняется на вашей инфраструктуре. Чем больше у вас успех, тем больше вы платите. Это создаёт давление, чтобы ограничивать размеры файлов, добавлять очереди или вводить платные тарифы.</li>
<li><strong>Задержка.</strong> Загрузка файла размером 100 МБ через медленное соединение занимает минуты до того, как начнётся обработка. Для пользователей в регионах с плохим подключением инструмент практически непригоден.</li>
<li><strong>Масштабирование.</strong> Один сервер может обрабатывать десятки одновременных сжатий. Но что насчёт тысяч? Вам нужны группы авто scaling, балансировщики нагрузки, конечные точки CDN — всё это добавляет сложность и стоимость.</li>
</ul>
<p>Модель с优先тетом браузера решает всё это сразу. Обработка бесплатна (циклы CPU пользователя), конфиденциальна (никакие данные не покидают устройство) и бесконечно масштабируема (каждый пользователь приносит своё оборудование).</p>
<h2>Как это работает: WebAssembly и Web Workers</h2>
<p>Десять лет назад запуск кодеков изображений в браузере был невозможен. Сегодня WebAssembly позволяет нам компилировать библиотеки C и Rust напрямую в формат, который браузер может выполнять с почти нативной скоростью. Мы компилируем mozJPEG от Mozilla, libwebp от Google и кодировщик AVIF libaom — все написанные на C — в WebAssembly. Браузер выполняет их так же эффективно, как если бы они были установлены нативно.</p>
<p>Но однопоточное кодирование медленно для больших пакетов. Здесь на помощь приходят Web Workers. Каждый worker работает на отдельном ядре CPU, и мы создаём столько workers, сколько ядер у устройства. На современном ноутбуке с 8 ядрами это означает 8 изображений, сжимающихся одновременно. Пакет из 200 фотографий, который на одном потоке занял бы минуты, завершается за секунды.</p>
<h2>От чего мы отказались</h2>
<p>Подход с приоритетом браузера не бесплатен. Самая значительная жертва — память. Вкладка браузера имеет доступ к RAM устройства, но одна вкладка, вылетающая из-за того, что изображение превысило доступную память, — это плохой опыт. Мы ограничиваем отдельные файлы до 100 МБ, а размеры пакетов до 200 файлов, чтобы оставаться в безопасных пределах.</p>
<p>Мы также отказались от серверных функций, таких как постоянное хранение, доставка электронной почты и аналитика. Нет базы данных сжатых изображений, нет новостной рассылки, нет отслеживания того, какие форматы предпочитают пользователи. Это философски согласуется с нашей позицией по конфиденциальности, но означает, что мы не можем предлагать такие функции, как «последние сжатия» или «сохранённые настройки между сессиями».</p>
<h2>Что дальше</h2>
<p>Браузер становится законной средой выполнения для приложений, чувствительных к производительности. По мере того как WebAssembly получает сборку мусора, многопоточность и поддержку SIMD, всё больше частей стека приложений может перейти на сторону клиента. Мы изучаем WebGPU для ещё более быстрой обработки пикселей и File System Access API для бесшовной интеграции с папками.</p>
<p>Компрессор уже работает и обрабатывает тысячи изображений в день — все они остаются там, где им и место.</p>`,
      zh: `<p>大多数免费的在线图像工具的工作方式相同：你将文件上传到他们的服务器，服务器处理它，然后你下载结果。这种模式构建简单，但带有隐藏成本——你的隐私、他们的服务器账单，以及文件大小和吞吐量的限制。</p>
<p>ToolBox Image 采用了不同的方法。整个应用程序——解码、编码、压缩、调整大小、格式转换——都在你的浏览器中运行。没有需要上传的服务器。你的图像永远不会离开你的设备。这种架构是一个深思熟虑的选择，它塑造了我们对产品做出的每一个决定。</p>
<h2>为什么采用浏览器优先的方法？</h2>
<p>显而易见的替代方案是传统的服务器端架构。你上传一张图片，服务器通过 ImageMagick 或 Sharp 等工具处理它，然后发回结果。这很有效，但它带来了一系列难以解决的问题：</p>
<ul>
<li><strong>隐私。</strong>用户必须相信你不会存储、分析或泄露他们的图像。对于敏感文件——医学图像、设计稿、个人照片——这种信任很难赢得。</li>
<li><strong>成本。</strong>每次压缩都在你的基础设施上运行。你越成功，支付的就越多。这带来了限制文件大小、添加队列或引入付费层的压力。</li>
<li><strong>延迟。</strong>通过慢速连接上传 100 MB 的文件需要几分钟才能开始处理。对于连接性差地区的用户，该工具实际上无法使用。</li>
<li><strong>扩展。</strong>单个服务器可以处理数十个并发压缩。但如果是数千个呢？你需要自动扩展组、负载均衡器、CDN 上传端点——所有这些都增加了复杂性和成本。</li>
</ul>
<p>浏览器优先模型一次性解决了所有这些问题。处理是免费的（用户的 CPU 周期）、私密的（没有数据离开设备）并且无限可扩展（每个用户自带硬件）。</p>
<h2>实现方式：WebAssembly 和 Web Workers</h2>
<p>十年前，在浏览器中运行图像编解码器是不可能的。今天，WebAssembly 让我们可以将 C 和 Rust 库直接编译成浏览器可以以接近原生速度执行的格式。我们将 Mozilla 的 mozJPEG、Google 的 libwebp 和 libaom AVIF 编码器——全部用 C 编写——编译成 WebAssembly。浏览器运行它们的效率就像它们原生安装一样。</p>
<p>但单线程编码对于大批量处理来说很慢。这就是 Web Workers 发挥作用的地方。每个 Worker 在独立的 CPU 核心上运行，我们根据设备的核心数量生成相应数量的 Worker。在具有 8 个核心的现代笔记本电脑上，这意味着 8 张图片同时压缩。在单线程上需要几分钟的 200 张照片批次在几秒钟内完成。</p>
<h2>我们放弃的东西</h2>
<p>浏览器优先的方法并非没有代价。最重要的权衡是内存。浏览器标签页可以访问设备的 RAM，但一个标签页因为图像超出可用内存而崩溃是一种糟糕的体验。我们将单个文件限制在 100 MB，批次大小限制在 200 个文件，以保持在安全范围内。</p>
<p>我们还放弃了服务器端功能，如持久存储、电子邮件投递和分析。没有压缩图像的数据库，没有电子邮件通讯，没有跟踪用户偏好哪种格式。这在哲学上与我们的隐私立场一致，但意味着我们不能提供"最近压缩"或"会话间保存预设"等功能。</p>
<h2>下一步计划</h2>
<p>浏览器正在成为性能敏感型应用的合法运行环境。随着 WebAssembly 获得垃圾回收、多线程和 SIMD 支持，更多的应用程序堆栈可以转移到客户端。我们正在探索 WebGPU 以实现更快的像素处理，以及文件系统访问 API 以实现无缝的文件夹集成。</p>
<p>目前，压缩器已上线并每天处理数千张图像——所有这些图像都留在它们该在的地方。</p>`,
      ja: `<p>ほとんどの無料オンライン画像ツールは同じように動作します。ファイルをサーバーにアップロードし、サーバーが処理し、結果をダウンロードします。このモデルはシンプルに構築できますが、隠れたコストがあります——あなたのプライバシー、サーバー費用、ファイルサイズとスループットの制限です。</p>
<p>ToolBox Imageは異なるアプローチを採用しています。アプリケーション全体——デコード、エンコード、圧縮、リサイズ、フォーマット変換——がブラウザ内で実行されます。アップロード先のサーバーはありません。画像がデバイスから離れることは決してありません。このアーキテクチャは意図的に選択され、製品に関するすべての決定を形作りました。</p>
<h2>ブラウザファーストのアプローチの理由</h2>
<p>明白な代替案は従来のサーバーサイドアーキテクチャです。画像をアップロードし、サーバーがImageMagickやSharpなどのツールで処理し、結果を返します。これは機能しますが、解決が難しい一連の問題を生み出します：</p>
<ul>
<li><strong>プライバシー。</strong>ユーザーはあなたが画像を保存、分析、または漏洩しないことを信頼する必要があります。機密文書——医療画像、デザインモックアップ、個人の写真——の場合、その信頼を得るのは困難です。</li>
<li><strong>コスト。</strong>すべての圧縮はあなたのインフラ上で実行されます。成功すればするほど、支払いが増えます。これにより、ファイルサイズを制限したり、キューを追加したり、有料プランを導入したりする圧力が生じます。</li>
<li><strong>レイテンシ。</strong>低速回線での100MBファイルのアップロードは、処理が始まるまでに数分かかります。接続環境の悪い地域のユーザーにとって、このツールは事実上使用できません。</li>
<li><strong>スケーラビリティ。</strong>1台のサーバーで数十の同時圧縮を処理できます。しかし、数千の場合は？ オートスケーリンググループ、ロードバランサー、CDNアップロードエンドポイントが必要です——これらはすべて複雑さとコストを増大させます。</li>
</ul>
<p>ブラウザファーストモデルはこれらすべてを一度に解決します。処理は無料（ユーザーのCPUサイクル）、プライベート（データはデバイスから離れない）、そして無限にスケーラブル（各ユーザーが自分のハードウェアを持ち込む）です。</p>
<h2>どのように機能するか：WebAssemblyとWeb Workers</h2>
<p>10年前、ブラウザで画像コーデックを実行することは不可能でした。今日、WebAssemblyにより、CおよびRustライブラリをブラウザがネイティブに近い速度で実行できる形式に直接コンパイルできます。MozillaのmozJPEG、Googleのlibwebp、libaom AVIFエンコーダー——すべてCで記述——をWebAssemblyにコンパイルしています。ブラウザはそれらがネイティブインストールされているかのように効率的に実行します。</p>
<p>しかし、シングルスレッドのエンコードは大量バッチには低速です。そこでWeb Workersの出番です。各ワーカーは個別のCPUコアで実行され、デバイスが持つコア数だけワーカーを生成します。8コアの最新ラップトップでは、8つの画像が同時に圧縮されます。シングルスレッドでは数分かかる200枚の写真バッチも、数秒で完了します。</p>
<h2>犠牲にしたもの</h2>
<p>ブラウザファーストアプローチは無料ではありません。最も重要なトレードオフはメモリです。ブラウザタブはデバイスのRAMにアクセスできますが、画像が利用可能メモリを超えたためにタブがクラッシュするのは悪い体験です。安全範囲内に留めるため、個別ファイルは100MB、バッチサイズは200ファイルに制限しています。</p>
<p>また、永続ストレージ、メール配信、分析などのサーバーサイド機能も犠牲にしました。圧縮画像のデータベースも、メールニュースレターも、ユーザーが好むフォーマットの追跡もありません。これはプライバシーに関する私たちの姿勢と哲学的に一致していますが、「最近の圧縮」や「セッション間の保存済みプリセット」などの機能を提供できないことを意味します。</p>
<h2>今後の展開</h2>
<p>ブラウザはパフォーマンス重視のアプリケーションにとって正当なランタイムになりつつあります。WebAssemblyがガベージコレクション、スレッド、SIMDサポートを獲得するにつれて、アプリケーションスタックのより多くの部分をクライアントサイドに移行できます。さらに高速なピクセル処理のためにWebGPU、シームレスなフォルダ統合のためにFile System Access APIを探求しています。</p>
<p>今のところ、コンプレッサーは稼働中で、毎日数千の画像を処理しています——すべて画像が本来あるべき場所に留まったままです。</p>`,
      ko: `<p>대부분의 무료 온라인 이미지 도구는 같은 방식으로 작동합니다: 파일을 서버에 업로드하고, 서버가 처리한 다음, 결과를 다운로드합니다. 이 모델은 구축하기 간단하지만 숨겨진 비용이 따릅니다——사용자의 프라이버시, 서버 비용, 파일 크기 및 처리량 제한이 그것입니다.</p>
<p>ToolBox Image는 다른 접근 방식을 취합니다. 전체 애플리케이션——디코딩, 인코딩, 압축, 크기 조정, 형식 변환——이 브라우저 안에서 실행됩니다. 업로드할 서버가 없습니다. 이미지가 기기를 떠나지 않습니다. 이 아키텍처는 의도적인 선택이었으며, 제품에 대한 모든 결정을 형성했습니다.</p>
<h2>왜 브라우저 우선 접근법인가?</h2>
<p>명백한 대안은 전통적인 서버 측 아키텍처입니다. 이미지를 업로드하면 서버가 ImageMagick이나 Sharp 같은 도구로 처리하고 결과를 반환합니다. 이는 작동하지만, 해결하기 어려운 문제들을 만듭니다:</p>
<ul>
<li><strong>프라이버시.</strong> 사용자는 귀하가 이미지를 저장, 분석 또는 유출하지 않을 것이라고 신뢰해야 합니다. 민감한 문서——의료 이미지, 디자인 목업, 개인 사진——의 경우 그 신뢰를 얻기 어렵습니다.</li>
<li><strong>비용.</strong> 모든 압축은 귀하의 인프라에서 실행됩니다. 더 성공할수록 더 많이 지불합니다. 이는 파일 크기를 제한하거나, 대기열을 추가하거나, 유료 등급을 도입하는 압력을 만듭니다.</li>
<li><strong>지연 시간.</strong> 느린 연결로 100MB 파일을 업로드하는 데는 처리가 시작되기 전에 몇 분이 걸립니다. 연결 상태가 좋지 않은 지역의 사용자에게는 도구가 사실상 사용 불가능합니다.</li>
<li><strong>확장성.</strong> 단일 서버는 수십 개의 동시 압축을 처리할 수 있습니다. 하지만 수천 개는? 자동 확장 그룹, 로드 밸런서, CDN 업로드 엔드포인트가 필요합니다——이 모든 것이 복잡성과 비용을 증가시킵니다.</li>
</ul>
<p>브라우저 우선 모델은 이 모든 것을 한 번에 해결합니다. 처리는 무료(사용자의 CPU 사이클)이고, 프라이빗(데이터가 기기를 떠나지 않음)하며, 무한히 확장 가능(각 사용자가 자신의 하드웨어를 사용)합니다.</p>
<h2>작동 방식: WebAssembly와 Web Workers</h2>
<p>10년 전에는 브라우저에서 이미지 코덱을 실행하는 것이 불가능했습니다. 오늘날 WebAssembly를 사용하면 C 및 Rust 라이브러리를 브라우저가 네이티브에 가까운 속도로 실행할 수 있는 형식으로 직접 컴파일할 수 있습니다. Mozilla의 mozJPEG, Google의 libwebp, libaom AVIF 인코더——모두 C로 작성됨——를 WebAssembly로 컴파일합니다. 브라우저는 네이티브로 설치된 것처럼 효율적으로 실행합니다.</p>
<p>하지만 단일 스레드 인코딩은 대규모 배치에 느립니다. 여기에 Web Workers가 등장합니다. 각 worker는 별도의 CPU 코어에서 실행되며, 기기가 가진 코어 수만큼 worker를 생성합니다. 8코어 최신 노트북에서는 8개의 이미지가 동시에 압축됩니다. 단일 스레드에서 몇 분이 걸리던 200장의 사진 배치가 몇 초 만에 완료됩니다.</p>
<h2>포기한 것들</h2>
<p>브라우저 우선 접근법이 공짜는 아닙니다. 가장 중요한 트레이드오프는 메모리입니다. 브라우저 탭은 기기의 RAM에 접근할 수 있지만, 이미지가 사용 가능한 메모리를 초과하여 탭이 충돌하는 것은 좋지 않은 경험입니다. 안전한 범위를 유지하기 위해 개별 파일을 100MB, 배치 크기를 200개 파일로 제한합니다.</p>
<p>또한 영구 저장소, 이메일 전송, 분석과 같은 서버 측 기능도 포기했습니다. 압축된 이미지 데이터베이스, 이메일 뉴스레터, 사용자가 선호하는 형식 추적이 없습니다. 이는 프라이버시에 대한 우리의 입장과 철학적으로 일치하지만, "최근 압축"이나 "세션 간 저장된 프리셋"과 같은 기능을 제공할 수 없음을 의미합니다.</p>
<h2>향후 계획</h2>
<p>브라우저는 성능에 민감한 애플리케이션을 위한 합법적인 런타임이 되고 있습니다. WebAssembly가 가비지 컬렉션, 스레딩, SIMD 지원을 갖추게 되면서, 애플리케이션 스택의 더 많은 부분이 클라이언트 측으로 이동할 수 있습니다. 더 빠른 픽셀 처리를 위해 WebGPU, 매끄러운 폴더 통합을 위해 File System Access API를 탐색하고 있습니다.</p>
<p>현재 압축기는 라이브 상태이며 매일 수천 개의 이미지를 처리하고 있습니다——모두 제자리에 머물러 있습니다.</p>`,
      ar: `<p>معظم أدوات الصور المجانية على الإنترنت تعمل بنفس الطريقة: تقوم بتحميل ملف إلى الخادم الخاص بهم، يقوم الخادم بمعالجته، ثم تقوم بتنزيل النتيجة. هذا النموذج بسيط في البناء، لكن له تكاليف خفية — خصوصيتك، فواتير الخادم الخاصة بهم، وحدود على حجم الملف والإنتاجية.</p>
<p>ToolBox Image يتبع نهجاً مختلفاً. التطبيق بأكمله — فك التشفير، التشفير، الضغط، تغيير الحجم، تحويل التنسيق — يعمل في متصفحك. لا يوجد خادم للتحميل إليه. صورك لا تغادر جهازك أبداً. هذه الهندسة المعمارية كانت اختياراً متعمداً، وشكلت كل قرار اتخذناه بشأن المنتج.</p>
<h2>لماذا النهج القائم على المتصفح أولاً؟</h2>
<p>البديل الواضح هو الهندسة التقليدية من جانب الخادم. تقوم بتحميل صورة، يقوم الخادم بمعالجتها باستخدام أداة مثل ImageMagick أو Sharp، ويرسل النتيجة مرة أخرى. هذا يعمل، لكنه يخلق مجموعة من المشاكل التي يصعب حلها:</p>
<ul>
<li><strong>الخصوصية.</strong> يجب على المستخدمين الثقة بأنك لن تخزن أو تحلل أو تسرب صورهم. للمستندات الحساسة — الصور الطبية، نماذج التصميم، الصور الشخصية — من الصعب كسب تلك الثقة.</li>
<li><strong>التكلفة.</strong> كل عملية ضغط تعمل على بنيتك التحتية. كلما زاد نجاحك، زاد ما تدفعه. هذا يخلق ضغطاً للحد من أحجام الملفات، أو إضافة طوابير انتظار، أو تقديم مستويات مدفوعة.</li>
<li><strong>زمن الاستجابة.</strong> تحميل ملف بحجم 100 ميغابايت عبر اتصال بطيء يستغرق دقائق قبل أن يبدأ المعالجة. للمستخدمين في المناطق ذات الاتصال الضعيف، الأداة غير قابلة للاستخدام فعلياً.</li>
<li><strong>التوسع.</strong> خادم واحد يمكنه التعامل مع عشرات عمليات الضغط المتزامنة. لكن ماذا عن الآلاف؟ تحتاج إلى مجموعات التوسع التلقائي، موازنات التحميل، نقاط نهاية CDN — كل هذا يضيف تعقيداً وتكلفة.</li>
</ul>
<p>نموذج المتصفح أولاً يحل كل هذا مرة واحدة. المعالجة مجانية (دورات وحدة المعالجة المركزية للمستخدم)، خاصة (لا بيانات تغادر الجهاز)، وقابلة للتوسع بلا حدود (كل مستخدم يجلب أجهزته الخاصة).</p>
<h2>كيف يعمل: WebAssembly و Web Workers</h2>
<p>قبل عشر سنوات، كان تشغيل برامج ترميز الصور في المتصفح مستحيلاً. اليوم، يتيح لنا WebAssembly تجميع مكتبات C و Rust مباشرة إلى تنسيق يمكن للمتصفح تنفيذه بسرعة قريبة من الأصلية. نقوم بتجميع mozJPEG من Mozilla، و libwebp من Google، و مشفر AVIF libaom — جميعها مكتوبة بلغة C — إلى WebAssembly. المتصفح يشغلها بكفاءة كما لو كانت مثبتة بشكل أصلي.</p>
<p>لكن الترميز أحادي الخيط بطيء للدفعات الكبيرة. هنا يأتي دور Web Workers. كل عامل يعمل على نواة وحدة معالجة مركزية منفصلة، ونقوم بإنشاء عدد من العمال بعدد أنوية الجهاز. على كمبيوتر محمول حديث بـ 8 أنوية، هذا يعني 8 صور يتم ضغطها في وقت واحد. دفعة من 200 صورة كانت ستستغرق دقائق على خيط واحد تنتهي في ثوانٍ.</p>
<h2>ما تخلينا عنه</h2>
<p>النهج القائم على المتصفح أولاً ليس مجانياً. المقايضة الأكثر أهمية هي الذاكرة. علامة تبويب المتصفح لديها وصول إلى ذاكرة الوصول العشوائي للجهاز، لكن تعطل علامة تبويب واحدة لأن صورة تجاوزت الذاكرة المتاحة هو تجربة سيئة. نحدد الملفات الفردية بـ 100 ميغابايت وأحجام الدفعات بـ 200 ملف للبقاء ضمن الحدود الآمنة.</p>
<p>تخلينا أيضاً عن ميزات جانب الخادم مثل التخزين الدائم، توصيل البريد الإلكتروني، والتحليلات. لا توجد قاعدة بيانات للصور المضغوطة، ولا نشرة إخبارية، ولا تتبع لأي التنسيقات يفضلها المستخدمون. هذا متسق فلسفياً مع موقفنا من الخصوصية، لكنه يعني أننا لا نستطيع تقديم ميزات مثل "الضغطات الحديثة" أو "الإعدادات المحفوظة بين الجلسات".</p>
<h2>ماذا بعد</h2>
<p>المتصفح يصبح بيئة تشغيل شرعية للتطبيقات الحساسة للأداء. مع اكتساب WebAssembly لجمع القمامة، والمعالجة المتعددة الخيوط، ودعم SIMD، يمكن لجزء أكبر من حزمة التطبيقات الانتقال إلى جانب العميل. نحن نستكشف WebGPU لمعالجة أسرع للبكسلات وواجهة برمجة تطبيقات الوصول إلى نظام الملفات لتكامل سلس للمجلدات.</p>
<p>حالياً، الضاغط يعمل ويعالج آلاف الصور يومياً — جميعها تبقى في المكان الذي تنتمي إليه.</p>`,
      hi: `<p>ज़्यादातर मुफ्त ऑनलाइन इमेज टूल एक ही तरह से काम करते हैं: आप एक फ़ाइल उनके सर्वर पर अपलोड करते हैं, सर्वर उसे प्रोसेस करता है, और आप रिज़ल्ट डाउनलोड करते हैं। यह मॉडल बनाने में आसान है, लेकिन इसके छिपे हुए खर्च हैं — आपकी गोपनीयता, उनके सर्वर के बिल, और फ़ाइल साइज़ और थ्रूपुट पर सीमाएँ।</p>
<p>ToolBox Image एक अलग तरीका अपनाता है। पूरा एप्लिकेशन — डिकोडिंग, एन्कोडिंग, कंप्रेशन, रीज़ाइज़िंग, फ़ॉर्मेट कन्वर्ज़न — आपके ब्राउज़र में चलता है। अपलोड करने के लिए कोई सर्वर नहीं है। आपकी इमेज आपके डिवाइस से कभी बाहर नहीं जाती। यह आर्किटेक्चर एक जानबूझकर किया गया चुनाव था, और इसने उत्पाद के बारे में हमारे हर फैसले को आकार दिया।</p>
<h2>ब्राउज़र-फर्स्ट तरीका क्यों?</h2>
<p>सबसे सीधा विकल्प पारंपरिक सर्वर-साइड आर्किटेक्चर है। आप एक इमेज अपलोड करते हैं, सर्वर उसे ImageMagick या Sharp जैसे टूल से प्रोसेस करता है, और रिज़ल्ट वापस भेजता है। यह काम करता है, लेकिन यह कई ऐसी समस्याएँ पैदा करता है जिन्हें हल करना मुश्किल है:</p>
<ul>
<li><strong>गोपनीयता।</strong> उपयोगकर्ताओं को भरोसा करना होगा कि आप उनकी इमेज को स्टोर, विश्लेषण या लीक नहीं करेंगे। संवेदनशील दस्तावेज़ों के लिए — मेडिकल इमेज, डिज़ाइन मॉकअप, निजी फ़ोटो — यह भरोसा जीतना मुश्किल है।</li>
<li><strong>लागत।</strong> हर कंप्रेशन आपके इंफ्रास्ट्रक्चर पर चलता है। आप जितना सफल होंगे, उतना अधिक भुगतान करेंगे। यह फ़ाइल साइज़ को सीमित करने, कतारें जोड़ने या भुगतान विकल्प लाने का दबाव बनाता है।</li>
<li><strong>विलंबता।</strong> धीमे कनेक्शन पर 100 MB फ़ाइल अपलोड करने में प्रोसेसिंग शुरू होने से पहले मिनटों लग जाते हैं। खराब कनेक्टिविटी वाले क्षेत्रों के उपयोगकर्ताओं के लिए, यह टूल प्रभावी रूप से बेकार है।</li>
<li><strong>स्केल।</strong> एक सर्वर दर्जनों समवर्ती कंप्रेशन संभाल सकता है। लेकिन हज़ारों का क्या? आपको ऑटो-स्केलिंग ग्रुप, लोड बैलेंसर, CDN अपलोड एंडपॉइंट चाहिए — ये सब जटिलता और लागत बढ़ाते हैं।</li>
</ul>
<p>ब्राउज़र-फर्स्ट मॉडल यह सब एक साथ हल करता है। प्रोसेसिंग मुफ्त है (उपयोगकर्ता के CPU साइकिल), निजी है (कोई डेटा डिवाइस से बाहर नहीं जाता), और असीम रूप से स्केलेबल है (हर उपयोगकर्ता अपना हार्डवेयर लाता है)।</p>
<h2>इसे काम करना: WebAssembly और Web Workers</h2>
<p>दस साल पहले, ब्राउज़र में इमेज कोडेक चलाना असंभव था। आज, WebAssembly हमें C और Rust लाइब्रेरीज़ को सीधे एक ऐसे फ़ॉर्मेट में कंपाइल करने देता है जिसे ब्राउज़र लगभग नेटिव स्पीड पर चला सकता है। हम Mozilla के mozJPEG, Google के libwebp, और libaom AVIF एन्कोडर — सभी C में लिखे गए — को WebAssembly में कंपाइल करते हैं। ब्राउज़र उन्हें उतनी ही कुशलता से चलाता है जैसे वे नेटिव रूप से इंस्टॉल हों।</p>
<p>लेकिन बड़े बैचों के लिए सिंगल-थ्रेडेड एन्कोडिंग धीमी है। यहाँ Web Workers काम आते हैं। हर वर्कर एक अलग CPU कोर पर चलता है, और हम उतने वर्कर बनाते हैं जितने कोर डिवाइस में हैं। 8 कोर वाले आधुनिक लैपटॉप पर, इसका मतलब है 8 इमेज एक साथ कंप्रेस हो रही हैं। 200 फ़ोटो का बैच जो एक थ्रेड पर मिनट लेता, वह सेकंड्स में पूरा होता है।</p>
<h2>हमने क्या छोड़ा</h2>
<p>ब्राउज़र-फर्स्ट तरीका मुफ्त नहीं है। सबसे बड़ी समझौता मेमोरी है। ब्राउज़र टैब डिवाइस की RAM तक पहुँच सकता है, लेकिन एक टैब का क्रैश होना क्योंकि इमेज उपलब्ध मेमोरी से अधिक हो गई — यह एक बुरा अनुभव है। हम सुरक्षित सीमा में रहने के लिए अलग-अलग फ़ाइलों को 100 MB और बैचों को 200 फ़ाइलों तक सीमित करते हैं।</p>
<p>हमने सर्वर-साइड फीचर्स जैसे पर्मानेंट स्टोरेज, ईमेल डिलीवरी और एनालिटिक्स भी छोड़े। कंप्रेस की गई इमेज का कोई डेटाबेस नहीं, कोई ईमेल न्यूज़लेटर नहीं, कोई ट्रैकिंग नहीं कि उपयोगकर्ता कौन से फ़ॉर्मेट पसंद करते हैं। यह हमारे गोपनीयता रुख के अनुरूप है, लेकिन इसका मतलब है कि हम "हाल की कंप्रेशन" या "सत्रों के बीच सहेजे गए प्रीसेट" जैसी सुविधाएँ नहीं दे सकते।</p>
<h2>आगे क्या</h2>
<p>ब्राउज़र प्रदर्शन-संवेदनशील अनुप्रयोगों के लिए एक वैध रनटाइम बन रहा है। जैसे-जैसे WebAssembly को गार्बेज कलेक्शन, थ्रेडिंग और SIMD सपोर्ट मिलता है, एप्लिकेशन स्टैक का अधिक हिस्सा क्लाइंट-साइड जा सकता है। हम और तेज़ पिक्सेल प्रोसेसिंग के लिए WebGPU और सहज फ़ोल्डर एकीकरण के लिए File System Access API की खोज कर रहे हैं।</p>
<p>अभी के लिए, कंप्रेसर लाइव है और हर दिन हज़ारों इमेज प्रोसेस कर रहा है — ये सभी वहीं रह रही हैं जहाँ उन्हें रहना चाहिए।</p>`,
      tr: `<p>Çoğu ücretsiz çevrimiçi görüntü aracı aynı şekilde çalışır: bir dosyayı sunucularına yüklersiniz, sunucu işler ve sonucu indirirsiniz. Bu model oluşturması basittir, ancak gizli maliyetleri vardır — gizliliğiniz, sunucu faturaları ve dosya boyutu ile işleme hızı sınırlamaları.</p>
<p>ToolBox Image farklı bir yaklaşım benimsiyor. Tüm uygulama — kod çözme, kodlama, sıkıştırma, yeniden boyutlandırma, biçim dönüştürme — tarayıcınızda çalışır. Yüklenecek bir sunucu yoktur. Görüntüleriniz cihazınızdan asla ayrılmaz. Bu mimari bilinçli bir seçimdi ve ürün hakkında verdiğimiz her kararı şekillendirdi.</p>
<h2>Neden tarayıcı öncelikli yaklaşım?</h2>
<p>Açık alternatif geleneksel sunucu tarafı mimarisidir. Bir görüntü yüklersiniz, sunucu ImageMagick veya Sharp gibi bir araçla işler ve sonucu geri gönderir. Bu işe yarar, ancak çözülmesi zor bir dizi sorun yaratır:</p>
<ul>
<li><strong>Gizlilik.</strong> Kullanıcılar, görüntülerini saklamayacağınıza, analiz etmeyeceğinize veya sızdırmayacağınıza güvenmek zorundadır. Hassas belgeler için — tıbbi görüntüler, tasarım maketleri, kişisel fotoğraflar — bu güveni kazanmak zordur.</li>
<li><strong>Maliyet.</strong> Her sıkıştırma sizin altyapınızda çalışır. Ne kadar başarılı olursanız, o kadar çok ödersiniz. Bu, dosya boyutlarını sınırlama, kuyruklar ekleme veya ücretli seviyeler oluşturma baskısı yaratır.</li>
<li><strong>Gecikme.</strong> Yavaş bir bağlantı üzerinden 100 MB dosya yüklemek, işlem başlamadan dakikalar alır. Kötü bağlantısı olan bölgelerdeki kullanıcılar için araç etkili bir şekilde kullanılamaz.</li>
<li><strong>Ölçek.</strong> Tek bir sunucu düzinelerce eşzamanlı sıkıştırmayı işleyebilir. Peki ya binlerce? Otomatik ölçekleme grupları, yük dengeleyiciler, CDN yükleme uç noktaları gerekir — bunların tümü karmaşıklık ve maliyet ekler.</li>
</ul>
<p>Tarayıcı öncelikli model tüm bunları tek seferde çözer. İşlem ücretsizdir (kullanıcının CPU döngüleri), özeldir (cihazdan veri çıkmaz) ve sonsuz ölçeklenebilirdir (her kullanıcı kendi donanımını getirir).</p>
<h2>Nasıl çalışır: WebAssembly ve Web Workers</h2>
<p>On yıl önce, tarayıcıda görüntü codec'leri çalıştırmak imkansızdı. Bugün, WebAssembly C ve Rust kütüphanelerini doğrudan tarayıcının neredeyse yerel hızda çalıştırabileceği bir formatta derlememize olanak tanır. Mozilla'nın mozJPEG'ini, Google'ın libwebp'ini ve libaom AVIF kodlayıcısını — tamamı C ile yazılmış — WebAssembly'ye derliyoruz. Tarayıcı, sanki yerel olarak yüklenmiş gibi verimli bir şekilde çalıştırır.</p>
<p>Ancak tek iş parçacıklı kodlama büyük gruplar için yavaştır. İşte burada Web Workers devreye girer. Her worker ayrı bir CPU çekirdeğinde çalışır ve cihazın sahip olduğu çekirdek sayısı kadar worker oluştururuz. 8 çekirdekli modern bir dizüstü bilgisayarda bu, 8 görüntünün aynı anda sıkıştırılması anlamına gelir. Tek bir iş parçacığında dakikalar sürecek 200 fotoğraflık bir grup saniyeler içinde tamamlanır.</p>
<h2>Nelerden vazgeçtik</h2>
<p>Tarayıcı öncelikli yaklaşım bedava değildir. En önemli ödünleşim bellektir. Tarayıcı sekmesi cihazın RAM'ine erişebilir, ancak bir görüntünün mevcut belleği aşması nedeniyle tek bir sekmenin çökmesi kötü bir deneyimdir. Güvenli sınırlar içinde kalmak için bireysel dosyaları 100 MB ve grup boyutlarını 200 dosya ile sınırlıyoruz.</p>
<p>Ayrıca kalıcı depolama, e-posta teslimatı ve analitik gibi sunucu tarafı özelliklerinden de vazgeçtik. Sıkıştırılmış görüntü veritabanı, e-posta bülteni veya kullanıcıların hangi biçimleri tercih ettiğine dair takip yoktur. Bu, gizlilik duruşumuzla felsefi olarak tutarlıdır, ancak "son sıkıştırmalar" veya "oturumlar arasında kaydedilmiş ön ayarlar" gibi özellikler sunamayacağımız anlamına gelir.</p>
<h2>Sırada ne var</h2>
<p>Tarayıcı, performansa duyarlı uygulamalar için meşru bir çalışma zamanı haline geliyor. WebAssembly çöp toplama, iş parçacığı ve SIMD desteği kazandıkça, uygulama yığınının daha fazla kısmı istemci tarafına taşınabilir. Daha hızlı piksel işleme için WebGPU ve sorunsuz klasör entegrasyonu için File System Access API'sini araştırıyoruz.</p>
<p>Şimdilik, sıkıştırıcı canlı ve günde binlerce görüntü işliyor — hepsi ait oldukları yerde kalıyor.</p>`,
    },
  ),
  'image-compression-basics': t(
    {
      en: 'How image compression actually works (in 5 minutes)',
      es: 'Cómo funciona realmente la compresión de imágenes (en 5 minutos)',
      fr: "Comment fonctionne réellement la compression d'images (en 5 minutes)",
      de: 'Wie Bildkomprimierung wirklich funktioniert (in 5 Minuten)',
      it: 'Come funziona realmente la compressione delle immagini (in 5 minuti)',
      pt: 'Como a compressão de imagens realmente funciona (em 5 minutos)',
      ru: 'Как на самом деле работает сжатие изображений (за 5 минут)',
      zh: '图像压缩实际上是如何工作的（5分钟阅读）',
      ja: '画像圧縮の実際の仕組み（5分でわかる）',
      ko: '이미지 압축이 실제로 작동하는 방식 (5분 만에)',
      ar: 'كيف يعمل ضغط الصور فعلياً (في 5 دقائق)',
      hi: 'इमेज कंप्रेशन वास्तव में कैसे काम करता है (5 मिनट में)',
      tr: 'Görüntü sıkıştırma aslında nasıl çalışır (5 dakikada)',
    },
    {
      en: 'JPEG, WebP, AVIF — what they do, what they trade off, and how to pick the right encoder for the job.',
      es: 'JPEG, WebP, AVIF — qué hacen, qué compromisos tienen y cómo elegir el codificador adecuado.',
      fr: "JPEG, WebP, AVIF — ce qu'ils font, leurs compromis, et comment choisir le bon encodeur.",
      de: 'JPEG, WebP, AVIF — was sie tun, ihre Vor- und Nachteile und wie man den richtigen Encoder auswählt.',
      it: 'JPEG, WebP, AVIF — cosa fanno, i loro compromessi e come scegliere il codificatore giusto.',
      pt: 'JPEG, WebP, AVIF — o que fazem, suas vantagens e desvantagens, e como escolher o codificador certo.',
      ru: 'JPEG, WebP, AVIF — что они делают, какие у них компромиссы и как выбрать правильный кодировщик.',
      zh: 'JPEG、WebP、AVIF — 它们的作用、权衡以及如何选择合适的编码器。',
      ja: 'JPEG、WebP、AVIF — それぞれの機能、トレードオフ、適切なエンコーダーの選び方。',
      ko: 'JPEG, WebP, AVIF — 각각의 기능, 장단점, 적합한 인코더 선택 방법.',
      ar: 'JPEG، WebP، AVIF — ماذا يفعلون، وما هي المقايضات، وكيفية اختيار المشفر المناسب.',
      hi: 'JPEG, WebP, AVIF — ये क्या करते हैं, इनके ट्रेड-ऑफ क्या हैं, और सही एन्कोडर कैसे चुनें।',
      tr: 'JPEG, WebP, AVIF — ne yaptıkları, ödünleşimleri ve doğru kodlayıcının nasıl seçileceği.',
    },
    {
      en: ['compression', 'jpeg', 'webp', 'avif', 'image-formats'],
      es: ['compresión', 'jpeg', 'webp', 'avif', 'formatos-de-imagen'],
      fr: ['compression', 'jpeg', 'webp', 'avif', 'formats-d-image'],
      de: ['komprimierung', 'jpeg', 'webp', 'avif', 'bildformate'],
      it: ['compressione', 'jpeg', 'webp', 'avif', 'formati-immagine'],
      pt: ['compressão', 'jpeg', 'webp', 'avif', 'formatos-de-imagem'],
      ru: ['сжатие', 'jpeg', 'webp', 'avif', 'форматы-изображений'],
      zh: ['压缩', 'jpeg', 'webp', 'avif', '图像格式'],
      ja: ['圧縮', 'jpeg', 'webp', 'avif', '画像形式'],
      ko: ['압축', 'jpeg', 'webp', 'avif', '이미지-형식'],
      ar: ['ضغط', 'jpeg', 'webp', 'avif', 'تنسيقات-الصور'],
      hi: ['कंप्रेशन', 'jpeg', 'webp', 'avif', 'इमेज-फ़ॉर्मेट'],
      tr: ['sıkıştırma', 'jpeg', 'webp', 'avif', 'görüntü-biçimleri'],
    },
    {
      en: `<p>Image compression is a solved problem in principle, but choosing the wrong format or quality setting can waste bandwidth, slow down your site, or produce visible artefacts. Here is a practical guide to how the major formats work and when to use each one.</p>
<h2>Lossy vs lossless</h2>
<p>Every image format falls into one of two categories. Lossless formats preserve every pixel of the original — the decoded image is bit-for-bit identical to the source. Lossy formats discard information that the human eye is less sensitive to, achieving much smaller file sizes at the cost of some fidelity.</p>
<p>Which one you choose depends on the use case. Photographs and gradients tolerate lossy compression well because the artefacts are hard to spot at normal viewing sizes. Screenshots, text, logos, and graphics with sharp edges need lossless encoding to stay crisp.</p>
<h2>JPEG: the universal standard</h2>
<p>JPEG has been the dominant image format on the web for three decades. It uses a lossy compression algorithm based on the discrete cosine transform — the same technique used in video codecs. The encoder divides the image into 8x8 pixel blocks, transforms each block into frequency space, and discards high-frequency information that the human eye perceives less acutely.</p>
<p><strong>Strengths:</strong> Universal browser support, excellent compression for photographs, adjustable quality.</p>
<p><strong>Weaknesses:</strong> No transparency support, visible block artefacts at low quality, poor compression for text and graphics.</p>
<p><strong>Best for:</strong> Photographs, complex gradients, social media images, any situation where universal compatibility matters more than file size.</p>
<h2>PNG: precision and transparency</h2>
<p>PNG was designed as a patent-free replacement for GIF. It uses lossless Deflate compression — the same algorithm behind ZIP files — with a pre-processing step that filters each row of pixels to make it more compressible. PNG supports full alpha channel transparency, gamma correction, and embedded colour profiles.</p>
<p><strong>Strengths:</strong> Lossless, transparency support, excellent for text and graphics, widely supported.</p>
<p><strong>Weaknesses:</strong> Large file sizes for photographs, no multi-image or animation support (use APNG or GIF instead).</p>
<p><strong>Best for:</strong> Logos, screenshots, UI elements, images with text, graphics with transparency.</p>
<h2>WebP: Google's modern format</h2>
<p>WebP was developed by Google as a web-focused replacement for both JPEG and PNG. It supports lossy compression (based on VP8 video codec prediction) and lossless compression (using a different algorithm with spatial prediction and colour cache). On average, lossy WebP is 25-35% smaller than JPEG at the same quality level.</p>
<p><strong>Strengths:</strong> Smaller than JPEG and PNG, supports transparency and animation, near-universal browser support (97%+).</p>
<p><strong>Weaknesses:</strong> Slightly slower to encode than JPEG, not supported by some legacy tools and CMS platforms.</p>
<p><strong>Best for:</strong> Web images where file size matters more than universal compatibility. Modern websites should default to WebP with a JPEG fallback.</p>
<h2>AVIF: the next generation</h2>
<p>AVIF uses the AV1 codec developed by the Alliance for Open Media — the same codec Netflix and YouTube use for video streaming. It achieves 30-50% better compression than WebP at the same quality level, especially for photographic content. AVIF also supports HDR, wide colour gamut, 10/12-bit depth, and lossless compression.</p>
<p><strong>Strengths:</strong> Best compression ratios, HDR support, free and open standard, transparency support.</p>
<p><strong>Weaknesses:</strong> Slower encoding (especially at higher quality settings), lower browser support (~92%), larger decoder complexity.</p>
<p><strong>Best for:</strong> Photographs where file size is critical, HDR content, future-proofing your image pipeline.</p>
<h2>How to choose</h2>
<p>Here is a simple decision tree: if you need transparency, use PNG (or WebP with fallback). If the image is a photograph, use JPEG, WebP, or AVIF — in order of decreasing file size and increasing encoding time. If the image has sharp edges or text, stick with PNG. For maximum compatibility, serve WebP with a JPEG fallback using the <code>&lt;picture&gt;</code> element.</p>
<p>Most importantly: do not manually optimise every image. Use our compressor's Auto mode, which picks the right format and quality for each file individually. It handles the decision so you do not have to.</p>`,
      es: `<p>La compresión de imágenes es un problema resuelto en principio, pero elegir el formato o la calidad incorrecta puede desperdiciar ancho de banda, ralentizar tu sitio o producir artefactos visibles. Aquí tienes una guía práctica de cómo funcionan los principales formatos y cuándo usar cada uno.</p>
<h2>Con pérdida vs sin pérdida</h2>
<p>Todo formato de imagen pertenece a una de dos categorías. Los formatos sin pérdida conservan cada píxel del original — la imagen decodificada es idéntica bit por bit a la fuente. Los formatos con pérdida descartan información a la que el ojo humano es menos sensible, logrando tamaños de archivo mucho más pequeños a costa de algo de fidelidad.</p>
<p>Cuál elegir depende del caso de uso. Las fotografías y los degradados toleran bien la compresión con pérdida porque los artefactos son difíciles de detectar en tamaños de visualización normales. Las capturas de pantalla, el texto, los logotipos y los gráficos con bordes nítidos necesitan codificación sin pérdida para mantenerse nítidos.</p>
<h2>JPEG: el estándar universal</h2>
<p>JPEG ha sido el formato de imagen dominante en la web durante tres décadas. Utiliza un algoritmo de compresión con pérdida basado en la transformada discreta del coseno — la misma técnica utilizada en los códecs de video. El codificador divide la imagen en bloques de 8x8 píxeles, transforma cada bloque en el espacio de frecuencia y descarta la información de alta frecuencia que el ojo humano percibe con menos agudeza.</p>
<p><strong>Fortalezas:</strong> Soporte universal en navegadores, excelente compresión para fotografías, calidad ajustable.</p>
<p><strong>Debilidades:</strong> Sin soporte de transparencia, artefactos de bloque visibles en baja calidad, mala compresión para texto y gráficos.</p>
<p><strong>Mejor para:</strong> Fotografías, degradados complejos, imágenes de redes sociales, cualquier situación donde la compatibilidad universal importe más que el tamaño del archivo.</p>
<h2>PNG: precisión y transparencia</h2>
<p>PNG fue diseñado como un reemplazo libre de patentes para GIF. Utiliza compresión Deflate sin pérdida — el mismo algoritmo detrás de los archivos ZIP — con un paso de preprocesamiento que filtra cada fila de píxeles para hacerla más comprimible. PNG soporta transparencia de canal alfa completa, corrección gamma y perfiles de color incrustados.</p>
<p><strong>Fortalezas:</strong> Sin pérdida, soporte de transparencia, excelente para texto y gráficos, ampliamente compatible.</p>
<p><strong>Debilidades:</strong> Tamaños de archivo grandes para fotografías, sin soporte de múltiples imágenes o animación (use APNG o GIF en su lugar).</p>
<p><strong>Mejor para:</strong> Logotipos, capturas de pantalla, elementos de UI, imágenes con texto, gráficos con transparencia.</p>
<h2>WebP: el formato moderno de Google</h2>
<p>WebP fue desarrollado por Google como un reemplazo para JPEG y PNG enfocado en la web. Soporta compresión con pérdida (basada en la predicción del códec de video VP8) y compresión sin pérdida (usando un algoritmo diferente con predicción espacial y caché de color). En promedio, WebP con pérdida es 25-35% más pequeño que JPEG al mismo nivel de calidad.</p>
<p><strong>Fortalezas:</strong> Más pequeño que JPEG y PNG, soporta transparencia y animación, soporte casi universal en navegadores (97%+).</p>
<p><strong>Debilidades:</strong> Ligeramente más lento de codificar que JPEG, no compatible con algunas herramientas heredadas y plataformas CMS.</p>
<p><strong>Mejor para:</strong> Imágenes web donde el tamaño del archivo importa más que la compatibilidad universal.</p>
<h2>AVIF: la próxima generación</h2>
<p>AVIF utiliza el códec AV1 desarrollado por la Alliance for Open Media — el mismo códec que Netflix y YouTube usan para streaming de video. Logra una compresión 30-50% mejor que WebP al mismo nivel de calidad, especialmente para contenido fotográfico. AVIF también soporta HDR, gamut de color amplio, profundidad de 10/12 bits y compresión sin pérdida.</p>
<p><strong>Fortalezas:</strong> Mejores ratios de compresión, soporte HDR, estándar abierto y gratuito, soporte de transparencia.</p>
<p><strong>Debilidades:</strong> Codificación más lenta (especialmente en ajustes de alta calidad), menor soporte en navegadores (~92%), mayor complejidad del decodificador.</p>
<p><strong>Mejor para:</strong> Fotografías donde el tamaño del archivo es crítico, contenido HDR, preparación para el futuro de tu pipeline de imágenes.</p>
<h2>Cómo elegir</h2>
<p>Aquí tienes un árbol de decisión simple: si necesitas transparencia, usa PNG (o WebP con respaldo). Si la imagen es una fotografía, usa JPEG, WebP o AVIF — en orden de tamaño de archivo decreciente y tiempo de codificación creciente. Si la imagen tiene bordes nítidos o texto, quédate con PNG. Para máxima compatibilidad, sirve WebP con respaldo JPEG usando el elemento <code>&lt;picture&gt;</code>.</p>
<p>Más importante: no optimices manualmente cada imagen. Usa el modo Auto de nuestro compresor, que elige el formato y la calidad adecuados para cada archivo individualmente.</p>`,
      fr: `<p>La compression d'image est un problème résolu en principe, mais choisir le mauvais format ou le mauvais réglage de qualité peut gaspiller de la bande passante, ralentir votre site ou produire des artefacts visibles. Voici un guide pratique sur le fonctionnement des principaux formats et quand les utiliser.</p>
<h2>Avec perte vs sans perte</h2>
<p>Chaque format d'image appartient à l'une des deux catégories. Les formats sans perte préservent chaque pixel de l'original — l'image décodée est identique bit pour bit à la source. Les formats avec perte suppriment les informations auxquelles l'œil humain est moins sensible, obtenant des fichiers beaucoup plus petits au prix d'une certaine fidélité.</p>
<p>Le choix dépend du cas d'utilisation. Les photographies et les dégradés tolèrent bien la compression avec perte car les artefacts sont difficiles à repérer à des tailles de visualisation normales. Les captures d'écran, le texte, les logos et les graphiques aux bords nets nécessitent un encodage sans perte pour rester nets.</p>
<h2>JPEG : le standard universel</h2>
<p>JPEG est le format d'image dominant sur le Web depuis trois décennies. Il utilise un algorithme de compression avec perte basé sur la transformée en cosinus discrète — la même technique utilisée dans les codecs vidéo. L'encodeur divise l'image en blocs de 8x8 pixels, transforme chaque bloc dans l'espace fréquentiel et supprime les informations haute fréquence que l'œil humain perçoit moins nettement.</p>
<p><strong>Points forts :</strong> Prise en charge universelle par les navigateurs, excellente compression pour les photographies, qualité réglable.</p>
<p><strong>Faiblesses :</strong> Pas de support de la transparence, artefacts de blocs visibles à faible qualité, mauvaise compression pour le texte et les graphiques.</p>
<p><strong>Idéal pour :</strong> Photographies, dégradés complexes, images de réseaux sociaux, toute situation où la compatibilité universelle prime sur la taille du fichier.</p>`,
      de: `<p>Bildkomprimierung ist im Prinzip ein gelöstes Problem, aber die Wahl des falschen Formats oder der falschen Qualitätseinstellung kann Bandbreite verschwenden, Ihre Website verlangsamen oder sichtbare Artefakte erzeugen. Hier ist ein praktischer Leitfaden, wie die wichtigsten Formate funktionieren und wann sie verwendet werden sollten.</p>
<h2>Verlustbehaftet vs. verlustfrei</h2>
<p>Jedes Bildformat fällt in eine von zwei Kategorien. Verlustfreie Formate bewahren jedes Pixel des Originals — das decodierte Bild ist bitweise identisch mit der Quelle. Verlustbehaftete Formate verwerfen Informationen, für die das menschliche Auge weniger empfindlich ist, und erreichen viel kleinere Dateigrößen auf Kosten einer gewissen Genauigkeit.</p>
<p>Welche Sie wählen, hängt vom Anwendungsfall ab. Fotos und Verläufe vertragen verlustbehaftete Komprimierung gut, da die Artefakte bei normaler Betrachtungsgröße schwer zu erkennen sind. Screenshots, Text, Logos und Grafiken mit scharfen Kanten benötigen verlustfreie Codierung, um scharf zu bleiben.</p>
<h2>JPEG: der universelle Standard</h2>
<p>JPEG ist seit drei Jahrzehnten das dominierende Bildformat im Web. Es verwendet einen verlustbehafteten Komprimierungsalgorithmus, der auf der diskreten Kosinustransformation basiert — derselben Technik, die auch in Videocodecs verwendet wird. Der Encoder teilt das Bild in 8x8-Pixel-Blöcke auf, transformiert jeden Block in den Frequenzraum und verwirft hochfrequente Informationen, die das menschliche Auge weniger stark wahrnimmt.</p>
<p><strong>Stärken:</strong> Universelle Browserunterstützung, hervorragende Komprimierung für Fotos, einstellbare Qualität.</p>
<p><strong>Schwächen:</strong> Keine Transparenzunterstützung, sichtbare Blockartefakte bei niedriger Qualität, schlechte Komprimierung für Text und Grafiken.</p>
<p><strong>Am besten geeignet für:</strong> Fotos, komplexe Verläufe, Social-Media-Bilder, jede Situation, in der universelle Kompatibilität wichtiger ist als die Dateigröße.</p>`,
      it: `<p>La compressione delle immagini è un problema risolto in linea di principio, ma scegliere il formato o la qualità sbagliata può sprecare larghezza di banda, rallentare il sito o produrre artefatti visibili. Ecco una guida pratica su come funzionano i principali formati e quando utilizzarli.</p>
<h2>Con perdita vs senza perdita</h2>
<p>Ogni formato immagine rientra in una di due categorie. I formati senza perdita preservano ogni pixel dell'originale — l'immagine decodificata è identica bit per bit alla sorgente. I formati con perdita scartano informazioni a cui l'occhio umano è meno sensibile, ottenendo file molto più piccoli a costo di una certa fedeltà.</p>
<p>La scelta dipende dal caso d'uso. Le fotografie e i gradienti tollerano bene la compressione con perdita perché gli artefatti sono difficili da notare a dimensioni di visualizzazione normali. Screenshot, testo, loghi e grafiche con bordi netti necessitano di codifica senza perdita per rimanere nitidi.</p>
<h2>JPEG: lo standard universale</h2>
<p>JPEG è stato il formato immagine dominante sul web per tre decenni. Utilizza un algoritmo di compressione con perdita basato sulla trasformata discreta del coseno — la stessa tecnica utilizzata nei codec video. Il codificatore divide l'immagine in blocchi di 8x8 pixel, trasforma ogni blocco nello spazio delle frequenze e scarta le informazioni ad alta frequenza che l'occhio umano percepisce meno acutamente.</p>
<p><strong>Punti di forza:</strong> Supporto universale nei browser, compressione eccellente per le fotografie, qualità regolabile.</p>
<p><strong>Debolezze:</strong> Nessun supporto per la trasparenza, artefatti a blocchi visibili a bassa qualità, scarsa compressione per testo e grafica.</p>
<p><strong>Ideale per:</strong> Fotografie, gradienti complessi, immagini per social media, qualsiasi situazione in cui la compatibilità universale sia più importante della dimensione del file.</p>`,
      pt: `<p>A compressão de imagens é um problema resolvido em princípio, mas escolher o formato ou ajuste de qualidade errado pode desperdiçar largura de banda, desacelerar seu site ou produzir artefatos visíveis. Aqui está um guia prático de como os principais formatos funcionam e quando usar cada um.</p>
<h2>Com perda vs sem perda</h2>
<p>Cada formato de imagem se enquadra em uma de duas categorias. Formatos sem perda preservam cada pixel do original — a imagem decodificada é idêntica bit a bit à fonte. Formatos com perda descartam informações às quais o olho humano é menos sensível, alcançando tamanhos de arquivo muito menores ao custo de alguma fidelidade.</p>
<p>Qual escolher depende do caso de uso. Fotografias e gradientes toleram bem a compressão com perda porque os artefatos são difíceis de detectar em tamanhos normais de visualização. Capturas de tela, texto, logotipos e gráficos com bordas nítidas precisam de codificação sem perda para permanecerem nítidos.</p>
<h2>JPEG: o padrão universal</h2>
<p>JPEG é o formato de imagem dominante na web há três décadas. Ele usa um algoritmo de compressão com perda baseado na transformada discreta de cosseno — a mesma técnica usada em codecs de vídeo. O codificador divide a imagem em blocos de 8x8 pixels, transforma cada bloco em espaço de frequência e descarta informações de alta frequência que o olho humano percebe com menos acuidade.</p>
<p><strong>Pontos fortes:</strong> Suporte universal em navegadores, excelente compressão para fotografias, qualidade ajustável.</p>
<p><strong>Pontos fracos:</strong> Sem suporte a transparência, artefatos de bloco visíveis em baixa qualidade, compressão ruim para texto e gráficos.</p>
<p><strong>Melhor para:</strong> Fotografias, gradientes complexos, imagens de mídia social, qualquer situação onde a compatibilidade universal importa mais que o tamanho do arquivo.</p>`,
      ru: `<p>Сжатие изображений в принципе является решённой проблемой, но выбор неправильного формата или настройки качества может привести к потере пропускной способности, замедлению сайта или появлению видимых артефактов. Вот практическое руководство о том, как работают основные форматы и когда их использовать.</p>
<h2>С потерями и без потерь</h2>
<p>Каждый формат изображения относится к одной из двух категорий. Форматы без потерь сохраняют каждый пиксель оригинала — декодированное изображение идентично источнику бит в бит. Форматы с потерями отбрасывают информацию, к которой человеческий глаз менее чувствителен, достигая гораздо меньших размеров файлов ценой некоторой точности.</p>
<p>Выбор зависит от случая использования. Фотографии и градиенты хорошо переносят сжатие с потерями, потому что артефакты трудно заметить при обычных размерах просмотра. Скриншоты, текст, логотипы и графика с чёткими краями требуют кодирования без потерь, чтобы оставаться чёткими.</p>
<h2>JPEG: универсальный стандарт</h2>
<p>JPEG был доминирующим форматом изображений в вебе на протяжении трёх десятилетий. Он использует алгоритм сжатия с потерями, основанный на дискретном косинусном преобразовании — той же технике, что используется в видеокодеках. Кодировщик делит изображение на блоки 8x8 пикселей, преобразует каждый блок в частотное пространство и отбрасывает высокочастотную информацию, которую человеческий глаз воспринимает менее остро.</p>
<p><strong>Сильные стороны:</strong> Универсальная поддержка браузерами, отличное сжатие для фотографий, регулируемое качество.</p>
<p><strong>Слабые стороны:</strong> Нет поддержки прозрачности, видимые блочные артефакты при низком качестве, плохое сжатие для текста и графики.</p>
<p><strong>Лучше всего для:</strong> Фотографий, сложных градиентов, изображений для соцсетей, любых ситуаций, где универсальная совместимость важнее размера файла.</p>`,
      zh: `<p>图像压缩原则上是一个已解决的问题，但选择错误的格式或质量设置可能会浪费带宽、减慢网站速度或产生可见的伪影。这里是关于主要格式如何工作以及何时使用它们的实用指南。</p>
<h2>有损 vs 无损</h2>
<p>每种图像格式都属于两类之一。无损格式保留原始图像的每个像素——解码后的图像与源文件逐位相同。有损格式丢弃人眼不太敏感的信息，以牺牲一些保真度为代价获得更小的文件大小。</p>
<p>选择哪种取决于使用场景。照片和渐变可以很好地容忍有损压缩，因为在正常查看尺寸下很难发现伪影。截图、文本、标志和具有锋利边缘的图形需要无损编码以保持清晰。</p>
<h2>JPEG：通用标准</h2>
<p>三十年来，JPEG一直是网络上占主导地位的图像格式。它使用基于离散余弦变换的有损压缩算法——与视频编解码器使用的技术相同。编码器将图像分成8x8像素块，将每个块转换到频率空间，并丢弃人眼不太敏锐感知的高频信息。</p>
<p><strong>优势：</strong> 通用浏览器支持，出色的照片压缩，可调节质量。</p>
<p><strong>劣势：</strong> 不支持透明度，低质量下可见块状伪影，文本和图形压缩效果差。</p>
<p><strong>最适合：</strong> 照片、复杂渐变、社交媒体图像、任何通用兼容性比文件大小更重要的情况。</p>`,
      ja: `<p>画像圧縮は原理的には解決された問題ですが、間違った形式や品質設定を選択すると、帯域幅を無駄にしたり、サイトを遅くしたり、目に見えるアーティファクトを生成したりする可能性があります。主要な形式の仕組みと、それぞれをいつ使用するかについての実践的なガイドです。</p>
<h2>非可逆 vs 可逆</h2>
<p>すべての画像形式は2つのカテゴリのいずれかに分類されます。可逆形式は元のすべてのピクセルを保持します——デコードされた画像はソースとビット単位で同一です。非可逆形式は人間の目が感知しにくい情報を破棄し、ある程度の忠実性を犠牲にして、はるかに小さなファイルサイズを実現します。</p>
<p>どちらを選ぶかは使用例によって異なります。写真やグラデーションは非可逆圧縮に耐性があります。通常の表示サイズではアーティファクトが目立ちにくいためです。スクリーンショット、テキスト、ロゴ、鮮明なエッジを持つグラフィックは、鮮明さを保つために可逆エンコードが必要です。</p>
<h2>JPEG：ユニバーサルスタンダード</h2>
<p>JPEGは30年にわたってウェブ上の支配的な画像形式でした。離散コサイン変換に基づく非可逆圧縮アルゴリズムを使用しています——ビデオコーデックで使用されるのと同じ技術です。エンコーダーは画像を8x8ピクセルのブロックに分割し、各ブロックを周波数空間に変換し、人間の目が鋭く知覚しない高周波情報を破棄します。</p>
<p><strong>強み：</strong> ユニバーサルなブラウザサポート、写真の優れた圧縮、調整可能な品質。</p>
<p><strong>弱み：</strong> 透明性の非対応、低品質でのブロック状アーティファクト、テキストやグラフィックの圧縮が不十分。</p>
<p><strong>最適な用途：</strong> 写真、複雑なグラデーション、ソーシャルメディア画像、ファイルサイズよりも互換性が重要な状況。</p>`,
      ko: `<p>이미지 압축은 원칙적으로 해결된 문제이지만, 잘못된 형식이나 품질 설정을 선택하면 대역폭을 낭비하고 사이트 속도를 늦추거나 눈에 띄는 아티팩트가 발생할 수 있습니다. 주요 형식의 작동 방식과 각각을 사용해야 하는 시기에 대한 실용적인 가이드입니다.</p>
<h2>손실 vs 무손실</h2>
<p>모든 이미지 형식은 두 가지 범주 중 하나에 속합니다. 무손실 형식은 원본의 모든 픽셀을 보존합니다——디코딩된 이미지는 소스와 비트 단위로 동일합니다. 손실 형식은 사람의 눈이 덜 민감한 정보를 버려 일부 충실도를 희생하면서 훨씬 작은 파일 크기를 달성합니다.</p>
<p>어느 것을 선택할지는 사용 사례에 따라 다릅니다. 사진과 그라데이션은 손실 압축을 잘 견딥니다. 일반적인 보기 크기에서 아티팩트를 발견하기 어렵기 때문입니다. 스크린샷, 텍스트, 로고, 날카로운 가장자리가 있는 그래픽은 선명함을 유지하기 위해 무손실 인코딩이 필요합니다.</p>
<h2>JPEG: 보편적인 표준</h2>
<p>JPEG는 30년 동안 웹에서 지배적인 이미지 형식이었습니다. 이산 코사인 변환을 기반으로 한 손실 압축 알고리즘을 사용합니다——비디오 코덱에서 사용되는 것과 동일한 기술입니다. 인코더는 이미지를 8x8 픽셀 블록으로 나누고, 각 블록을 주파수 공간으로 변환하며, 인간의 눈이 덜 예민하게 인지하는 고주파 정보를 버립니다.</p>
<p><strong>장점:</strong> 보편적인 브라우저 지원, 사진의 뛰어난 압축, 조정 가능한 품질.</p>
<p><strong>단점:</strong> 투명도 미지원, 저품질에서 가시적인 블록 아티팩트, 텍스트 및 그래픽의 낮은 압축률.</p>
<p><strong>최적 대상:</strong> 사진, 복잡한 그라데이션, 소셜 미디어 이미지, 파일 크기보다 보편적 호환성이 중요한 모든 상황.</p>`,
      ar: `<p>ضغط الصور هو مشكلة محلولة من حيث المبدأ، لكن اختيار التنسيق الخاطئ أو إعداد الجودة الخاطئ يمكن أن يهدر عرض النطاق الترددي، ويبطئ موقعك، أو ينتج تشوهات مرئية. إليك دليل عملي لكيفية عمل التنسيقات الرئيسية ومتى تستخدم كل منها.</p>
<h2>مع فقدان مقابل بدون فقدان</h2>
<p>كل تنسيق صورة يقع في واحدة من فئتين. التنسيقات بدون فقدان تحافظ على كل بكسل من الأصل — الصورة التي تم فك تشفيرها متطابقة بتاً بتاً مع المصدر. التنسيقات مع فقدان تتخلص من المعلومات التي تكون العين البشرية أقل حساسية لها، محققة أحجام ملفات أصغر بكثير على حساب بعض الدقة.</p>
<p>اختيار أيهما يعتمد على حالة الاستخدام. الصور الفوتوغرافية والتدرجات تتحمل الضغط مع فقدان بشكل جيد لأن التشوهات يصعب اكتشافها في أحجام المشاهدة العادية. لقطات الشاشة والنصوص والشعارات والرسومات ذات الحواف الحادة تحتاج إلى ترميز بدون فقدان لتبقى واضحة.</p>
<h2>JPEG: المعيار العالمي</h2>
<p>JPEG هو تنسيق الصور المسيطر على الويب منذ ثلاثة عقود. يستخدم خوارزمية ضغط مع فقدان تعتمد على تحويل جيب التمام المتقطع — نفس التقنية المستخدمة في برامج ترميز الفيديو. يقسم المشفر الصورة إلى كتل بحجم 8×8 بكسل، ويحول كل كتلة إلى مجال التردد، ويتخلص من المعلومات عالية التردد التي تدركها العين البشرية بشكل أقل حدة.</p>
<p><strong>نقاط القوة:</strong> دعم عالمي في المتصفحات، ضغط ممتاز للصور الفوتوغرافية، جودة قابلة للتعديل.</p>
<p><strong>نقاط الضعف:</strong> لا يدعم الشفافية، تشوهات كتلة مرئية عند الجودة المنخفضة، ضغط ضعيف للنصوص والرسومات.</p>
<p><strong>الأفضل لـ:</strong> الصور الفوتوغرافية، التدرجات المعقدة، صور وسائل التواصل الاجتماعي، أي حالة تكون فيها التوافقية العالمية أكثر أهمية من حجم الملف.</p>`,
      hi: `<p>इमेज कंप्रेशन सिद्धांत रूप में एक हल की गई समस्या है, लेकिन गलत फ़ॉर्मेट या गुणवत्ता सेटिंग चुनने से बैंडविड्थ बर्बाद हो सकती है, आपकी साइट धीमी हो सकती है, या दिखाई देने वाली कलाकृतियाँ उत्पन्न हो सकती हैं। यहाँ प्रमुख फ़ॉर्मेट कैसे काम करते हैं और प्रत्येक का उपयोग कब करना है, इसके बारे में एक व्यावहारिक मार्गदर्शिका है।</p>
<h2>हानिपूर्ण बनाम हानिरहित</h2>
<p>हर इमेज फ़ॉर्मेट दो श्रेणियों में से एक में आता है। हानिरहित फ़ॉर्मेट मूल के हर पिक्सेल को संरक्षित करते हैं — डीकोड की गई इमेज स्रोत के समान बिट-दर-बिट होती है। हानिपूर्ण फ़ॉर्मेट उस जानकारी को हटा देते हैं जिसके प्रति मानव आँख कम संवेदनशील होती है, कुछ निष्ठा की कीमत पर बहुत छोटे फ़ाइल आकार प्राप्त करते हैं।</p>
<p>कौन सा चुनना है यह उपयोग के मामले पर निर्भर करता है। तस्वीरें और ग्रेडिएंट हानिपूर्ण कंप्रेशन को अच्छी तरह सहन करते हैं क्योंकि सामान्य देखने के आकार में कलाकृतियों को पहचानना मुश्किल होता है। स्क्रीनशॉट, टेक्स्ट, लोगो और तेज किनारों वाले ग्राफ़िक्स को स्पष्ट रहने के लिए हानिरहित एन्कोडिंग की आवश्यकता होती है।</p>
<h2>JPEG: सार्वभौमिक मानक</h2>
<p>JPEG तीन दशकों से वेब पर प्रमुख इमेज फ़ॉर्मेट रहा है। यह असतत कोसाइन ट्रांसफ़ॉर्म पर आधारित हानिपूर्ण कंप्रेशन एल्गोरिदम का उपयोग करता है — वही तकनीक जो वीडियो कोडेक्स में उपयोग की जाती है। एन्कोडर इमेज को 8x8 पिक्सेल ब्लॉक में विभाजित करता है, प्रत्येक ब्लॉक को फ़्रीक्वेंसी स्पेस में बदलता है, और उच्च-आवृत्ति जानकारी को हटा देता है जिसे मानव आँख कम तीव्रता से समझती है।</p>
<p><strong>खूबियाँ:</strong> सार्वभौमिक ब्राउज़र समर्थन, तस्वीरों के लिए उत्कृष्ट कंप्रेशन, समायोज्य गुणवत्ता।</p>
<p><strong>कमज़ोरियाँ:</strong> कोई पारदर्शिता समर्थन नहीं, कम गुणवत्ता पर दिखाई देने वाली ब्लॉक कलाकृतियाँ, टेक्स्ट और ग्राफ़िक्स के लिए खराब कंप्रेशन।</p>
<p><strong>सबसे उपयुक्त:</strong> तस्वीरें, जटिल ग्रेडिएंट, सोशल मीडिया इमेज, कोई भी स्थिति जहाँ सार्वभौमिक संगतता फ़ाइल आकार से अधिक महत्वपूर्ण हो।</p>`,
      tr: `<p>Görüntü sıkıştırma prensipte çözülmüş bir problemdir, ancak yanlış biçim veya kalite ayarını seçmek bant genişliğini boşa harcayabilir, sitenizi yavaşlatabilir veya görünür yapay bozulmalar üretebilir. İşte ana biçimlerin nasıl çalıştığı ve her birinin ne zaman kullanılacağı hakkında pratik bir rehber.</p>
<h2>Kayıplı vs kayıpsız</h2>
<p>Her görüntü biçimi iki kategoriden birine girer. Kayıpsız biçimler orijinalin her pikselini korur — kodu çözülmüş görüntü, kaynakla bit-bit aynıdır. Kayıplı biçimler, insan gözünün daha az duyarlı olduğu bilgileri atar, bir miktar doğruluk pahasına çok daha küçük dosya boyutları elde eder.</p>
<p>Hangisini seçeceğiniz kullanım durumuna bağlıdır. Fotoğraflar ve gradyanlar kayıplı sıkıştırmayı iyi tolere eder çünkü yapay bozulmalar normal görüntüleme boyutlarında fark edilmesi zordur. Ekran görüntüleri, metin, logolar ve keskin kenarlı grafikler, keskin kalmaları için kayıpsız kodlama gerektirir.</p>
<h2>JPEG: evrensel standart</h2>
<p>JPEG, otuz yıldır web'de baskın görüntü biçimi olmuştur. Ayrık kosinüs dönüşümüne dayalı kayıplı bir sıkıştırma algoritması kullanır — video codec'lerinde kullanılan aynı teknik. Kodlayıcı, görüntüyü 8x8 piksel bloklarına böler, her bloğu frekans uzayına dönüştürür ve insan gözünün daha az algıladığı yüksek frekanslı bilgileri atar.</p>
<p><strong>Güçlü yönler:</strong> Evrensel tarayıcı desteği, fotoğraflar için mükemmel sıkıştırma, ayarlanabilir kalite.</p>
<p><strong>Zayıf yönler:</strong> Saydamlık desteği yok, düşük kalitede görünür blok yapay bozulmaları, metin ve grafikler için zayıf sıkıştırma.</p>
<p><strong>En uygun:</strong> Fotoğraflar, karmaşık gradyanlar, sosyal medya görüntüleri, evrensel uyumluluğun dosya boyutundan daha önemli olduğu her durum.</p>`,
    },
  ),
  'designing-the-compressor': t(
    {
      en: 'Designing the Compressor: details that mattered',
      es: 'Diseñando el Compresor: detalles que importaron',
      fr: "Concevoir le Compresseur : les détails qui comptaient",
      de: 'Design des Kompressors: Details, die wichtig waren',
      it: 'Progettare il Compressore: i dettagli che contavano',
      pt: 'Projetando o Compressor: detalhes que importaram',
      ru: 'Проектирование компрессора: детали, которые имели значение',
      zh: '设计压缩器：重要的细节',
      ja: 'コンプレッサーの設計：重要だった詳細',
      ko: '압축기 설계: 중요한 세부 사항',
      ar: 'تصميم الضاغط: التفاصيل التي كانت مهمة',
      hi: 'कंप्रेसर डिज़ाइन करना: वे विवरण जो मायने रखते थे',
      tr: 'Sıkıştırıcıyı Tasarlamak: Önemli Olan Detaylar',
    },
    {
      en: 'Notes from the design process — how we made a tool that feels fast and respectful of your files.',
      es: 'Notas del proceso de diseño — cómo hicimos una herramienta que se siente rápida y respeta tus archivos.',
      fr: 'Notes du processus de conception — comment nous avons créé un outil rapide et respectueux de vos fichiers.',
      de: 'Notizen aus dem Designprozess — wie wir ein Tool gebaut haben, das sich schnell anfühlt und Ihre Dateien respektiert.',
      it: 'Note dal processo di progettazione — come abbiamo creato uno strumento veloce e rispettoso dei tuoi file.',
      pt: 'Notas do processo de design — como fizemos uma ferramenta rápida e respeitosa com seus arquivos.',
      ru: 'Заметки из процесса проектирования — как мы сделали инструмент, который работает быстро и уважает ваши файлы.',
      zh: '设计过程中的笔记——我们如何打造一个快速且尊重您文件的工具。',
      ja: 'デザインプロセスからのメモ——高速でファイルを尊重するツールの作り方。',
      ko: '디자인 프로세스 노트 — 빠르고 파일을 존중하는 도구를 만든 방법.',
      ar: 'ملاحظات من عملية التصميم — كيف صنعنا أداة سريعة وتحترم ملفاتك.',
      hi: 'डिज़ाइन प्रक्रिया से नोट्स — हमने एक ऐसा टूल कैसे बनाया जो तेज़ और आपकी फ़ाइलों का सम्मान करता है।',
      tr: 'Tasarım sürecinden notlar — hızlı hissettiren ve dosyalarınıza saygılı bir araç nasıl yaptık.',
    },
    {
      en: ['design', 'ux', 'interface'],
      es: ['diseño', 'ux', 'interfaz'],
      fr: ['design', 'ux', 'interface'],
      de: ['design', 'ux', 'schnittstelle'],
      it: ['design', 'ux', 'interfaccia'],
      pt: ['design', 'ux', 'interface'],
      ru: ['дизайн', 'ux', 'интерфейс'],
      zh: ['设计', '用户体验', '界面'],
      ja: ['デザイン', 'ux', 'インターフェース'],
      ko: ['디자인', 'ux', '인터페이스'],
      ar: ['تصميم', 'ux', 'واجهة'],
      hi: ['डिज़ाइन', 'ux', 'इंटरफ़ेस'],
      tr: ['tasarım', 'ux', 'arayüz'],
    },
    {
      en: `<p>Building a good image compressor is hard. Building one that feels effortless, private, and respectful of your files is harder. Here are the design decisions that shaped the ToolBox Image compressor.</p>
<h2>The upload experience</h2>
<p>The first interaction a user has with the compressor is the upload zone. Most tools use a small, bordered box that says "Drop files here." We wanted something different — a full-width area that communicates possibility. You can click to browse, drag a single file, or drag an entire folder of 200 images. The upload area scales to fill the viewport and provides immediate visual feedback: a subtle glow, a scaling animation, and a file count badge.</p>
<p>The folder drag support was our hardest design trade-off. Supporting recursive folder scanning in the browser is technically challenging — the File System Access API is not available everywhere, and the fallback path requires manual enumeration. We invested in the fallback because the use case is clear: photographers and designers organise their work in folders. Asking them to flatten their directory structure before compressing would be a poor experience.</p>
<h2>The comparison slider</h2>
<p>When a user compresses an image, the single most important question is: did it lose quality? Numbers alone — "75% quality" — tell you nothing about visual fidelity. A side-by-side comparison slider lets users inspect the difference at pixel level.</p>
<p>The slider implementation was surprisingly delicate. The original and compressed images must be perfectly aligned, with synchronised pan and zoom. The slider handle must be large enough to find on mobile but unobtrusive on desktop. We settled on a 40px handle with a subtle drop shadow and a 2px divider line that stays visible regardless of image content.</p>
<h2>Parallel progress</h2>
<p>Batch processing with multiple workers creates a visualisation challenge: how do you show progress when eight images are compressing simultaneously? A single progress bar would jump unpredictably as fast workers finish and slow ones continue. Individual progress bars for each image would overwhelm the interface.</p>
<p>Our solution is a collapsed progress bar that shows overall completion percentage, total bytes saved, and a count of completed files. Users can expand it to see individual file status, including before-and-after sizes and quality metrics. The expanded view uses a compact, scrolled list that does not push the results below the fold.</p>
<h2>Dark mode by default</h2>
<p>We chose a dark interface for a practical reason: image compression is a visual task. A bright white background creates contrast that interferes with colour perception. Photos and graphics are easier to evaluate against a dark canvas. The dark theme also reduces eye strain during long batch processing sessions.</p>
<h2>Settings, simplified</h2>
<p>Image compression has a bewildering number of knobs: quality, format, chroma subsampling, colour space, metadata flags, progressive scan, optimisation passes. Exposing all of them would paralyse most users. We chose three presets — Auto, High Quality, and Lossless — that cover 95% of use cases. Advanced users can switch to Custom mode to access every parameter.</p>
<p>The Auto preset is the default and the one we recommend. It analyses each image individually and selects the format, quality, and optimisation level that produces the best balance of file size and quality. For most users, Auto is the only setting they will ever need.</p>
<h2>What we learned</h2>
<p>Designing the compressor taught us that users care deeply about three things: speed, privacy, and predictability. They want to know the tool will finish quickly, that their files are safe, and that the output will look good. Everything else — the specific format, the quality number, the compression method — is implementation detail. We built the interface around those three priorities, and early feedback suggests we made the right call.</p>`,
    },
  ),
  'introducing-toolboximage': t(
    {
      en: 'Introducing ToolBox Image v1.0',
      es: 'Presentamos ToolBox Image v1.0',
      fr: 'Présentation de ToolBox Image v1.0',
      de: 'Einführung von ToolBox Image v1.0',
      it: 'Presentazione di ToolBox Image v1.0',
      pt: 'Apresentando o ToolBox Image v1.0',
      ru: 'Представляем ToolBox Image v1.0',
      zh: '介绍 ToolBox Image v1.0',
      ja: 'ToolBox Image v1.0 のご紹介',
      ko: 'ToolBox Image v1.0 소개',
      ar: 'تقديم ToolBox Image الإصدار 1.0',
      hi: 'ToolBox Image v1.0 का परिचय',
      tr: 'ToolBox Image v1.0 Tanıtımı',
    },
    {
      en: 'The Compressor is live. Here is what we are building next and why.',
      es: 'El Compresor está en vivo. Aquí está lo que estamos construyendo a continuación y por qué.',
      fr: 'Le Compresseur est en ligne. Voici ce que nous construisons ensuite et pourquoi.',
      de: 'Der Kompressor ist live. Hier erfahren Sie, was wir als Nächstes bauen und warum.',
      it: 'Il Compressore è live. Ecco cosa stiamo costruendo dopo e perché.',
      pt: 'O Compressor está no ar. Aqui está o que estamos construindo em seguida e por quê.',
      ru: 'Компрессор запущен. Вот что мы строим дальше и почему.',
      zh: '压缩器已上线。这是我们接下来要构建的内容以及原因。',
      ja: 'コンプレッサーが稼働しました。次に構築するものとその理由をご紹介します。',
      ko: '압축기가 라이브되었습니다. 다음에 구축할 내용과 그 이유를 소개합니다.',
      ar: 'الضاغط يعمل الآن. إليك ما نبني بعد ذلك ولماذا.',
      hi: 'कंप्रेसर लाइव है। यहाँ हम आगे क्या बना रहे हैं और क्यों।',
      tr: 'Sıkıştırıcı canlı. İşte sırada ne inşa ediyoruz ve neden.',
    },
    {
      en: ['announcement', 'product', 'launch'],
      es: ['anuncio', 'producto', 'lanzamiento'],
      fr: ['annonce', 'produit', 'lancement'],
      de: ['ankündigung', 'produkt', 'einführung'],
      it: ['annuncio', 'prodotto', 'lancio'],
      pt: ['anúncio', 'produto', 'lançamento'],
      ru: ['анонс', 'продукт', 'запуск'],
      zh: ['公告', '产品', '发布'],
      ja: ['発表', '製品', 'ローンチ'],
      ko: ['발표', '제품', '런칭'],
      ar: ['إعلان', 'منتج', 'إطلاق'],
      hi: ['घोषणा', 'उत्पाद', 'लॉन्च'],
      tr: ['duyuru', 'ürün', 'lansman'],
    },
    {
      en: `<p>Today we are launching ToolBox Image v1.0 with our first tool: the Image Compressor. It is the result of months of work on an architecture that we believe is the right way to build privacy-first web applications.</p>
<h2>What we built</h2>
<p>The compressor handles JPEG, PNG, WebP, AVIF, GIF, SVG, and HEIC images. It runs entirely in the browser using WebAssembly — no server processing, no uploads, no data transfer. Users can compress up to 200 images at once, with parallel encoding across all CPU cores. Each compressed image gets a side-by-side comparison slider so quality can be verified before download.</p>
<p>Key features:</p>
<ul>
<li>Lossy and lossless compression for all major formats</li>
<li>Target-size mode that hits exact file sizes automatically</li>
<li>Format conversion between any supported format</li>
<li>Metadata stripping for privacy</li>
<li>Batch processing with preserved folder structure</li>
<li>ZIP export for bulk downloads</li>
</ul>
<h2>Why start here</h2>
<p>Image compression is the most universally needed image tool. Every photographer, designer, developer, and social media user needs to compress images at some point. It is also a category dominated by tools that upload files to servers — a model that is fundamentally incompatible with privacy. Building a better compressor that respects user privacy felt like the right place to start.</p>
<h2>What we are building next</h2>
<p>The compressor is the first of many tools. Here is what is coming:</p>
<ul>
<li><strong>Image Resizer</strong> — resize to exact dimensions or aspect ratios with intelligent cropping</li>
<li><strong>Crop Tool</strong> — preset ratios and freeform selection with guides</li>
<li><strong>Format Converter</strong> — batch conversion between any supported format</li>
<li><strong>HEIC Converter</strong> — convert Apple's HEIC photos to JPEG or PNG</li>
<li><strong>Metadata Viewer</strong> — inspect and strip EXIF data</li>
<li><strong>Rotate and Flip</strong> — basic geometric transforms</li>
</ul>
<p>All tools will follow the same architecture: browser-first, private by default, free and unlimited.</p>
<h2>Our commitments</h2>
<p>ToolBox Image will always be free. The browser-first architecture means our operating costs are minimal — we do not pay for server processing, storage, or bandwidth for image uploads. There is no premium tier, no file size limit, no daily cap, and no sign-up required.</p>
<p>Your files stay on your device. We do not collect, store, or analyse your images. We do not use third-party analytics or tracking cookies. The only code that touches your images is the code running in your browser.</p>
<p>The compressor is live now. Try it, share it, and let us know what you think.</p>`,
    },
  ),
  'choose-image-format': t(
    {
      en: 'How to choose the right image format for your website',
      es: 'Cómo elegir el formato de imagen adecuado para tu sitio web',
      fr: "Comment choisir le bon format d'image pour votre site web",
      de: 'So wählen Sie das richtige Bildformat für Ihre Website',
      it: 'Come scegliere il formato immagine giusto per il tuo sito web',
      pt: 'Como escolher o formato de imagem certo para seu site',
      ru: 'Как выбрать правильный формат изображения для вашего сайта',
      zh: '如何为您的网站选择正确的图像格式',
      ja: 'ウェブサイトに適切な画像形式を選ぶ方法',
      ko: '웹사이트에 적합한 이미지 형식을 선택하는 방법',
      ar: 'كيف تختار تنسيق الصورة المناسب لموقعك على الويب',
      hi: 'अपनी वेबसाइट के लिए सही इमेज फ़ॉर्मेट कैसे चुनें',
      tr: 'Web siteniz için doğru görüntü biçimi nasıl seçilir',
    },
    {
      en: 'JPEG, PNG, WebP, AVIF — which one should you use? A practical guide to picking the best format for every image on your site.',
      es: 'JPEG, PNG, WebP, AVIF — ¿cuál deberías usar? Una guía práctica para elegir el mejor formato para cada imagen en tu sitio.',
      fr: 'JPEG, PNG, WebP, AVIF — lequel utiliser ? Un guide pratique pour choisir le meilleur format pour chaque image de votre site.',
      de: 'JPEG, PNG, WebP, AVIF — welches sollten Sie verwenden? Ein praktischer Leitfaden zur Auswahl des besten Formats für jedes Bild auf Ihrer Website.',
      it: 'JPEG, PNG, WebP, AVIF — quale dovresti usare? Una guida pratica per scegliere il formato migliore per ogni immagine sul tuo sito.',
      pt: 'JPEG, PNG, WebP, AVIF — qual você deve usar? Um guia prático para escolher o melhor formato para cada imagem no seu site.',
      ru: 'JPEG, PNG, WebP, AVIF — какой использовать? Практическое руководство по выбору лучшего формата для каждого изображения на вашем сайте.',
      zh: 'JPEG、PNG、WebP、AVIF——你应该使用哪一个？为网站上的每张图片选择最佳格式的实用指南。',
      ja: 'JPEG、PNG、WebP、AVIF — どれを使うべきか？サイト上のすべての画像に最適な形式を選ぶ実践ガイド。',
      ko: 'JPEG, PNG, WebP, AVIF — 어떤 것을 사용해야 할까요? 사이트의 모든 이미지에 가장 적합한 형식을 선택하는 실용 가이드.',
      ar: 'JPEG، PNG، WebP، AVIF — أي واحد يجب أن تستخدم؟ دليل عملي لاختيار أفضل تنسيق لكل صورة على موقعك.',
      hi: 'JPEG, PNG, WebP, AVIF — आपको किसका उपयोग करना चाहिए? आपकी साइट पर हर इमेज के लिए सबसे अच्छा फ़ॉर्मेट चुनने की एक व्यावहारिक मार्गदर्शिका।',
      tr: 'JPEG, PNG, WebP, AVIF — hangisini kullanmalısınız? Sitenizdeki her görüntü için en iyi biçimi seçmeye yönelik pratik bir rehber.',
    },
    {
      en: ['jpeg', 'png', 'webp', 'avif', 'image-formats', 'optimization'],
      es: ['jpeg', 'png', 'webp', 'avif', 'formatos-de-imagen', 'optimización'],
      fr: ['jpeg', 'png', 'webp', 'avif', 'formats-d-image', 'optimisation'],
      de: ['jpeg', 'png', 'webp', 'avif', 'bildformate', 'optimierung'],
      it: ['jpeg', 'png', 'webp', 'avif', 'formati-immagine', 'ottimizzazione'],
      pt: ['jpeg', 'png', 'webp', 'avif', 'formatos-de-imagem', 'otimização'],
      ru: ['jpeg', 'png', 'webp', 'avif', 'форматы-изображений', 'оптимизация'],
      zh: ['jpeg', 'png', 'webp', 'avif', '图像格式', '优化'],
      ja: ['jpeg', 'png', 'webp', 'avif', '画像形式', '最適化'],
      ko: ['jpeg', 'png', 'webp', 'avif', '이미지-형식', '최적화'],
      ar: ['jpeg', 'png', 'webp', 'avif', 'تنسيقات-الصور', 'تحسين'],
      hi: ['jpeg', 'png', 'webp', 'avif', 'इमेज-फ़ॉर्मेट', 'ऑप्टिमाइज़ेशन'],
      tr: ['jpeg', 'png', 'webp', 'avif', 'görüntü-biçimleri', 'optimizasyon'],
    },
    {
      en: `<p>Choosing the wrong image format is one of the most common performance mistakes on the web. A JPEG photo that should be 200 KB ends up as a 2 MB PNG. A WebP image gets served to a browser that does not support it. Here is how to make the right call every time.</p>
<h2>The quick decision tree</h2>
<p>Ask yourself three questions. Does the image need transparency? Use PNG or WebP. Is it a photograph or complex gradient? Use JPEG, WebP, or AVIF. Does it have sharp edges, text, or logos? Use PNG.</p>
<p>For modern browsers, WebP is the best default — it supports both transparency and lossy compression, and it is supported by 97% of browsers. Use a JPEG fallback for the remaining 3% via the <code>&lt;picture&gt;</code> element. If file size is your absolute priority and your audience uses modern browsers, AVIF offers the best compression ratios.</p>
<h2>JPEG: when compatibility matters most</h2>
<p>JPEG has been the web standard for photographs since the 1990s. Every device, CMS, social media platform, and email client supports it. The compression works by dividing the image into 8x8 pixel blocks and discarding high-frequency detail that the human eye is less sensitive to.</p>
<p>Use JPEG when universal compatibility is non-negotiable: email attachments, CMS uploads, social media, and legacy systems. The quality slider of 75-85 offers the best balance of file size and visual quality for most photographs. Below 50, block artefacts become visible, especially in sky gradients and shadows.</p>
<h2>PNG: precision and transparency</h2>
<p>PNG uses lossless Deflate compression with a pre-processing filter that makes each row of pixels more compressible. It preserves every pixel exactly, supports full alpha transparency, and handles sharp edges and text perfectly.</p>
<p>Use PNG for screenshots, logos, UI elements, infographics, and any image with text. The trade-off is file size — a photograph saved as PNG can be 3-5 times larger than the same image as JPEG. For photographs that need transparency, consider WebP instead, which supports alpha while keeping file sizes much smaller.</p>
<h2>WebP: the modern default</h2>
<p>WebP was designed specifically for the web. It supports lossy compression (based on VP8 video intra-frame coding) and lossless compression (using spatial prediction and colour cache). Lossy WebP is typically 25-35% smaller than JPEG at the same quality, and lossless WebP is 20-30% smaller than PNG.</p>
<p>Use WebP as your default format for web images. Browser support covers Chrome, Firefox, Safari (14+), Edge, and Opera — over 97% of global usage. Serve WebP with a JPEG fallback using the <code>&lt;picture&gt;</code> element for maximum compatibility.</p>
<h2>AVIF: maximum compression</h2>
<p>AVIF uses the AV1 codec and achieves 30-50% better compression than WebP. It supports HDR, wide colour gamut, 10/12-bit depth, transparency, and lossless mode. Netflix and YouTube use the same underlying codec for video streaming.</p>
<p>Use AVIF when file size is critical and your audience uses modern browsers (92% support). It is ideal for photographic content on performance-sensitive pages. The trade-off is encoding speed — AVIF compression takes longer than JPEG or WebP, which is why our batch compressor processes images in parallel across all CPU cores.</p>
<h2>A practical workflow</h2>
<p>Start with our compressor's Auto mode. It analyses each image and picks the best format and quality setting automatically. For most images, Auto produces the smallest file size at acceptable quality. If you need manual control, switch to Custom mode where you can set format, quality, target size, and resolution independently.</p>`,
    },
  ),
  'batch-compression-guide': t(
    {
      en: 'Batch image compression: save hours with parallel processing',
      es: 'Compresión por lotes de imágenes: ahorra horas con procesamiento paralelo',
      fr: 'Compression d\'images par lots : gagnez des heures grâce au traitement parallèle',
      de: 'Batch-Bildkomprimierung: Sparen Sie Stunden mit paralleler Verarbeitung',
      it: 'Compressione immagini in batch: risparmia ore con l\'elaborazione parallela',
      pt: 'Compressão de imagens em lote: economize horas com processamento paralelo',
      ru: 'Пакетное сжатие изображений: экономьте часы с параллельной обработкой',
      zh: '批量图像压缩：通过并行处理节省数小时',
      ja: 'バッチ画像圧縮：並列処理で時間を節約',
      ko: '배치 이미지 압축: 병렬 처리로 시간 절약',
      ar: 'ضغط الصور بالدفعات: وفر ساعات مع المعالجة المتوازية',
      hi: 'बैच इमेज कंप्रेशन: समानांतर प्रोसेसिंग से घंटों बचाएँ',
      tr: 'Toplu görüntü sıkıştırma: paralel işleme ile saatler kazanın',
    },
    {
      en: 'Stop compressing images one by one. Here is how batch processing with parallel workers can save you hours of manual work.',
      es: 'Deja de comprimir imágenes una por una. Aquí te mostramos cómo el procesamiento por lotes con workers paralelos puede ahorrarte horas de trabajo manual.',
      fr: 'Arrêtez de compresser les images une par une. Voici comment le traitement par lots avec des workers parallèles peut vous faire gagner des heures de travail manuel.',
      de: 'Hören Sie auf, Bilder einzeln zu komprimieren. Hier erfahren Sie, wie die Batch-Verarbeitung mit parallelen Workern Ihnen stundenlange manuelle Arbeit ersparen kann.',
      it: 'Smetti di comprimere le immagini una per una. Ecco come l\'elaborazione in batch con worker paralleli può farti risparmiare ore di lavoro manuale.',
      pt: 'Pare de comprimir imagens uma por uma. Veja como o processamento em lote com workers paralelos pode economizar horas de trabalho manual.',
      ru: 'Перестаньте сжимать изображения по одному. Вот как пакетная обработка с параллельными worker\'ами может сэкономить вам часы ручной работы.',
      zh: '停止逐一压缩图片。以下是如何通过并行处理节省数小时手动工作的介绍。',
      ja: '画像を1つずつ圧縮するのはもうやめましょう。並列ワーカーによるバッチ処理で、手作業の時間を何時間も節約する方法をご紹介します。',
      ko: '이미지를 하나씩 압축하는 것을 중지하세요. 병렬 워커를 사용한 배치 처리가 수시간의 수동 작업을 절약할 수 있는 방법입니다.',
      ar: 'توقف عن ضغط الصور واحدة تلو الأخرى. إليك كيف يمكن للمعالجة بالدفعات مع العمال المتوازيين أن توفر لك ساعات من العمل اليدوي.',
      hi: 'एक-एक करके इमेज कंप्रेस करना बंद करें। यहाँ बताया गया है कि समानांतर वर्कर्स के साथ बैच प्रोसेसिंग कैसे आपको घंटों मैन्युअल काम से बचा सकती है।',
      tr: 'Görüntüleri tek tek sıkıştırmayı bırakın. Paralel çalışanlarla toplu işlemenin saatlerce manuel çalışmadan nasıl tasarruf ettirebileceği burada.',
    },
    {
      en: ['batch', 'compression', 'workflow', 'productivity'],
      es: ['lotes', 'compresión', 'flujo-de-trabajo', 'productividad'],
      fr: ['lot', 'compression', 'flux-de-travail', 'productivité'],
      de: ['stapel', 'komprimierung', 'arbeitsablauf', 'produktivität'],
      it: ['batch', 'compressione', 'flusso-di-lavoro', 'produttività'],
      pt: ['lote', 'compressão', 'fluxo-de-trabalho', 'produtividade'],
      ru: ['пакет', 'сжатие', 'рабочий-процесс', 'продуктивность'],
      zh: ['批量', '压缩', '工作流程', '生产力'],
      ja: ['バッチ', '圧縮', 'ワークフロー', '生産性'],
      ko: ['배치', '압축', '워크플로우', '생산성'],
      ar: ['دفعة', 'ضغط', 'سير-العمل', 'إنتاجية'],
      hi: ['बैच', 'कंप्रेशन', 'वर्कफ़्लो', 'उत्पादकता'],
      tr: ['toplu', 'sıkıştırma', 'iş-akışı', 'üretkenlik'],
    },
    {
      en: `<p>If you are still compressing images one at a time, you are wasting hours of your life. A typical designer or developer handles hundreds of images per week — product photos, screenshots, social media assets, email attachments. Doing each one manually through a drag-and-drop interface quickly becomes unsustainable.</p>
<h2>The problem with single-file compression</h2>
<p>Most image compressors are designed for a single image workflow: upload one file, wait for processing, download the result, repeat. For a batch of 50 product photos, that means 50 uploads, 50 downloads, and 50 manual clicks. Even at 30 seconds per image, a batch of 50 takes 25 minutes of active attention.</p>
<p>The real cost is not the time itself — it is the context switching. Every manual compression interrupts your workflow. You cannot start a batch and walk away. You have to sit through each one, which means you either batch it on a slow afternoon or procrastinate and leave images uncompressed.</p>
<h2>How parallel processing changes the game</h2>
<p>Instead of compressing images sequentially, a parallel compressor splits the work across all available CPU cores. If your device has 8 cores, 8 images compress simultaneously. A batch of 200 images that would take 30 minutes sequentially finishes in under 4 minutes.</p>
<p>ToolBox Image achieves this with Web Workers — a browser API that lets JavaScript run on separate threads. Each worker is assigned one image from the queue. When a worker finishes, it picks up the next image. The main thread stays responsive so you can browse other tabs while the batch runs.</p>
<h2>Batch features that matter</h2>
<p>Not all batch compression is created equal. Here is what to look for in a batch-capable tool:</p>
<ul>
<li><strong>Folder drag support.</strong> You should be able to drop an entire folder onto the tool without flattening your directory structure first. The folder hierarchy should be preserved in the output.</li>
<li><strong>Unified settings.</strong> All files in a batch should share the same compression settings for consistent output.</li>
<li><strong>Parallel execution.</strong> The tool should use all available CPU cores, not process files one at a time.</li>
<li><strong>ZIP export.</strong> Downloading 50 individual files is almost as tedious as uploading them one at a time. A single ZIP archive with preserved folder structure is essential.</li>
<li><strong>Real-time progress.</strong> You should see progress, bytes saved, and individual file status without having to open a separate dialog.</li>
</ul>
<h2>Real-world batch scenarios</h2>
<p><strong>E-commerce:</strong> A product catalogue of 200 photos needs to be compressed for the website. Set output to WebP with quality 80, drop the entire product folder, and let the batch run.</p>
<p><strong>Social media:</strong> A batch of 50 screenshots needs to be under Discord's 8 MB upload limit. Set target-size mode to 8000 KB and drop all the screenshots.</p>
<p><strong>Email attachments:</strong> A batch of 30 high-resolution photos needs to be under 200 KB each for email. Set target size to 200 KB and enable auto-resize for large images.</p>
<h2>Tips for efficient batch processing</h2>
<p>Organise your images into folders before compressing — the compressor preserves folder structure in the ZIP output. Use target-size mode when you need to meet specific platform limits. For mixed content (photos and screenshots in the same batch), run separate batches with different settings.</p>`,
    },
  ),
  'image-size-limits-social-email': t(
    {
      en: 'Image size limits for Discord, WhatsApp, Instagram, and email — how to stay under them',
      es: 'Límites de tamaño de imagen para Discord, WhatsApp, Instagram y correo electrónico — cómo mantenerse dentro de ellos',
      fr: 'Limites de taille d\'image pour Discord, WhatsApp, Instagram et email — comment les respecter',
      de: 'Bildgrößenbeschränkungen für Discord, WhatsApp, Instagram und E-Mail — wie Sie darunter bleiben',
      it: 'Limiti di dimensione delle immagini per Discord, WhatsApp, Instagram ed email — come rispettarli',
      pt: 'Limites de tamanho de imagem para Discord, WhatsApp, Instagram e e-mail — como ficar abaixo deles',
      ru: 'Ограничения размера изображений для Discord, WhatsApp, Instagram и email — как оставаться в пределах',
      zh: 'Discord、WhatsApp、Instagram 和电子邮件的图像大小限制——如何保持在限制以下',
      ja: 'Discord、WhatsApp、Instagram、メールの画像サイズ制限——制限内に収める方法',
      ko: 'Discord, WhatsApp, Instagram, 이메일의 이미지 크기 제한 — 제한 미만으로 유지하는 방법',
      ar: 'حدود حجم الصورة لـ Discord وWhatsApp وInstagram والبريد الإلكتروني — كيفية البقاء ضمنها',
      hi: 'Discord, WhatsApp, Instagram और ईमेल के लिए इमेज साइज़ सीमाएँ — इनके अंदर कैसे रहें',
      tr: 'Discord, WhatsApp, Instagram ve e-posta için görüntü boyutu sınırları — bunların altında kalma yöntemleri',
    },
    {
      en: 'Every platform has a different file size limit. Here is how to compress your images for Discord, WhatsApp, Instagram, and email so they always go through.',
      es: 'Cada plataforma tiene un límite de tamaño de archivo diferente. Aquí te mostramos cómo comprimir tus imágenes para Discord, WhatsApp, Instagram y correo electrónico para que siempre se envíen.',
      fr: 'Chaque plateforme a une limite de taille de fichier différente. Voici comment compresser vos images pour Discord, WhatsApp, Instagram et email pour qu\'elles passent toujours.',
      de: 'Jede Plattform hat eine andere Dateigrößenbeschränkung. Hier erfahren Sie, wie Sie Ihre Bilder für Discord, WhatsApp, Instagram und E-Mail komprimieren, damit sie immer durchgehen.',
      it: 'Ogni piattaforma ha un limite di dimensione file diverso. Ecco come comprimere le tue immagini per Discord, WhatsApp, Instagram ed email in modo che passino sempre.',
      pt: 'Cada plataforma tem um limite de tamanho de arquivo diferente. Veja como comprimir suas imagens para Discord, WhatsApp, Instagram e e-mail para que sempre passem.',
      ru: 'У каждой платформы свой лимит размера файла. Вот как сжать изображения для Discord, WhatsApp, Instagram и email, чтобы они всегда проходили.',
      zh: '每个平台都有不同的文件大小限制。以下是如何为 Discord、WhatsApp、Instagram 和电子邮件压缩图像，使它们始终能够通过。',
      ja: 'プラットフォームごとにファイルサイズの制限が異なります。Discord、WhatsApp、Instagram、メール用に画像を圧縮して、常に送信できるようにする方法をご紹介します。',
      ko: '각 플랫폼마다 파일 크기 제한이 다릅니다. Discord, WhatsApp, Instagram 및 이메일용 이미지를 압축하여 항상 전송되도록 하는 방법입니다.',
      ar: 'كل منصة لها حد مختلف لحجم الملف. إليك كيفية ضغط صورك لـ Discord وWhatsApp وInstagram والبريد الإلكتروني بحيث تمر دائماً.',
      hi: 'हर प्लेटफ़ॉर्म की अलग फ़ाइल साइज़ सीमा होती है। यहाँ बताया गया है कि Discord, WhatsApp, Instagram और ईमेल के लिए अपनी इमेज को कैसे कंप्रेस करें ताकि वे हमेशा पास हो जाएँ।',
      tr: 'Her platformun farklı bir dosya boyutu sınırı vardır. Discord, WhatsApp, Instagram ve e-posta için görüntülerinizi her zaman geçecek şekilde nasıl sıkıştıracağınız burada.',
    },
    {
      en: ['social-media', 'email', 'discord', 'whatsapp', 'instagram', 'file-size'],
      es: ['redes-sociales', 'correo', 'discord', 'whatsapp', 'instagram', 'tamaño-de-archivo'],
      fr: ['réseaux-sociaux', 'email', 'discord', 'whatsapp', 'instagram', 'taille-de-fichier'],
      de: ['soziale-medien', 'email', 'discord', 'whatsapp', 'instagram', 'dateigröße'],
      it: ['social-media', 'email', 'discord', 'whatsapp', 'instagram', 'dimensione-file'],
      pt: ['redes-sociais', 'email', 'discord', 'whatsapp', 'instagram', 'tamanho-do-arquivo'],
      ru: ['социальные-сети', 'email', 'discord', 'whatsapp', 'instagram', 'размер-файла'],
      zh: ['社交媒体', '电子邮件', 'discord', 'whatsapp', 'instagram', '文件大小'],
      ja: ['ソーシャルメディア', 'メール', 'discord', 'whatsapp', 'instagram', 'ファイルサイズ'],
      ko: ['소셜-미디어', '이메일', 'discord', 'whatsapp', 'instagram', '파일-크기'],
      ar: ['وسائل-التواصل-الاجتماعي', 'بريد-إلكتروني', 'discord', 'whatsapp', 'instagram', 'حجم-الملف'],
      hi: ['सोशल-मीडिया', 'ईमेल', 'discord', 'whatsapp', 'instagram', 'फ़ाइल-साइज़'],
      tr: ['sosyal-medya', 'e-posta', 'discord', 'whatsapp', 'instagram', 'dosya-boyutu'],
    },
    {
      en: `<p>Every platform has a different file size limit for images. Discord caps attachments at 8 MB (25 MB for Nitro), WhatsApp at 16 MB, Instagram at 30 MB for photos and 650 MB for video, and most email services at 25 MB. But hitting those limits — or getting blocked before you reach them — is a daily frustration for anyone who works with images.</p>
<h2>Discord: 8 MB (25 MB with Nitro)</h2>
<p>Discord is the strictest of the four. The free tier caps file uploads at 8 MB per file, and Nitro raises it to 25 MB.</p>
<p>The best strategy for Discord is target-size mode: set the maximum file size to 7 MB (leaving room for metadata), and let the compressor handle the rest.</p>
<h2>WhatsApp: 16 MB per image</h2>
<p>WhatsApp allows up to 16 MB per image, but there is a catch: WhatsApp recompresses images on its own servers, often at a lower quality than you expect.</p>
<p>The workaround is to compress before you send. Reduce the file to around 1-2 MB with a quality setting of 85 — this gives WhatsApp less data to discard.</p>
<h2>Instagram: 30 MB for photos</h2>
<p>Instagram accepts photos up to 30 MB but recommends images no larger than 1080 pixels wide.</p>
<p>The ideal Instagram image is a resized JPEG or PNG at 1080 × 1080 (square), 1080 × 1350 (portrait), or 1080 × 566 (landscape), compressed to 300-500 KB.</p>
<h2>Email: 25 MB total (Gmail, Outlook, Yahoo)</h2>
<p>Email attachment limits apply per message, not per file. Gmail, Outlook, and Yahoo Mail all cap messages at 25 MB total — including the email body and any inline images.</p>
<p>The safe target for email attachments is 3-5 MB per image if you are sending multiple files, or 10-15 MB for a single image.</p>
<h2>Quick reference table</h2>
<table><thead><tr><th>Platform</th><th>Limit per file</th><th>Recommended max</th><th>Best format</th></tr></thead><tbody>
<tr><td>Discord (free)</td><td>8 MB</td><td>7 MB</td><td>WebP / AVIF</td></tr>
<tr><td>Discord (Nitro)</td><td>25 MB</td><td>24 MB</td><td>JPEG / WebP</td></tr>
<tr><td>WhatsApp</td><td>16 MB</td><td>1-2 MB</td><td>JPEG</td></tr>
<tr><td>Instagram</td><td>30 MB</td><td>300-500 KB</td><td>JPEG</td></tr>
<tr><td>Email (Gmail/Outlook)</td><td>25 MB (total message)</td><td>3 MB each</td><td>JPEG</td></tr>
</tbody></table>`,
    },
  ),
  'compress-to-exact-file-size': t(
    {
      en: 'How to compress an image to exactly 100 KB (or any target size)',
      es: 'Cómo comprimir una imagen exactamente a 100 KB (o cualquier tamaño objetivo)',
      fr: 'Comment compresser une image à exactement 100 Ko (ou n\'importe quelle taille cible)',
      de: 'Wie man ein Bild auf genau 100 KB (oder jede beliebige Zielgröße) komprimiert',
      it: 'Come comprimere un\'immagine esattamente a 100 KB (o qualsiasi dimensione target)',
      pt: 'Como comprimir uma imagem para exatamente 100 KB (ou qualquer tamanho alvo)',
      ru: 'Как сжать изображение ровно до 100 КБ (или любого целевого размера)',
      zh: '如何将图像精确压缩到 100 KB（或任何目标大小）',
      ja: '画像を正確に100KB（または任意のターゲットサイズ）に圧縮する方法',
      ko: '이미지를 정확히 100KB(또는 모든 대상 크기)로 압축하는 방법',
      ar: 'كيفية ضغط صورة بالضبط إلى 100 كيلوبايت (أو أي حجم مستهدف)',
      hi: 'किसी इमेज को बिल्कुल 100 KB (या किसी भी लक्ष्य आकार) में कैसे कंप्रेस करें',
      tr: 'Bir görüntü tam olarak 100 KB\'a (veya herhangi bir hedef boyuta) nasıl sıkıştırılır',
    },
    {
      en: 'Need an image under 100 KB for a form upload, database limit, or platform requirement? Here is how to hit any exact file size with ToolBox Image.',
      es: '¿Necesitas una imagen de menos de 100 KB para un formulario, límite de base de datos o requisito de plataforma? Aquí te mostramos cómo alcanzar cualquier tamaño exacto con ToolBox Image.',
      fr: 'Besoin d\'une image de moins de 100 Ko pour un formulaire, une limite de base de données ou une exigence de plateforme ? Voici comment atteindre n\'importe quelle taille exacte avec ToolBox Image.',
      de: 'Benötigen Sie ein Bild unter 100 KB für ein Formular, eine Datenbankbegrenzung oder eine Plattformanforderung? Hier erfahren Sie, wie Sie mit ToolBox Image jede beliebige genaue Dateigröße erreichen.',
      it: 'Hai bisogno di un\'immagine sotto i 100 KB per un modulo, un limite di database o un requisito di piattaforma? Ecco come raggiungere qualsiasi dimensione esatta con ToolBox Image.',
      pt: 'Precisa de uma imagem abaixo de 100 KB para upload de formulário, limite de banco de dados ou requisito de plataforma? Veja como atingir qualquer tamanho exato com o ToolBox Image.',
      ru: 'Нужно изображение менее 100 КБ для загрузки в форму, ограничения базы данных или требования платформы? Вот как достичь любого точного размера с ToolBox Image.',
      zh: '需要一张小于 100 KB 的图片用于表单上传、数据库限制或平台要求？以下是如何使用 ToolBox Image 精确达到任何文件大小。',
      ja: 'フォームアップロード、データベース制限、プラットフォーム要件のために100KB未満の画像が必要ですか？ToolBox Imageで任意の正確なサイズを実現する方法をご紹介します。',
      ko: '양식 업로드, 데이터베이스 제한 또는 플랫폼 요구 사항을 위해 100KB 미만의 이미지가 필요하신가요? ToolBox Image로 정확한 파일 크기를 맞추는 방법입니다.',
      ar: 'هل تحتاج صورة أقل من 100 كيلوبايت لرفع نموذج، أو حد قاعدة بيانات، أو متطلبات منصة؟ إليك كيفية الوصول إلى أي حجم محدد باستخدام ToolBox Image.',
      hi: 'फ़ॉर्म अपलोड, डेटाबेस सीमा, या प्लेटफ़ॉर्म आवश्यकता के लिए 100 KB से कम की इमेज चाहिए? यहाँ ToolBox Image के साथ किसी भी सटीक फ़ाइल आकार तक पहुँचने का तरीका बताया गया है।',
      tr: 'Form yükleme, veritabanı sınırı veya platform gereksinimi için 100 KB\'ın altında bir görüntü mü gerekiyor? ToolBox Image ile herhangi bir tam dosya boyutuna nasıl ulaşacağınız burada.',
    },
    {
      en: ['compression', 'file-size', 'target-size', 'optimization'],
      es: ['compresión', 'tamaño-de-archivo', 'tamaño-objetivo', 'optimización'],
      fr: ['compression', 'taille-de-fichier', 'taille-cible', 'optimisation'],
      de: ['komprimierung', 'dateigröße', 'zielgröße', 'optimierung'],
      it: ['compressione', 'dimensione-file', 'dimensione-target', 'ottimizzazione'],
      pt: ['compressão', 'tamanho-do-arquivo', 'tamanho-alvo', 'otimização'],
      ru: ['сжатие', 'размер-файла', 'целевой-размер', 'оптимизация'],
      zh: ['压缩', '文件大小', '目标大小', '优化'],
      ja: ['圧縮', 'ファイルサイズ', 'ターゲットサイズ', '最適化'],
      ko: ['압축', '파일-크기', '대상-크기', '최적화'],
      ar: ['ضغط', 'حجم-الملف', 'الحجم-المستهدف', 'تحسين'],
      hi: ['कंप्रेशन', 'फ़ाइल-साइज़', 'लक्ष्य-आकार', 'ऑप्टिमाइज़ेशन'],
      tr: ['sıkıştırma', 'dosya-boyutu', 'hedef-boyut', 'optimizasyon'],
    },
    {
      en: `<p>Need to squeeze an image under 100 KB for a form upload? Hit exactly 250 KB for a job application system? Exact file size compression is one of the most requested features in any image tool.</p>
<h2>Why exact file size matters</h2>
<p>Most platforms don't just recommend staying under a limit — they hard-reject files that exceed it. A 101 KB file gets blocked by a 100 KB limit just as firmly as a 10 MB file.</p>
<h2>How target-size mode works</h2>
<p>The compressor takes a different approach than most tools. Instead of asking you to pick a quality number and hoping the file size is acceptable, it works backwards:</p>
<ol>
<li>You enter the maximum file size in KB</li>
<li>The compressor starts at the highest quality setting and compresses the image</li>
<li>If the result is still above the target, it lowers quality and tries again</li>
<li>Once the result fits under the target, it runs a fine-tuning pass to maximise quality while staying under the limit</li>
</ol>
<h2>Real example: compressing to 100 KB</h2>
<p>Take a 12 MB photo from a modern smartphone. To fit under 100 KB, the compressor needs to reduce the file by a factor of 120 — a 99.2% reduction. The compressor automatically switches to AVIF or WebP based on what produces the best result.</p>
<h2>Batch compressing to a fixed size</h2>
<p>Target-size mode works with batch processing too. Drop 50 images into the compressor, set the target to 500 KB, and every file comes out under that limit.</p>`,
    },
  ),
  'png-vs-webp-vs-avif': t(
    {
      en: 'PNG vs WebP vs AVIF — which format saves the most space?',
      es: 'PNG vs WebP vs AVIF — ¿qué formato ahorra más espacio?',
      fr: 'PNG vs WebP vs AVIF — quel format économise le plus d\'espace ?',
      de: 'PNG vs WebP vs AVIF — welches Format spart am meisten Speicherplatz?',
      it: 'PNG vs WebP vs AVIF — quale formato risparmia più spazio?',
      pt: 'PNG vs WebP vs AVIF — qual formato economiza mais espaço?',
      ru: 'PNG vs WebP vs AVIF — какой формат экономит больше всего места?',
      zh: 'PNG vs WebP vs AVIF — 哪种格式最节省空间？',
      ja: 'PNG vs WebP vs AVIF — 最も容量を節約できる形式は？',
      ko: 'PNG vs WebP vs AVIF — 어떤 형식이 가장 공간을 절약하나요?',
      ar: 'PNG مقابل WebP مقابل AVIF — أي تنسيق يوفر أكبر مساحة؟',
      hi: 'PNG बनाम WebP बनाम AVIF — कौन सा फ़ॉर्मेट सबसे अधिक जगह बचाता है?',
      tr: 'PNG vs WebP vs AVIF — hangi biçim en çok yerden tasarruf sağlar?',
    },
    {
      en: 'We compare PNG, WebP, and AVIF compression on real images — photographs, screenshots, logos, and graphics — to see which format wins for file size, quality, and compatibility.',
      es: 'Comparamos la compresión PNG, WebP y AVIF en imágenes reales — fotografías, capturas de pantalla, logotipos y gráficos — para ver qué formato gana en tamaño, calidad y compatibilidad.',
      fr: 'Nous comparons la compression PNG, WebP et AVIF sur des images réelles — photographies, captures d\'écran, logos et graphiques — pour voir quel format l\'emporte en taille, qualité et compatibilité.',
      de: 'Wir vergleichen die PNG-, WebP- und AVIF-Komprimierung an realen Bildern — Fotos, Screenshots, Logos und Grafiken — um zu sehen, welches Format bei Dateigröße, Qualität und Kompatibilität gewinnt.',
      it: 'Confrontiamo la compressione PNG, WebP e AVIF su immagini reali — fotografie, screenshot, loghi e grafiche — per vedere quale formato vince per dimensione, qualità e compatibilità.',
      pt: 'Comparamos a compressão PNG, WebP e AVIF em imagens reais — fotografias, capturas de tela, logotipos e gráficos — para ver qual formato vence em tamanho, qualidade e compatibilidade.',
      ru: 'Мы сравниваем сжатие PNG, WebP и AVIF на реальных изображениях — фотографиях, скриншотах, логотипах и графике — чтобы увидеть, какой формат выигрывает по размеру, качеству и совместимости.',
      zh: '我们在真实图像上比较 PNG、WebP 和 AVIF 压缩——照片、截图、标志和图形——看看哪种格式在文件大小、质量和兼容性方面胜出。',
      ja: '実際の画像（写真、スクリーンショット、ロゴ、グラフィック）でPNG、WebP、AVIFの圧縮を比較し、ファイルサイズ、品質、互換性の面でどの形式が優れているかを検証します。',
      ko: '실제 이미지(사진, 스크린샷, 로고, 그래픽)에서 PNG, WebP, AVIF 압축을 비교하여 파일 크기, 품질 및 호환성 측면에서 어떤 형식이 승리하는지 확인합니다.',
      ar: 'نقارن ضغط PNG وWebP وAVIF على صور حقيقية — صور فوتوغرافية، لقطات شاشة، شعارات، ورسومات — لنرى أي تنسيق يفوز من حيث الحجم والجودة والتوافق.',
      hi: 'हम वास्तविक इमेज — तस्वीरें, स्क्रीनशॉट, लोगो और ग्राफ़िक्स — पर PNG, WebP और AVIF कंप्रेशन की तुलना करते हैं ताकि देख सकें कि फ़ाइल आकार, गुणवत्ता और संगतता के मामले में कौन सा फ़ॉर्मेट जीतता है।',
      tr: 'PNG, WebP ve AVIF sıkıştırmasını gerçek görüntülerde — fotoğraflar, ekran görüntüleri, logolar ve grafikler — karşılaştırarak hangi biçimin dosya boyutu, kalite ve uyumluluk açısından kazandığını görüyoruz.',
    },
    {
      en: ['png', 'webp', 'avif', 'image-formats', 'comparison', 'compression'],
      es: ['png', 'webp', 'avif', 'formatos-de-imagen', 'comparación', 'compresión'],
      fr: ['png', 'webp', 'avif', 'formats-d-image', 'comparaison', 'compression'],
      de: ['png', 'webp', 'avif', 'bildformate', 'vergleich', 'komprimierung'],
      it: ['png', 'webp', 'avif', 'formati-immagine', 'confronto', 'compressione'],
      pt: ['png', 'webp', 'avif', 'formatos-de-imagem', 'comparação', 'compressão'],
      ru: ['png', 'webp', 'avif', 'форматы-изображений', 'сравнение', 'сжатие'],
      zh: ['png', 'webp', 'avif', '图像格式', '比较', '压缩'],
      ja: ['png', 'webp', 'avif', '画像形式', '比較', '圧縮'],
      ko: ['png', 'webp', 'avif', '이미지-형식', '비교', '압축'],
      ar: ['png', 'webp', 'avif', 'تنسيقات-الصور', 'مقارنة', 'ضغط'],
      hi: ['png', 'webp', 'avif', 'इमेज-फ़ॉर्मेट', 'तुलना', 'कंप्रेशन'],
      tr: ['png', 'webp', 'avif', 'görüntü-biçimleri', 'karşılaştırma', 'sıkıştırma'],
    },
    {
      en: `<p>If you regularly save images for the web, you have noticed that file sizes vary wildly between formats. A PNG that looks identical to a WebP can be three times as large. An AVIF can be half the size of a JPEG at the same quality.</p>
<h2>Photograph: the landscape shot</h2>
<p>A 4000 × 2250 landscape photo shot on a modern smartphone. This is the kind of image that benefits most from modern compression.</p>
<table><thead><tr><th>Format</th><th>File size (quality 80)</th><th>Savings vs PNG</th><th>Transparency</th></tr></thead><tbody>
<tr><td>PNG (lossless)</td><td>14.2 MB</td><td>—</td><td>Yes</td></tr>
<tr><td>JPEG</td><td>1.8 MB</td><td>87%</td><td>No</td></tr>
<tr><td>WebP (lossy)</td><td>1.2 MB</td><td>92%</td><td>Yes</td></tr>
<tr><td>AVIF</td><td>720 KB</td><td>95%</td><td>Yes</td></tr>
</tbody></table>
<p>For photographs, AVIF wins decisively — it is nearly 60% smaller than WebP and 97% smaller than the original PNG.</p>
<h2>Screenshot: the desktop capture</h2>
<p>A 2560 × 1440 screen capture showing a code editor with syntax highlighting.</p>
<table><thead><tr><th>Format</th><th>File size</th><th>Savings vs PNG</th><th>Artefacts</th></tr></thead><tbody>
<tr><td>PNG (lossless)</td><td>980 KB</td><td>—</td><td>None</td></tr>
<tr><td>WebP (lossy)</td><td>340 KB</td><td>65%</td><td>Minor</td></tr>
<tr><td>WebP (lossless)</td><td>620 KB</td><td>37%</td><td>None</td></tr>
<tr><td>AVIF</td><td>260 KB</td><td>73%</td><td>Visible</td></tr>
</tbody></table>
<p>Lossless WebP hits a sweet spot: 37% smaller than PNG with zero quality loss.</p>
<h2>Logo with transparency</h2>
<p>A 1200 × 400 brand logo with transparent background.</p>
<table><thead><tr><th>Format</th><th>File size</th><th>Transparency</th><th>Best use</th></tr></thead><tbody>
<tr><td>PNG (lossless)</td><td>140 KB</td><td>Yes</td><td>Universal</td></tr>
<tr><td>WebP (lossless)</td><td>95 KB</td><td>Yes</td><td>Web, 97% support</td></tr>
<tr><td>AVIF</td><td>52 KB</td><td>Yes</td><td>Modern browsers</td></tr>
</tbody></table>
<h2>Which format should you use?</h2>
<ul>
<li><strong>Photographs:</strong> AVIF for modern browsers; WebP lossy for wider support</li>
<li><strong>Screenshots with text:</strong> WebP lossless</li>
<li><strong>Logos and icons:</strong> WebP lossless for web, PNG for max compatibility</li>
<li><strong>Infographics:</strong> WebP lossless</li>
<li><strong>Email and social media:</strong> JPEG</li>
</ul>`,
    },
  ),
  'heic-to-jpg-guide': t(
    {
      en: 'How to convert HEIC photos to JPG on any device',
      es: 'Cómo convertir fotos HEIC a JPG en cualquier dispositivo',
      fr: 'Comment convertir des photos HEIC en JPG sur n\'importe quel appareil',
      de: 'So konvertieren Sie HEIC-Fotos auf jedem Gerät in JPG',
      it: 'Come convertire foto HEIC in JPG su qualsiasi dispositivo',
      pt: 'Como converter fotos HEIC para JPG em qualquer dispositivo',
      ru: 'Как конвертировать HEIC-фото в JPG на любом устройстве',
      zh: '如何在任何设备上将 HEIC 照片转换为 JPG',
      ja: 'あらゆるデバイスでHEIC写真をJPGに変換する方法',
      ko: '모든 기기에서 HEIC 사진을 JPG로 변환하는 방법',
      ar: 'كيفية تحويل صور HEIC إلى JPG على أي جهاز',
      hi: 'किसी भी डिवाइस पर HEIC फ़ोटो को JPG में कैसे बदलें',
      tr: 'Herhangi bir cihazda HEIC fotoğrafları JPG\'ye dönüştürme',
    },
    {
      en: 'Apple devices save photos in HEIC format, but not every platform supports it. Here is how to convert HEIC to JPG on Windows, Mac, iPhone, and online.',
      es: 'Los dispositivos Apple guardan fotos en formato HEIC, pero no todas las plataformas lo soportan. Aquí te mostramos cómo convertir HEIC a JPG en Windows, Mac, iPhone y en línea.',
      fr: 'Les appareils Apple enregistrent les photos au format HEIC, mais toutes les plateformes ne le supportent pas. Voici comment convertir HEIC en JPG sur Windows, Mac, iPhone et en ligne.',
      de: 'Apple-Geräte speichern Fotos im HEIC-Format, aber nicht alle Plattformen unterstützen es. Hier erfahren Sie, wie Sie HEIC in JPG unter Windows, Mac, iPhone und online konvertieren.',
      it: 'I dispositivi Apple salvano le foto in formato HEIC, ma non tutte le piattaforme lo supportano. Ecco come convertire HEIC in JPG su Windows, Mac, iPhone e online.',
      pt: 'Dispositivos Apple salvam fotos no formato HEIC, mas nem toda plataforma suporta. Veja como converter HEIC para JPG no Windows, Mac, iPhone e online.',
      ru: 'Устройства Apple сохраняют фото в формате HEIC, но не все платформы его поддерживают. Вот как конвертировать HEIC в JPG на Windows, Mac, iPhone и онлайн.',
      zh: 'Apple 设备以 HEIC 格式保存照片，但并非所有平台都支持。以下是如何在 Windows、Mac、iPhone 和在线将 HEIC 转换为 JPG。',
      ja: 'Appleデバイスは写真をHEIC形式で保存しますが、すべてのプラットフォームが対応しているわけではありません。Windows、Mac、iPhone、オンラインでHEICをJPGに変換する方法をご紹介します。',
      ko: 'Apple 기기는 HEIC 형식으로 사진을 저장하지만 모든 플랫폼이 지원하는 것은 아닙니다. Windows, Mac, iPhone 및 온라인에서 HEIC를 JPG로 변환하는 방법입니다.',
      ar: 'أجهزة Apple تحفظ الصور بتنسيق HEIC، لكن ليست كل المنصات تدعمه. إليك كيفية تحويل HEIC إلى JPG على Windows وMac وiPhone وعبر الإنترنت.',
      hi: 'Apple डिवाइस HEIC फ़ॉर्मेट में फ़ोटो सहेजते हैं, लेकिन हर प्लेटफ़ॉर्म इसे सपोर्ट नहीं करता। यहाँ Windows, Mac, iPhone और ऑनलाइन पर HEIC को JPG में बदलने का तरीका बताया गया है।',
      tr: 'Apple cihazları fotoğrafları HEIC biçiminde kaydeder, ancak her platform desteklemez. Windows, Mac, iPhone ve çevrimiçi olarak HEIC\'yi JPG\'ye dönüştürme yöntemleri.',
    },
    {
      en: ['heic', 'jpg', 'conversion', 'iphone', 'apple'],
      es: ['heic', 'jpg', 'conversión', 'iphone', 'apple'],
      fr: ['heic', 'jpg', 'conversion', 'iphone', 'apple'],
      de: ['heic', 'jpg', 'konvertierung', 'iphone', 'apple'],
      it: ['heic', 'jpg', 'conversione', 'iphone', 'apple'],
      pt: ['heic', 'jpg', 'conversão', 'iphone', 'apple'],
      ru: ['heic', 'jpg', 'конвертация', 'iphone', 'apple'],
      zh: ['heic', 'jpg', '转换', 'iphone', 'apple'],
      ja: ['heic', 'jpg', '変換', 'iphone', 'apple'],
      ko: ['heic', 'jpg', '변환', 'iphone', 'apple'],
      ar: ['heic', 'jpg', 'تحويل', 'iphone', 'apple'],
      hi: ['heic', 'jpg', 'रूपांतरण', 'iphone', 'apple'],
      tr: ['heic', 'jpg', 'dönüştürme', 'iphone', 'apple'],
    },
    {
      en: `<p>If you own an iPhone or iPad, your photos are probably saved in HEIC format. Apple adopted HEIC (High Efficiency Image Container) starting with iOS 11 — it compresses photos about 50% smaller than JPEG at the same quality. The catch is that many platforms still do not support HEIC natively.</p>
<h2>Convert HEIC to JPG online (any device)</h2>
<p>The easiest method works on any operating system and requires no software installation. Use a browser-based converter like ToolBox Image. Open the compressor, drop your HEIC photos, and download them as JPEGs. The entire process runs locally in your browser — your photos never get uploaded to a server.</p>
<h2>Convert on iPhone or iPad</h2>
<p>Change your camera settings: go to Settings → Camera → Formats and switch from "High Efficiency" to "Most Compatible." New photos will save as JPEG.</p>
<h2>Convert on a Mac</h2>
<p>The Preview app on macOS can export HEIC files as JPEG. Open the HEIC file in Preview, go to File → Export, choose JPEG as the format.</p>
<h2>Convert on Windows</h2>
<p>Windows 10 and 11 do not support HEIC out of the box. Use our browser-based compressor — drag your HEIC photos from File Explorer directly into the upload zone and download the converted files.</p>`,
    },
  ),
  'social-media-image-sizes': t(
    {
      en: 'The complete guide to social media image sizes in 2026',
      es: 'La guía completa de tamaños de imágenes para redes sociales en 2026',
      fr: 'Le guide complet des tailles d\'images pour les réseaux sociaux en 2026',
      de: 'Der vollständige Leitfaden für Social-Media-Bildgrößen im Jahr 2026',
      it: 'La guida completa alle dimensioni delle immagini per i social media nel 2026',
      pt: 'O guia completo para tamanhos de imagens em redes sociais em 2026',
      ru: 'Полное руководство по размерам изображений для социальных сетей в 2026 году',
      zh: '2026 年社交媒体图片尺寸完整指南',
      ja: '2026年ソーシャルメディア画像サイズ完全ガイド',
      ko: '2026년 소셜 미디어 이미지 크기 완벽 가이드',
      ar: 'الدليل الكامل لأحجام صور وسائل التواصل الاجتماعي في 2026',
      hi: '2026 में सोशल मीडिया इमेज साइज़ की पूरी गाइड',
      tr: '2026\'da sosyal medya görüntü boyutları için eksiksiz rehber',
    },
    {
      en: 'Every platform has different dimension requirements. Here is the definitive cheat sheet for Instagram, Facebook, Twitter, LinkedIn, and YouTube image sizes.',
      es: 'Cada plataforma tiene requisitos de dimensiones diferentes. Aquí tienes la guía definitiva de tamaños de imágenes para Instagram, Facebook, Twitter, LinkedIn y YouTube.',
      fr: 'Chaque plateforme a des exigences de dimensions différentes. Voici l\'aide-mémoire définitif pour les tailles d\'images Instagram, Facebook, Twitter, LinkedIn et YouTube.',
      de: 'Jede Plattform hat andere Größenanforderungen. Hier ist der endgültige Spickzettel für Instagram-, Facebook-, Twitter-, LinkedIn- und YouTube-Bildgrößen.',
      it: 'Ogni piattaforma ha requisiti dimensionali diversi. Ecco il cheat sheet definitivo per le dimensioni delle immagini di Instagram, Facebook, Twitter, LinkedIn e YouTube.',
      pt: 'Cada plataforma tem requisitos de dimensão diferentes. Aqui está a folha de dicas definitiva para tamanhos de imagens do Instagram, Facebook, Twitter, LinkedIn e YouTube.',
      ru: 'У каждой платформы свои требования к размерам. Вот окончательная шпаргалка по размерам изображений для Instagram, Facebook, Twitter, LinkedIn и YouTube.',
      zh: '每个平台都有不同的尺寸要求。以下是 Instagram、Facebook、Twitter、LinkedIn 和 YouTube 图片尺寸的终极速查表。',
      ja: 'プラットフォームごとに異なるサイズ要件があります。Instagram、Facebook、Twitter、LinkedIn、YouTubeの画像サイズの決定版チートシートです。',
      ko: '각 플랫폼마다 다른 크기 요구 사항이 있습니다. Instagram, Facebook, Twitter, LinkedIn 및 YouTube 이미지 크기에 대한 최고의 치트 시트입니다.',
      ar: 'كل منصة لها متطلبات أبعاد مختلفة. إليك ورقة الغش النهائية لأحجام صور Instagram وFacebook وTwitter وLinkedIn وYouTube.',
      hi: 'हर प्लेटफ़ॉर्म की अलग-अलग डाइमेंशन आवश्यकताएँ होती हैं। यहाँ Instagram, Facebook, Twitter, LinkedIn और YouTube इमेज साइज़ के लिए निश्चित चीट शीट है।',
      tr: 'Her platformun farklı boyut gereksinimleri vardır. Instagram, Facebook, Twitter, LinkedIn ve YouTube görüntü boyutları için nihai kopya kağıdı.',
    },
    {
      en: ['social-media', 'dimensions', 'instagram', 'facebook', 'linkedin', 'youtube'],
      es: ['redes-sociales', 'dimensiones', 'instagram', 'facebook', 'linkedin', 'youtube'],
      fr: ['réseaux-sociaux', 'dimensions', 'instagram', 'facebook', 'linkedin', 'youtube'],
      de: ['soziale-medien', 'abmessungen', 'instagram', 'facebook', 'linkedin', 'youtube'],
      it: ['social-media', 'dimensioni', 'instagram', 'facebook', 'linkedin', 'youtube'],
      pt: ['redes-sociais', 'dimensões', 'instagram', 'facebook', 'linkedin', 'youtube'],
      ru: ['социальные-сети', 'размеры', 'instagram', 'facebook', 'linkedin', 'youtube'],
      zh: ['社交媒体', '尺寸', 'instagram', 'facebook', 'linkedin', 'youtube'],
      ja: ['ソーシャルメディア', '寸法', 'instagram', 'facebook', 'linkedin', 'youtube'],
      ko: ['소셜-미디어', '치수', 'instagram', 'facebook', 'linkedin', 'youtube'],
      ar: ['وسائل-التواصل-الاجتماعي', 'الأبعاد', 'instagram', 'facebook', 'linkedin', 'youtube'],
      hi: ['सोशल-मीडिया', 'आयाम', 'instagram', 'facebook', 'linkedin', 'youtube'],
      tr: ['sosyal-medya', 'boyutlar', 'instagram', 'facebook', 'linkedin', 'youtube'],
    },
    {
      en: `<p>Getting image dimensions wrong on social media is one of the most common design mistakes. Here is the complete cheat sheet for social media image sizes in 2026.</p>
<h2>Instagram</h2>
<p>Square (1080 × 1080) is the most reliable. Portrait (1080 × 1350, 4:5 ratio) takes up more screen space. Landscape (1080 × 566, 1.91:1) works for wide shots. Stories use 1080 × 1920 (9:16).</p>
<h2>Facebook</h2>
<p>Feed images display at 1200 × 630 for link previews. Cover photos need 851 × 315 on desktop and 640 × 360 on mobile. Profile pictures display at 180 × 180.</p>
<h2>Twitter / X</h2>
<p>Images up to 4096 × 4096 and 5 MB. In-stream images display at 1600 × 900 (16:9) for landscape and 800 × 1200 (2:3) for portrait.</p>
<h2>LinkedIn</h2>
<p>Feed images at 1200 × 627 for link previews. Company banner images need 1584 × 396. Profile pictures use 400 × 400.</p>
<h2>YouTube</h2>
<p>Thumbnails at 1280 × 720 (16:9), under 2 MB. Channel banner images need 2048 × 1152.</p>
<h2>Quick reference table</h2>
<table><thead><tr><th>Platform</th><th>Feed image</th><th>Cover / Banner</th><th>Profile</th></tr></thead><tbody>
<tr><td>Instagram</td><td>1080 × 1080</td><td>—</td><td>320 × 320</td></tr>
<tr><td>Facebook</td><td>1200 × 630</td><td>851 × 315</td><td>180 × 180</td></tr>
<tr><td>Twitter / X</td><td>1600 × 900</td><td>—</td><td>400 × 400</td></tr>
<tr><td>LinkedIn</td><td>1200 × 627</td><td>1584 × 396</td><td>400 × 400</td></tr>
<tr><td>YouTube</td><td>1280 × 720</td><td>2048 × 1152</td><td>800 × 800</td></tr>
</tbody></table>`,
    },
  ),
  'image-compression-ecommerce': t(
    {
      en: 'Image compression for e-commerce: speed up your store without losing quality',
      es: 'Compresión de imágenes para e-commerce: acelera tu tienda sin perder calidad',
      fr: 'Compression d\'images pour le e-commerce : accélérez votre boutique sans perdre en qualité',
      de: 'Bildkomprimierung für E-Commerce: Beschleunigen Sie Ihren Shop ohne Qualitätsverlust',
      it: 'Compressione immagini per e-commerce: velocizza il tuo negozio senza perdere qualità',
      pt: 'Compressão de imagens para e-commerce: acelere sua loja sem perder qualidade',
      ru: 'Сжатие изображений для электронной коммерции: ускорьте магазин без потери качества',
      zh: '电子商务图像压缩：在不损失质量的情况下加速您的商店',
      ja: 'Eコマースの画像圧縮：品質を落とさずにストアを高速化',
      ko: '전자상거래 이미지 압축: 품질 저하 없이 스토어 속도 향상',
      ar: 'ضغط الصور للتجارة الإلكترونية: تسريع متجرك دون فقدان الجودة',
      hi: 'ई-कॉमर्स के लिए इमेज कंप्रेशन: गुणवत्ता खोए बिना अपने स्टोर को तेज़ करें',
      tr: 'E-ticaret için görüntü sıkıştırma: kaliteden ödün vermeden mağazanızı hızlandırın',
    },
    {
      en: 'Product images are the heaviest assets on any online store. Learn how to compress them effectively for faster page loads, better SEO, and higher conversion rates.',
      es: 'Las imágenes de producto son los activos más pesados en cualquier tienda online. Aprende a comprimirlas eficazmente para obtener cargas de página más rápidas, mejor SEO y mayores tasas de conversión.',
      fr: 'Les images de produits sont les actifs les plus lourds de toute boutique en ligne. Apprenez à les compresser efficacement pour des pages plus rapides, un meilleur SEO et des taux de conversion plus élevés.',
      de: 'Produktbilder sind die schwersten Assets in jedem Online-Shop. Erfahren Sie, wie Sie sie effektiv komprimieren für schnellere Seitenladezeiten, besseres SEO und höhere Konversionsraten.',
      it: 'Le immagini dei prodotti sono gli asset più pesanti in qualsiasi negozio online. Impara a comprimerle efficacemente per caricamenti più veloci, migliore SEO e tassi di conversione più alti.',
      pt: 'As imagens de produto são os ativos mais pesados em qualquer loja online. Aprenda a comprimi-las efetivamente para carregamentos de página mais rápidos, melhor SEO e maiores taxas de conversão.',
      ru: 'Изображения товаров — самые тяжёлые активы в любом интернет-магазине. Узнайте, как эффективно сжимать их для более быстрой загрузки страниц, лучшего SEO и более высоких показателей конверсии.',
      zh: '产品图片是任何在线商店中最重的资产。了解如何有效压缩它们，以实现更快的页面加载、更好的 SEO 和更高的转化率。',
      ja: '商品画像はオンラインストアで最も重いアセットです。ページの高速読み込み、SEOの向上、コンバージョン率の向上のために、効果的な圧縮方法を学びましょう。',
      ko: '제품 이미지는 모든 온라인 스토어에서 가장 무거운 자산입니다. 더 빠른 페이지 로드, 더 나은 SEO 및 더 높은 전환율을 위해 효과적으로 압축하는 방법을 알아보세요.',
      ar: 'صور المنتجات هي أثقل الأصول في أي متجر إلكتروني. تعلم كيفية ضغطها بفعالية لتحميل أسرع للصفحات، وتحسين SEO، وارتفاع معدلات التحويل.',
      hi: 'उत्पाद इमेज किसी भी ऑनलाइन स्टोर पर सबसे भारी संपत्ति होती हैं। तेज़ पेज लोड, बेहतर SEO और उच्च रूपांतरण दरों के लिए उन्हें प्रभावी ढंग से कंप्रेस करना सीखें।',
      tr: 'Ürün görüntüleri, herhangi bir çevrimiçi mağazadaki en ağır varlıklardır. Daha hızlı sayfa yüklemeleri, daha iyi SEO ve daha yüksek dönüşüm oranları için bunları etkili bir şekilde nasıl sıkıştıracağınızı öğrenin.',
    },
    {
      en: ['ecommerce', 'image-optimization', 'compression', 'product-photos', 'seo'],
      es: ['comercio-electrónico', 'optimización-de-imágenes', 'compresión', 'fotos-de-producto', 'seo'],
      fr: ['ecommerce', 'optimisation-d-image', 'compression', 'photos-de-produit', 'seo'],
      de: ['ecommerce', 'bildoptimierung', 'komprimierung', 'produktfotos', 'seo'],
      it: ['ecommerce', 'ottimizzazione-immagini', 'compressione', 'foto-prodotto', 'seo'],
      pt: ['ecommerce', 'otimização-de-imagens', 'compressão', 'fotos-de-produto', 'seo'],
      ru: ['электронная-коммерция', 'оптимизация-изображений', 'сжатие', 'фото-товаров', 'seo'],
      zh: ['电子商务', '图像优化', '压缩', '产品照片', 'seo'],
      ja: ['eコマース', '画像最適化', '圧縮', '商品写真', 'seo'],
      ko: ['전자상거래', '이미지-최적화', '압축', '제품-사진', 'seo'],
      ar: ['تجارة-إلكترونية', 'تحسين-الصور', 'ضغط', 'صور-المنتج', 'seo'],
      hi: ['ई-कॉमर्स', 'इमेज-ऑप्टिमाइज़ेशन', 'कंप्रेशन', 'उत्पाद-फ़ोटो', 'seo'],
      tr: ['e-ticaret', 'görüntü-optimizasyonu', 'sıkıştırma', 'ürün-fotoğrafları', 'seo'],
    },
    {
      en: `<p>Product images are the heaviest assets on any e-commerce page. A typical product page with five high-resolution photos can weigh 5-10 MB — more than the sum of all HTML, CSS, and JavaScript combined.</p>
<h2>Compress product images without visible quality loss</h2>
<p>The goal is to reduce file size without making products look worse. Our compressor's Auto mode analyses each product photo individually and picks the best format and quality setting.</p>
<h2>Resize to the right dimensions</h2>
<p>Most e-commerce platforms display product images at 800-1200 pixels wide. Uploading a 4000-pixel raw photo wastes bandwidth. Resize first, then compress.</p>
<h2>Serve next-gen formats with fallbacks</h2>
<p>AVIF and WebP can cut file sizes in half compared to JPEG, but not every browser supports them. Use the <code>&lt;picture&gt;</code> element to serve AVIF to supported browsers, WebP to the next best, and JPEG to everything else.</p>
<h2>Batch process your entire catalogue</h2>
<p>An e-commerce store with 1,000 products and 5 images each means 5,000 images to compress. Our Bulk Compressor handles up to 200 images at once with parallel processing.</p>`,
    },
  ),
  'privacy-first-image-tools': t(
    {
      en: 'Why privacy-first image tools matter for your data',
      es: 'Por qué las herramientas de imágenes centradas en la privacidad son importantes para tus datos',
      fr: 'Pourquoi les outils d\'images respectueux de la vie privée sont importants pour vos données',
      de: 'Warum datenschutzorientierte Bildtools für Ihre Daten wichtig sind',
      it: 'Perché gli strumenti per immagini incentrati sulla privacy sono importanti per i tuoi dati',
      pt: 'Por que ferramentas de imagem focadas em privacidade são importantes para seus dados',
      ru: 'Почему инструменты для изображений с приоритетом конфиденциальности важны для ваших данных',
      zh: '为什么注重隐私的图像工具对您的数据很重要',
      ja: 'プライバシー重視の画像ツールがデータにとって重要な理由',
      ko: '프라이버시 중심 이미지 도구가 데이터에 중요한 이유',
      ar: 'لماذا أدوات الصور التي تركز على الخصوصية مهمة لبياناتك',
      hi: 'आपके डेटा के लिए गोपनीयता-प्रथम इमेज टूल क्यों महत्वपूर्ण हैं',
      tr: 'Gizlilik odaklı görüntü araçları verileriniz için neden önemlidir',
    },
    {
      en: 'Most online image tools upload your files to remote servers. Here is why browser-based processing is safer, and how ToolBox Image keeps your images entirely on your device.',
      es: 'La mayoría de las herramientas de imágenes online suben tus archivos a servidores remotos. Aquí te explicamos por qué el procesamiento en el navegador es más seguro y cómo ToolBox Image mantiene tus imágenes completamente en tu dispositivo.',
      fr: 'La plupart des outils d\'images en ligne téléchargent vos fichiers vers des serveurs distants. Voici pourquoi le traitement dans le navigateur est plus sûr, et comment ToolBox Image garde vos images entièrement sur votre appareil.',
      de: 'Die meisten Online-Bildtools laden Ihre Dateien auf entfernte Server hoch. Hier erfahren Sie, warum die browserbasierte Verarbeitung sicherer ist und wie ToolBox Image Ihre Bilder vollständig auf Ihrem Gerät behält.',
      it: 'La maggior parte degli strumenti per immagini online carica i tuoi file su server remoti. Ecco perché l\'elaborazione nel browser è più sicura e come ToolBox Image mantiene le tue immagini interamente sul tuo dispositivo.',
      pt: 'A maioria das ferramentas de imagem online envia seus arquivos para servidores remotos. Veja por que o processamento no navegador é mais seguro e como o ToolBox Image mantém suas imagens inteiramente no seu dispositivo.',
      ru: 'Большинство онлайн-инструментов для изображений загружают ваши файлы на удалённые серверы. Вот почему обработка в браузере безопаснее, и как ToolBox Image хранит ваши изображения полностью на вашем устройстве.',
      zh: '大多数在线图像工具会将您的文件上传到远程服务器。以下是为什么基于浏览器的处理更安全，以及 ToolBox Image 如何将您的图像完全保留在您的设备上。',
      ja: 'ほとんどのオンライン画像ツールはファイルをリモートサーバーにアップロードします。ブラウザベースの処理がより安全である理由と、ToolBox Imageが画像を完全にデバイス上に保持する方法をご説明します。',
      ko: '대부분의 온라인 이미지 도구는 파일을 원격 서버에 업로드합니다. 브라우저 기반 처리가 더 안전한 이유와 ToolBox Image가 이미지를 기기에 완전히 유지하는 방법을 소개합니다.',
      ar: 'معظم أدوات الصور على الإنترنت تقوم بتحميل ملفاتك إلى خوادم بعيدة. إليك لماذا المعالجة في المتصفح أكثر أماناً، وكيف يحافظ ToolBox Image على صورك بالكامل على جهازك.',
      hi: 'अधिकांश ऑनलाइन इमेज टूल आपकी फ़ाइलों को दूरस्थ सर्वर पर अपलोड करते हैं। यहाँ बताया गया है कि ब्राउज़र-आधारित प्रोसेसिंग क्यों सुरक्षित है, और ToolBox Image आपकी इमेज को पूरी तरह से आपके डिवाइस पर कैसे रखता है।',
      tr: 'Çoğu çevrimiçi görüntü aracı, dosyalarınızı uzak sunuculara yükler. Tarayıcı tabanlı işlemenin neden daha güvenli olduğu ve ToolBox Image\'ın görüntülerinizi tamamen cihazınızda nasıl tuttuğu burada.',
    },
    {
      en: ['privacy', 'security', 'data-protection', 'client-side', 'browser'],
      es: ['privacidad', 'seguridad', 'protección-de-datos', 'lado-del-cliente', 'navegador'],
      fr: ['confidentialité', 'sécurité', 'protection-des-données', 'côté-client', 'navigateur'],
      de: ['datenschutz', 'sicherheit', 'datenschutz', 'client-seitig', 'browser'],
      it: ['privacy', 'sicurezza', 'protezione-dati', 'lato-client', 'browser'],
      pt: ['privacidade', 'segurança', 'proteção-de-dados', 'lado-do-cliente', 'navegador'],
      ru: ['конфиденциальность', 'безопасность', 'защита-данных', 'на-стороне-клиента', 'браузер'],
      zh: ['隐私', '安全', '数据保护', '客户端', '浏览器'],
      ja: ['プライバシー', 'セキュリティ', 'データ保護', 'クライアントサイド', 'ブラウザ'],
      ko: ['프라이버시', '보안', '데이터-보호', '클라이언트-사이드', '브라우저'],
      ar: ['خصوصية', 'أمان', 'حماية-البيانات', 'جانب-العميل', 'متصفح'],
      hi: ['गोपनीयता', 'सुरक्षा', 'डेटा-सुरक्षा', 'क्लाइंट-साइड', 'ब्राउज़र'],
      tr: ['gizlilik', 'güvenlik', 'veri-koruması', 'istemci-tarafı', 'tarayıcı'],
    },
    {
      en: `<p>Most free online image tools follow the same business model: you upload your files to their server, and they process them in exchange for the right to collect your data. Browser-based image tools offer an alternative where your files never travel over the network.</p>
<h2>The server upload problem</h2>
<p>When you upload an image to a server, you lose control over it. The server operator can store a copy indefinitely, analyse the image with AI, use it to train ML models, share or sell the data, or lose it in a breach.</p>
<h2>How browser-based processing works</h2>
<p>A browser-based tool loads the entire application code into your browser. When you drop an image, the file is read into memory using the File API. The processing happens using WebAssembly codecs. The result is written back using the URL.createObjectURL API.</p>
<p>At no point does the file travel over the network. The only network requests are for the initial page load.</p>
<h2>What this means for your privacy</h2>
<p>Browser-based processing eliminates the most common privacy risks. If there is no server receiving your files, there is no server that can be breached, subpoenaed, or monetised. Your images exist only in your device's memory.</p>
<h2>The trade-offs</h2>
<p>Browser-based processing is not perfect for every scenario. Large files (over 100 MB) can strain browser memory. Very old devices may not support WebAssembly. But for the vast majority of image editing tasks, browser-based tools are faster, more private, and more convenient.</p>`,
    },
  ),
  'optimize-images-wordpress': t(
    {
      en: 'How to optimize images for WordPress without plugins',
      es: 'Cómo optimizar imágenes para WordPress sin plugins',
      fr: 'Comment optimiser les images pour WordPress sans plugins',
      de: 'So optimieren Sie Bilder für WordPress ohne Plugins',
      it: 'Come ottimizzare le immagini per WordPress senza plugin',
      pt: 'Como otimizar imagens para WordPress sem plugins',
      ru: 'Как оптимизировать изображения для WordPress без плагинов',
      zh: '如何在没有插件的情况下优化 WordPress 图像',
      ja: 'プラグインなしでWordPressの画像を最適化する方法',
      ko: '플러그인 없이 WordPress 이미지를 최적화하는 방법',
      ar: 'كيفية تحسين الصور لـ WordPress دون إضافات',
      hi: 'प्लगइन के बिना WordPress के लिए इमेज को ऑप्टिमाइज़ कैसे करें',
      tr: 'WordPress için eklentisiz görüntü optimizasyonu nasıl yapılır',
    },
    {
      en: 'Tired of bloated optimization plugins slowing down your WordPress admin? Here is how to compress and serve optimized images without installing anything.',
      es: '¿Cansado de los plugins de optimización que ralentizan tu administrador de WordPress? Aquí te mostramos cómo comprimir y servir imágenes optimizadas sin instalar nada.',
      fr: 'Marre des plugins d\'optimisation qui ralentissent votre administration WordPress ? Voici comment compresser et servir des images optimisées sans rien installer.',
      de: 'Haben Sie genug von aufgeblähten Optimierungs-Plugins, die Ihren WordPress-Admin verlangsamen? Hier erfahren Sie, wie Sie optimierte Bilder komprimieren und bereitstellen, ohne etwas zu installieren.',
      it: 'Stanco dei plugin di ottimizzazione che rallentano la tua amministrazione WordPress? Ecco come comprimere e servire immagini ottimizzate senza installare nulla.',
      pt: 'Cansado de plugins de otimização inchados que desaceleram seu admin do WordPress? Veja como comprimir e servir imagens otimizadas sem instalar nada.',
      ru: 'Устали от раздутых плагинов оптимизации, замедляющих админку WordPress? Вот как сжимать и обслуживать оптимизированные изображения без установки чего-либо.',
      zh: '厌倦了臃肿的优化插件拖慢您的 WordPress 管理后台？以下是如何在不安装任何东西的情况下压缩和提供优化后的图像。',
      ja: 'WordPress管理画面を遅くする肥大化した最適化プラグインにうんざりしていませんか？何もインストールせずに画像を圧縮・配信する方法をご紹介します。',
      ko: '비대한 최적화 플러그인이 WordPress 관리자를 느리게 하는 것에 지치셨나요? 아무것도 설치하지 않고 최적화된 이미지를 압축하고 제공하는 방법입니다.',
      ar: 'هل سئمت من إضافات التحسين الضخمة التي تبطئ لوحة تحكم WordPress؟ إليك كيفية ضغط وعرض الصور المحسنة دون تثبيت أي شيء.',
      hi: 'क्या आप फूले हुए ऑप्टिमाइज़ेशन प्लगइन से थक गए हैं जो आपके WordPress एडमिन को धीमा कर देते हैं? यहाँ बिना कुछ इंस्टॉल किए इमेज को कंप्रेस और सर्व करने का तरीका बताया गया है।',
      tr: 'WordPress yöneticinizi yavaşlatan şişkin optimizasyon eklentilerinden bıktınız mı? Hiçbir şey yüklemeden optimize edilmiş görüntüleri sıkıştırma ve sunma yöntemleri.',
    },
    {
      en: ['wordpress', 'image-compression', 'web-performance', 'seo', 'optimization'],
      es: ['wordpress', 'compresión-de-imágenes', 'rendimiento-web', 'seo', 'optimización'],
      fr: ['wordpress', 'compression-d-image', 'performance-web', 'seo', 'optimisation'],
      de: ['wordpress', 'bildkomprimierung', 'web-leistung', 'seo', 'optimierung'],
      it: ['wordpress', 'compressione-immagini', 'performance-web', 'seo', 'ottimizzazione'],
      pt: ['wordpress', 'compressão-de-imagens', 'desempenho-web', 'seo', 'otimização'],
      ru: ['wordpress', 'сжатие-изображений', 'веб-производительность', 'seo', 'оптимизация'],
      zh: ['wordpress', '图像压缩', '网络性能', 'seo', '优化'],
      ja: ['wordpress', '画像圧縮', 'ウェブパフォーマンス', 'seo', '最適化'],
      ko: ['wordpress', '이미지-압축', '웹-성능', 'seo', '최적화'],
      ar: ['wordpress', 'ضغط-الصور', 'أداء-الويب', 'seo', 'تحسين'],
      hi: ['wordpress', 'इमेज-कंप्रेशन', 'वेब-प्रदर्शन', 'seo', 'ऑप्टिमाइज़ेशन'],
      tr: ['wordpress', 'görüntü-sıkıştırma', 'web-performansı', 'seo', 'optimizasyon'],
    },
    {
      en: `<p>WordPress site speed is heavily dependent on image optimisation. Images account for 50-70% of the average WordPress page weight.</p>
<h2>Pre-compress before uploading</h2>
<p>The most effective strategy is to compress images before they ever reach your WordPress media library. Use our Image Compressor to batch-compress your photos before uploading.</p>
<h2>Convert to WebP before upload</h2>
<p>WordPress 5.8+ supports WebP uploads natively. Convert your JPEG and PNG images to WebP before uploading using our WebP Compressor.</p>
<h2>Resize before uploading</h2>
<p>Uploading 4000-pixel-wide photos when your theme only displays them at 1200 pixels wastes bandwidth. Use our Resize Image tool before uploading.</p>
<h2>Recommended pre-upload workflow</h2>
<ol>
<li>Resize images to 2000 px on the longest edge</li>
<li>Compress with the Bulk Compressor using Auto mode</li>
<li>Convert to WebP or AVIF</li>
<li>Upload to your WordPress Media Library</li>
</ol>`,
    },
  ),
  'remove-exif-data-online': t(
    {
      en: 'Remove hidden EXIF data from photos before sharing online',
      es: 'Elimina los datos EXIF ocultos de las fotos antes de compartirlas en línea',
      fr: 'Supprimez les données EXIF cachées des photos avant de les partager en ligne',
      de: 'Entfernen Sie versteckte EXIF-Daten aus Fotos, bevor Sie sie online teilen',
      it: 'Rimuovi i dati EXIF nascosti dalle foto prima di condividerle online',
      pt: 'Remova dados EXIF ocultos de fotos antes de compartilhar online',
      ru: 'Удалите скрытые данные EXIF из фотографий перед публикацией в интернете',
      zh: '在在线分享之前从照片中删除隐藏的 EXIF 数据',
      ja: 'オンラインで共有する前に写真から隠れたEXIFデータを削除',
      ko: '온라인 공유 전에 사진에서 숨겨진 EXIF 데이터 제거',
      ar: 'إزالة بيانات EXIF المخفية من الصور قبل المشاركة عبر الإنترنت',
      hi: 'ऑनलाइन साझा करने से पहले फ़ोटो से छिपे EXIF डेटा को हटाएँ',
      tr: 'Çevrimiçi paylaşmadan önce fotoğraflardan gizli EXIF verilerini kaldırın',
    },
    {
      en: 'Your photos contain hidden metadata — location, camera model, timestamp. Here is how to strip EXIF data from images before sharing them online.',
      es: 'Tus fotos contienen metadatos ocultos — ubicación, modelo de cámara, fecha. Aquí te mostramos cómo eliminar los datos EXIF de las imágenes antes de compartirlas en línea.',
      fr: 'Vos photos contiennent des métadonnées cachées — localisation, modèle d\'appareil, horodatage. Voici comment supprimer les données EXIF des images avant de les partager en ligne.',
      de: 'Ihre Fotos enthalten versteckte Metadaten — Standort, Kameramodell, Zeitstempel. Hier erfahren Sie, wie Sie EXIF-Daten aus Bildern entfernen, bevor Sie sie online teilen.',
      it: 'Le tue foto contengono metadati nascosti — posizione, modello di fotocamera, timestamp. Ecco come rimuovere i dati EXIF dalle immagini prima di condividerle online.',
      pt: 'Suas fotos contêm metadados ocultos — localização, modelo da câmera, data. Veja como remover dados EXIF de imagens antes de compartilhá-las online.',
      ru: 'Ваши фотографии содержат скрытые метаданные — местоположение, модель камеры, временная метка. Вот как удалить данные EXIF из изображений перед публикацией онлайн.',
      zh: '您的照片包含隐藏的元数据——位置、相机型号、时间戳。以下是如何在在线分享之前从图像中剥离 EXIF 数据。',
      ja: 'あなたの写真には隠れたメタデータが含まれています——位置情報、カメラモデル、タイムスタンプ。オンラインで共有する前に画像からEXIFデータを削除する方法をご紹介します。',
      ko: '사진에는 숨겨진 메타데이터(위치, 카메라 모델, 타임스탬프)가 포함되어 있습니다. 온라인 공유 전에 이미지에서 EXIF 데이터를 제거하는 방법입니다.',
      ar: 'صورك تحتوي على بيانات وصفية مخفية — الموقع، طراز الكاميرا، الطابع الزمني. إليك كيفية إزالة بيانات EXIF من الصور قبل مشاركتها عبر الإنترنت.',
      hi: 'आपकी तस्वीरों में छिपे मेटाडेटा होते हैं — स्थान, कैमरा मॉडल, टाइमस्टैम्प। यहाँ ऑनलाइन साझा करने से पहले इमेज से EXIF डेटा हटाने का तरीका बताया गया है।',
      tr: 'Fotoğraflarınız gizli meta veriler içerir — konum, kamera modeli, zaman damgası. Çevrimiçi paylaşmadan önce görüntülerden EXIF verilerini kaldırma yöntemleri.',
    },
    {
      en: ['exif', 'metadata', 'privacy', 'photo-security', 'client-side'],
      es: ['exif', 'metadatos', 'privacidad', 'seguridad-fotográfica', 'lado-del-cliente'],
      fr: ['exif', 'métadonnées', 'confidentialité', 'sécurité-photo', 'côté-client'],
      de: ['exif', 'metadaten', 'datenschutz', 'foto-sicherheit', 'client-seitig'],
      it: ['exif', 'metadata', 'privacy', 'sicurezza-foto', 'lato-client'],
      pt: ['exif', 'metadados', 'privacidade', 'segurança-de-fotos', 'lado-do-cliente'],
      ru: ['exif', 'метаданные', 'конфиденциальность', 'безопасность-фото', 'на-стороне-клиента'],
      zh: ['exif', '元数据', '隐私', '照片安全', '客户端'],
      ja: ['exif', 'メタデータ', 'プライバシー', '写真セキュリティ', 'クライアントサイド'],
      ko: ['exif', '메타데이터', '프라이버시', '사진-보안', '클라이언트-사이드'],
      ar: ['exif', 'بيانات-وصفية', 'خصوصية', 'أمان-الصور', 'جانب-العميل'],
      hi: ['exif', 'मेटाडेटा', 'गोपनीयता', 'फ़ोटो-सुरक्षा', 'क्लाइंट-साइड'],
      tr: ['exif', 'meta-verileri', 'gizlilik', 'fotoğraf-güvenliği', 'istemci-tarafı'],
    },
    {
      en: `<p>Every photo you take with your phone or camera embeds hidden metadata called EXIF data. This information includes the camera model, lens type, exposure settings, timestamp, and — critically — the GPS coordinates of where the photo was taken.</p>
<h2>What EXIF data reveals</h2>
<p>Open any photo's properties and you might find: camera make and model, exact date and time, GPS latitude and longitude, focal length, aperture, shutter speed, ISO, and even the photographer's name.</p>
<h2>Strip EXIF data with ToolBox Image</h2>
<p>Our Image Compressor strips EXIF metadata by default on every compression. When you drop an image into the compressor, it removes camera info, GPS coordinates, and all other embedded metadata before creating the output file.</p>
<h2>Strip EXIF on different devices</h2>
<p><strong>Mac:</strong> Use Preview. Open the image, go to Tools → Show Inspector, click Info, and delete location data.</p>
<p><strong>Windows:</strong> Right-click the image, select Properties → Details, and click "Remove Properties and Personal Information."</p>
<p><strong>iPhone:</strong> Before sharing, tap Options and toggle off "Location" and "All Photos Data."</p>
<p><strong>Any device (online):</strong> Use our browser-based compressor. No uploads, no trackers.</p>`,
    },
  ),
  'webp-vs-avif-comparison': t(
    {
      en: 'WebP vs AVIF: which next-gen format saves more space?',
      es: 'WebP vs AVIF: ¿qué formato de nueva generación ahorra más espacio?',
      fr: 'WebP vs AVIF : quel format de nouvelle génération économise le plus d\'espace ?',
      de: 'WebP vs AVIF: Welches Next-Gen-Format spart mehr Speicherplatz?',
      it: 'WebP vs AVIF: quale formato di nuova generazione risparmia più spazio?',
      pt: 'WebP vs AVIF: qual formato de nova geração economiza mais espaço?',
      ru: 'WebP против AVIF: какой формат нового поколения экономит больше места?',
      zh: 'WebP vs AVIF：哪种下一代格式更节省空间？',
      ja: 'WebP vs AVIF：次世代フォーマットでより容量を節約できるのは？',
      ko: 'WebP vs AVIF: 어떤 차세대 형식이 더 많은 공간을 절약하나요?',
      ar: 'WebP مقابل AVIF: أي تنسيق من الجيل التالي يوفر مساحة أكبر؟',
      hi: 'WebP बनाम AVIF: कौन सा नेक्स्ट-जेन फ़ॉर्मेट अधिक जगह बचाता है?',
      tr: 'WebP vs AVIF: hangi yeni nesil biçim daha fazla yerden tasarruf sağlar?',
    },
    {
      en: 'Both WebP and AVIF promise better compression than JPEG. We put them head-to-head on real images to see which format delivers the smallest files without sacrificing quality.',
      es: 'Tanto WebP como AVIF prometen mejor compresión que JPEG. Los enfrentamos en imágenes reales para ver qué formato ofrece los archivos más pequeños sin sacrificar calidad.',
      fr: 'WebP et AVIF promettent tous deux une meilleure compression que JPEG. Nous les confrontons sur des images réelles pour voir quel format offre les fichiers les plus petits sans sacrifier la qualité.',
      de: 'Sowohl WebP als auch AVIF versprechen eine bessere Komprimierung als JPEG. Wir lassen sie auf echten Bildern gegeneinander antreten, um zu sehen, welches Format die kleinsten Dateien ohne Qualitätseinbußen liefert.',
      it: 'Sia WebP che AVIF promettono una migliore compressione di JPEG. Li mettiamo a confronto su immagini reali per vedere quale formato offre i file più piccoli senza sacrificare la qualità.',
      pt: 'Tanto WebP quanto AVIF prometem melhor compressão que JPEG. Nós os colocamos frente a frente em imagens reais para ver qual formato entrega os menores arquivos sem sacrificar a qualidade.',
      ru: 'И WebP, и AVIF обещают лучшее сжатие, чем JPEG. Мы сравниваем их на реальных изображениях, чтобы увидеть, какой формат обеспечивает наименьшие файлы без потери качества.',
      zh: 'WebP 和 AVIF 都承诺比 JPEG 提供更好的压缩。我们将它们在真实图像上进行对比，看看哪种格式能在不牺牲质量的情况下提供最小的文件。',
      ja: 'WebPとAVIFはどちらもJPEGよりも優れた圧縮を約束しています。実際の画像で比較し、品質を犠牲にせずに最小のファイルを提供する形式を確認します。',
      ko: 'WebP와 AVIF 모두 JPEG보다 더 나은 압축을 약속합니다. 실제 이미지에서 직접 비교하여 품질을 희생하지 않고 가장 작은 파일을 제공하는 형식을 확인합니다.',
      ar: 'كل من WebP وAVIF يعدان بضغط أفضل من JPEG. نضعهم وجهاً لوجه على صور حقيقية لنرى أي تنسيق يقدم أصغر الملفات دون التضحية بالجودة.',
      hi: 'WebP और AVIF दोनों JPEG से बेहतर कंप्रेशन का वादा करते हैं। हमने उन्हें वास्तविक इमेज पर आमने-सामने रखा ताकि देख सकें कि कौन सा फ़ॉर्मेट गुणवत्ता का त्याग किए बिना सबसे छोटी फ़ाइलें देता है।',
      tr: 'Hem WebP hem de AVIF, JPEG\'den daha iyi sıkıştırma vaat ediyor. Kaliteden ödün vermeden en küçük dosyaları hangi biçimin sunduğunu görmek için onları gerçek görüntülerde karşı karşıya getiriyoruz.',
    },
    {
      en: ['webp', 'avif', 'image-formats', 'web-performance', 'comparison', 'compression'],
      es: ['webp', 'avif', 'formatos-de-imagen', 'rendimiento-web', 'comparación', 'compresión'],
      fr: ['webp', 'avif', 'formats-d-image', 'performance-web', 'comparaison', 'compression'],
      de: ['webp', 'avif', 'bildformate', 'web-leistung', 'vergleich', 'komprimierung'],
      it: ['webp', 'avif', 'formati-immagine', 'performance-web', 'confronto', 'compressione'],
      pt: ['webp', 'avif', 'formatos-de-imagem', 'desempenho-web', 'comparação', 'compressão'],
      ru: ['webp', 'avif', 'форматы-изображений', 'веб-производительность', 'сравнение', 'сжатие'],
      zh: ['webp', 'avif', '图像格式', '网络性能', '比较', '压缩'],
      ja: ['webp', 'avif', '画像形式', 'ウェブパフォーマンス', '比較', '圧縮'],
      ko: ['webp', 'avif', '이미지-형식', '웹-성능', '비교', '압축'],
      ar: ['webp', 'avif', 'تنسيقات-الصور', 'أداء-الويب', 'مقارنة', 'ضغط'],
      hi: ['webp', 'avif', 'इमेज-फ़ॉर्मेट', 'वेब-प्रदर्शन', 'तुलना', 'कंप्रेशन'],
      tr: ['webp', 'avif', 'görüntü-biçimleri', 'web-performansı', 'karşılaştırma', 'sıkıştırma'],
    },
    {
      en: `<p>Two formats — WebP and AVIF — both promise significantly better compression than JPEG. But which one should you actually use?</p>
<h2>File size comparison</h2>
<p>At equivalent visual quality, AVIF consistently produces smaller files than WebP. Our tests on a 4000 × 2250 photograph showed:</p>
<table><thead><tr><th>Format</th><th>File size</th><th>Savings vs JPEG</th></tr></thead><tbody>
<tr><td>JPEG (quality 80)</td><td>1.8 MB</td><td>—</td></tr>
<tr><td>WebP (quality 80)</td><td>1.2 MB</td><td>33%</td></tr>
<tr><td>AVIF (quality 80)</td><td>720 KB</td><td>60%</td></tr>
</tbody></table>
<p>AVIF is roughly 40% smaller than WebP on photographic content.</p>
<h2>Browser support</h2>
<p>WebP has wider support — roughly 97% of global browsers versus 92% for AVIF. Both are supported in Chrome, Firefox, Safari, and Edge.</p>
<h2>Encoding speed</h2>
<p>WebP encodes 3-5 times faster than AVIF at the same quality setting. Our compressor handles this by processing images in parallel across all CPU cores.</p>
<h2>Which should you choose?</h2>
<p>Use WebP as your baseline and AVIF where you need maximum savings. WebP is faster to encode, has wider browser support, and still saves 25-35% compared to JPEG. AVIF is worth the extra encoding time for photographic content where every kilobyte matters.</p>`,
    },
  ),
  'reduce-image-size-without-losing-quality': t(
    {
      en: 'How to reduce image file size without losing quality',
      es: 'Cómo reducir el tamaño de archivo de imagen sin perder calidad',
      fr: 'Comment réduire la taille d\'un fichier image sans perdre en qualité',
      de: 'So reduzieren Sie die Bilddateigröße ohne Qualitätsverlust',
      it: 'Come ridurre le dimensioni del file immagine senza perdere qualità',
      pt: 'Como reduzir o tamanho do arquivo de imagem sem perder qualidade',
      ru: 'Как уменьшить размер файла изображения без потери качества',
      zh: '如何在不损失质量的情况下减小图像文件大小',
      ja: '画質を損なわずに画像ファイルサイズを削減する方法',
      ko: '품질 저하 없이 이미지 파일 크기를 줄이는 방법',
      ar: 'كيفية تقليل حجم ملف الصورة دون فقدان الجودة',
      hi: 'गुणवत्ता खोए बिना इमेज फ़ाइल का आकार कैसे कम करें',
      tr: 'Kaliteden ödün vermeden görüntü dosyası boyutu nasıl azaltılır',
    },
    {
      en: 'Five proven techniques to shrink image file sizes while keeping every pixel sharp. From format selection to smart resizing — get the smallest files with zero visible loss.',
      es: 'Cinco técnicas probadas para reducir el tamaño de archivos de imagen manteniendo cada píxel nítido. Desde la selección de formato hasta el redimensionamiento inteligente.',
      fr: 'Cinq techniques éprouvées pour réduire la taille des fichiers image tout en gardant chaque pixel net. De la sélection du format au redimensionnement intelligent.',
      de: 'Fünf bewährte Techniken, um Bilddateigrößen zu reduzieren und dabei jedes Pixel scharf zu halten. Von der Formatwahl bis zum intelligenten Resizing.',
      it: 'Cinque tecniche comprovate per ridurre le dimensioni dei file immagine mantenendo ogni pixel nitido. Dalla selezione del formato al ridimensionamento intelligente.',
      pt: 'Cinco técnicas comprovadas para reduzir o tamanho de arquivos de imagem mantendo cada pixel nítido. Da seleção de formato ao redimensionamento inteligente.',
      ru: 'Пять проверенных методов уменьшения размера файлов изображений с сохранением каждого пикселя. От выбора формата до интеллектуального изменения размера.',
      zh: '五种经过验证的技术，可在保持每个像素清晰的同时缩小图像文件大小。从格式选择到智能调整大小。',
      ja: 'すべてのピクセルをシャープに保ちながら画像ファイルサイズを削減する5つの実証済みテクニック。フォーマット選択からスマートリサイズまで。',
      ko: '모든 픽셀을 선명하게 유지하면서 이미지 파일 크기를 줄이는 5가지 검증된 기술. 형식 선택에서 스마트 크기 조정까지.',
      ar: 'خمس تقنيات مثبتة لتقليل أحجام ملفات الصور مع الحفاظ على كل بكسل حاداً. من اختيار التنسيق إلى تغيير الحجم الذكي.',
      hi: 'हर पिक्सेल को शार्प रखते हुए इमेज फ़ाइल साइज़ कम करने की पाँच सिद्ध तकनीकें। फ़ॉर्मेट चयन से लेकर स्मार्ट रीज़ाइज़िंग तक।',
      tr: 'Her pikseli keskin tutarken görüntü dosyası boyutlarını küçültmek için beş kanıtlanmış teknik. Biçim seçiminden akıllı yeniden boyutlandırmaya kadar.',
    },
    {
      en: ['compression', 'optimization', 'file-size', 'quality', 'workflow'],
      es: ['compresión', 'optimización', 'tamaño-de-archivo', 'calidad', 'flujo-de-trabajo'],
      fr: ['compression', 'optimisation', 'taille-de-fichier', 'qualité', 'flux-de-travail'],
      de: ['komprimierung', 'optimierung', 'dateigröße', 'qualität', 'arbeitsablauf'],
      it: ['compressione', 'ottimizzazione', 'dimensione-file', 'qualità', 'flusso-di-lavoro'],
      pt: ['compressão', 'otimização', 'tamanho-do-arquivo', 'qualidade', 'fluxo-de-trabalho'],
      ru: ['сжатие', 'оптимизация', 'размер-файла', 'качество', 'рабочий-процесс'],
      zh: ['压缩', '优化', '文件大小', '质量', '工作流程'],
      ja: ['圧縮', '最適化', 'ファイルサイズ', '品質', 'ワークフロー'],
      ko: ['압축', '최적화', '파일-크기', '품질', '워크플로우'],
      ar: ['ضغط', 'تحسين', 'حجم-الملف', 'جودة', 'سير-العمل'],
      hi: ['कंप्रेशन', 'ऑप्टिमाइज़ेशन', 'फ़ाइल-साइज़', 'गुणवत्ता', 'वर्कफ़्लो'],
      tr: ['sıkıştırma', 'optimizasyon', 'dosya-boyutu', 'kalite', 'iş-akışı'],
    },
    {
      en: `<p>The most common question we hear is, "How do I make this image smaller without making it look worse?" Here are five techniques that work every time.</p>
<h2>1. Switch to a modern format</h2>
<p>This is the single biggest lever. Converting a JPEG to WebP saves 25-35% with no visible difference. Converting to AVIF saves 50-60%.</p>
<h2>2. Remove invisible metadata</h2>
<p>Every photo from a modern smartphone carries embedded EXIF data that can add 50-200 KB per image. Stripping it removes zero visual quality but reduces file size noticeably.</p>
<h2>3. Resize to the display size</h2>
<p>The most common cause of oversized images is uploading a 4000-pixel-wide photo when the page displays it at 1200 pixels. Resize first.</p>
<h2>4. Use lossless compression for graphics</h2>
<p>For screenshots, logos, and images with text, lossy compression introduces visible artefacts. Use lossless WebP or PNG instead.</p>
<h2>5. Target a specific file size</h2>
<p>Instead of guessing at quality sliders, tell the compressor the exact file size you need. Our target-size mode works backwards from the limit.</p>`,
    },
  ),
};
