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

```

## Tests

> Note: you will need a `.env` file to run the tests and the tests will read
and write to your Azure Storage account.

```sh
npm i -D
npm test
```

## License

MIT
