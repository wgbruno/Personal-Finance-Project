# Use Node LTS
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies safely and ignore optional Rollup binaries
RUN npm install --legacy-peer-deps

# Copy frontend source code
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start frontend on all interfaces (required for Docker port mapping)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
