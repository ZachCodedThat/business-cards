import { ApolloServer, gql } from "apollo-server-micro";
import prisma from "./lib/prisma";
import { v4 as uuidv4 } from "uuid";

// 2 interfaces are created one representing the possible arguments that could be passed to one of the functions and the other
// representing the inputs needed to add a card to the DB

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

// the gql declares the structure and functions of our DB with their associated types.
// for querys and mutations you have to type both the inputs if there are any and the output of the function.

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

// The resolvers are where the functions defined above get their shape.
// there are all async functions

const resolvers = {
  Query: {
    getCards: async () => {
      return prisma.card.findMany({
        take: 10,
      }); // Pulls up to 10 cards from the DB and returns the requested criteria
    },
    getCard: async (_: null, args: Args) => {
      return prisma.card.findUnique({
        where: {
          id: Number(args.id), // takes the "id" as a string and pulls the criteria requested for just that card.
        },
      });
    },
  },
  Mutation: {
    addCard: async (_: null, args: InputArgs) => {
      return prisma.card.create({
        data: { ...args.input, cardId: uuidv4() }, // this takes input for a new Card plus a randomly generated cardId and creates it in the DB.
      });
    },
    deleteCard: async (_: null, args: Args) => {
      return prisma.card.delete({
        where: {
          id: Number(args.id), // takes the "id" as a string and deletes the coorosponding card from the db
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
