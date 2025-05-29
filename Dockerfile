# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript source
RUN npm run build

# Set environment variables if needed
# ENV NODE_ENV=production

# Expose the port the app runs on (change if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
