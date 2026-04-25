import  UserService, {type CreateUserPayload} from '../../services/user.js'

export const resolvers={
    Query:{
        hello:()=>"hey there , i am the graphql server"
    },

    Mutation:{
        createUser: async(_:any, payload:CreateUserPayload)=>{
            const user = await UserService.createUser(payload);
            console.log('user created', user.name);
            return user.name;
        },
    },
}