import { ApolloServer, gql } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

interface Args {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  biography?: string;
  cardId?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

interface InputArgs {
  input: {
    name: string;
    email: string;
    phone: string;
    biography: string;
    twitter: string;
    github: string;
    website: string;
  };
}

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
    deleteCard(id: String!): Card
  }
`;

const resolvers = {
  Query: {
    getCards: async () => {
      return prisma.card.findMany({
        take: 10,
      });
    },
    getCard: async (_: null, args: Args) => {
      return prisma.card.findUnique({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
  Mutation: {
    addCard: async (_: null, args: InputArgs) => {
      return prisma.card.create({
        data: { ...args.input, cardId: uuidv4() },
      });
    },
    deleteCard: async (_: null, args: Args) => {
      return prisma.card.delete({
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
