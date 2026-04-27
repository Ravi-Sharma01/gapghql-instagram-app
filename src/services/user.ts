import {prismaClient} from '../lib/prisma.js'
import bycrypt from 'bcryptjs'
import TokenServices from '../services/token.js'

export interface CreateUserPayload{
    name: string;
    email: string,
    password: string
}

export interface LoginUserPayload{
    email: string;
    password: string;
}

class UserService{

    //hash the password
    private static hashPassword(password:string){
        return bycrypt.hash(password, 10)
    }
    //compare the password
    private static comparePassword(password:string, hashedPassword:string){
        return bycrypt.compare(password, hashedPassword)
    }


    //register the user
    public static async createUser(payload: CreateUserPayload){
        const {name, email, password} = payload;

        const hashedPassword = await this.hashPassword(password);
        return await prismaClient.user.create({
            data:{
                name,
                email,
                password:hashedPassword,    
            },
        });
    };

    //login user and  generate access and refresh token
    public static async loginUser(params: LoginUserPayload){
        const {email, password} = params;
        //check if user exists
        const existUser = await prismaClient.user.findUnique({where:{email}});
        if(!existUser) throw new Error('please register before login');

        //compare the password
        const comparePass = await this.comparePassword(password, existUser.password)
        if(!comparePass) throw new Error('password doesnot matched');

        //generate access and refresh token
        const payload = {id:existUser.id, email:existUser.email}
        const accessToken = TokenServices.generateAccessToken(payload);
        const refreshToken = TokenServices.generateRefreshToken(payload);

        //update the refresh token in the database
        await prismaClient.user.update({
            where:{id:existUser.id},
            data:{refreshToken:refreshToken},
        });

        //return the access and refresh token
        return {
            message: 'logged in sucessfully',
            accessToken: accessToken,
            refreshToken: refreshToken,           
        }

    }
    //get the user
    public static async getUserById(id: string){
        const user = await  prismaClient.user.findUnique({where:{id}})
        if(!user) throw new Error('user not found');
        return user;

    }
}

export default UserService;