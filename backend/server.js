const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PubSub } = require('graphql-subscriptions');
const cors = require('cors');

// Define your typeDefs and resolvers
const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }

  type Query {
    messages: [Message!]
  }

  type Mutation {
    postMessage(user: String!, content: String!): ID!
  }

  type Subscription {
    messages: [Message!]
  }
`;

const messages = [];
const pubsub = new PubSub();

// Define resolvers for queries and mutations
const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (parent, { user, content }) => {
      const id = messages.length;
      const message = { id, user, content };
      messages.push(message);
      pubsub.publish("NEW_MESSAGE", { messages });
      return id; 
    },
  },
  Subscription: {
    messages: {
      subscribe: () => pubsub.asyncIterator("NEW_MESSAGE"),
    },
  },
};

// Use makeExecutableSchema to create a schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Define the context function to be used in Apollo Server
const context = ({ req }) => {
  return { pubsub };
};

// Create the Apollo Server
const server = new ApolloServer({
  schema,
  introspection: true,
  subscriptions: {
    path: '/subscriptions', 
  },
  context, 
});

// Use CORS middleware options
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

// Start the Apollo Server with the standalone server method
startStandaloneServer(server, {
  listen: { port: 4000 },
  cors: corsOptions, 
}).then(({ url }) => {
  console.log(`GraphQL Server running at ${url}`);
});
