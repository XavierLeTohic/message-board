# Message board

The goal of this project is to make an app that display a list of messages and allow the user to add a message to the list that can be public or private.

<img src="https://user-images.githubusercontent.com/6340490/60791968-0e962300-a165-11e9-8cf7-a2ee190fed9e.gif" width="auto" height="400">

## Important to know

This project is:

- Made using Next.js, Stylus and Mobx.
- Unitary tested using Jest.
- Functionally tested using Cypress.
- Fully documented using JSDoc.
- Formatted using Prettier.

## Front-end

1. This project uses Next.js which means that react is rendered on the server-side and on the client-side.
2. The board allow multiple users to join and add messages.
3. The user can add private messages only visible to himself.
4. The board is refreshed every second with a simple interval that could be improved using web socket or HTTP2 push API.

## Back-end

1. A custom express server is used (see `server.js` at the root of the project)
2. 20 fake messages and authors are generated when the server is launched using Faker.
3. There is 5 custom routes on `server.js` that could be documented and we could validate the payload of each request using Joi.

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

# End to End tests

To run the functional tests you must first build and start the server first:

```bash
npm run build && npm run start
```

Then run cypress on another terminal:

```bash
npm run cypress:open
```

Click on `Run all specs`
