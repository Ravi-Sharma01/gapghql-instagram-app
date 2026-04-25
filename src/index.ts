import express from "express";
import { expressMiddleware } from '@as-integrations/express5'
import createApolloServer from './graphql/index.js'

async function init() {
  const app = express();
  app.use(express.json());


  //start graphql apolloserver
  const apolloGraphqlServer = await createApolloServer();



  app.use('/graphql', expressMiddleware(apolloGraphqlServer));



  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

}

init();