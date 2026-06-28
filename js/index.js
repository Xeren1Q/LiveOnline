const video = document.getElementById('video');
    const playPause = document.getElementById('playPause');
    const progress = document.getElementById('progress');
    const time = document.getElementById('time');
    const volume = document.getElementById('volume');
    const fullscreenBtn = document.getElementById('fullscreen');
    const upload = document.getElementById('upload');
    const playlistEl = document.getElementById('playlist');
    const dropzone = document.getElementById('dropzone');
    const speed = document.getElementById('speed');
    const videoURL = document.getElementById('videoURL');
    const addURL = document.getElementById('addURL');

    let playlist = [
      
    ];

    function loadVideo(index) {
      video.src = playlist[index].src;
      video.play();
      playPause.textContent = 'Pause';
    }

    function renderPlaylist() {
      playlistEl.innerHTML = '';
      playlist.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'flex gap-2 items-center bg-gray-800 p-2 rounded cursor-pointer hover:bg-gray-700';

        li.innerHTML = `
          <div class="w-20 h-12 bg-black"></div>
          <div class="text-sm truncate">${item.name}</div>
        `;

        li.onclick = () => loadVideo(index);
        playlistEl.appendChild(li);
      });
    }

    playPause.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPause.textContent = 'Pause';
      } else {
        video.pause();
        playPause.textContent = 'Play';
      }
    });

    video.addEventListener('timeupdate', () => {
      const value = (100 / video.duration) * video.currentTime;
      progress.value = value;

      const currentMinutes = Math.floor(video.currentTime / 60);
      const currentSeconds = Math.floor(video.currentTime % 60).toString().padStart(2, '0');

      const durationMinutes = Math.floor(video.duration / 60);
      const durationSeconds = Math.floor(video.duration % 60).toString().padStart(2, '0');

      time.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
    });

    progress.addEventListener('input', () => {
      video.currentTime = video.duration * (progress.value / 100);
    });

    volume.addEventListener('input', () => {
      video.volume = volume.value;
    });

    speed.addEventListener('change', () => {
      video.playbackRate = speed.value;
    });

    fullscreenBtn.addEventListener('click', () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    });

    dropzone.addEventListener('click', () => upload.click());

    upload.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('border-red-500');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('border-red-500');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('border-red-500');
      handleFiles(e.dataTransfer.files);
    });

    function handleFiles(files) {
      const file = files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        playlist.push({ name: file.name, src: url });
        renderPlaylist();
      }
    }

    // Add video from URL
    addURL.addEventListener('click', () => {
      const url = videoURL.value.trim();
      if (!url) return;

      const name = url.split('/').pop();
      playlist.push({ name, src: url });
      renderPlaylist();
      videoURL.value = '';
    });

    video.addEventListener('ended', () => {
      playPause.textContent = 'Play';
    });

    renderPlaylist();
    loadVideo(0);