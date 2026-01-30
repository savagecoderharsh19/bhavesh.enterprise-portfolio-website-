const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testLogin() {
    const email = 'admin@bhaveshenterprises.com';
    const password = 'Bhavesh#Industrial@2026';

    const admin = await prisma.admin.findUnique({
        where: { email }
    });

    if (!admin) {
        console.log('User not found in DB');
        return;
    }

    const isValid = await bcrypt.compare(password, admin.password);
    console.log('Password is valid in DB:', isValid);
}

testLogin().finally(() => prisma.$disconnect());
