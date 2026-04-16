import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
declare const prismaClient: PrismaClient<{
    adapter: PrismaPg;
}, never, import("../src/generated/prisma/runtime/client.js").DefaultArgs>;
export { prismaClient };
//# sourceMappingURL=prisma.d.ts.map