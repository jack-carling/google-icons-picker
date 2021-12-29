const fs = require('fs');
const path = require('path');
const images = [];

window.addEventListener('DOMContentLoaded', () => {
  const directory = path.join(__dirname, 'assets');

  fs.readdir(directory, (error, folder) => {
    if (error) return console.error(error);
    searchImages(directory, folder);
  });

  setTimeout(() => {
    images.forEach((image) => {
      const node = document.createElement('img');
      node.src = image.url;
      const text = document.createElement('span');
      text.innerText = image.name;
      document.getElementById('icons').appendChild(node);
      document.getElementById('icons').appendChild(text);
    });
  }, 1000);
});

function searchImages(directory, folder) {
  folder.forEach((file) => {
    const location = path.join(directory, file);
    fs.stat(location, (error, stat) => {
      if (error) return console.error(error);
      const basename = path.basename(location);
      if (basename === 'materialicons') return getImage(location);
      if (
        basename === 'materialiconsoutlined' ||
        basename === 'materialiconsround' ||
        basename === 'materialiconssharp' ||
        basename === 'materialiconstwotone'
      )
        return;
      if (stat.isDirectory()) {
        fs.readdir(location, (error, folder) => {
          if (error) return console.error(error);
          searchImages(location, folder);
        });
      }
    });
  });
}

function getImage(location) {
  const imageLocation = path.join(location, '48dp', '2x');
  fs.readdir(imageLocation, (error, file) => {
    if (error) return console.error(error);
    const fileLocation = path.join(imageLocation, file[0]);
    let name = file[0].replace('_black_48dp.png', '');
    name = name.replace('baseline', '');
    name = name.replaceAll('_', ' ');
    name = name.trim();
    images.push({ url: fileLocation, name });
  });
}
