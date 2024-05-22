#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALL_DIR="$HOME/.local/bin/Pokerogue"

mkdir -p "$INSTALL_DIR"

echo "Installing files in $INSTALL_DIR..."
cp -r "$SCRIPT_DIR"/* "$INSTALL_DIR"

DESKTOP_FILE="$HOME/.local/share/applications/pokerogue.desktop"

cat > "$DESKTOP_FILE" <<EOL
[Desktop Entry]
Type=Application
Name=Pokerogue
Icon=$HOME/.local/bin/Pokerogue/PR.png
Exec=$HOME/.local/bin/Pokerogue/pokerogue
Comment=Pokerogue desktop application
Categories=Game;
Terminal=false
EOL

echo "Pokerogue has been installed successfully."
echo "You can find it in your application menu."

