# Pokerogue-Standalone

**This is a simple electron app that runs [Pokérogue](https://pokerogue.net/) on fullscreen by default.**

![image](https://github.com/Odizinne/Pokerogue-Standalone/assets/102679854/b3858bbd-aac1-4b2d-af00-44eebb035311)


I made this app with couch gaming / Steam Deck in mind.

If you want a more featured app, please have a look at [Pokerogue-App](https://github.com/Admiral-Billy/Pokerogue-App) made by [Admiral-Billy](https://github.com/Admiral-Billy)

## Download and installation

| Platform | Arch | Link |
| --- | --- | --- |
| Windows Installer | x64 | [Download](https://github.com/Odizinne/Pokerogue-Standalone/releases/download/1.8.0/Pokerogue-Installer.exe) |
| Windows Portable | x64 | [Download](https://github.com/Odizinne/Pokerogue-Standalone/releases/download/1.8.0/Pokerogue-Win.zip) |
| Linux DEB | x64 | [Download](https://github.com/Odizinne/Pokerogue-Standalone/releases/download/1.8.0/Pokerogue.deb) |
| Linux RPM | x64 | [Download](https://github.com/Odizinne/Pokerogue-Standalone/releases/download/1.8.0/Pokerogue.rpm) |
| Linux Portable | x64 | [Download](https://github.com/Odizinne/Pokerogue-Standalone/releases/download/1.8.0/Pokerogue-Linux.zip) |

### Windows
Use the prebuilt installer or manually extract the zip file.

### Linux
Use the provided DEB / RPM installers or:
- Download and extract the zip file.
- Open a terminal in the extracted folder.
- Allow `install.sh` to be executed as a program: `chmod +x ./install.sh`
- Run the installer: `./install.sh`

**Steam Deck with gamescope**: 
- Add `Pokerogue` as a non steam game.
- Add `--no-sandbox` as launch argument.
- (Optional) Select 1280x720 in game properties to center the window and toggle for any internal/external screen.

Changelog and all versions [here]([https://github.com/Odizinne/Pokerogue-Standalone/releases/latest](https://github.com/Odizinne/Pokerogue-Standalone/releases)).

## Usage

- `--no-fullscreen`: Disable fullscreen
- `--default-cursor`: Use system cursor instead of custom one and disable hiding on idle
- `--disable-css`: Use default background color instead of black
- F5: Restart
- F11: Toggle fullscreen

## Build

- Install [NodeJS](https://nodejs.org/en/download/package-manager)
- Clone this repository
- In the folder, setup electron and electron-builder: `npm install electron electron-builder --save-dev`
- Run with `npm run start` or build with `npm run build`
- Run the binaries produced in `dist` folder
