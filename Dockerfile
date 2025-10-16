# Gunakan image node resmi sebagai base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Build Next.js untuk production
RUN npm run build

# Jalankan aplikasi Next.js
CMD ["npm", "start"]