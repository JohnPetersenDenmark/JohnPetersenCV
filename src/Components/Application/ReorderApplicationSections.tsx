import React, { useRef, useEffect, useState, useCallback } from "react";
import ApplicantInfo from "./ApplicantInfo";
import EmployerInfo from "./EmployerInfo";
import ApplicationJobTitle from "./ApplicationJobTitle";
import ApplicationDate from "./ApplicationDate"; 
import ApplicantContent from "./ApplicationContent";
import { CopyApplicationDataToNew } from "../../GlobalData/GlobalApplicationData";
import { SectionPosition } from "../../Classes/ClassesApplicationData";
import { useApplicationData } from "../../GlobalData/GlobalApplicationDataContext";
import { applicationAutoArrangeSections } from "./ApplicationAutoArrangeSections";
import { useCVData } from "../../GlobalData/GlobalCVDataContext";

// import bg1 from "../../assets/resize.svg";

import { ReactComponent as Bg1 } from "../../assets/resize.svg";

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
  const keepFromPDFRef = useRef<HTMLDivElement>(null);


  const componentMap: Record<string, React.FC> = {
    EmployerInfo,
    ApplicationJobTitle,
    ApplicationDate,
    ApplicantContent,
    ApplicantInfo,
  };

  const { currentApplicationData, setCurrentApplicationData } = useApplicationData();
  const [isResizing, setIsResizing] = useState(false);
  // const [PDFConversion, setPDFConversion] = useState(true);
  // const [draggingId, setDraggingId] = useState<string | null>(null);

  const [sections, setSections] = useState<any[]>(
    Object.entries(currentApplicationData).filter(
      ([key]) => key !== "ApplicantContentHeadline" && key !== "CssStyles"
    )
  );

  const [update, forceUpdate] = useState(0);

  // const lastDropRef = useRef<{ time: number; id: string | null }>({ time: 0, id: null });

  // Build dynamic components
 /*  for (let g = 0; g < sections.length; g++) {
    let tmpSection = sections[g];
    let componentName =
      tmpSection[1].thisClassName === "ApplicantContent"
        ? "ApplicationContent"
        : tmpSection[1].thisClassName;
    const Component = componentMap[componentName];  
  } */

  // ---------- Styles ----------
  const mainDivStyle: React.CSSProperties = {
    position: "absolute",
    top: '100px',
    left: '60px',
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

  function complementaryColor(hexColor: string) {
    const num = parseInt(hexColor.slice(1), 16);
    const r = 255 - (num >> 16);
    const g = 255 - ((num >> 8) & 0xff);
    const b = 255 - (num & 0xff);

    let newColor = '#' + r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0")

    return (newColor

    );
  }


  // ---------- Drag Start ----------
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: string) => {
      e.stopPropagation();
      // setDraggingId(id);

      const section = sections.find(([_, v]) => v.thisClassName === id)?.[1];
      if (!section || !canvasRef.current) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({ id, offsetX, offsetY })
        //   JSON.stringify({ id, startX, startY })

      );

      //  console.log(JSON.stringify({ id, startX, startY }));
      // console.log(JSON.stringify({ id, offsetX, offsetY }));


    },
    [sections]
  );

  // ---------- Drop Handler (React-state version) ----------
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, destination: "main" | "keepFromPDF") => {
      e.preventDefault();
      if (!canvasRef.current) return;

      //  const now = Date.now();


      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      const { id, offsetX, offsetY } = data;

      // if (lastDropRef.current.id === id && now - lastDropRef.current.time < 200) {

      /*    let tmpTid = now - (lastDropRef.current.time);
         if (now - (lastDropRef.current.time) < 10000) {
           return; // ignore second run
         }
   
         lastDropRef.current = { time: now, id }; */

      let newX = 0;
      let newY = 0;

      if (destination === 'main') {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        newX = e.clientX - canvasRect.left - offsetX;
        newY = e.clientY - canvasRect.top - offsetY;
      }
      else {
        let keepFromPDFRect = null;
        if (keepFromPDFRef.current !== null) {
          keepFromPDFRect = keepFromPDFRef.current.getBoundingClientRect();
        }

        if (keepFromPDFRect !== null) {
          newX = e.clientX - keepFromPDFRect.left - offsetX;
          newY = e.clientY - keepFromPDFRect.top - offsetY;
        }

      }
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
      tmpCopy[sectionKey] = { ...appSection, sectionPosition: updatedPos, sectionContainerDiv: destination };

      setCurrentApplicationData(tmpCopy);
    },
    // [dummyYes, setDummyYes]
    [currentApplicationData, setCurrentApplicationData]
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

  const handleAutoArrange = () => {
    const tmpCopy = CopyApplicationDataToNew(currentApplicationData);
    let newCurrentAppData = applicationAutoArrangeSections(tmpCopy)
    setCurrentApplicationData(newCurrentAppData)


    setSections(Object.entries(newCurrentAppData).filter(
      ([key]) => key !== "ApplicantContentHeadline" && key !== "CssStyles"
    ))


    //forceUpdate(c => c + 1);
  }

  const handleDownloadPDF = () => {
    const canvasEl = canvasRef.current;
    if (!canvasEl || !window.convertHTMLToPDFWithCallback) return;

    const hiddenElements: HTMLElement[] = [];

    sections.forEach((section, index) => {
      let id = section[1].thisClassName + "Dummy";
      let el = document.getElementById(id);
      if (el) {
        el.style.display = "none";
        hiddenElements.push(el);
      }
    })

    sections.forEach((section, index) => {
      let id = section[1].thisClassName + "MoreDummy";
      let el = document.getElementById(id);
      if (el) {
        el.style.display = "none";
        hiddenElements.push(el);
      }
    })


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
    })


  }




  const mainSections = sections.filter(([_, s]) => s.sectionContainerDiv === "main");
  const keepFromPDFSections = sections.filter(([_, s]) => s.sectionContainerDiv === "keepFromPDF");


  // ---------- Render ----------
  return (
    <>
      <button className="download_button" onClick={handleDownloadPDF}>
        Download PDF
      </button>

      <button className="download_button" onClick={handleAutoArrange}>
        Autoarranger
      </button>

      <div
        id="main"
        ref={canvasRef}
        onDrop={(e) => handleDrop(e, "main")}
        onDragOver={handleDragOver}
        // className="relative flex-1 min-h-[600px] bg-gray-800 border-2 border-gray-600 rounded-xl"
        style={mainDivStyle}
      >
        {/* <h3 className="text-white p-2">Main</h3> */}
        {mainSections.map(([key, section]) => (

          <div
            // ref={sectionRef}
            key={section.thisClassName}
            draggable
            onDragStart={(e) => handleDragStart(e, section.thisClassName)}
            className="absolute cursor-grab rounded-lg border border-gray-700"
            style={{
              position: "absolute",
              left: section.sectionPosition.startXPosition,
              top: section.sectionPosition.startYPosition,
              width: section.sectionPosition.width,
              height: section.sectionPosition.height,
              backgroundColor: section?.cssStyles?.backgroundColor || "#222",
            }}
          >


            <div className="text-yellow-400">
              <div
                id={section.thisClassName + 'MoreDummy'}
                style={{
                  borderStyle: 'solid',
                  borderWidth: '0px',
                  fontWeight: 700,
                  color: section.cssStyles.backgroundColor,
                  backgroundColor: complementaryColor(section.cssStyles.backgroundColor)
                }}
              >
                {section.sectionNameLabel}
              </div>

              <div>


                {componentMap[section.thisClassName] &&
                  React.createElement(componentMap[section.thisClassName])
                }
              </div>



              <div

                id={section.thisClassName + 'Dummy'}
                onMouseDown={(e) =>
                  startResize(e, section.thisClassName)
                }
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "25px",
                  height: "25px",
                  cursor: "se-resize",
                  color: 'Green',
                  // backgroundColor: 'transparent'
                  // backgroundColor: complementaryColor(section.cssStyles.backgroundColor)
                }}
              >

                <Bg1 style={{ color: complementaryColor(section.cssStyles.backgroundColor), height: '20px', width: '20px' }} />

                {/*  <img
                  src={bg1}
                  alt="resize"
                  style={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                /> */}
              </div>
            </div>
          </div>
        ))}
      </div>



      <div
        ref={keepFromPDFRef}
        id="keepFromPDF"
        onDrop={(e) => handleDrop(e, "keepFromPDF")}
        onDragOver={handleDragOver}
        style={{
          position: "absolute",
          left: 1100,
          top: 100,
          width: "794px",
          height: "1123px",
          cursor: "grab",
          backgroundColor: '#f5f0f0',
        }}
      // className="relative flex-1 min-h-[600px] bg-gray-700 border-2 border-gray-500 rounded-xl"
      >
        <h3 className="text-white p-2">Keep From PDF</h3>
        {keepFromPDFSections.map(([key, section]) => (
          <div
            key={section.thisClassName}
            draggable
            onDragStart={(e) => handleDragStart(e, section.thisClassName)}
            className="absolute cursor-grab rounded-lg border border-gray-700"
            style={{
              position: "absolute",
              left: section.sectionPosition.startXPosition,
              top: section.sectionPosition.startYPosition,
              width: section.sectionPosition.width,
              height: section.sectionPosition.height,
              backgroundColor: section?.cssStyles?.backgroundColor || "#333",
            }}
          >
            <div className="text-yellow-400">{section.sectionNameLabel}</div>
            <div>
              {/* {section.component} */}
               {componentMap[section.thisClassName] &&
                  React.createElement(componentMap[section.thisClassName])
                }
            </div>
          </div>
        ))}
      </div>

      {/* </div> */}
    </>
  );
}
