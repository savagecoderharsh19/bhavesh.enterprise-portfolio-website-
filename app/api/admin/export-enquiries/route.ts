import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ExcelJS from 'exceljs';

export async function GET() {
    try {
        // 1. Authentication Check
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Create workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Enquiries');

        worksheet.columns = [
            { header: 'S.No', key: 'sno', width: 8 },
            { header: 'Enquiry ID', key: 'id', width: 15 },
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 18 },
            { header: 'Message', key: 'message', width: 50 },
            { header: 'Status', key: 'status', width: 12 },
            { header: 'Date', key: 'date', width: 18 },
        ];

        // 2. Pagination / Batching
        // Process in chunks to avoid memory overflow on large datasets
        const BATCH_SIZE = 100;
        let skip = 0;
        let hasMore = true;
        let serialNo = 1;

        while (hasMore) {
            const enquiries = await prisma.enquiry.findMany({
                orderBy: { createdAt: 'desc' },
                take: BATCH_SIZE,
                skip: skip,
            });

            if (enquiries.length === 0) {
                hasMore = false;
                break;
            }

            // Add data
            enquiries.forEach((enq) => {
                worksheet.addRow({
                    sno: serialNo++,
                    id: enq.enquiryNumber || enq.id,
                    name: enq.name || '',
                    email: enq.email || '',
                    phone: enq.phone || '',
                    message: (enq.description || '').substring(0, 32000),
                    status: enq.status || 'NEW',
                    date: new Date(enq.createdAt).toLocaleDateString('en-IN'),
                });
            });

            if (enquiries.length < BATCH_SIZE) {
                hasMore = false;
            } else {
                skip += BATCH_SIZE;
            }
        }

        // Generate buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // NextJS 15+ headers setup
        const response = new NextResponse(buffer);
        response.headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        response.headers.set('Content-Disposition', `attachment; filename="enquiries_${new Date().toISOString().split('T')[0]}.xlsx"`);

        return response;

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        const stack = error instanceof Error ? error.stack : '';
        console.error('Server export error:', message, stack ? stack.split('\n')[0] : '');
        return NextResponse.json({ error: 'Export failed' }, { status: 500 });
    }
}
