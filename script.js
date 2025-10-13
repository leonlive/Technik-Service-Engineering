// bgImages
const bgImages = [
  'url("images/milky-way.jpg")',
  'url("images/matrix-bg.gif")',
  'url("images/result_AI.png")',
  'url("images/Satellite_1_.jpg")',
  'url("images/Big-SAT.jpg")'
];

// Може да е МИКС – Vimeo ID, Vimeo URL, YouTube, Drive preview, .mp4/.webm:
const videos = [
  '1103921662', // Vimeo (само ID) – твоят дефолтен
  '1126968160', // Viemo Invideo 2
  'https://youtu.be/ozfdYn97QFs',
   'https://player.vimeo.com/video/355087337',
  // 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://www.youtube.com/watch?v=SZRXy_jfWU0&list=PL4B1948130C2A7468',
  // 'https://youtu.be/dQw4w9WgXcQ',
  // 'https://drive.google.com/file/d/FILE_ID/preview',
  //'https://drive.google.com/file/d/177Wsg30E4tMZ2HYYA_iaRxAhEwgn6LZK/view?usp=sharing',
  // 'videos/demo.mp4'
];

let currentBgIndex  = -1;
let currentVideoIdx = -1;
let originalHeaderContent = null;

function buildEmbedHTML(input) {
  const s = String(input).trim();

  // Vimeo: чисто числов ID (минимум 6 цифри счита се за ID)
  const isNumericId = /^\d{6,}$/.test(s);
  // Vimeo URL
  const vimeoMatch  = s.match(/vimeo\.com\/(?:video\/)?(\d+)/i);

  if (isNumericId || vimeoMatch) {
    const id  = isNumericId ? s : vimeoMatch[1];
    const src = `https://player.vimeo.com/video/${id}?autoplay=1&loop=1&muted=0&background=1&playsinline=1`;
    return `<iframe src="${src}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  }

  // YouTube
  if (/youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\//i.test(s)) {
    let videoId = '';
    const m1 = s.match(/youtube\.com\/watch\?v=([^&]+)/i);
    const m2 = s.match(/youtu\.be\/([^?&]+)/i);
    const m3 = s.match(/youtube\.com\/embed\/([^?&]+)/i);
    if (m1) videoId = m1[1];
    else if (m2) videoId = m2[1];
    else if (m3) videoId = m3[1];
    if (!videoId) throw new Error('YouTube-Link ohne Video-ID.');

    const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&playsinline=1&modestbranding=1&controls=0`;
    return `<iframe src="${src}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }

  // Google Drive (/preview е задължителен)
  if (/drive\.google\.com\/file\/.*\/(preview|view)/i.test(s)) {
    const preview = s.replace(/\/view(\?[^"]*)?$/i, '/preview');
    return `<iframe src="${preview}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  }

  // Директни файлове
  if (/\.(mp4|webm)(\?.*)?$/i.test(s)) {
    const type = s.toLowerCase().endsWith('.webm') ? 'webm' : 'mp4';
    return `
      <video controls autoplay muted loop playsinline>
        <source src="${s}" type="video/${type}">
        Ihr Browser unterstützt dieses Video nicht.
      </video>`;
  }

  // Фолбек – приемаме iframe
  return `<iframe src="${s}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
}

function activateSmartHome() {
  const header = document.getElementById('header');
  const main   = document.getElementById('main-content');

  if (!header) { console.error('#header nicht gefunden'); return; }

  if (originalHeaderContent === null) {
    originalHeaderContent = header.innerHTML;
  }

  // следващо видео
  currentVideoIdx = (currentVideoIdx + 1) % videos.length;
  const embed = buildEmbedHTML(videos[currentVideoIdx]);

  header.innerHTML = `
    <div class="video-crop-container">
      ${embed}
      <div class="video-overlay" id="video-overlay">
        <h1>SMART HOME – Willkommen in der Zukunft!!!</h1>
      </div>
    </div>
    <button onclick="restoreWelcomeText()" class="video-close-btn" aria-label="Close">×</button>
  `;

  // overlay hide след 4 секунди
  const overlay = document.getElementById('video-overlay');
  if (overlay) {
    overlay.style.opacity = '1';
    setTimeout(() => {
      let o = 1;
      const step = setInterval(() => {
        o -= 0.05;
        overlay.style.opacity = String(o);
        if (o <= 0) { clearInterval(step); overlay.style.display = 'none'; }
      }, 100);
    }, 4000);
  }

  // завърти background-а
  if (main) {
    currentBgIndex = (currentBgIndex + 1) % bgImages.length;
    main.style.backgroundImage = bgImages[currentBgIndex];
  }
}

function restoreWelcomeText() {
  const header = document.getElementById('header');
  if (!header) return;

  if (originalHeaderContent !== null) {
    header.innerHTML = originalHeaderContent;
  }
  currentVideoIdx = -1;
}
