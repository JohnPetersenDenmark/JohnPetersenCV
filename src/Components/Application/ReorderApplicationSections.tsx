
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

import ApplicantInfo from "./ApplicantInfo";
import CustomerInfo from "./Customerinfo";
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
const COLUMN_WIDTHS = [200, 200, 200, 200];
//const COLUMN_WIDTHS = [50, 300, 300, 50];
const ROW_HEIGHT = 50;

// --- MAIN COMPONENT ---
export default function ReorderApplicationSections() {
  const gridRef = useRef<HTMLDivElement>(null);

  const componentMap: Record<string, React.FC> = {

    CustomerInfo,
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
        const el = refs.current.get(section[1].sectionName);
        if (!el) return section;

        const w = calculateW(el.offsetWidth, COLUMN_WIDTHS) - 1;
        const h = calculateH(el.scrollHeight, ROW_HEIGHT) - 1;

        const Component = componentMap[section[1].thisClassName];
        const component = Component ? <Component /> : null;

        // ✅ Safely copy and update nested class instance
        const updatedPos = Object.assign(
          new SectionPosition(),
          section[1].sectionPosition,
          { width: w, height: h }
        );

        return {
          ...section,
          sectionPosition: updatedPos,
          component,
        };
      })
    );
  }, []);


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

  function calculateH(elementHeight: number, rowHeight: number): number {
    return Math.ceil(elementHeight / rowHeight);
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

    // Get element
    const el = refs.current.get(id);
    const w = el ? calculateW(el.offsetWidth, COLUMN_WIDTHS) - 1 : 0;
    const h = el ? calculateH(el.scrollHeight, ROW_HEIGHT) - 1 : 0;

    setSections(prev =>
      prev.map(section => {
        if (section.sectionName !== id) return section; // leave unchanged

        // Get element
        const el = refs.current.get(section.sectionName);
        const w = el ? calculateW(el.offsetWidth, COLUMN_WIDTHS) - 1 : 0;
        const h = el ? calculateH(el.scrollHeight, ROW_HEIGHT) - 1 : 0;

        // Create updated SectionPosition
        const updatedPos = Object.assign(
          new SectionPosition(),
          section.sectionPosition,
          { width: w, height: h }
        );

        // Attach dynamic component if needed
        const Component = componentMap[section.thisClassName ?? section.sectionName];
        const component: React.ReactNode = Component ? <Component /> : null;

        // Return updated section object
        return {
          ...section,
          sectionPosition: updatedPos,
          component,
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
              key={section[1].sectionName}
              ref={el => {
                if (el) refs.current.set(section[1].sectionName, el);
              }}
              layout
              drag
              dragConstraints={gridRef}
              onDragStart={() => handleDragStart(section[1].sectionName)}
              onDragEnd={(e, info) => handleDragEnd(section[1].sectionName, e, info)}
              style={{
                gridColumnStart: section.x + 1,
                gridColumnEnd: section.x + 1 + section.w,
                gridRowStart: section.y + 1,
                gridRowEnd: section.y + 1 + section.h,
                backgroundColor:
                  draggingId === section[1].sectionName ? "#d0ebff" : "#ffffff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                cursor: "grab",
                boxShadow:
                  draggingId === section[1].sectionName
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
