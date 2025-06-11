FROM node:18

WORKDIR /usr/src/app

# 1. Copia e instala dependências
COPY package*.json ./
RUN npm install

# 2. Copia fontes e proto
COPY src/ ./src
COPY protos/ ./src/protos

# 3. Se já tiver o ABI (gera em smart-contract), copie também:
# COPY ../smart-contract/artifacts/contracts/Vaccine.sol/Vaccines.json ./src/contractABI.json

EXPOSE 50051
CMD ["npm", "start"]
