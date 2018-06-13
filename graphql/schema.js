const graphql = require('graphql');
const RootQuery = require('./RootQuery');
const RootMutation = require('./RootMutation');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})
