import { ApolloServer, gql } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Card {
    id: Int!
    name: String!
    email: String!
    phone: String!
    biography: String!
    cardId: String!
    twitter: String!
    github: String!
    website: String!
  }
  input CardInput {
    name: String!
    email: String!
    phone: String!
    biography: String!
    cardId: String!
    twitter: String!
    github: String!
    website: String!
  }

  type Query {
    getCards: [Card]
    getCard(id: String!): Card
  }

  type Mutation {
    addCard(input: CardInput!): Card
  }
`;

const resolvers = {
  Query: {
    getCards: async () => {
      return prisma.card.findMany({
        take: 10,
      });
    },
    getCard: async (_, args) => {
      return prisma.card.findUnique({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = apolloServer.createHandler({
  path: "/api/graphql",
});

export default handler;
