# Use uma imagem Node.js
FROM node:20.10.0
# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/

# Copie o arquivo package.json e o arquivo package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação vai utilizar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:docker"]
