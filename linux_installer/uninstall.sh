#!/bin/bash

INSTALL_DIR="$HOME/.local/bin/Pokerogue"
DESKTOP_FILE="$HOME/.local/share/applications/pokerogue.desktop"

echo "Uninstalling Pokerogue..."

rm -rf "$INSTALL_DIR"
rm "$DESKTOP_FILE"

echo "Pokerogue has been uninstalled successfully."
