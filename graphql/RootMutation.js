const graphql = require('graphql');
const PhotoType = require('./types/PhotoType');
const BookType = require('./types/BookType');
const Photos = require('../models/Photos');
const Books = require('../models/Books');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    photos: {
      type: new GraphQLList(PhotoType),
      description: '增加照片',
      args: {
        name: { type: GraphQLString },
        shotPlace: { type: GraphQLString },
        url: { type: GraphQLString },
        desc: { type: GraphQLString },
      },
      resolve: (_, args) => {
        const { name, shotPlace, url, desc } = args;
        const photo = new Photos({
          name,
          shotPlace,
          url,
          desc,
        });
        return [photo.save()];
      }
    },
    books: {
      type: new GraphQLList(BookType),
      args: {
        name: { type: GraphQLString },
        author: { type: GraphQLString },
        published: { type: GraphQLBoolean }
      },
      resolve: (_, args) => {
        const { name, author, published } = args;
        const book = new Books({
          name,
          author,
          published,
        });

        return [book.save()];
      }
    }
  })
})

module.exports = RootMutation;

