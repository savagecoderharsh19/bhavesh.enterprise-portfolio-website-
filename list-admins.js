const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listAdmins() {
    const admins = await prisma.admin.findMany();
    console.log('--- Current Admins in Database ---');
    admins.forEach(a => {
        console.log(`Email: ${a.email} | Role: ${a.role}`);
    });
}

listAdmins().finally(() => prisma.$disconnect());
