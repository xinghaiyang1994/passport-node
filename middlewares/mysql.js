const config = require('../config/default')

const knex = require('knex')({
  client: 'mysql',
  debug: config.mysqlDebug,
  connection: config.mysql,
  pool: { min: 10, max: 30 }
})

const db = require('bookshelf')(knex)

db.plugin(['pagination', 'virtuals', 'visibility', 'bookshelf-camelcase'])

module.exports = db