module.exports = {
  db: {
    create: require('./db/create'),
    drop: require('./db/drop')
  },
  collections: {
    create: require('./collections/create'),
    remove: require('./collections/remove')
  },
  documents: {
    insertOne: require('./documents/insertOne'),
    deleteOne: require('./documents/deleteOne'),
    find: require('./documents/find'),
    read: require('./documents/read')
  }
}
