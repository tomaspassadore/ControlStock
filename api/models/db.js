const { MongoClient } = require('mongodb')
const log = require('../lib/log')

const Connection = {
  open: async (url, db) => {
    if (!Connection.db) {
      const client = new MongoClient(url, Connection.options)
      await client.connect()
      Connection.db = client.db(db)
      log.info('Database', 'MongoDB connected to %s', db)
    }
  },
  options: {
    maxPoolSize: 100,
    minPoolSize: 3,
    maxIdleTimeMS: 2000
  },
  db: null
}

module.exports = { Connection }