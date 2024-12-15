import dayjs from 'dayjs'
import jsPDF from 'jspdf'
import type {RowInput} from 'jspdf-autotable'
import autoTable from 'jspdf-autotable'

import type {MinimalTableData} from '@/components'

export const generatePDFName = (prefix: string) => {
  return `${prefix}-${dayjs().format('YYYY-MM-DD-hh-mm-ss')}.pdf`
}

export const exportPDF = (
  tableData: MinimalTableData[],
  name: string,
  title?: string,
) => {
  const doc = new jsPDF()

  if (title) {
    doc.text(title, 15, 20)
  }

  tableData.forEach((_tableData) => {
    const headers = _tableData.header.map((header) => ({
      content: header.text,
      colSpan: header.colSpan,
      styles: {halign: 'center', fillColor: [0, 0, 0]},
    })) as RowInput

    const rows = _tableData.rows.map((row) => {
      return row.cells.map((cell) => {
        /* @ts-ignore ignore */
        const isHeader = cell.isHeader
        /* @ts-ignore ignore */
        const isSubHeader = cell.isSubHeader

        const styles = (() => {
          if (isHeader) {
            return {
              halign: 'center',
              fillColor: [0, 0, 0],
              textColor: [255, 255, 255],
            }
          }

          if (isSubHeader) {
            return {
              halign: 'center',
              fillColor: [245, 245, 245],
              fontStyle: 'bold',
              textColor: [0, 0, 0],
            }
          }

          return {halign: cell.align ?? 'left'}
        })()
        return {
          content: cell.text,
          styles,
          colSpan: cell.colSpan,
        }
      })
    }) as RowInput[]

    /* @ts-ignore some issues */
    const _finalY = doc.previousAutoTable.finalY ?? 0
    /* @ts-ignore some issues */
    const margin = doc.previousAutoTable?.settings?.margin?.left ?? 15
    const startY = _finalY + 15

    doc.setFontSize(10)
    doc.text(_tableData.title, margin, startY - 3)

    autoTable(doc, {
      head: [headers],
      body: rows,
      theme: 'grid',
      startY,
      // pageBreak: 'avoid',
      margin: {bottom: 10},
    })
  })

  // Save the PDF
  doc.save(generatePDFName(name))
}
