const MongoClient = require('mongodb').MongoClient

module.exports = async ({
  database = '',
  connectionString = '',
  collection = '',
  filter = {},
  projection = null
}) => {
  if (!database) return { err: new Error('Missing `database` parameter.') }

  if (!connectionString) {
    return { err: new Error('Missing `connectionString` parameter.') }
  }

  if (!collection) return { err: new Error('Missing `collection` parameter.') }

  if (!filter) return { err: new Error('Missing `filter` parameter.') }

  let client = null

  try {
    const MC = new MongoClient(connectionString, { useUnifiedTopology: true })

    client = await MC.connect()

    const db = client.db(database)

    const { databaseName } = db

    if (!databaseName) {
      const msg = [
        'No database name was returned from MongDB when',
        'attempting to delete a document.'
      ].join(' ')

      return { err: new Error(msg) }
    }

    const data = []
    let document = null
    const cursor = await db.collection(collection).find(filter, { projection })

    while ((document = await cursor.next())) {
      data.push(document)
    }

    if (client) {
      client.close()
    }

    return { data }
  } catch (err) {
    return { err }
  }
}
