# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente de la aplicación al contenedor
COPY . .

# Compila la aplicación React
RUN npm run build

# Expone el puerto 3000 en el contenedor
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
