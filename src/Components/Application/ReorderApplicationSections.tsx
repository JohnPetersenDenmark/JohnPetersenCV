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
  const [isResizing, setIsResizing] = useState(false);
 

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
   // background: 'Yellow',
    margin: "20px auto",
    border: "2px dashed #ccc",
    borderRadius: "12px",
    /* 🟩 GRID PATTERN */
    backgroundImage: `
      linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
    `,
    backgroundSize: "20px 20px", // grid spacing in pixels
  }

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
    e.stopPropagation();

    const section = sections.find(([_, v]) => v.thisClassName === id)?.[1];
    if (!section || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();

    // The element’s known position relative to the canvas
    const startX = section.sectionPosition.startXPosition;
    const startY = section.sectionPosition.startYPosition;

    // Compute mouse offset relative to that logical start point
    const offsetX = e.clientX - (canvasRect.left + startX);
    const offsetY = e.clientY - (canvasRect.top + startY);

    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ id, offsetX, offsetY })
    );
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
        return [key, { ...value, sectionPosition: { ...value.sectionPosition, startXPosition: newX, startYPosition: newY } }];
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



  const startResize = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation(); // prevent triggering drag
    e.preventDefault();

    setIsResizing(true);

    const target = e.currentTarget.parentElement as HTMLDivElement;
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = target.offsetWidth;
    const startHeight = target.offsetHeight;

    const doResize = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(50, startWidth + (moveEvent.clientX - startX));
      const newHeight = Math.max(40, startHeight + (moveEvent.clientY - startY));

      /* const newWidth = 0;
      const newHeight = 0; */

      setSections((prev) =>
        prev.map(([key, value]) => {
          if (value.thisClassName !== id) return [key, value];
          return [
            key,
            {
              ...value,
              sectionPosition: {
                ...value.sectionPosition,
                width: newWidth,
                height: newHeight,
              },
            },
          ];
        })
      );

      let tmpCopy = CopyApplicationDataToNew(currentApplicationData);
      const sectionKey = id;
      // @ts-ignore   
      const appSection = tmpCopy[sectionKey];

      const oldStartXPosition = appSection.sectionPosition.startXPosition;
      const oldStartYPosition = appSection.sectionPosition.startYPosition;

      const updatedPos = Object.assign(new SectionPosition(), appSection.sectionPosition, {
        width: newWidth,
        height: newHeight,
        startXPosition: oldStartXPosition,
        startYPosition: oldStartYPosition,
      });

      // @ts-ignore   
      tmpCopy[sectionKey] = { ...appSection, sectionPosition: updatedPos };
      setCurrentApplicationData(tmpCopy)

    };

    const stopResize = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", doResize);
      window.removeEventListener("mouseup", stopResize);
    };

    window.addEventListener("mousemove", doResize);
    window.addEventListener("mouseup", stopResize);
  };



  return (
    <>
      <button className="download_button" onClick={handleDownloadPDF}>
        Download PDF
      </button>

      <div
        ref={canvasRef}
        onDragOver={handleDragOver}
        onDrop={(e) => {
          handleDrop(e);
        
        }}
        style={mainDivStyle}
      >

     
        {sections.map((section, index) => {
          const divid = "dummy" + index; // ✅ declare here

          return (
            <div
              ref={sectionRef}
              key={section[1].thisClassName}
              draggable={!isResizing} // 🟢 disable drag if resizing
              onDragStart={(e) => {
                handleDragStart(e, section[1].thisClassName);
                
              }}
              
              style={{
                position: "absolute",
                left: section[1].sectionPosition.startXPosition,
                top: section[1].sectionPosition.startYPosition + (4 * index * ROW_HEIGHT),
                width: section[1].sectionPosition.width,
                height: section[1].sectionPosition.height,
                cursor: "grab",
                backgroundColor: section[1]?.cssStyles?.backgroundColor
              }}
            >
              <div id={divid} style={{ color: "yellow" }}>
                {section[1].sectionNameLabel}
              </div>
              {section.component}


              <div
                onMouseDown={(e) =>
                  startResize(e, section[1].thisClassName)
                }
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "50px",
                  height: "50px",
                  background: currentApplicationData?.CssStyles?.backgroundColor,
                  borderRadius: "2px",
                  cursor: "se-resize",
                }}
              ></div>




            </div>
          );
        })}
      </div>
    </>
  );
}
