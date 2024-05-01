#BUN
FROM oven/bun:latest
RUN apt-get update 
RUN apt-get install -y net-tools iputils-ping curl git

WORKDIR /app

# # Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 5173
EXPOSE 5174
EXPOSE 3000
EXPOSE 4173


# Comando
ENTRYPOINT ["/bin/sh", "-c", "./scripts/check_node_modules.sh"]
