# Usar una imagen base con Node.js
# FROM node:latest

#BUN
FROM oven/bun:latest
WORKDIR /app
RUN apt-get update --yes  \
&& apt-get install -y iputils-ping \
&& apt-get install -y net-tools\
#     # Common useful utilities
    curl \
git \
    nano-tiny \
    tzdata \
    unzip \
    vim-tiny \
    # git-over-ssh
    openssh-client \
    # less is needed to run help in R
    # see: https://github.com/jupyter/docker-stacks/issues/1588
    less \
    # nbconvert dependencies
    # https://nbconvert.readthedocs.io/en/latest/install.html#installing-tex
    texlive-xetex \
    texlive-fonts-recommended \
    texlive-plain-generic \
    # Enable clipboard on Linux host systems
    xclip \
&& apt-get clean && rm -rf /var/lib/apt/lists/*



# Copiar el resto de los archivos de la aplicación
COPY ./app .

# # Copiar el package.json y el package-lock.json para instalar las dependencias
# COPY ./app/package.json .
# COPY ./app/package-lock.json .

# # Instalar las dependencias
# RUN bun install
# # Construir la aplicación
# RUN bun update --force

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 5173
EXPOSE 3000

# Comando
ENTRYPOINT ["tail", "-f", "/dev/null"]
