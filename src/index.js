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
    deleteOne: require('./documents/deleteOne'),
    deleteMany: require('./documents/deleteMany'),
    insertOne: require('./documents/insertOne'),
    insertMany: require('./documents/insertMany')
  }
}
