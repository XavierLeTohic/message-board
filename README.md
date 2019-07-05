# Message board

The goal of this exercise is to make an app that display a list of messages and allow the user to add a message to the list that can be public or private.

## Important to know
This project is:
- Made using Next.js, Stylus and Mobx.
- Unitary tested using Jest.
- Functionally tested using Cypress.
- Fully documented using JSDoc.
- Formatted using Prettier.

# Installation

Clone this repository
```bash
git clone https://github.com/XavierLeTohic/message-board
```
Install dependencies via NPM
```bash
npm install
```
Install dependencies via Yarn
```bash
yarn
```

# Development

To run the app type
```bash
npm run dev
```

Or using Yarn
```
yarn dev
```

# Production

The following command will build the application for production use and run the tests to ensure it is deliverable.
```bash
npm run build-test
```

or using Yarn
```bash
yarn build-test
```

Run in production
```bash
npm run start
```

or using Yarn
```bash
yarn start
```

# Functional tests
To run the functional tests you must build and start the server first:
```bash
npm run build && npm run start
```

Then run cypress:
```bash
npm run cypress:open
```

You must click on "Run all tests" when cypress is open.