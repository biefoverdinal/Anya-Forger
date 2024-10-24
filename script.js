window.onload = function () {
  const music = document.getElementById('background-music');
  const lyrics = document.querySelector('.lyrics');

  // Total durasi animasi lirik
  const totalLyricsDuration = 12 * 1000; // 12 detik total durasi semua lirik

  // Fungsi untuk memulai animasi lirik
  function startLyricsAnimation() {
    const spans = lyrics.querySelectorAll('span');
    spans.forEach((span, index) => {
      // Mengatur animasi untuk setiap span
      span.style.animation = `revealLine 4s ease-in-out forwards ${index * 2}s`;
    });
  }

  // Restart musik dan animasi saat musik selesai
  music.onended = function () {
    music.currentTime = 0; // Ulang musik dari awal
    music.play(); // Mainkan musik lagi
    resetLyrics(); // Reset lirik sebelum mulai ulang
    startLyricsAnimation(); // Memulai ulang animasi lirik
  };

  // Mengatur ulang opacity dan transform untuk semua span
  function resetLyrics() {
    const spans = lyrics.querySelectorAll('span');
    spans.forEach(span => {
      span.style.opacity = '0'; // Reset opacity
      span.style.transform = 'translateY(20px)'; // Reset transform
      span.style.animation = 'none'; // Hentikan animasi untuk reset
    });
    void lyrics.offsetWidth; // Trigger reflow untuk reset animasi
  }

  // Memulai animasi lirik pada awal
  startLyricsAnimation();

  // Atur timeout untuk mengulang lirik setelah durasi total
  setInterval(() => {
    resetLyrics(); // Mengembalikan lirik ke keadaan awal
    startLyricsAnimation(); // Mulai ulang animasi
  }, totalLyricsDuration); // Durasi total untuk setiap pengulangan

  // Tombol untuk memulai musik
  document.getElementById('play-music').onclick = function () {
    music.play().catch(error => {
      console.error("Error playing music: ", error);
    });
  };

};

// Fungsi untuk memutar musik dan menampilkan lirik
function startMusic() {
  const music = document.getElementById('linkmp3');
  music.play();
  document.querySelector('.overlay').style.display = 'block'; // Menampilkan overlay

  // Memulai animasi lirik
  startLyricsAnimation();

  // Mengatur musik untuk diulang setelah selesai
  music.onended = function () {
    music.currentTime = 0; // Mengatur ulang waktu musik
    music.play(); // Memainkan musik lagi
  };
}

function startLyricsAnimation() {
  const spans = document.querySelectorAll('.lyrics span');
  spans.forEach((span, index) => {
    span.style.animation = `revealLine 4s ease-in-out forwards ${index * 2}s`;
  });
}

// Memeriksa parameter URL untuk melihat apakah musik harus dimainkan
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('playMusic') === 'true') {
  startMusic();
}
