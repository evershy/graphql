/**
 * Created by yunmo on 2018/6/9.
 */
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const PhotoType = new GraphQLObjectType({
  name: 'PhotoType',
  fields: () => ({
    name: { type: GraphQLString },
    shotPlace: { type: GraphQLString },
    url: { type: GraphQLString },
    desc: { type: GraphQLString },
  })
})

module.exports = PhotoType;

