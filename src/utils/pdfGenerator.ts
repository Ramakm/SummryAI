import { jsPDF } from "jspdf";

export const generatePDF = (content: string, title: string) => {
  try {
    const doc = new jsPDF();
    
    // Set title
    doc.setFontSize(16);
    doc.text(title, 20, 20);
    
    // Set content
    doc.setFontSize(12);
    
    // Split content into lines that fit the page width
    const lines = doc.splitTextToSize(content, 170);
    
    // Add lines to document, creating new pages as needed
    let y = 40;
    lines.forEach((line: string) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 20, y);
      y += 7;
    });
    
    // Save the PDF
    doc.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};