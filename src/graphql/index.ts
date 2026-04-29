import {ApolloServer} from '@apollo/server';
import {typeDefs as userTypeDefs} from './users/typedef.js';
import {resolvers as userResolvers} from './users/resolvers.js';

async function createApolloServer() {
    const gqlServer = new ApolloServer({
        typeDefs:userTypeDefs,
        resolvers:userResolvers,
        introspection: true,
    });
    

    await gqlServer.start();
    return gqlServer;
}

export default createApolloServer;
