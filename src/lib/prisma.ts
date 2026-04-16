import "dotenv/config"
import {PrismaPg} from '@prisma/adapter-pg'
import {PrismaClient} from '../../build/generated/prisma/index.js'
const connectionString = `${process.env.DATABASE_URL}`;
if(!connectionString) throw new Error('db url faching unsuccessfull');

const adapter = new PrismaPg({ connectionString });
const prismaClient = new PrismaClient( { adapter});

export {prismaClient};