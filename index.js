const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');

// Set default download folder
const DOWNLOAD_DIR = path.join(__dirname, 'downloads');

// Create download directory if not exists
if (!fs.existsSync(DOWNLOAD_DIR)){
    fs.mkdirSync(DOWNLOAD_DIR);
}

const download = (url, filename) => {
 return new Promise((resolve, reject) => {
    const videoName = filename ? filename : path.basename(url);
    const videoPath = path.join(DOWNLOAD_DIR, videoName);
    const stream = ytdl(url); // Remove quality option to download all formats

    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('end', () => {
      resolve(videoPath);
    });

    stream.pipe(fs.createWriteStream(videoPath));
 });
};

// Call download function with video URL and optional filename
download('https://www.youtube.com/watch?v=We4QQCMwyrg', "8alan.mp4")
 .then((videoPath) => {
    console.log(`Video downloaded and saved as ${videoPath}`);
 })
 .catch((err) => {
    console.error('Failed to download video:', err);
 });