require('dotenv').config()
const test = require('tape')

const {
  create: createDB,
  drop: dropDB
} = require('..').db

const {
  create: createCollection,
  remove: removeCollection
} = require('..').collections

const database = 'test-db-1'
const connectionString = process.env.PRIMARY_CONNECTION_STRING
const collection = 'test-collection-1'

test('sanity', t => {
  t.ok(true)
  t.end()
})

test('pass - create db', async t => {
  const { err, data } = await createDB({ database, connectionString })
  t.equals(data, database)
  t.end()
})

test('pass - create collection', async t => {
  const { err, data } = await createCollection({
    database,
    connectionString,
    collection
  })
  t.equals(data.s.namespace.db, database)
  t.equals(data.s.namespace.collection, collection)
  t.end()
})

test('pass - remove collection', async t => {
  const { err, data } = await removeCollection({
    database,
    connectionString,
    collection
  })
  t.ok(!err)
  t.ok(data)
  t.end()
})

//
// Run this last or create a cleanup function
//
test('pass - drop db', async t => {
  const { err, data } = await dropDB({ database, connectionString })
  t.ok(!err)
  t.ok(data)
  t.end()
})
