# Pokerogue-Standalone

**This is a simple electron app that runs Pokerogue on fullscreen by default.**

![image](https://github.com/Odizinne/Pokerogue-Standalone/assets/102679854/b3858bbd-aac1-4b2d-af00-44eebb035311)


I made this app with couch gaming / Steam Deck in mind.

If you want a more featured app, please have a look at [Pokerogue-App](https://github.com/Admiral-Billy/Pokerogue-App) made by [Admiral-Billy](https://github.com/Admiral-Billy)

## Download

| Platform | Arch | Link |
| --- | --- | --- |
| Windows Installer | x64 | [Download](https://github.com/Odizinne/Pokerogue-Standalone/releases/download/1.6.0/Pokerogue-Installer.exe)
| Windows Portable | x64 | [Download](https://github.com/Odizinne/Pokerogue-Standalone/releases/download/1.6.0/Pokerogue-Win.zip)
| Linux Portable | x64 | [Download](https://github.com/Odizinne/Pokerogue-Standalone/releases/download/1.6.0/Pokerogue-Linux.zip)

Changelog and all versions [here]([https://github.com/Odizinne/Pokerogue-Standalone/releases/latest](https://github.com/Odizinne/Pokerogue-Standalone/releases)).

## Usage

- `--no-fullscreen`: Disable fullscreen
- `--no-hide-cursor`: Disable cursor hiding on idle

**Steam Deck with gamescope**: 
- Add `Pokerogue` as a non steam game.
- Add `--no-sandbox` as launch argument.
- (Optional) Select 1280x720 in game properties to center the window and toggle for any internal/external screen.

## Build

- Install [NodeJS](https://nodejs.org/en/download/package-manager)
- Clone this repository
- In the folder, setup electron and electron-builder: `npm install electron electron-builder --save-dev`
- Run with `npm run start` or build with `npm run build`
- Run the binaries produced in `dist` folder
