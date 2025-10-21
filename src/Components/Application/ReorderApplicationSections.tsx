
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

import ApplicantInfo from "./ApplicantInfo";
import Customerinfo from "./Customerinfo";
import ApplicationJobTitle from "./ApplicationJobTitle";
import ApplicationDate from "./ApplicationDate";
import ApplicationContent from "./ApplicationContent";

// --- CONFIG ---
const COLUMN_WIDTHS = [200, 200, 200, 200];
 //const COLUMN_WIDTHS = [50, 300, 300, 50];
const ROW_HEIGHT = 50;

// --- TYPES ---
interface Section {
  id: string;
  label: string;
  component: React.ReactNode;
  x: number; // grid column start
  y: number; // grid row start
  w: number; // width in columns
  h: number; // height in rows
}

// --- HELPERS ---
/* function getColumnBoundaries(columnWidths: number[]): number[] {
  const starts = [0];
  for (const w of columnWidths) starts.push(starts[starts.length - 1] + w);
  return starts;
} */

/* function calculateGridX(leftPx: number, boundaries: number[]): number {
  for (let i = 0; i < boundaries.length - 1; i++) {
    if (leftPx < boundaries[i + 1]) return i;
  }
  return boundaries.length - 2;
} */

/* function sectionsOverlap(a: Section, b: Section) {
  const noOverlap =
    a.x + a.w <= b.x ||
    b.x + b.w <= a.x ||
    a.y + a.h <= b.y ||
    b.y + b.h <= a.y;
  return !noOverlap;
} */

/* function resolveCollisions(sections: Section[], movedId: string): Section[] {
  const moved = sections.find(s => s.id === movedId)!;
  const others = sections.filter(s => s.id !== movedId);

  const updated = others.map(s => {
    if (sectionsOverlap(moved, s)) {
      return { ...s, y: moved.y + moved.h }; // push down
    }
    return s;
  });

  return [moved, ...updated];
} */

// --- MAIN COMPONENT ---
export default function DraggableGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  //const boundaries = getColumnBoundaries(COLUMN_WIDTHS);

  const [sections, setSections] = useState<Section[]>([
    { id: "applicant", label: "Applicant Info", component: <ApplicantInfo />, x: 0, y: 0, w: 2, h: 2 },
    { id: "customer", label: "Customer Info", component: <Customerinfo />, x: 0, y: 4, w: 2, h: 1 },
    { id: "job", label: "Job Title", component: <ApplicationJobTitle />, x: 0, y: 9, w: 2, h: 1 },
    { id: "date", label: "Application Date", component: <ApplicationDate />, x: 0, y: 13, w: 2, h: 0 },
    { id: "content", label: "Application Content", component: <ApplicationContent />, x: 0, y: 17, w: 4, h: 1 },
  ]);

  // const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const refs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    setSections(prev =>
      prev.map(section => {
        const el = refs.current.get(section.id);
        if (!el) return section;
        const w = calculateW(el.offsetWidth, COLUMN_WIDTHS) - 1;
        const h = calculateH(el.scrollHeight, ROW_HEIGHT) - 1;
        return { ...section, w, h };
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

  const handleDragEnd = (id: string, event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDraggingId(null);
    if (!gridRef.current) return;

    /*    const gridRect = gridRef.current.getBoundingClientRect();
       const leftPx = info.point.x - gridRect.left;
       const topPx = info.point.y - gridRect.top;
   
       // Snap to grid
       let x = calculateGridX(leftPx, boundaries);
   
   
       let y = Math.floor(topPx / ROW_HEIGHT) - 1; */
    let w = 0;
    let h = 0;

    const el = refs.current.get(id);
    if (el) {
      w = calculateW(el.offsetWidth, COLUMN_WIDTHS) - 1;
      h = calculateH(el.scrollHeight, ROW_HEIGHT) - 1;
    }


    setSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, w, h } : section
      )
    );

    /* setSections(prev => {
      const movedSections = prev.map(section =>
        section.id === id ? { ...section, x, y } : section
      );
      return resolveCollisions(movedSections, id);
    }); */
  };

  // --- RENDER ---
  return (
    <div
      ref={gridRef}
      style={{
        display: "grid",
        gridTemplateColumns: COLUMN_WIDTHS.map(w => `${w}px`).join(" "),
        gridAutoRows: `${ROW_HEIGHT}px`,
        gap: "10px",
        maxWidth: `${COLUMN_WIDTHS.reduce((a, b) => a + b, 0)}px`,
        margin: "0 auto",
        background: "#f0f0f0",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <AnimatePresence>
        {sections.map(section => (
          <motion.div
            key={section.id}
            ref={el => {
              if (el) refs.current.set(section.id, el);
            }}
            layout
            drag
            dragConstraints={gridRef}
            onDragStart={() => handleDragStart(section.id)}
            onDragEnd={(e, info) => handleDragEnd(section.id, e, info)}
            style={{
              gridColumnStart: section.x + 1,
              gridColumnEnd: section.x + 1 + section.w,
              gridRowStart: section.y + 1,
              gridRowEnd: section.y + 1 + section.h,
              backgroundColor:
                draggingId === section.id ? "#d0ebff" : "#ffffff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              cursor: "grab",
              boxShadow:
                draggingId === section.id
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
              ⠿ {section.label}

            </div>
            <div style={{ flex: 1, userSelect: "none" }}>{section.component}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
