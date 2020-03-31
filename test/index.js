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

const {
  insertOne,
  deleteOne,
  insertMany,
  deleteMany
} = require('..').documents

const database = 'test-db-1'
const connectionString = process.env.PRIMARY_CONNECTION_STRING
const collection = 'test-collection-1'

const document = { foo: 'bar0', id: 100, things: [1, 2, 3, 4] }

const documents = [
  { foo: 'bar1', id: 102, things: [1, 2, 3, 4] },
  { foo: 'bar2', id: 103, things: [1, 2, 3, 4] },
  { foo: 'bar3', id: 104, things: [1, 2, 3, 4] }
]

test('sanity', t => {
  t.ok(true)
  t.end()
})

test('pass - create db', async t => {
  const { err, data } = await createDB({ database, connectionString })
  t.ok(!err)
  t.ok(data)
  t.equals(data, database)
  t.end()
})

test('pass - create collection', async t => {
  const { err, data } = await createCollection({
    database,
    connectionString,
    collection
  })
  t.ok(!err)
  t.ok(data)
  t.equals(data.s.namespace.db, database)
  t.equals(data.s.namespace.collection, collection)
  t.end()
})

test('pass - insertOne document into a collection', async t => {
  const copyDoc = Object.assign({}, document)

  const { err, data } = await insertOne({
    database,
    connectionString,
    collection,
    document
  })

  const { result = {} } = data

  const { n, ok } = result

  const pop = data.ops.pop()

  const { _id, ...noId } = pop

  t.ok(!err)
  t.ok(data)
  t.equals(n, 1)
  t.equals(ok, 1)
  t.deepEquals(copyDoc, noId)
  t.equals(data.insertedCount, 1)
  t.end()
})

test('pass - removeOne document from a collection', async t => {
  const { err, data } = await deleteOne({
    database,
    connectionString,
    collection,
    query: { foo: { $eq: 'bar' } }
  })
  const { result = {} } = data
  const { n, ok } = result
  t.equals(n, 0)
  t.equals(ok, 1)
  t.ok(!err)
  t.ok(data)
  t.end()
})

test('pass - insertMany documents into a collection', async t => {
  //
  // Create immutable copy
  //
  const docs = documents.map(item => ({ ...item }))

  const { err, data } = await insertMany({
    database,
    connectionString,
    collection,
    documents
  })

  const { result = {}, ops = [], insertedCount = 0 } = data

  const { n, ok } = result

  const pop = ops[0]

  const { _id, ...noId } = pop

  t.ok(!err)
  t.ok(data)
  t.equals(n, 3)
  t.equals(ok, 1)
  t.deepEquals(docs[0], noId)
  t.equals(insertedCount, 3)
  t.end()
})

test('pass - removeMany documents from a collection', async t => {
  const { err, data } = await deleteMany({
    database,
    connectionString,
    collection,
    query: { foo: { $gt: 101 } }
  })

  const { result = {} } = data
  const { n, ok } = result
  t.equals(n, 0)
  t.equals(ok, 1)
  t.ok(!err)
  t.ok(data)
  t.end()
})

//
// Run these last or create a cleanup function
//
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

test('pass - drop db', async t => {
  const { err, data } = await dropDB({ database, connectionString })
  t.ok(!err)
  t.ok(data)
  t.end()
})
