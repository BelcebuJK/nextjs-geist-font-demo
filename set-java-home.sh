#!/bin/bash
# Script para configurar JAVA_HOME en macOS/Linux

# Detectar ruta de Java
JAVA_HOME_PATH=$(/usr/libexec/java_home)

# Agregar a .bashrc o .zshrc
if [ -f ~/.bashrc ]; then
  echo "export JAVA_HOME=$JAVA_HOME_PATH" >> ~/.bashrc
  echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> ~/.bashrc
elif [ -f ~/.zshrc ]; then
  echo "export JAVA_HOME=$JAVA_HOME_PATH" >> ~/.zshrc
  echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> ~/.zshrc
fi

echo "JAVA_HOME configurado en $JAVA_HOME_PATH"
echo "Por favor, ejecuta 'source ~/.bashrc' o 'source ~/.zshrc' para aplicar los cambios."
