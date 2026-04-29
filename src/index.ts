import express from "express";
import { expressMiddleware } from '@as-integrations/express5'
import cors from 'cors'
import createApolloServer from './graphql/index.js'
import TokenService from './services/token.js'

async function init() {
  const app = express();
  app.use(cors());
  app.use(express.json());


  //start graphql apolloserver
  const apolloGraphqlServer = await createApolloServer();
  
  



 app.use('/graphql', expressMiddleware(apolloGraphqlServer, {
    context: async ({ req }) => {
      const token =  req.headers['token'];
      const user  =  TokenService.verifyAccessToken(token as string);
      return{user};
    },
  }));



  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

}

init();