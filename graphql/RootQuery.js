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
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    photos: {
      type: new GraphQLList(PhotoType),
      description: '获取图书列表 || 查询单个图书信息',
      args: { id: { type: GraphQLString }},
      resolve: (_, args) => {
        if (args.id) {
          return [Photos.findById(args.id)];
        }

        return Photos.find({ name: 'shy'});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      description: '获取图书列表',
      resolve: (_, args) => {
        //实现分页，根据args => [_start, _limit]

        return Books.find();
      }
    }
  })
});

module.exports = RootQuery;