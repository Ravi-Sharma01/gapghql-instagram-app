export const typeDefs=`#graphql
   type Query{
      hello:String
    }
    type Mutation{
        createUser(name: String!, email: String!, password: String!): String
    }
`

