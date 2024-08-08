FROM --platform=linux/amd64 node:20.15.1-alpine
LABEL org.opencontainers.image.source=https://github.com/sduzair/Driving-Test-Center-Application-Project
LABEL org.opencontainers.image.description="Node server container image"
LABEL org.opencontainers.image.licenses=MIT
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
