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
import casual from "casual-browserify";

import { SchemaLink } from "@apollo/client/link/schema";

const typeDefs = `
schema {
  query: Query
}

type Query {
  list:[Post!]
}

type Post {
  id: ID!
  author: String
  text: String
}
`;

const mocks = {
  Query: () => ({
    list: () => {
      return [...new Array(10)];
    },
  }),
  Post: () => ({
    author: () => casual.first_name,
    text: () => casual.sentence,
  }),
};

function ExchangeRates() {
  const { loading, error, data } = useQuery(gql`
    query mq {
      list {
        id
        author
        text
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ol>
      {data.list.map(({ author, text }) => (
        <li key={author}>
          <p>
            {author}: {text}
          </p>
        </li>
      ))}
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

const schema = makeExecutableSchema({ typeDefs });

const schemaWithMocks = addMocksToSchema({
  schema,
  mocks,
});

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema: schemaWithMocks }),
});

render(
  <ApolloProvider client={graphqlClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
