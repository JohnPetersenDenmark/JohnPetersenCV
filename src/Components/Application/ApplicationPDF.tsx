import React, { useRef } from "react";
import Application from "./Application";

declare global {
  interface Window {
    convertHTMLToPDFWithCallback?: (htmlContent: string, callback: (pdfBlob: Blob) => void) => void;
  }
}

const ApplicationPDF: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!appRef.current) {
      alert("Application HTML not found!");
      return;
    }

    if (!window.convertHTMLToPDFWithCallback) {
      alert("GrabzIt function not loaded yet!");
      return;
    }

    // 1️⃣ Get the rendered HTML
    const htmlContent = appRef.current.outerHTML;

    // 2️⃣ Collect all <style> and <link rel="stylesheet"> from the page
    const styles = Array.from(document.querySelectorAll("link[rel=stylesheet], style"))
      .map(el => el.outerHTML)
      .join("\n");

    // 3️⃣ Parse HTML and fix relative image URLs
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    doc.querySelectorAll("img").forEach(img => {
      if (img.src && !img.src.startsWith("http")) {
        img.src = window.location.origin + img.src;
      }
    });

    const updatedHtmlContent = doc.body.outerHTML;

    // 4️⃣ Wrap in full HTML document
 const htmlToConvert = `
<html>
  <head>
    ${styles}
    <style>
      body { margin:0; padding:0; }
      .application_content_grid {
        display: grid !important;
        grid-template-columns: repeat(4, 1fr) !important;
        gap: 10px !important;
        text-align: left !important;
      }
      .item1, .item2, .item3, .item4, .item5, .item6 {
        display: block !important;
      }
    </style>
  </head>
  <body>
    ${updatedHtmlContent}
  </body>
</html>
`;

    // 5️⃣ Call GrabzIt to convert HTML → PDF
    window.convertHTMLToPDFWithCallback(htmlToConvert, (pdfBlob) => {
      console.log("PDF Blob received:", pdfBlob);

      // Trigger download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "my_application.pdf";
      link.click();
    });
  };

  return (
    <div className="pdf-export-container"> 
      <div style={{ marginBottom: "1rem" }}>
        <button className="download_button" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>

      <div ref={appRef} className="application_content_grid">
        <Application />
      </div>
    </div>
  );
};

export default ApplicationPDF;
