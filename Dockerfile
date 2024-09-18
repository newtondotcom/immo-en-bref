# Stage 1: Build the application
FROM node:lts AS builder

# Set the working directory
WORKDIR /app

# Copy all files to the working directory
COPY . .

# Install dependencies
RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive

# Build the application
RUN yarn build

# Stage 2: Run the application
FROM node:lts

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/.output .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server/index.mjs"]