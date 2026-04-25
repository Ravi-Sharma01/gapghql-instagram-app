import {prismaClient} from '../lib/prisma.js'

export interface CreateUserPayload{
    name: string;
    email: string,
    password: string
}

class UserService{
    public static async createUser(payload: CreateUserPayload){
        const {name, email, password} = payload;

        return await prismaClient.user.create({
            data:{
                name,
                email,
                password,
                salt: "random_bytes"
            },
        });
    };
}

export default UserService;