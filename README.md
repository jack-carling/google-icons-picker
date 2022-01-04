# Google Icons Picker

A native macOS application that is easily accessible from the taskbar built using [Electron](https://www.electronjs.org/).

## How to install

Download the [latest version](https://github.com/jack-carling/google-icons-picker/releases/latest) from releases and unzip the file. Move the `.app` file to your applications folder and open it. The application will hide from the menu bar when it's opened and show up in the taskbar.

## Auto-Start

If you'd like the application to always remain in the taskbar it's suggested to add it to your login items so it'll start automatically after the computer has been shut off or restarted.

Go to System Preferences and Users & Groups. Select your user account and press the Login Items tab. Then add the application to the list and it will restart every time your computer does.

## Preview

![](https://user-images.githubusercontent.com/72305598/147985232-ef303d3e-d865-40a0-a5dc-eba675c6fc61.gif)

## Setup

```bash
# Install dependencies
$ npm install

# Run in development mode
$ npm start

# Build native .app
$ npm run make
```
