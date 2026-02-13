/**
 * =========================================================
 * AJIRO — Script (simplified for MP4 background loop)
 *
 * Responsibilities:
 * 1) Play the background MP4 video in a loop.
 * 2) Run the typewriter headline cycle.
 * 3) Fade in the CTA button.
 *
 * Notes:
 * - Assumes <video id="video"> exists on the home page.
 * - Uses a plain MP4 source: main_video/video.MP4
 * - Autoplay requirements: muted + playsInline.
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initVideo();
  startHeroCycle();
  initCTA();
});

/* =========================
   VIDEO (MP4 LOOP)
   ========================= */

function initVideo() {
  const video = document.getElementById("video");
  if (!video) return;

  // Your new simple file:
  video.src = "main_video/video_comp.MP4";

  // Ensure background-video autoplay works across browsers/iOS
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true; // iOS Safari
  video.setAttribute("playsinline", "");
  video.setAttribute("muted", "");
  video.setAttribute("loop", "");

  // Try to start playback (will fail silently if user gesture required)
  const tryPlay = () => video.play().catch(() => {});
  video.addEventListener("canplay", tryPlay, { once: true });
  tryPlay();
}

/* =========================
   TYPEWRITER
   ========================= */

let typingTimeoutId = null;
let scheduledTimeouts = [];

function clearAllTimers() {
  scheduledTimeouts.forEach(clearTimeout);
  scheduledTimeouts = [];
  if (typingTimeoutId) clearTimeout(typingTimeoutId);
}

function typeWriter(text, speed = 38) {
  const el = document.getElementById("type");
  if (!el) return;

  el.textContent = "";
  let i = 0;

  const step = () => {
    el.textContent += text.charAt(i++);
    if (i < text.length) typingTimeoutId = setTimeout(step, speed);
  };

  step();
}

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
    clearAllTimers();
    return;
  }

  startHeroCycle();

  // Kick the video again when returning to the tab
  const video = document.getElementById("video");
  if (video) video.play().catch(() => {});

  const btn = document.getElementById("fade");
  if (btn) btn.style.opacity = "1";
});