import React, { useState, useRef } from "react";
import ApplicantInfo from "./ApplicantInfo";
import Customerinfo from "./Customerinfo";
import ApplicationJobTitle from "./ApplicationJobTitle";
import ApplicationDate from "./ApplicationDate";
import ApplicationContent from "./ApplicationContent";
import DropToDivElement from "../Common/DropToDivElement";

import "./ReorderApplicationSections.css";

interface Section {
  id: string;
  label: string;
  component: JSX.Element;
  w: number; // column span
  h: number; // row span (you can ignore if using auto height)
}

const COLUMN_WIDTHS = [130, 400, 400, 130]; // px
const GRID_COLUMNS = COLUMN_WIDTHS.length;

const INITIAL_SECTIONS: Section[] = [
  { id: "applicant", label: "Applicant Info", component: <ApplicantInfo />, w: 1, h: 1 },
  { id: "customer", label: "Customer Info", component: <Customerinfo />, w: 1, h: 1 },
  { id: "job", label: "Job Title", component: <ApplicationJobTitle />, w: 1, h: 1 },
  { id: "date", label: "Application Date", component: <ApplicationDate />, w: 1, h: 1 },
  { id: "content", label: "Application Content", component: <ApplicationContent />, w: 2, h: 1 },
   { id: "append", label: "Drop here", component: <DropToDivElement />, w: 1, h: 1 },
];

const ReorderApplicationSections: React.FC = () => {
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);
  const draggedSectionId = useRef<string | null>(null);

  // 🧩 Start dragging
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    draggedSectionId.current = id;
    e.dataTransfer.effectAllowed = "move";
  };

  // Allow drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  // Drop handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    if (!draggedSectionId.current) return;

    const draggedId = draggedSectionId.current;

    setSections((prev) => {
      const fromIndex = prev.findIndex((s) => s.id === draggedId);
      const dragged = prev[fromIndex];
      if (!dragged) return prev;

      const reordered = [...prev];
      reordered.splice(fromIndex, 1); // remove old position
      reordered.splice(targetIndex, 0, dragged); // insert at new position

      return reordered;
    });

    draggedSectionId.current = null;
  };

  // 🧮 Compute grid positions dynamically (flow layout)
  const computeGridPositions = (sections: Section[]) => {
    let x = 0;
    let y = 0;
    const positions: { [id: string]: { x: number; y: number } } = {};

    sections.forEach((s) => {
      if (x + s.w > GRID_COLUMNS) {
        x = 0;
        y += 1;
      }
      positions[s.id] = { x, y };
      x += s.w;
    });

    return positions;
  };

  const positions = computeGridPositions(sections);

  return (
    <div
      onDragOver={handleDragOver}
      style={{
        display: "grid",
        gridTemplateColumns: COLUMN_WIDTHS.map((w) => `${w}px`).join(" "),
        gridAutoRows: "minmax(auto, max-content)",
        gap: "10px",
        maxWidth: `${COLUMN_WIDTHS.reduce((a, b) => a + b, 0)}px`,
        margin: "0 auto",
      }}
    >
      {sections.map((section, index) => {
        const pos = positions[section.id];
        return (
          <div
            key={section.id}
            draggable
            onDragStart={(e) => handleDragStart(e, section.id)}
            onDrop={(e) => handleDrop(e, index)}
            style={{
              gridColumnStart: pos.x + 1,
              gridColumnEnd: pos.x + 1 + section.w,
              gridRowStart: pos.y + 1,
              gridRowEnd: pos.y + 2,
              backgroundColor: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              cursor: "grab",
              transition: "all 0.3s ease",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd",
                  marginBottom: "8px",
                }}
              >
                {section.label}
              </p>
              <div>{section.component}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReorderApplicationSections;
