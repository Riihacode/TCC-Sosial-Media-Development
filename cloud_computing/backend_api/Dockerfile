FROM node:20-alpine
WORKDIR /app
# COPY package.json .
COPY . .
RUN npm install
EXPOSE 3000
# EXPOSE 5000
# EXPOSE 8080
CMD ["node", "index.js"]