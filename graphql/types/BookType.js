/**
 * Created by yunmo on 2018/6/12.
 */
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} = graphql;

// GraphQLSchema constructor
const BookType = new GraphQLObjectType({
  name: 'BookType',
  fields: () => ({
    name: { type: GraphQLString },
    author: { type: GraphQLString },
    published: { type: GraphQLBoolean }
  }),
});

module.exports = BookType;

