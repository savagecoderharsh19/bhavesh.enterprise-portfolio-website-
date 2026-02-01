const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetPassword() {
    const password = process.env.ADMIN_PASSWORD || 'Bhavesh#Industrial@2026';
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Password to hash:', password);
    console.log('Generated hash:', hashedPassword);

    // Try to delete and recreate
    try {
        await prisma.admin.deleteMany({ where: { email: 'admin@bhaveshenterprises.com' } });
        console.log('Deleted existing admin');
    } catch (e) {
        console.log('No admin to delete or error:', e.message);
    }

    const admin = await prisma.admin.create({
        data: {
            email: 'admin@bhaveshenterprises.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    console.log('Created admin:', admin.email);
    console.log('New password hash (first 30):', admin.password.substring(0, 30));

    // Verify the password works
    const verify = await bcrypt.compare(password, admin.password);
    console.log('Verification test:', verify);

    await prisma.$disconnect();
}

resetPassword().catch(console.error);
