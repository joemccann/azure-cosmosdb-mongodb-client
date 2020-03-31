const MongoClient = require('mongodb').MongoClient

module.exports = async ({ database = '', connectionString = '' }) => {
  if (!database) return { err: new Error('Missing `database` parameter.') }

  if (!connectionString) {
    return { err: new Error('Missing `connectionString` parameter.') }
  }

  let client = null

  try {
    const MC = new MongoClient(connectionString, { useUnifiedTopology: true })

    client = await MC.connect()

    const db = client.db(database)

    const { databaseName } = db

    if (!databaseName) {
      const msg = [
        'No database name was returned from MongDB when',
        'attempting to drop the database instance.'
      ].join(' ')

      return { err: new Error(msg) }
    }

    const data = await db.dropDatabase()

    if (client) {
      client.close()
    }

    return { data }
  } catch (err) {
    return { err }
  }
}
