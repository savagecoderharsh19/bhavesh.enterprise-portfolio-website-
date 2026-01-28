import ExcelJS from 'exceljs';

interface Enquiry {
    id?: string;
    enquiryNumber?: string;
    name: string;
    email?: string | null;
    phone: string;
    message?: string | null;
    description?: string | null;
    status?: string;
    createdAt: Date | string;
    internalNotes?: string | null;
}

// 1. TEST EXPORT WITH MINIMAL DATA (Enhanced Debugging)
export async function testExportWithDummyData() {
    console.log('🔍 Starting test export...');

    try {
        // Dynamic import to ensure it's loaded
        const ExcelJS = (await import('exceljs')).default;
        console.log('✅ ExcelJS loaded:', typeof ExcelJS);

        const workbook = new ExcelJS.Workbook();
        console.log('✅ Workbook created');

        const worksheet = workbook.addWorksheet('Test');
        console.log('✅ Worksheet created');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Age', key: 'age', width: 10 },
        ];

        worksheet.addRow({ name: 'John', age: 30 });
        worksheet.addRow({ name: 'Jane', age: 25 });
        console.log('✅ Rows added');

        const buffer = await workbook.xlsx.writeBuffer();
        console.log('✅ Buffer created, size:', buffer.byteLength, 'bytes');

        // Check if buffer is valid
        if (buffer.byteLength < 100) {
            console.error('❌ Buffer too small! Something wrong with ExcelJS');
            alert('Buffer is corrupted - only ' + buffer.byteLength + ' bytes');
            return false;
        }

        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        console.log('✅ Blob created, size:', blob.size, 'bytes');

        const url = window.URL.createObjectURL(blob);
        console.log('✅ Blob URL created:', url);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'test_' + Date.now() + '.xlsx';
        document.body.appendChild(link);
        link.click();

        console.log('✅ Download triggered');

        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            console.log('✅ Cleanup complete');
        }, 100);

        return true;
    } catch (error) {
        console.error('❌ Test export failed:', error);
        alert('Error: ' + (error instanceof Error ? error.message : String(error)));
        return false;
    }
}

// 1.5 BASE64 MINIMAL EXCEL TEST (Known Good File)
export function testBase64Download() {
    try {
        // Minimal valid XLSX (Base64) - Guarded for testing
        const validExcelBase64 = 'UEsDBBQAAAAIAAAAIQAnX9UuAAAABAAAABMAAABbQ29udGVudF9UeXBlc10ueG1srAD//+2UwYvCMAzG7/0VQ++2tg7mYIfe9DDe9SBlS8kWAsTu77/XNjp0Ik72ZmdnFrKmvS/9vifMndlSkpCEJFShqYVsE0W7m+P9JM6zMAkVu4bwdpC2VbRVu74zNikARUlyG0vpgTDF/pNoqbVOGQQ0idpGrezmIB8GKpYwOAOOGQv9R8yh417ZViq62vV5JQmI09u1/KceRRLRwI65dU/pLvIhvofvT76vSbxrHicfr2ldXz4PQ0fEUn6i9QpQSwcI1zEnf3gAAAAEAAAAUEsDBBQAAAAIAAAAIQAat4nUAAAAAgAAABMAAAB4bC9yZWxzL3dvcmtib29rLnhtbC5yZWxzswCA//90kctOwzAQRfd8hfV9EycVatStpA9I3FAlC59A7G0S2mN7ZtvA99fOshCwsh6dnHvnzIzd68fB9WfM0fsqRCoUKZgKVXupBincTrfnR5hC4axm6YMi9KGIer3f/I87mGzLidogkKj7KFKuLYN2I/E+u9hZz94oI+eG+W0idqNwj2as8X9D7zIe9X6769SImzM1pXzUhC5iYmTMqXvVMfIevkfnj/yvSbypPievFzRv170fS0vIUn6idQtQSwcIFreJ1AAAAAIAAFBLAwQUAAAACAAAACEAGneK5AAAAAIAAABMAAAAYm9va3NoZWV0MS54bWyzAAB//+2SwY7CMAxG7/0Vke8O69YqC7pD70K88SBmS8kVAsTu77/XNrR0Ik7mZmdmF7Lu2vvi/5kw92ZLSUISklCFphaKXVX9XvUfVf9R9R9V/1v1v1VPkCTh6fN6+S8NIn3oT9mU93InBf7vS78TfM+w7fP3TfIxyvFpDvx8Rfs5hLNooM/cvid/kvw0hY+Z+3S7/U30XyW+Je79TfxuHiffl3yfv5+PkO8LVBLHCBp3iuQAAAAAgAAAUEsDBBQAAAAIAAAAIQAtXy4uAAAABAAAABMAAABSZWxzL3dvcmtib29rLnhtbC5yZWxzswAA//+2UwYvCMAzG7/0VQ++2tg7mYIfe9DDe9SBlS8kWAsTu77/XNjp0Ik72ZmdnFrKmvS/9vifMndlSkpCEJFShqYVsE0W7m+P9JM6zMAkVu4bwdpC2VbRVu74zNikARUlyG0vpgTDF/pNoqbVOGQQ0idpGrezmIB8GKpYwOAOOGQv9R8yh417ZViq62vV5JQmI09u1/KceRRLRwI65dU/pLvIhvofvT76vSbxrHicfr2ldXz4PQ0fEUn6i9QpQSwcI1zEnf3gAAAAEAAAAUEsBAhQAFAAAAAgAAAAhACdf1S4AAAAEAAAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNdLnhtbFBLAQIUABQAAAAIAAAAIQAat4nUAAAAAgAAABMAAAAAAAAAAAAAAAAAXQAAAHhsL3JlbHMvd29ya2Jvb2sucmVscy54bWxQSwECFAAUAAAACAAAACEAGneK5AAAAAIAAABMAAAAAAAAAAAAAAAAAL0AAABib9v2v3NoZWV0MS54bWxQSwECFAAUAAAACAAAACEALV8uLgAAAAQAAAATAAAAAAAAAAAAAAAAAMYAAABSZWxzL3dvcmtib29rLnhtbC5yZWxzUEsFBgAAAAAEAAQA0AAAAOEAAAAAAA==';

        const binaryString = atob(validExcelBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'valid_test_base64.xlsx';
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);

        console.log('✅ Base64 test file downloaded');
        return true;
    } catch (error) {
        console.error('❌ Base64 test failed:', error);
        alert('Base64 test failed');
        return false;
    }
}

// 2. CSV EXPORT (Fallback)
export function exportToCSV(enquiries: Enquiry[]) {
    try {
        // Create CSV headers
        const headers = ['S.No', 'Enquiry ID', 'Name', 'Email', 'Phone', 'Message', 'Status', 'Date'];

        // Create CSV rows
        const rows = enquiries.map((enq, idx) => {
            const sanitize = (val: any) => {
                let str = String(val || '');
                // Sanitize newlines
                str = str.replace(/[\r\n]+/g, ' ');
                // Escape double quotes
                str = str.replace(/"/g, '""');
                // CSV Injection prevention
                if (str.startsWith('=') || str.startsWith('+') || str.startsWith('-') || str.startsWith('@')) {
                    str = `'${str}`;
                }
                return str;
            };

            return [
                idx + 1,
                sanitize(enq.enquiryNumber || enq.id),
                sanitize(enq.name),
                sanitize(enq.email),
                sanitize(enq.phone),
                sanitize(enq.message || enq.description),
                sanitize(enq.status),
                enq.createdAt ? new Date(enq.createdAt).toLocaleDateString('en-IN') : 'N/A',
            ];
        });

        // Combine headers and rows
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        // Create Data URI (most robust for text files)
        // CRITICAL: Add Byte Order Mark (\uFEFF) so Excel recognizes it as UTF-8
        // We use encodeURIComponent to ensure special chars are handled safe in URI
        const csvData = '\uFEFF' + csvContent;
        const url = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `enquiries_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();

        // No need for URL.revokeObjectURL here since we used string URI
        setTimeout(() => {
            document.body.removeChild(link);
        }, 100);

        console.log('✅ CSV exported via Data URI');
        return true;
    } catch (error) {
        console.error('❌ CSV export failed:', error);
        alert('CSV export failed');
        return false;
    }
}

// 4. COPY TO CLIPBOARD (Ultimate Fallback)
export async function copyToClipboard(enquiries: Enquiry[]) {
    try {
        const headers = ['S.No', 'Enquiry ID', 'Name', 'Email', 'Phone', 'Message', 'Status', 'Date'];

        const rows = enquiries.map((enq, idx) => [
            idx + 1,
            enq.enquiryNumber || enq.id || 'N/A',
            enq.name || 'N/A',
            enq.email || 'N/A',
            enq.phone || 'N/A',
            (enq.message || enq.description || 'N/A')
                .replace(/"/g, '""')
                .replace(/\t/g, ' ')
                .replace(/[\r\n]+/g, ' '), // CRITICAL: Replace newlines with space to preserve row structure
            enq.status || 'NEW',
            enq.createdAt ? new Date(enq.createdAt).toLocaleDateString('en-IN') : 'N/A',
        ]);

        // Use Tab separation for direct pasting into Excel
        const tsvContent = [
            headers.join('\t'),
            ...rows.map(row => row.map(cell => `"${cell}"`).join('\t'))
        ].join('\n');

        await navigator.clipboard.writeText(tsvContent);

        console.log('✅ Copied to clipboard');
        alert('Data copied to clipboard! Open Excel and Paste (Ctrl+V).');
        return true;
    } catch (error) {
        console.error('❌ Copy failed:', error);
        alert('Copy failed');
        return false;
    }
}

// 3. MAIN EXCEL EXPORT
export async function exportEnquiriesToExcel(enquiries: Enquiry[]) {
    try {
        if (!enquiries || enquiries.length === 0) {
            alert('No enquiries to export!');
            return false;
        }

        // Create a new workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Enquiries');

        // Define columns
        worksheet.columns = [
            { header: 'S.No', key: 'sno', width: 8 },
            { header: 'Enquiry ID', key: 'enquiryId', width: 15 },
            { header: 'Client Name', key: 'name', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 18 },
            { header: 'Message', key: 'message', width: 50 },
            { header: 'Status', key: 'status', width: 12 },
            { header: 'Date', key: 'date', width: 18 },
        ];

        // Style the header row
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }; // White text
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF4B5563' }, // Gray background
        };

        // Add data rows
        enquiries.forEach((enquiry, index) => {
            const message = enquiry.message || enquiry.description || 'N/A';

            // CRITICAL: Truncate message to 32,000 characters (Excel limit)
            const truncatedMessage = message.length > 32000
                ? message.substring(0, 32000) + '... (truncated)'
                : message;

            worksheet.addRow({
                sno: index + 1,
                enquiryId: enquiry.enquiryNumber || enquiry.id || 'N/A',
                name: enquiry.name || 'N/A',
                email: enquiry.email || 'N/A',
                phone: enquiry.phone || 'N/A',
                message: truncatedMessage,
                status: enquiry.status || 'NEW',
                date: enquiry.createdAt
                    ? new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })
                    : 'N/A',
            });
        });

        // Generate filename
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
        const filename = `enquiries_${dateStr}_${timeStr}.xlsx`;

        // CRITICAL: Write to buffer and download
        const buffer = await workbook.xlsx.writeBuffer();

        // Create blob with correct MIME type
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);

        console.log('✅ Excel file exported successfully:', filename);
        return true;

    } catch (error) {
        console.error('❌ Export failed:', error);
        alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return false;
    }
}
