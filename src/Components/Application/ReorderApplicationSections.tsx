import React, { useRef, useEffect, useState } from "react";
import ApplicantInfo from "./ApplicantInfo";
import EmployerInfo from "./EmployerInfo";
import ApplicationJobTitle from "./ApplicationJobTitle";
import ApplicationDate from "./ApplicationDate";
import ApplicationContent from "./ApplicationContent";
import { CopyApplicationDataToNew } from "../../GlobalData/GlobalApplicationData";
import { SectionPosition } from "../../Classes/ClassesApplicationData";
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import { useCVData } from '../../GlobalData/GlobalCVDataContext';

declare global {
  interface Window {
    convertHTMLToPDFWithCallback?: (htmlContent: string, callback: (pdfBlob: Blob) => void) => void;
  }
}

// --- CONFIG ---
const COLUMN_WIDTHS = [50, 400, 400, 50];
const ROW_HEIGHT = 50;

export default function ReorderApplicationSections() {

  const canvasRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const componentMap: Record<string, React.FC> = {

    EmployerInfo,
    ApplicationJobTitle,
    ApplicationDate,
    ApplicationContent,
    ApplicantInfo,
  };

  const { currentApplicationData, setCurrentApplicationData } = useApplicationData();


  // const [hideForPDF, setHideForPDF] = useState(true)

  const [sections, setSections] = useState<any[]>(
    Object.entries(currentApplicationData).filter(([key]) => key !== "ApplicantContentHeadline" && key !== 'CssStyles')
  );

  let mainDivStyle: React.CSSProperties = {
    position: "relative",
    // left: '100px',
    width: "794px",
    height: "1123px",
    background: currentApplicationData?.CssStyles?.backgroundColor ?? "Blue",
    margin: "20px auto",
    border: "2px dashed #ccc",
    borderRadius: "12px",
  }

  /*  useEffect(() => {
 
     const appGrid = document.querySelector<HTMLDivElement>(".edit_content_app");
 
     if (appGrid) {
       // Find all <div> elements INSIDE that grid
       const backgroundColor = currentApplicationData?.CssStyles?.backgroundColor ?? "Blue";
       appGrid.style.backgroundColor = backgroundColor
     }
   }, [currentApplicationData]); */



  for (let g = 0; g < sections.length; g++) {
    let componentName = '';

    let tmpSection = sections[g];

    if (tmpSection[1].thisClassName === 'ApplicantContent') {
      componentName = 'ApplicationContent';
    }
    else {
      componentName = tmpSection[1].thisClassName;
    }

    const Component = componentMap[componentName];

    const component = Component ? <Component /> : null;

    tmpSection.component = component;
  }


  const [PDFConversion, setPDFConversion] = useState(false);

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.dataTransfer.setData("text/plain", JSON.stringify({
      id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    }));
  };

  function handleDownloadPDF() {
    const canvasEl = canvasRef.current;
    if (!canvasEl || !window.convertHTMLToPDFWithCallback) return;

    // 1️⃣ Hide all section elements before conversion
    const hiddenElements: HTMLElement[] = [];

    sections.forEach((section, index) => {
      const id = "dummy" + index;
      //const el = canvasEl.querySelector<HTMLElement>("#" + CSS.escape(id));
      const el = document.getElementById(id)
      if (el) {
        el.style.display = "none";
        hiddenElements.push(el); // keep track so we can restore later
      }
    });

    // 2️⃣ Convert to PDF using GrabzIt (or your custom converter)
    window.convertHTMLToPDFWithCallback(canvasEl.outerHTML, (pdfBlob: Blob) => {
      console.log("PDF Blob received:", pdfBlob);

      // 3️⃣ Restore visibility
      hiddenElements.forEach(el => {
        el.style.display = "";
      });

      // 4️⃣ Trigger download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "my_application.pdf";
      link.click();
    });
  }


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { id, offsetX, offsetY } = data;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left - offsetX;
    const newY = e.clientY - canvasRect.top - offsetY;

    setSections(prev =>
      prev.map(([key, value]) => {
        if (value.thisClassName !== id) return [key, value];
        return [key, { ...value, sectionPosition: { startXPosition: newX, startYPosition: newY } }];
      })
    );

    let tmpCopy = CopyApplicationDataToNew(currentApplicationData);
    const sectionKey = id;
    // @ts-ignore   
    const appSection = tmpCopy[sectionKey];

    const updatedPos = Object.assign(new SectionPosition(), appSection.sectionPosition, {
      startXPosition: newX,
      startYPosition: newY,
    });

    // @ts-ignore   
    tmpCopy[sectionKey] = { ...appSection, sectionPosition: updatedPos };
    setCurrentApplicationData(tmpCopy)
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Allow drop
  };


  return (
    <>
      <button className="download_button" onClick={handleDownloadPDF}>
        Download PDF
      </button>

      <div
        ref={canvasRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={mainDivStyle}
      >
        {sections.map((section, index) => {
          const divid = "dummy" + index; // ✅ declare here

          return (
            <div
              ref={sectionRef}
              key={section[1].thisClassName}
              draggable
              onDragStart={(e) => handleDragStart(e, section[1].thisClassName)}
              style={{
                position: "absolute",
                left: section[1].sectionPosition.startXPosition,
                top: section[1].sectionPosition.startYPosition,
                cursor: "grab",
              }}
            >
              <div id={divid} style={{ color: "yellow" }}>
                {section[1].sectionNameLabel}
              </div>
              {section.component}
            </div>
          );
        })}
      </div>
    </>
  );
}
