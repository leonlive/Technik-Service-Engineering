// Array of background images (modify paths as needed)
const bgImages = [
  'url("images/milky-way.jpg")',  // Your original animated GIF
  'url("images/matrix-bg.gif")',   // Example static/dynamic bg 1
  'url("images/result_AI.png")',   // Example animated bg 2
  'url("images/Satellite_1_.jpg")',
  'url("images/Big-SAT.jpg")'
];

let currentBgIndex = -1;

function activateSmartHome() {
  const header = document.getElementById('header');
  const overlay = document.getElementById('header-overlay');
  const main = document.getElementById('main-content');

  // Remove overlay if it exists
  if (overlay) overlay.remove();

  // Update header (your existing dynamic video setup)
 header.innerHTML = `
  <iframe 
    src="https://player.vimeo.com/video/1103921662?autoplay=1&loop=1&muted=1&background=1" 
    class="absolute top-0 left-0 w-full h-full"
    frameborder="0"
    allow="autoplay; fullscreen"
  ></iframe>
  <div class="absolute inset-0 bg-black bg-opacity-40 z-10 flex items-center justify-center text-white">
      <h1 class="text-4xl font-bold">SMART HOME – Willkommen in der Zukunft!!!</h1>
    </div>
`;

  // Cycle to the next background (keeps all classes, only updates image)
  currentBgIndex = (currentBgIndex + 1) % bgImages.length;
  main.style.backgroundImage = bgImages[currentBgIndex];
  
  // Ensure animation keeps running (if ever overridden)
  main.style.animation = 'stars 60s linear infinite'; 
}
