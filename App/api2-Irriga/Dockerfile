FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

FROM node:18
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["node", "app.js"]