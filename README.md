# Azure CosmosDB Client

🪐 A super opinionated, async/await CosmosDB client using the MongoDB API.

## Usage

```sh
npm i -S joemccann/azure-cosmosdb-mongodb-client
```

Create a `.env` file in your app with the following parameters,
replacing `XXX` with the appropriate values:

```sh
HOST=XXX
MONGODB_PORT=XXX
USERNAME=XXX
PASSWORD=XXX
PRIMARY_CONNECTION_STRING=XXX
```

If you don't know where to obtain these values in Azure, look at
the [AZURE.md](/AZURE.md) document.

And be sure to include the `dotenv` configuration wherever
you are using this library in your Node app.

```js
require('dotenv').config()


const connectionString = process.env.PRIMARY_CONNECTION_STRING
const database = 'test-db-1'
const collection = 'test-collection-1'

const {
  create: createDB,
  drop: dropDB
} = require('azure-cosmosdb-mongodb-client').db

const {
  create: createCollection,
  remove: removeCollection
} = require('azure-cosmosdb-mongodb-client').collections

const {
  insertOne,
  deleteOne,
  insertMany,
  deleteMany
} = require('azure-cosmosdb-mongodb-client').documents

//
// Example usage
//

const connectionString = process.env.PRIMARY_CONNECTION_STRING
const database = 'test-db-1'
const collection = 'test-collection-1'

const document = { foo: 'bar0', id: 100, things: [1, 2, 3, 4] }
const documents = [
  { foo: 'bar1', id: 102, things: [1, 2, 3, 4] },
  { foo: 'bar2', id: 103, things: [1, 2, 3, 4] },
  { foo: 'bar3', id: 104, things: [1, 2, 3, 4] }
]

const { err, data } = await createDB({
  database,
  connectionString
})

const { err, data } = await createCollection({
  database,
  connectionString,
  collection
})

const { err, data } = await deleteOne({
  database,
  connectionString,
  collection,
  query: { foo: { $eq: 'bar' } }
})

const { err, data } = await insertMany({
  database,
  connectionString,
  collection,
  documents
})

const { err, data } = await deleteMany({
  database,
  connectionString,
  collection,
  query: { foo: { $gt: 101 } }
})

const { err, data } = await find({
  database,
  connectionString,
  collection,
  filter: { id: { $gt: 102 } }, // optional; {} returns all documents
  projection: { foo: 1, things: 1, _id: 0 } // optional
})

const { err, data } = await findOneAndUpdate({
  database,
  connectionString,
  collection,
  filter: document,
  update: { $set: { id: 99 } }
})

const { err, data } = await find({
  database,
  connectionString,
  collection,
  filter: { id: { $eq: 99 } },
  projection: { foo: 1, things: 1, _id: 0, id: 1 }
})


```

## Tests

> Note: you will need a `.env` file to run the tests and the tests will read
and write to your Azure CosmosDB instance.

```sh
npm i -D
npm test
```

## License

MIT
