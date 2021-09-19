import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { addMocksToSchema } from "@graphql-tools/mock";
import { graphql } from "graphql";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});

// const server = mockServer(schema, {
//   RootQuery: () => ({
//     user: (o, { id }) => ({ id }),
//   }),
//   List: () => ({
//     name: () => casual.word,
//     tasks: () => new MockList(4, (o, { completed }) => ({ completed })),
//   }),
//   Task: () => ({ text: casual.words(10) }),
//   User: () => ({ name: casual.name }),
// });

// const schema = `
//   type User {
//     id: ID!
//     name: String
//     lists: [List]
//   }
//   type List {
//     id: ID!
//     name: String
//     owner: User
//     incomplete_count: Int
//     tasks(completed: Boolean): [Task]
//   }
//   type Task {
//     id: ID!
//     text: String
//     completed: Boolean
//     list: List
//   }
//   type RootQuery {
//     user(id: ID): User
//   }
//   schema {
//     query: RootQuery
//   }
// `;

const schemaString = `...`;

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Create a new schema with mocks
const schemaWithMocks = addMocksToSchema({ schema });

const query = /* GraphQL */ `
  query tasksForUser {
    user(id: 6) {
      id
      name
    }
  }
`;

graphql(schemaWithMocks, query).then((result) =>
  console.log("Got result", result)
);

function ExchangeRates() {
  const { loading, error, data } = useQuery(gql`
    {
      rates(currency: "USD") {
        currency
        rate
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ol>
      {data.rates.map(({ currency, rate }) => (
        <li key={currency}>
          <p>
            {currency}: {rate}
          </p>
        </li>
      ))}
      ;
    </ol>
  );
}

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <ExchangeRates />
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
