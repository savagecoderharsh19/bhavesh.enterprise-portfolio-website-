import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function check() {
    const admins = await prisma.admin.findMany()
    console.log('Admins in DB:', admins.map(a => ({ email: a.email, id: a.id })))
}

check()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
