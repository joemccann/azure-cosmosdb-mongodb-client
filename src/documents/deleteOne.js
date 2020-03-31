const MongoClient = require('mongodb').MongoClient

module.exports = async ({
  database = '',
  connectionString = '',
  collection = '',
  query = null
}) => {
  if (!database) return { err: new Error('Missing `database` parameter.') }

  if (!connectionString) {
    return { err: new Error('Missing `connectionString` parameter.') }
  }

  if (!collection) return { err: new Error('Missing `collection` parameter.') }

  if (!query) return { err: new Error('Missing `query` parameter.') }

  let client = null

  try {
    const MC = new MongoClient(connectionString, { useUnifiedTopology: true })

    client = await MC.connect()

    const db = client.db(database)

    const { databaseName } = db

    if (!databaseName) {
      const msg = [
        'No database name was returned from MongDB when',
        'attempting to create a new collection.'
      ].join(' ')

      return { err: new Error(msg) }
    }

    const data = await db.collection(collection).deleteOne(query)

    if (client) {
      client.close()
    }

    return { data }
  } catch (err) {
    return { err }
  }
}
