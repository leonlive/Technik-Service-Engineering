// Array of background images (modify paths as needed)
const bgImages = [
  'url("images/milky-way.jpg")',  // Your original animated GIF
  'url("images/matrix-bg.gif")',   // Example static/dynamic bg 1
  'url("images/result_AI.png")',   // Example animated bg 2
  'url("images/Satellite_1_.jpg")',
  'url("images/Big-SAT.jpg")'
];

let currentBgIndex = 0;

function activateSmartHome() {
  const header = document.getElementById('header');
  const overlay = document.getElementById('header-overlay');
  const main = document.getElementById('main-content');

  // Remove overlay if it exists
  if (overlay) overlay.remove();

  // Update header (your existing dynamic video setup)
  header.innerHTML = `
    <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover z-0">
      <source src="https://drive.google.com/file/d/1RF82k_Qk2-QiVL0EktFB-pGHS4HZeb2M/view?usp=sharing" type="video/mp4">
      Ihr Browser unterstützt kein Video.
    </video>
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
