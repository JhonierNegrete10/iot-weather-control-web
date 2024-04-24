# Usar una imagen base con Node.js
# FROM node:latest

#BUN
FROM oven/bun:latest
WORKDIR /app



# Copiar el resto de los archivos de la aplicación
COPY ./app/. .

# # Instalar las dependencias
CMD [ "bun","install" ]


# # Exponer el puerto en el que se ejecutará la aplicación
# EXPOSE 5173
# EXPOSE 5174
# EXPOSE 3000
# EXPOSE 4173


# Comando
ENTRYPOINT ["tail", "-f", "/dev/null"]
# ENTRYPOINT ["bun","install;","bun","run", "bunx", "--bun", "vite", "--host", "0.0.0.0"]
