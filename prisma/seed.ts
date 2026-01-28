import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
    // Secure Password Logic
    let password = process.env.ADMIN_PASSWORD;

    if (process.env.NODE_ENV === 'production' && !password) {
        console.error('❌ FATAL: Trying to seed admin in production without ADMIN_PASSWORD env var.');
        process.exit(1);
    }

    if (!password) {
        // Generate random password for dev if not set
        password = crypto.randomBytes(8).toString('hex');
        console.log('\n⚠️  GENERATED ADMIN PASSWORD: ' + password);
        console.log('⚠️  Please save this password or set ADMIN_PASSWORD in .env\n');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Upsert admin user (Create if not exists, Update if it does)
    const admin = await prisma.admin.upsert({
        where: { email: 'admin@bhaveshenterprises.com' },
        update: {
            password: hashedPassword,
        },
        create: {
            email: 'admin@bhaveshenterprises.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    })

    console.log('✅ Admin user synced:', admin.email)
    if (process.env.ADMIN_PASSWORD) {
        console.log('🔑 Password set from environment variable.')
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
