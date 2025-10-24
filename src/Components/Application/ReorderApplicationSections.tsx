
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

import ApplicantInfo from "./ApplicantInfo";
import EmployerInfo from "./EmployerInfo";
import ApplicationJobTitle from "./ApplicationJobTitle";
import ApplicationDate from "./ApplicationDate";
import ApplicationContent from "./ApplicationContent";

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
export default function ReorderApplicationSections() {
  const gridRef = useRef<HTMLDivElement>(null);

  const componentMap: Record<string, React.FC> = {

    EmployerInfo,
    ApplicationJobTitle,
    ApplicationDate,
    ApplicationContent,
    ApplicantInfo,
  };

  const { currentApplicationData, setCurrentApplicationData } = useApplicationData();
  const [sections, setSections] = useState<any[]>(Object.entries(currentApplicationData))

  const [PDFConversion, setPDFConversion] = useState(false);

  const refs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    setSections(prev =>
      prev.map(section => {
        const el = refs.current.get(section[1].thisClassName);
        if (!el) return section;
        const sectionRectangel = el.getBoundingClientRect();

        if (!gridRef.current) return; // ✅ check before using
        const gridRect = gridRef.current.getBoundingClientRect();


        const relativeX = sectionRectangel.left - gridRect.left;
        const relativeY = sectionRectangel.top - gridRect.top;

        const startRow = Math.floor(relativeY / ROW_HEIGHT);
        const startColumn = calculateColumnFromX(relativeX, COLUMN_WIDTHS)

        const widthInColumns = calculateColumnsSpanned(sectionRectangel.width, COLUMN_WIDTHS, startColumn);
        const heightInRows = Math.ceil(sectionRectangel.height / ROW_HEIGHT);

         const updatedPos = Object.assign(
          new SectionPosition(),
          section[1].sectionPosition,
          { width: widthInColumns, height: heightInRows, startColumn :  startColumn, startRow : startRow}
        );

    
        let componentName = '';

        if (section[1].thisClassName === 'ApplicantContent') {
          componentName = 'ApplicationContent';
        }
        else {
          componentName = section[1].thisClassName;
        }

        const Component = componentMap[componentName];
        const component = Component ? <Component /> : null;


        return {
          ...section,
          sectionPosition: updatedPos,
          component,
        };
      })
    );
  }, []);


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



  const [draggingId, setDraggingId] = useState<string | null>(null);

  // --- FRAMER MOTION DRAG HANDLERS ---
  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleDragEnd = (
    id: string,
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setDraggingId(null);
    if (!gridRef.current) return;

    const el = refs.current.get(id);
  
    // --- Get position of drop relative to grid ---
    const gridRect = gridRef.current.getBoundingClientRect();
    const relativeX = info.point.x - gridRect.left;
    const relativeY = info.point.y - gridRect.top;

    // --- Determine which column/row it was dropped into ---
    const startColumn = calculateColumnFromX(relativeX, COLUMN_WIDTHS);
    const startRow = Math.floor(relativeY / ROW_HEIGHT);

    // --- Update state ---
    setSections(prev =>
      prev.map(section => {
        if (section[1].thisClassName !== id) return section;

        const updatedPos = Object.assign(
          new SectionPosition(),
          section.sectionPosition,
          {
           /*  width: w,
            height: h, */
            startColumn,
            startRow,
          }
        );

        return {
          ...section,
          sectionPosition: updatedPos,

        };


      })
    );
  };




  let noConversion = true;
  function handleDownloadPDF() {
    // 5️⃣ Call GrabzIt to convert HTML → PDF
    if (window.convertHTMLToPDFWithCallback && gridRef.current) {
      let noConversion = false;
      window.convertHTMLToPDFWithCallback(gridRef.current.outerHTML, (pdfBlob) => {

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


  return (
    <>
      <button className="download_button" onClick={handleDownloadPDF}>
        Download PDF
      </button>

      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: COLUMN_WIDTHS.map(w => `${w}px`).join(" "),
          gridAutoRows: `${ROW_HEIGHT}px`,
          gap: "10px",
          maxWidth: `${COLUMN_WIDTHS.reduce((a, b) => a + b, 0)}px`,
          margin: "0 auto",
          background: "#00b8d7",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <AnimatePresence>
          {sections.map(section => (
            <motion.div
              key={section[1].thisClassName}
              ref={el => {
                if (el) refs.current.set(section[1].thisClassName, el);
              }}
              layout
              drag
              dragConstraints={gridRef}
              onDragStart={() => handleDragStart(section[1].thisClassName)}
              onDragEnd={(e, info) => handleDragEnd(section[1].thisClassName, e, info)}
              style={{
            /*    
                  gridColumnStart: section[1].sectionPosition.startColumn + 1,
                  gridColumnEnd: section[1].sectionPosition.startColumn + 1 + section[1].sectionPosition.width,
                  gridRowStart: section[1].sectionPosition.startRow + 1,
                  gridRowEnd: section[1].sectionPosition.startRow + 1 + section[1].sectionPosition.height, */
                backgroundColor:
                  draggingId === section[1].thisClassName ? "#d0ebff" : "#ffffff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                cursor: "grab",
                boxShadow:
                  draggingId === section[1].thisClassName
                    ? "0 4px 12px rgba(0,0,0,0.15)"
                    : "0 2px 6px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                transition: "background-color 0.2s ease",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  userSelect: "none",
                }}
              >
                {/* ⠿ {section.label} */}
                {noConversion && section[1].sectionNameLabel}

              </div>
              <div style={{ flex: 1, userSelect: "none" }}>{section.component}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
