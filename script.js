// Array of background images (modify paths as needed)
const bgImages = [
  'url("images/milky-way.jpg")',
  'url("images/matrix-bg.gif")',
  'url("images/result_AI.png")',
  'url("images/Satellite_1_.jpg")',
  'url("images/Big-SAT.jpg")'
];

let currentBgIndex = -1;

function activateSmartHome() {
  const header = document.getElementById('header');
  
  // Backup original content
  if (!window.originalHeaderContent) {
    window.originalHeaderContent = header.innerHTML;
  }

  // Insert responsive video container
  header.innerHTML = `
    <div class="video-crop-container">
      <iframe 
        src="https://player.vimeo.com/video/1103921662?autoplay=1&loop=1&muted=1&background=1"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen>
      </iframe>
      <div class="video-overlay">
        <h1>SMART HOME – Willkommen in der Zukunft!!!</h1>
      </div>
    </div>
    <button onclick="restoreWelcomeText()" class="video-close-btn">×</button>
  `;

  // Maintain background cycling
  currentBgIndex = (currentBgIndex + 1) % bgImages.length;
  document.getElementById('main-content').style.backgroundImage = bgImages[currentBgIndex];
    // Ensure animation keeps running (if ever overridden)
  main.style.animation = 'stars 60s linear infinite'; 

}

function restoreWelcomeText() {
  const header = document.getElementById('header');
  header.innerHTML = window.originalHeaderContent;
}

