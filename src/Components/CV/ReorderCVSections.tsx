import Motivation from './Motivation';
import Profile from './Profile';
import ContactInfo from './ContactInfo';
import Skills from './Skills';
import Education from './Education';
import Languages from './Languages';
import WorkingHistory from './WorkingHistory';
import Sparetime from './Sparetime';

import React, { useRef, useEffect, useState } from "react";


import { CopyCVDataToNew } from '../../GlobalData/GlobalCVData';
import { SectionPosition } from "../../Classes/ClassesApplicationData";
// import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import { useCVData } from '../../GlobalData/GlobalCVDataContext';

declare global {
  interface Window {
    convertHTMLToPDFWithCallback?: (htmlContent: string, callback: (pdfBlob: Blob) => void) => void;
  }
}

// --- CONFIG ---
const COLUMN_WIDTHS = [50, 400, 400, 50];
const ROW_HEIGHT = 50;

export default function ReorderCVSections() {

  const canvasRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const componentMap: Record<string, React.FC> = {

    Motivation,
    Profile,
    Skills, 
    Education,
    ContactInfo,
    Languages,
    WorkingHistory,
    Sparetime
  };

  const { currenrCVData, setCurrentCVData } = useCVData();
  

  const [useSectionHeaders, setUseSectionHeaders] = useState(true)

  const [sections, setSections] = useState<any[]>(
    Object.entries(currenrCVData).filter(([key]) => key !== "ApplicantContentHeadline")
  );

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
      const id = section[1].thisClassName + index;
      const el = canvasEl.querySelector<HTMLElement>("#" + CSS.escape(id));
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

    let tmpCopy = CopyCVDataToNew(currenrCVData);
    const sectionKey = id;
    // @ts-ignore   
    const appSection = tmpCopy[sectionKey];

    const updatedPos = Object.assign(new SectionPosition(), appSection.sectionPosition, {
      startXPosition: newX,
      startYPosition: newY,
    });

    // @ts-ignore   
    tmpCopy[sectionKey] = { ...appSection, sectionPosition: updatedPos };
    setCurrentCVData(tmpCopy)
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
        style={{
          position: "relative",
          width: "794px",
          height: "1123px",
          margin: "20px auto",
          background: "#f0f0f0",
          border: "2px dashed #ccc",
          borderRadius: "12px",
        }}
      >
        {sections.map((section, index) => (
          <div
            ref={sectionRef}
            key={section[1].thisClassName}
            
            draggable
            onDragStart={e => handleDragStart(e, section[1].thisClassName)}
            style={{
              position: "absolute",
              left: section[1].sectionPosition.startXPosition,
              top: section[1].sectionPosition.startYPosition,
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              cursor: "grab",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div
             id={section[1].thisClassName + index}
            style={{

              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              fontWeight: '700',
              fontSize: '20px',
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}>
              {useSectionHeaders ? section[1].sectionNameLabel : ''}
            </div>

            {section.component}
          </div>
        ))}
      </div>
    </>
  );
}
