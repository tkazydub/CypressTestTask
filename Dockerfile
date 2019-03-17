FROM cypress/browsers:chrome69

COPY package.json .
RUN npm install

COPY cypress cypress
COPY cypress.json .

RUN $(npm bin)/cypress run --config baseUrl=http://localhost:3000,integrationFolder=cypress/integration/
