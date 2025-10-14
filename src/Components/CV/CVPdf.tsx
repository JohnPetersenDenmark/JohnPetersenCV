import React, { useRef } from "react";
import Motivation from './Motivation';
import Profile from './Profile';
import ContactInfo from './ContactInfo';
import Skills from './Skills';
import Education from './Education';
import Languages from './Languages';
import WorkingHistory from './WorkingHistory';
import Sparetime from './Sparetime';
declare global {
    interface Window {
        convertHTMLToPDFWithCallback?: (htmlContent: string, callback: (pdfBlob: Blob) => void) => void;
    }
}

const CVPdf: React.FC = () => {
    const appRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = () => {
        if (!appRef.current) {
            alert("CV HTML not found!");
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
           
                <div  ref={appRef} className="cv_content">
                <div className="cv_header_contact_info">
                    <ContactInfo />
                </div>
                <div className="cv_header">
                    <Motivation />
                </div>
                <div className="cv_right">
                    <Profile />
                    <WorkingHistory />
                </div>
                <div className="cv_left">
                    <Skills />
                    <Education />
                    <Languages />
                    <Sparetime />
                </div>
            </div>
        </div>
    );
};

export default CVPdf;
