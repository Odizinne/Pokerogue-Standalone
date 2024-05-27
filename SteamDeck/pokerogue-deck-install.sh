#!/bin/bash

if ! command -v zenity &> /dev/null
then
    echo "Zenity is not installed. Please install it and try again."
    exit 1
fi

TEMP_DIR=$(mktemp -d)

cleanup() {
    rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

POKEROGUE_DIR="$HOME/.local/bin/Pokerogue"
if [ -d "$POKEROGUE_DIR" ]; then
    CHOICE=$(zenity --list --title="Pokerogue Installer" --radiolist --column "Select" --column "Action" TRUE "Install/Update Pokerogue" FALSE "Uninstall Pokerogue" FALSE "Exit" --width=300 --height=203)
else
    CHOICE=$(zenity --list --title="Pokerogue Installer" --radiolist --column "Select" --column "Action" TRUE "Install/Update Pokerogue" FALSE "Exit" --width=300 --height=176)
fi

if [ $? -ne 0 ]; then
    exit 0
fi

if [ "$CHOICE" == "Install/Update Pokerogue" ]; then
    echo "Downloading the latest release of Pokerogue..."
    if curl -L -o "$TEMP_DIR/Pokerogue-Linux.zip" $(curl -s https://api.github.com/repos/Odizinne/Pokerogue-Standalone/releases/latest | grep "browser_download_url.*Pokerogue-Linux.zip" | cut -d '"' -f 4); then
        echo "Download completed successfully."
    else
        zenity --error --title="Error" --text="Failed to download the latest release. Please check your internet connection and try again." --width=300 --height=50
        exit 1
    fi

    echo "Extracting Pokerogue-Linux.zip..."
    unzip "$TEMP_DIR/Pokerogue-Linux.zip" -d "$TEMP_DIR"

    EXTRACTED_DIR=$(find "$TEMP_DIR" -maxdepth 1 -type d -not -name '.*' -not -name 'Pokerogue-Linux' -print -quit)

    cd "$EXTRACTED_DIR"

    echo "Making the install.sh script executable..."
    chmod +x install.sh

    echo "Running the install.sh script..."
    ./install.sh

    zenity --info --title="Installation Complete" --text="Pokerogue has been successfully installed/updated." --width=300 --height=50
elif [ "$CHOICE" == "Uninstall Pokerogue" ]; then
    UNINSTALL_SCRIPT="$POKEROGUE_DIR/uninstall.sh"
    if [ -f "$UNINSTALL_SCRIPT" ]; then
        echo "Making the uninstall.sh script executable..."
        chmod +x "$UNINSTALL_SCRIPT"
        echo "Running the uninstall.sh script..."
        "$UNINSTALL_SCRIPT"
        zenity --info --title="Uninstallation Complete" --text="Pokerogue has been successfully uninstalled." --width=300 --height=50
    else
        zenity --error --title="Error" --text="Uninstall script not found at $UNINSTALL_SCRIPT"
        exit 1
    fi
elif [ "$CHOICE" == "Exit" ]; then
    exit 0
else
    zenity --error --title="Error" --text="Invalid choice. Please try again."
    exit 1
fi

