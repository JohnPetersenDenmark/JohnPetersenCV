// CustomQuillEditor.tsx
import React, { useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarContainerStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
  alignItems: "center",
  padding: "6px",
  borderBottom: "1px solid #e5e7eb",
  background: "#fafafa",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
};

const editorWrapperStyle: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  overflow: "hidden",
};

// Custom icon replacement
const icons = Quill.import("ui/icons");
icons["underline"] = "U";
icons["bold"] = "F";
icons["italic"] = "K";

interface CustomQuillEditorProps {
  value: string;
  sectionClassName: string;
  onChange?: (html: string, sectionClassName: string) => void;
}

const CustomQuillEditor: React.FC<CustomQuillEditorProps> = ({
  value,
  sectionClassName,
  onChange
}) => {

  /**
   * Tracks whether an update came from parent value changes
   * (programmatic = ignore onChange)
   */
  const programmatic = useRef(false);

  // When parent updates `value`, ignore the next onChange event from Quill
  useEffect(() => {
    programmatic.current = true;
    const timer = setTimeout(() => {
      programmatic.current = false;
    }, 0);

    return () => clearTimeout(timer);
  }, [value]);


  /** Handle Quill HTML change */
  const handleChange = (html: string) => {
    // Ignore Quill change event caused by updating `value` prop
    if (programmatic.current)
      {
return;
      } 

    onChange?.(html, sectionClassName);
  };


  return (
    <div>
      <style>{`
        .ql-toolbar.ql-snow { padding: 0; }
        .ql-toolbar button, .ql-toolbar .ql-picker { height: 28px; }
        .ql-toolbar .ql-picker-label,
        .ql-toolbar .ql-picker-item { line-height: 28px; }
        .ql-toolbar .ql-formats { margin-right: 0; }
        .ql-container { min-height: 180px; }
        .ql-editor img { max-width: 100%; height: auto; }
      `}</style>

      {/* Custom Toolbar */}
      <div id="da-toolbar" style={toolbarContainerStyle}>
        <span className="ql-formats">
          <button className="ql-bold" aria-label="Fed" />
          <button className="ql-italic" aria-label="Kursiv" />
          <button className="ql-underline" aria-label="Understreg" />
          <button className="ql-strike" aria-label="Gennemstreg" />
        </span>

        <span className="ql-formats">
          <select className="ql-header" defaultValue="">
            <option value="">Brødtekst</option>
            <option value="1">Overskrift 1</option>
            <option value="2">Overskrift 2</option>
            <option value="3">Overskrift 3</option>
          </select>
        </span>

        <span className="ql-formats">
          <button className="ql-list" value="ordered" aria-label="Nummereret liste" />
          <button className="ql-list" value="bullet" aria-label="Punktliste" />
        </span>

        <span className="ql-formats">
          <button className="ql-link" aria-label="Link" />
          <button className="ql-image" aria-label="Billede" />
        </span>

        <span className="ql-formats">
          <select className="ql-color" aria-label="Tekstfarve" />
          <select className="ql-background" aria-label="Baggrundsfarve" />
        </span>

        <span className="ql-formats">
          <select className="ql-align" aria-label="Justering" />
        </span>

        <span className="ql-formats">
          <button className="ql-clean" aria-label="Ryd formatering" />
        </span>
      </div>

      {/* Editor */}
      <div style={editorWrapperStyle}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={{
            toolbar: { container: "#da-toolbar" },
            history: { delay: 400, maxStack: 100, userOnly: true },
            clipboard: { matchVisual: false },
          }}
        />
      </div>

      {/* (Optional) Live HTML preview */}
      <div style={{ marginTop: 12 }}>
        <strong>Preview (HTML):</strong>
        <div
          style={{
            border: "1px solid #eee",
            padding: 12,
            borderRadius: 8,
            minHeight: 80,
            marginTop: 6,
          }}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </div>
  );
};

export default CustomQuillEditor;
