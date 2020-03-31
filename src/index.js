module.exports = {
  db: {
    create: require('./db/create'),
    drop: require('./db/drop')
  },
  collections: {
    create: require('./collections/create'),
    remove: require('./collections/remove')
  }
}
