import React, { useRef, useEffect, useState, useCallback } from "react";
import ApplicantInfo from "./ApplicantInfo";
import EmployerInfo from "./EmployerInfo";
import ApplicationJobTitle from "./ApplicationJobTitle";
import ApplicationDate from "./ApplicationDate";
import ApplicationContent from "./ApplicationContent";
import { CopyApplicationDataToNew } from "../../GlobalData/GlobalApplicationData";
import { SectionPosition } from "../../Classes/ClassesApplicationData";
import { useApplicationData } from "../../GlobalData/GlobalApplicationDataContext";
import { useCVData } from "../../GlobalData/GlobalCVDataContext";

import bg1 from "../../assets/resize.svg";

declare global {
  interface Window {
    convertHTMLToPDFWithCallback?: (
      htmlContent: string,
      callback: (pdfBlob: Blob) => void
    ) => void;
  }
}

// --- CONFIG ---
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
  const [PDFConversion, setPDFConversion] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [sections, setSections] = useState<any[]>(
    Object.entries(currentApplicationData).filter(
      ([key]) => key !== "ApplicantContentHeadline" && key !== "CssStyles"
    )
  );

  // Build dynamic components
  for (let g = 0; g < sections.length; g++) {
    let tmpSection = sections[g];
    let componentName =
      tmpSection[1].thisClassName === "ApplicantContent"
        ? "ApplicationContent"
        : tmpSection[1].thisClassName;
    const Component = componentMap[componentName];
    const component = Component ? <Component /> : null;
    tmpSection.component = component;
  }

  // ---------- Styles ----------
  const mainDivStyle: React.CSSProperties = {
    position: "relative",
    width: "794px",
    height: "1123px",
    background: currentApplicationData?.CssStyles?.backgroundColor ?? "Blue",
    margin: "20px auto",
    border: "2px dashed #ccc",
    borderRadius: "12px",
    backgroundImage: `
      linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
    `,
    backgroundSize: "20px 20px",
  };

  // ---------- Drag Start ----------
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: string) => {
      e.stopPropagation();
      setDraggingId(id);

      const section = sections.find(([_, v]) => v.thisClassName === id)?.[1];
      if (!section || !canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const startX = section.sectionPosition.startXPosition;
      const startY = section.sectionPosition.startYPosition;
      const offsetX = e.clientX - (canvasRect.left + startX);
      const offsetY = e.clientY - (canvasRect.top + startY);

      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({ id, offsetX, offsetY })
      );
    },
    [sections]
  );

  // ---------- Drop Handler (React-state version) ----------
  const handleDrop = useCallback(
     (e: React.DragEvent<HTMLDivElement>, destination: "main" | "keepFromPDF") => {
      e.preventDefault();
      if (!canvasRef.current) return;

      let yx = e.currentTarget.getAttribute('id')
      let x = yx;
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      const { id, offsetX, offsetY } = data;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - canvasRect.left - offsetX;
      const newY = e.clientY - canvasRect.top - offsetY;

      // Update local UI state
      setSections((prev) =>
      prev.map(([key, value]) =>
        value.thisClassName === id
          ? [
              key,
              {
                ...value,
                sectionPosition: {
                  ...value.sectionPosition,
                  startXPosition: newX,
                  startYPosition: newY,
                },
                sectionContainerDiv: destination, // <- update container
              },
            ]
          : [key, value]
      )
    );

      // Update global app data
      const tmpCopy = CopyApplicationDataToNew(currentApplicationData);
      const sectionKey = id
      // @ts-ignore   
      const appSection = tmpCopy[sectionKey];
      const updatedPos = Object.assign(
        new SectionPosition(),
        appSection.sectionPosition,
        {
          startXPosition: newX,
          startYPosition: newY,
        }
      );
      // @ts-ignore   
      tmpCopy[sectionKey] = { ...appSection, sectionPosition: updatedPos , sectionContainerDiv: destination};
        
      setCurrentApplicationData(tmpCopy);
    },
     []
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  // ---------- Resize ----------
  const startResize = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
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

      setSections((prev) =>
        prev.map(([key, value]) =>
          value.thisClassName === id
            ? [
                key,
                {
                  ...value,
                  sectionPosition: {
                    ...value.sectionPosition,
                    width: newWidth,
                    height: newHeight,
                  },
                },
              ]
            : [key, value]
        )
      );

      const tmpCopy = CopyApplicationDataToNew(currentApplicationData);
      const sectionKey = id 
       // @ts-ignore   
      const appSection = tmpCopy[sectionKey];
      const updatedPos = Object.assign(
        new SectionPosition(),
        appSection.sectionPosition,
        {
          width: newWidth,
          height: newHeight,
        }
      );
       // @ts-ignore   
      tmpCopy[sectionKey] = { ...appSection, sectionPosition: updatedPos };
      setCurrentApplicationData(tmpCopy);
    };

    const stopResize = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", doResize);
      window.removeEventListener("mouseup", stopResize);
    };

    window.addEventListener("mousemove", doResize);
    window.addEventListener("mouseup", stopResize);
  };

  // ---------- PDF Download ----------
  const handleDownloadPDF = () => {
    const canvasEl = canvasRef.current;
    if (!canvasEl || !window.convertHTMLToPDFWithCallback) return;

    const hiddenElements: HTMLElement[] = [];

    sections.forEach((section, index) => {
      let id = "dummy" + index;
      let el = document.getElementById(id);
      if (el) {
        el.style.display = "none";
        hiddenElements.push(el);
      }

      id = "moredummy" + index;
      el = document.getElementById(id);
      if (el) {
        el.style.display = "none";
        hiddenElements.push(el);
      }
    });

    const div = canvasRef.current;
    if (!div) return;

    div.style.removeProperty("background-size");
    const hiddenSectionContainerDiv = document.getElementById("keepFromPDF");
    if (hiddenSectionContainerDiv)
      hiddenSectionContainerDiv.style.display = "none";

    window.convertHTMLToPDFWithCallback(div.outerHTML, (pdfBlob: Blob) => {
      hiddenElements.forEach((el) => {
        el.style.display = "";
      });
      div.style.backgroundImage = `
        linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
      `;
      div.style.backgroundSize = "20px 20px";
      if (hiddenSectionContainerDiv)
        hiddenSectionContainerDiv.style.display = "block";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "my_application.pdf";
      link.click();
    });
  };

  // ---------- Render ----------
  return (
    <>
      <button className="download_button" onClick={handleDownloadPDF}>
        Download PDF
      </button>

      <div
        id="main"
        ref={canvasRef}
        onDragOver={handleDragOver}
       onDrop={(e) => handleDrop(e, "main")} // ← here destination = "keepFromPDF"
        style={mainDivStyle}
      >
        <div
          id="keepFromPDF"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "keepFromPDF")} // ← here destination = "keepFromPDF"
          style={{
            position: "absolute",
            left: 50,
            top: 50,
            width: "400px",
            height: 200,
            cursor: "grab",
            backgroundColor: "Red",
          }}
        ></div>

        {sections.map((section, index) => {
          const divid = "dummy" + index;
          const divid1 = "moredummy" + index;
          return (
            <div
              ref={sectionRef}
              key={section[1].thisClassName}
              draggable={!isResizing}
              onDragStart={(e) =>
                handleDragStart(e, section[1].thisClassName)
              }
              style={{
                position: "absolute",
                left: section[1].sectionPosition.startXPosition,
                top:
                  section[1].sectionPosition.startYPosition +
                  4 * index * ROW_HEIGHT,
                width: section[1].sectionPosition.width,
                height: section[1].sectionPosition.height,
                cursor: "grab",
                backgroundColor: section[1]?.cssStyles?.backgroundColor,
              }}
            >
              <div id={divid} style={{ color: "yellow" }}>
                {section[1].sectionNameLabel}
              </div>
              {section.component}

              <div
                id={divid1}
                onMouseDown={(e) =>
                  startResize(e, section[1].thisClassName)
                }
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "25px",
                  height: "25px",
                  cursor: "se-resize",
                }}
              >
                <img
                  src={bg1}
                  alt="resize"
                  style={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
