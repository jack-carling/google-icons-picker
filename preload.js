const fs = require('fs');
const path = require('path');
const icons = [];

window.addEventListener('DOMContentLoaded', () => {
  const directory = path.join(__dirname, 'assets');

  fs.readdir(directory, (error, folder) => {
    if (error) return console.error(error);
    searchImages(directory, folder);
  });

  setTimeout(() => {
    renderIcons(icons);
  }, 1000);

  const input = document.getElementById('input');
  const searchButton = document.getElementById('search-button');
  const settingsButton = document.getElementById('settings-button');

  input.addEventListener('keyup', (e) => {
    if (e.code !== 'Enter') return;
    handleSearch(input.value);
    input.value = '';
  });

  searchButton.addEventListener('click', () => {
    handleSearch(input.value);
    input.value = '';
  });

  settingsButton.addEventListener('click', () => {
    showSettings();
  });
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
    name = name.replace('baseline_', '');
    name = name.trim();
    icons.push({ url: fileLocation, name });
  });
}

function renderIcons(icons) {
  const text = document.getElementById('info-text');
  const section = document.getElementById('icons');
  section.innerHTML = '';
  text.innerText = `${icons.length} icons found`;
  icons.forEach((icon) => {
    const node = document.createElement('div');
    node.setAttribute('data-name', icon.name);
    const img = document.createElement('img');
    img.src = icon.url;
    node.appendChild(img);
    section.appendChild(node);
    node.addEventListener('click', (e) => {
      const icon = e.currentTarget.getAttribute('data-name');
      const copy = `<i class="material-icons">${icon}</i>`;
      const proc = require('child_process').spawn('pbcopy');
      proc.stdin.write(copy);
      proc.stdin.end();
      renderBanner();
    });
  });
}

function handleSearch(input) {
  showSearch();
  const search = [];
  icons.forEach((icon) => {
    if (icon.name.includes(input)) {
      search.push(icon);
    }
  });
  renderIcons(search);
}

function renderBanner() {
  const banner = document.getElementById('banner');
  banner.classList.remove('fade');
  void banner.offsetWidth; // Required to restart a CSS animation
  banner.classList.add('fade');
}

function showSettings() {
  const text = document.getElementById('info-text');
  text.innerText = 'Settings';
  const iconsSection = document.getElementById('icons');
  const settingsSection = document.getElementById('settings');
  settingsSection.classList.remove('hide');
  iconsSection.classList.add('hide');
}

function showSearch() {
  const iconsSection = document.getElementById('icons');
  const settingsSection = document.getElementById('settings');
  settingsSection.classList.add('hide');
  iconsSection.classList.remove('hide');
}
