# Use Node 22 LTS
FROM node:22

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Start server
CMD ["npm", "run", "dev"]
