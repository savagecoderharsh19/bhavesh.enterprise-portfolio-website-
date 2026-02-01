const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function verify() {
    console.log('Checking admin in production database...');

    const admin = await prisma.admin.findUnique({
        where: { email: 'admin@bhaveshenterprises.com' },
    });

    if (!admin) {
        console.log('❌ No admin found!');
        await prisma.$disconnect();
        return;
    }

    console.log('✅ Admin found:', admin.email);
    console.log('   Password hash (first 30):', admin.password.substring(0, 30));

    // Test password
    const testPassword = 'Bhavesh#Industrial@2026';
    const isValid = await bcrypt.compare(testPassword, admin.password);
    console.log('   Password verification:', isValid ? '✅ PASS' : '❌ FAIL');

    await prisma.$disconnect();
}

verify().catch(console.error);
