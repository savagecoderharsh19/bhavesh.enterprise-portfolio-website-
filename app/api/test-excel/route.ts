import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';

export async function GET() {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Test');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Age', key: 'age', width: 10 },
        ];

        worksheet.addRow({ name: 'John', age: 30 });
        worksheet.addRow({ name: 'Jane', age: 25 });

        const buffer = await workbook.xlsx.writeBuffer();

        // Create new headers object
        const headers = new Headers();
        headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        headers.set('Content-Disposition', 'attachment; filename="server_test.xlsx"');

        // Return the response (NextJS 15+ compatible)
        return new NextResponse(buffer, {
            status: 200,
            headers: headers
        });

    } catch (error) {
        console.error('Test Excel Server Error:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
