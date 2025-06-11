# smart-contract/Dockerfile
FROM node:18
WORKDIR /usr/src/app

# 1) Copiar package.json + lock e instalar
COPY package*.json ./
RUN npm install

# 2) Copiar tudo mais
COPY . .

# 3) Comando padrão: levanta o nó Hardhat
CMD ["npx", "hardhat", "node"]
