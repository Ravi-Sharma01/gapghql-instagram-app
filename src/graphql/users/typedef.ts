export const typeDefs = `#graphql
   type Query{
        getUser: User!
    }

    type User {
        id: ID!
        name:String!
        email: String!
        imageProfile: String
    }
        
    type AuthPayload{
        message : String!
        accessToken : String!
        refreshToken : String!
        
    }
    type Mutation{
        createUser(name: String!, email: String!, password: String!): String

        loginUser(email:String!, password: String!):AuthPayload!
    }
`

