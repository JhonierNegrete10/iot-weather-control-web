# Usar una imagen base con Node.js
# FROM node:latest

#BUN
FROM oven/bun:latest
RUN apt-get update 
RUN apt-get install -y net-tools iputils-ping curl git

WORKDIR /app


# Copiar el resto de los archivos de la aplicación
# COPY ./app/. .

# # Instalar las dependencias
# RUN bun install


# # Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 5173
EXPOSE 5174
EXPOSE 3000
EXPOSE 4173
EXPOSE 80


# Comando
#ENTRYPOINT ["bun", "run", "dev"]
ENTRYPOINT ["/bin/sh", "-c", "./scripts/check_node_modules.sh"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]
# ENTRYPOINT ["bun", "vite", "preview", "--host", "0.0.0.0", "--port", "80"]
# ENTRYPOINT ["bun","install;","bun","run", "bunx", "--bun", "vite", "--host", "0.0.0.0"]
