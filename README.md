# Pokerogue-Standalone
**This is a simple electron app that runs Pokerogue on fullscreen by default.**

![image](https://github.com/Odizinne/Pokerogue-Standalone/assets/102679854/b3858bbd-aac1-4b2d-af00-44eebb035311)


I made this with couch gaming / Steam Deck in mind.

If you want a more featured app, please have a look at [Pokerogue-App](https://github.com/Admiral-Billy/Pokerogue-App) made by [Admiral-Billy](https://github.com/Admiral-Billy)

## Download and installation

Get latest version [here](https://github.com/Odizinne/Pokerogue-Standalone/releases/latest).

You can use an almost automated installer for windows, or extract the zip and run `Pokerogue.exe`.

**Steam Deck with gamescope**: add `--no-sandbox` as launch argument.

Toggle fullscreen with F11.

## Build

- Install [NodeJS](https://nodejs.org/en/download/package-manager)
- Clone this repository
- In the folder, setup electron and electron-builder: `npm install electron electron-builder --save-dev`
- Run with `npm run start` or build with `npm run build`
- Run the binaries produced in `dist` folder

**Steam Deck with gamescope**: add `--no-sandbox` as launch argument.
