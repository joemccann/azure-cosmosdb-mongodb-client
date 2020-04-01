const MongoClient = require('mongodb').MongoClient

module.exports = async ({
  database = '',
  connectionString = '',
  collection = '',
  filter = null,
  update = null,
  options = {}
}) => {
  if (!database) return { err: new Error('Missing `database` parameter.') }

  if (!connectionString) {
    return { err: new Error('Missing `connectionString` parameter.') }
  }

  if (!collection) return { err: new Error('Missing `collection` parameter.') }

  if (!filter) return { err: new Error('Missing `filter` parameter.') }

  if (!update) return { err: new Error('Missing `update` parameter.') }

  let client = null

  try {
    const MC = new MongoClient(connectionString, { useUnifiedTopology: true })

    client = await MC.connect()

    const db = client.db(database)

    const { databaseName } = db

    if (!databaseName) {
      const msg = [
        'No database name was returned from MongDB when',
        'attempting to find and update a document.'
      ].join(' ')

      return { err: new Error(msg) }
    }

    const data = await db.collection(collection).findOneAndUpdate(
      filter,
      update,
      options
    )

    if (client) {
      client.close()
    }

    return { data }
  } catch (err) {
    return { err }
  }
}
