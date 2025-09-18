'use client'

import { useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

interface DownloadAndPrintProps {
  componentRefs: React.RefObject<HTMLDivElement>[]
}

export default function DownloadAndPrint({ componentRefs }: DownloadAndPrintProps) {
  const downloadRef = useRef<HTMLAnchorElement>(null)

  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4')

    // Loop through all section refs and add them to the PDF
    for (let i = 0; i < componentRefs.length; i++) {
      const ref = componentRefs[i].current
      if (ref) {
        try {
          // Capture the content of the section as an image
          const canvas = await html2canvas(ref, { scale: 2 })
          const imgData = canvas.toDataURL('image/png')
          const imgWidth =  210
          const imgHeight = (canvas.height * imgWidth) / canvas.width

          // Add the section to the PDF. For all but the first section, add a new page
          if (i > 0) {
            pdf.addPage()
          }

          // Add the image to the PDF
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        } catch (error) {
          console.error('Error generating PDF:', error)
        }
      }
    }

    // Output the PDF as a Blob and trigger the download
    const pdfBlob = pdf.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)

    if (downloadRef.current) {
      downloadRef.current.href = pdfUrl
      downloadRef.current.download = 'NewJoineeKit.pdf'
      downloadRef.current.click()
    }
  }

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={generatePDF}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download and Print
      </button>
      <a ref={downloadRef} className="hidden" />
    </div>
  )
}
