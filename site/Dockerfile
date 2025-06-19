FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install react-google-recaptcha

RUN npm install node-fetch@2

COPY . .

ENV NEXT_DISABLE_ESLINT=true

RUN npm run build

RUN ls -la .next || echo "Le dossier .next n'a pas été créé"

EXPOSE 3000

CMD ["npm", "start"]
