const faker = require('faker')

/**
 * Returns a list of messages with an author and the content of the message
 * @param {Integer} nbrOfMessages Number of messages to be generated
 * @returns {Array.<Object>}
 */
const generateFakeMessages = nbrOfMessages =>
  Array.from({ length: nbrOfMessages }, () => ({
    uuid: faker.random.uuid(),
    author: faker.name.findName(),
    content: faker.hacker.phrase(),
    avatar: faker.image.avatar(),
    isPrivate: false,
  }))

module.exports = generateFakeMessages
