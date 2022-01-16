FROM node:16.13.2-alpine AS base
WORKDIR /app

FROM base AS root-deps
COPY package*.json ./
RUN npm i

FROM root-deps AS common
COPY packages/common/package*.json ./packages/common/
RUN cd packages/common &&  npm i --ignore-scripts
COPY packages/common ./packages/common/
RUN cd packages/common && npm run build

FROM common AS common-prod
RUN cd packages/common && npm prune --production


FROM common AS server-prod-deps
COPY packages/server/package*.json ./packages/server/
RUN cd packages/server && npm i --production

FROM server-prod-deps AS server-deps
RUN cd packages/server && npm i

FROM common AS frontend-deps
COPY packages/frontend/package*.json ./packages/frontend/
RUN cd packages/frontend &&  npm i 

FROM frontend-deps AS frontend
COPY packages/frontend ./packages/frontend/
RUN cd packages/frontend && REACT_APP_WEBSOCKET_ADDRESS=self npm run build

FROM server-deps AS server
COPY packages/server ./packages/server/
RUN cd packages/server && npm run build

FROM base AS prod
COPY --from=common-prod /app/packages/common /app/packages/common/
WORKDIR /app/packages/server
COPY packages/server/package* /app/packages/server/
COPY --from=server-prod-deps /app/packages/server/node_modules ./node_modules/
RUN mkdir node_modules/@banry && ln -s ../../../common node_modules/@banry/common
COPY --from=server /app/packages/server/build ./build/
COPY --from=frontend /app/packages/frontend/build ./public
ENV PUBLIC_DIR /app/packages/server/public
ENV PORT 3000
EXPOSE 3000
CMD npm run start:prod