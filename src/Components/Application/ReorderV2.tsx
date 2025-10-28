
import React, { useRef, useEffect, useState } from "react";
//import { motion, AnimatePresence, PanInfo } from "framer-motion";

import ApplicantInfo from "./ApplicantInfo";
import EmployerInfo from "./EmployerInfo";
import ApplicationJobTitle from "./ApplicationJobTitle";
import ApplicationDate from "./ApplicationDate";
import ApplicationContent from "./ApplicationContent";

import { CopyApplicationDataToNew } from "../../GlobalData/GlobalApplicationData";

import { SectionPosition } from "../../Classes/ClassesApplicationData";
import ApplicationPDF from "./ApplicationPDF";

import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';

import { ApplicantInfo as ApplicantInfoClass, Section } from "../../Classes/ClassesApplicationData";
import { EmployerInfo as EmployerInfoClass } from "../../Classes/ClassesApplicationData";
import { ApplicationJobTitle as ApplicationJobTitleClass } from "../../Classes/ClassesApplicationData";
import { ApplicationDate as ApplicationDateClass } from "../../Classes/ClassesApplicationData";
import { ApplicantContent as ApplicantContentClass } from "../../Classes/ClassesApplicationData";

declare global {
  interface Window {
    convertHTMLToPDFWithCallback?: (htmlContent: string, callback: (pdfBlob: Blob) => void) => void;
  }
}

// --- CONFIG ---
const COLUMN_WIDTHS = [50, 400, 400, 50];
//const COLUMN_WIDTHS = [50, 300, 300, 50];
const ROW_HEIGHT = 50;

// --- MAIN COMPONENT ---
export default function ReorderV2() {
  const canvasRef = useRef<HTMLDivElement>(null);

  const componentMap: Record<string, React.FC> = {

    EmployerInfo,
    ApplicationJobTitle,
    ApplicationDate,
    ApplicationContent,
    ApplicantInfo,
  };

  const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

  //const [sections, setSections] = useState<any[]>(Object.entries(currentApplicationData))

  const [sections, setSections] = useState<any[]>(
    Object.entries(currentApplicationData).filter(([key]) => key !== "ApplicantContentHeadline")
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

  const refs = useRef<Map<string, HTMLDivElement>>(new Map());

  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());


  useEffect(() => {
    if (!currentApplicationData) return;

    // --- 1️⃣ Create a copy upfront
    let tmpCopy = CopyApplicationDataToNew(currentApplicationData);

    // --- 2️⃣ Update all section positions
    const updatedSections = sections.map((section, index) => {
      const el = refs.current.get(section[1].thisClassName);
      if (!el) return section;

      const sectionRect = el.getBoundingClientRect();
      if (!canvasRef.current) return section;
      const gridRect = canvasRef.current.getBoundingClientRect();

      const contentEl = contentRefs.current.get(section[1].thisClassName + index);
      if (!contentEl) return section;
      const contentRect = contentEl.getBoundingClientRect();

      const relativeX = contentRect.left - gridRect.left;
      const relativeY = contentRect.top - gridRect.top;

     /*  const startRow = Math.floor(relativeY / ROW_HEIGHT);
      const startColumn = calculateColumnFromX(relativeX, COLUMN_WIDTHS);
      const widthInColumns = calculateColumnsSpanned(contentRect.width, COLUMN_WIDTHS, startColumn);
      const heightInRows = Math.ceil(sectionRect.height / ROW_HEIGHT); */

      const updatedPos = Object.assign(new SectionPosition(), section[1].sectionPosition, {
        width: 0,
        height: 0,
        startColumn : relativeX ,
        startRow : relativeY,
      });


      // @ts-ignore 
      const sectionKey = section[1].thisClassName;
      // @ts-ignore   
      const appSection = tmpCopy[sectionKey];
      // @ts-ignore   
      tmpCopy[sectionKey] = { ...appSection, sectionPosition: updatedPos };

      return [section[0], { ...section[1], sectionPosition: updatedPos }];

      // return section;
    });

    // --- 3️⃣ Commit both updates once
    //
    setSections(updatedSections);
    setCurrentApplicationData(tmpCopy);

  }, []);


/* 
  function calculateColumnFromX(x: number, columnWidths: number[]): number {
    let total = 0;
    for (let i = 0; i < columnWidths.length; i++) {
      total += columnWidths[i];
      if (x < total) return i; // 0-based column index
    }
    return columnWidths.length - 1; // last column if overflow
  }

  function calculateColumnsSpanned(width: number, columnWidths: number[], startColumn: number): number {
    let remainingWidth = width;
    let span = 0;
    for (let i = startColumn; i < columnWidths.length; i++) {
      remainingWidth -= columnWidths[i];
      span++;
      if (remainingWidth <= 0) break;
    }
    return span;
  }

  function calculateW(elementWidth: number, columnWidths: number[]): number {
    let remaining = elementWidth;
    let count = 0;
    for (const w of columnWidths) {
      remaining -= w;
      count++;
      if (remaining <= 0) break;
    }
    return count;
  }
 */


  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.dataTransfer.setData("text/plain", JSON.stringify({
      id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    }));
  };

  /* const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    if (!canvasRef.current) return;

    const gridRect = canvasRef.current.getBoundingClientRect();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { offsetX, offsetY } = data;

    const newX = e.clientX - gridRect.left - offsetX;
    const newY = e.clientY - gridRect.top - offsetY;

    setSections(prev =>
      prev.map(([key, value]) => {
        if (value.thisClassName !== id) return [key, value];
        return [key, { ...value, position: { x: newX, y: newY } }];
      })
    );
  };

  */




  let noConversion = true;
  function handleDownloadPDF() {
    
       if (window.convertHTMLToPDFWithCallback && canvasRef.current) {
         let noConversion = false;
         window.convertHTMLToPDFWithCallback(canvasRef.current.outerHTML, (pdfBlob) => {
   
           console.log("PDF Blob received:", pdfBlob);
   
           // Trigger download
           const link = document.createElement("a");
           link.href = URL.createObjectURL(pdfBlob);
           link.download = "my_application.pdf";
           link.click();
           let noConversion = true;
         }); 
        }
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
        return [key, { ...value, sectionPosition: { startColumn: newX, startRow: newY } }];
      })
    );
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
          width: "1000px",
          height: "800px",
          margin: "20px auto",
          background: "#f0f0f0",
          border: "2px dashed #ccc",
          borderRadius: "12px",
        }}
      >
        {sections.map(( section) => (
          <div
            key={section[1].thisClassName}
            draggable
            onDragStart={e => handleDragStart(e, section[1].thisClassName)}
            style={{
              position: "absolute",
              left: section[1].sectionPosition.startColumn,
              top: section[1].sectionPosition.startRow,
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              cursor: "grab",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            {section.component}
          </div>
        ))}
      </div>
    </>
  );
}
