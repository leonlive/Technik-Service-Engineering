// Array of background images (modify paths as needed)
const bgImages = [
  'url("images/milky-way.jpg")',
  'url("images/matrix-bg.gif")',
  'url("images/result_AI.png")',
  'url("images/Satellite_1_.jpg")',
  'url("images/Big-SAT.jpg")'
];

// Array of Vimeo video IDs (replace with your own)
const vimeoVideos = [
  '1103921662',  // Video 1 (default)
//  '76979871',    // Video 2 (example: "The Cosmic Eye")
//  '148751763',   // Video 3 (example: "Time-lapse of the Future")
  '355087337'    // Video 4 (example: "Earth from Space")
];

let currentBgIndex = -1;
let currentVideoIndex = -1; // Track which video is currently playing

function activateSmartHome() {
  const header = document.getElementById('header');
  
  // Backup original content
  if (!window.originalHeaderContent) {
    window.originalHeaderContent = header.innerHTML;
  }

  // Cycle to the next video (loop back to 0 after last)
  currentVideoIndex = (currentVideoIndex + 1) % vimeoVideos.length;
  const videoId = vimeoVideos[currentVideoIndex];

  // Insert responsive video container
  header.innerHTML = `
    <div class="video-crop-container">
      <iframe 
        src="https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=0&background=1&playsinline=1"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen>
      </iframe>
      <div class="video-overlay" id="video-overlay">
               <h1>SMART HOME – Willkommen in der Zukunft!!!</h1>
      </div>
    </div>
    <button onclick="restoreWelcomeText()" class="video-close-btn">×</button>
  `;

  const overlay = document.getElementById('video-overlay');
  overlay.style.opacity = '1'; // Start fully visible

  // Fade out overlay after 4 seconds (smooth transition)
  setTimeout(() => {
    let opacity = 1;
    const fadeInterval = setInterval(() => {
      opacity -= 0.05;
      overlay.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(fadeInterval);
        overlay.style.display = 'none';
      }
    }, 100); // Adjust speed (100ms per step)
  }, 4000);

  // Cycle background image
  currentBgIndex = (currentBgIndex + 1) % bgImages.length;
  document.getElementById('main-content').style.backgroundImage = bgImages[currentBgIndex];
}

function restoreWelcomeText() {
  const header = document.getElementById('header');
  header.innerHTML = window.originalHeaderContent;
  currentVideoIndex = -1; // Reset video counter for next activation
}
