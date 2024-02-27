# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app


# Install any dependencies your application might have
# (assuming there are dependencies specified in package.json)
COPY package*.json ./
RUN npm install

# Expose the port your app runs on
EXPOSE 3002

# Define the command to run your app
CMD ["node", "index.js"]
