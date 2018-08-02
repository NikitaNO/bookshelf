module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BookCategory', [
      { category: 'Health' },
      { category: 'Food' },
      { category: 'History' },
      { category: 'Economy' },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BookCategory', null, {})
  }
};
