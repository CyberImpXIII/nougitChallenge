const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const fs = require('fs');

const resolvers = {
  Query: {
    info: () => `This is the API of my coding challenge for nougit.io!`,
    getEntries: async (root, args, context, info)=>{
      let where = {};
     if(args.filter){ 
        if(args.filter === "0" || args.filter === "1"){
          console.log(args.filter)
          where = {status: Number(args.filter) }
        }else{
          where = {isTrending: Boolean(args.filter)}
        }
      }
      return await context.prisma.entries({where : where, skip : args.skip, first : args.first, orderBy : args.orderBy });
    }
  },
  Mutation: {
    // 2
    createEntry: async (root, args, context) => {
      return await context.prisma.createEntry({
        author:  {
          create: {
            name:args.author.name,
            picture:args.author.picture,
            score:args.author.score
          }
        },
        date: args.date,
        popularity: args.popularity,
        isTrending: args.isTrending,
        title: args.title,
        description: args.description,
        numComments: args.numComments,
        thumbnail: args.thumbnail,
        codeSubmissionTotal: args.codeSubmissionTotal,
        pledgeTotal: args.pledgeTotal,
        pledgeGoal: args.pledgeGoal,
        pledgerCount: args.pledgerCount,
        status: args.status,
      })
    }
  },

  Entry: {
    //popularity is listed as an INT in the challenge docs but is a FLOAT in the JSON file
    status: (parent)=> parent.Status ? "Open" : "Closed",
    author(parent) {
      return prisma.entry({ id: parent.id }).author()
    }
  }
}

const server = new GraphQLServer({
  typeDefs : './schema.graphql',
  resolvers,
  context: { prisma }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))