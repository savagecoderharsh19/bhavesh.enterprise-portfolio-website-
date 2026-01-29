import ExcelJS from "exceljs"

interface Enquiry {
    id?: string
    enquiryNumber?: string
    name: string
    email?: string | null
    phone: string
    description?: string | null
    status?: string
    createdAt: Date | string
}

/**
 * Generates an Excel spreadsheet from enquiry data and triggers a download.
 */
export async function exportEnquiriesToExcel(enquiries: Enquiry[]) {
    if (!enquiries?.length) return false

    try {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet("Enquiries")

        worksheet.columns = [
            { header: "S.No", key: "sno", width: 8 },
            { header: "Ref Number", key: "ref", width: 20 },
            { header: "Client", key: "name", width: 25 },
            { header: "Email", key: "email", width: 30 },
            { header: "Phone", key: "phone", width: 18 },
            { header: "Requirement", key: "description", width: 50 },
            { header: "Status", key: "status", width: 15 },
            { header: "Date", key: "date", width: 18 },
        ]

        // Styling
        const headerRow = worksheet.getRow(1)
        headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } }
        headerRow.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF0C4A6E" }, // Primary Navy
        }

        enquiries.forEach((enq, i) => {
            worksheet.addRow({
                sno: i + 1,
                ref: enq.enquiryNumber || enq.id?.slice(0, 8),
                name: enq.name,
                email: enq.email || "N/A",
                phone: enq.phone,
                description: enq.description || "N/A",
                status: enq.status || "NEW",
                date: new Date(enq.createdAt).toLocaleDateString("en-IN"),
            })
        })

        const buffer = await workbook.xlsx.writeBuffer()
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })

        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `enquiries_${new Date().toISOString().slice(0, 10)}.xlsx`

        document.body.appendChild(link)
        link.click()

        setTimeout(() => {
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        }, 100)

        return true
    } catch (error) {
        console.error("Export Error:", error)
        return false
    }
}

/**
 * Copies enquiry data to clipboard in TSV format for direct Excel pasting.
 */
export async function copyToClipboard(enquiries: Enquiry[]) {
    try {
        const headers = ["ID", "Name", "Email", "Phone", "Description", "Status", "Date"]
        const rows = enquiries.map((e) => [
            e.enquiryNumber || e.id?.slice(0, 8),
            e.name,
            e.email || "N/A",
            e.phone,
            (e.description || "N/A").replace(/[\n\r\t]/g, " "),
            e.status,
            new Date(e.createdAt).toLocaleDateString("en-IN"),
        ])

        const tsv = [headers.join("\t"), ...rows.map((r) => r.join("\t"))].join("\n")
        await navigator.clipboard.writeText(tsv)
        return true
    } catch (error) {
        console.error("Clipboard Error:", error)
        return false
    }
}
