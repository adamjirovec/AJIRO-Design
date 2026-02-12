/**
 * =========================================================
 * AJIRO — Script
 *
 * Responsibilities:
 * 1) Initialize the HLS background video on the home page.
 * 2) Run the typewriter headline cycle.
 * 3) Fade in the CTA button after a short delay.
 *
 * Notes:
 * - This script is loaded on the home page only.
 * - It is written to fail safely if an expected element is missing.
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initVideo();
  startHeroCycle();
  initCTA();
});

/* =========================
   VIDEO
   ========================= */

function initVideo() {
  const video = document.getElementById("video");
  if (!video) return; // Not on the home page

  const videoSrc = "main_video/Website-Video.m3u8";

  // Most browsers need HLS.js to play .m3u8
  if (window.Hls && Hls.isSupported()) {
    const hls = new Hls();

    hls.loadSource(videoSrc);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play().catch(() => {});
    });

    return;
  }

  // Safari/iOS can play HLS natively
  if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = videoSrc;
    video.addEventListener("loadedmetadata", () => {
      video.play().catch(() => {});
    });
  }
}

/* =========================
   TYPEWRITER
   ========================= */

let typingTimeoutId = null;
let scheduledTimeouts = [];

/** Clears the current typewriter loop timers (used on visibility changes). */
function clearAllTimers() {
  scheduledTimeouts.forEach(clearTimeout);
  scheduledTimeouts = [];
  if (typingTimeoutId) clearTimeout(typingTimeoutId);
}

/**
 * Types text into #type, one character at a time.
 * @param {string} text - Text to type
 * @param {number} speed - Milliseconds per character
 */
function typeWriter(text, speed = 38) {
  const el = document.getElementById("type");
  if (!el) return;

  el.textContent = "";
  let i = 0;

  const step = () => {
    el.textContent += text.charAt(i);
    i += 1;

    if (i < text.length) {
      typingTimeoutId = setTimeout(step, speed);
    }
  };

  step();
}

/** Schedules the headline sequence (kept identical timings/text). */
function startHeroCycle() {
  clearAllTimers();

  scheduledTimeouts.push(
    setTimeout(() => typeWriter("Don't let your life slip away in traffic"), 1000)
  );

  scheduledTimeouts.push(
    setTimeout(() => typeWriter("Advanced Composite performance for everyday riding"), 6000)
  );

  scheduledTimeouts.push(
    setTimeout(() => typeWriter("Built to move the cities"), 11000)
  );
}

/* =========================
   CTA BUTTON
   ========================= */

/** Fades in the CTA button on the home page after a short delay. */
function initCTA() {
  const btn = document.getElementById("fade");
  if (!btn) return;

  setTimeout(() => {
    btn.style.opacity = "1";
  }, 2000);
}

/* =========================
   VISIBILITY HANDLING
   ========================= */

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Stop timers while tab is hidden to avoid "catching up" later.
    clearAllTimers();
    return;
  }

  // Restart cycle and ensure CTA is visible on return.
  startHeroCycle();
  const btn = document.getElementById("fade");
  if (btn) btn.style.opacity = "1";
});
