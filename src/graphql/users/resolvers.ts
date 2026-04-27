import  UserService, {type CreateUserPayload, type LoginUserPayload} from '../../services/user.js'

export const resolvers={
    Query:{
        getUser: async (_: any, __: any, context: any) => {
            try {
              if (!context.user?.id) throw new Error("Unauthorized");
              return await UserService.getUserById(context.user.id);
            } catch (error) {
              throw new Error(error as string);
            }
          }
    },

    Mutation:{
        createUser: async(_:any, payload:CreateUserPayload)=>{
            try {
                const user = await UserService.createUser(payload);
                console.log('user created', user.name);
                return user.name;
            } catch (error) {
                throw new Error(error as string);
            }
        },

        loginUser: async(_:any, payload:LoginUserPayload)=>{        
            try {
                const result = await UserService.loginUser(payload);
                return result;
            } catch (error) {
                throw new Error(error as string);
            }
        }
    },
}