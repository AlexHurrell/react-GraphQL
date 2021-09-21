import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import casual from "casual-browserify";

import { SchemaLink } from "@apollo/client/link/schema";
import { App } from "./App";

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
  title: String
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
    title: () => casual.title,
  }),
};

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
