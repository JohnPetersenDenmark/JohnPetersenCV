import React, { useRef, useEffect } from "react";
import Application from "./Application";
import ApplicantInfo from './ApplicantInfo';
import Customerinfo from './EmployerInfo';
import ApplicationDate from './ApplicationDate';
import ApplicationJobTitle from './ApplicationJobTitle';
import ApplicationContent from './ApplicationContent';
import Applicationheadline from './Applicationheadline';
import { Section } from "../../Classes/ClassesApplicationData";

declare global {
  interface Window {
    convertHTMLToPDFWithCallback?: (htmlContent: string, callback: (pdfBlob: Blob) => void) => void;
  }

  interface ApplicationPDFProps {
    orderedSections: string | undefined;
  }

}

const ApplicationPDF: React.FC<ApplicationPDFProps> = ({ orderedSections }) => {
  const appRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (appRef.current) {
      console.log("✅ appRef points to:", appRef.current);

      // Optional: visually highlight it
      appRef.current.style.outline = "3px solid limegreen";
      appRef.current.style.transition = "outline 0.3s ease";

      // Remove the highlight after a moment
      /* setTimeout(() => {
        if (appRef.current) appRef.current.style.outline = "none";
      }, 2000); */
    } else {
      console.warn("⚠️ appRef is still null (not mounted yet)");
    }
  }, []);





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

      <div >
        <div ref={appRef} className="application_content_grid" >
          <div className="item1">
            <ApplicantInfo />
          </div>
          <div className='itemX'></div>
          <div className='itemX'></div>
          <div className='itemX'></div>
          <div className="item2">
            <Customerinfo />
          </div>
          <div className='itemX'></div>
          <div className='itemX'></div>
          <div className="item3">
            <ApplicationJobTitle />
          </div>
          <div className='itemX'></div>
          <div className='itemX'></div>
          <div className="item4">
            <ApplicationDate />
          </div>
          <div className='itemX'></div>
          <div className='itemX'></div>
          <div className='itemX'></div>

          <div className="item5">
            <ApplicationContent />
          </div>
          <div className='itemX'></div>
          <div className='itemX'></div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPDF;
