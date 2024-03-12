FROM node:20-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD sh -c "\
if [ -z \"$NEXT_PUBLIC_MONGODB_URI\" ] || \
   [ -z \"$NEXT_PUBLIC_JWT_TOKEN\" ] || \
   [ -z \"$NEXT_PUBLIC_EMAIL\" ] || \
   [-z \"$NEXT_PUBLIC_ANIME_API_URL"] || \
   [ -z \"$NEXT_PUBLIC_EMAIL_PASSWORD\" ]; then \
  echo \"Error: Required environment variables not set.\"; \
  echo \"Please provide values for NEXT_PUBLIC_MONGODB_URI,NEXT_PUBLIC_ANIME_API_URL,NEXT_PUBLIC_JWT_TOKEN, NEXT_PUBLIC_EMAIL, and NEXT_PUBLIC_EMAIL_PASSWORD.\"; \
  exit 1; \
fi; \
 npm run dev"