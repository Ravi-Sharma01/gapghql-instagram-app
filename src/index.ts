import express from "express";
import {ApolloServer} from '@apollo/server'
import {expressMiddleware} from '@as-integrations/express5'
import {prismaClient} from './lib/prisma.js'

async function init(){
  const app = express();
app.use(express.json());


const apolloGraphqlServer = new ApolloServer({
  typeDefs:`#graphql
    type Query{
      hello:String
    }
    type Mutation{
       createUser(name: String!, email: String!, password: String!): String
    }
  `,
  resolvers:{
    Query:{
      hello:()=> 'hey there i am grapgql server' 
    },

    Mutation:{
      createUser:async(_, {name, email, password}:
        {name:string; email:string; password:string; })=>{
          const user = await prismaClient.user.create({
            data:{
              name,
              email,
              password,
              salt :'random_byte@123'
            }
          })
          console.log('user created', user);
        return user.name.toString();  
        }
        
    }
  }
});

await apolloGraphqlServer.start();

app.use('/graphql', expressMiddleware(apolloGraphqlServer));



app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

}

init();