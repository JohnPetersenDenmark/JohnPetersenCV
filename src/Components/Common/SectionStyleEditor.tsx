import { ApplicantInfo, EmployerInfo, ApplicantContent, ApplicationDate, ApplicationJobTitle , ApplicantContentHeadline} from "../../Classes/ClassesApplicationData";

type StyleEditorProps = {  
  section: {             
    sectionId: string;
    cssStyles: React.CSSProperties;   
  };
  onStyleChange: (id: string, style: React.CSSProperties) => void;
};

const SectionStyleEditor: React.FC<StyleEditorProps> = ({  section, onStyleChange }) => {

  const handleChange = (key: keyof React.CSSProperties, value: string) => {
    onStyleChange(section.sectionId, { ...section.cssStyles, [key]: value });
  };

  if (!section)
    return(<></>);

if (!section.cssStyles || !section.sectionId)
  return(<></>);

  return (
    <div className="style-editor p-4 border-l border-gray-300 bg-gray-50 w-64">
      {/* <h3 className="font-semibold text-lg mb-3">{section.sectionId}</h3> */}
      {/* <div className="flex flex-col gap-3 text-sm"> */}
      <div>
        <label>
       
          <input
            type="color"
            value={section.cssStyles.backgroundColor as string}
            onChange={(e) => handleChange("backgroundColor", e.target.value)}
          />
        </label>

       {/*  <label>
          Text Color:
          <input
            type="color"
            value={section.cssStyles.color as string}
            onChange={(e) => handleChange("color", e.target.value)}
          />
        </label>

        <label>
          Font Size:
          <input
            type="number"
            min="8"
            max="48"
            value={parseInt(section.cssStyles.fontSize as string) || 16}
            onChange={(e) => handleChange("fontSize", e.target.value + "px")}
          />
        </label>

        <label>
          Font Weight:
          <select
            value={section.cssStyles.fontWeight as string}
            onChange={(e) => handleChange("fontWeight", e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Lighter</option>
          </select>
        </label>

        <label>
          Font Family:
          <select
            value={section.cssStyles.fontFamily as string || "Arial"}
            onChange={(e) => handleChange("fontFamily", e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Roboto">Roboto</option>
          </select>
        </label> */}
      </div>
    </div>
  );
};

export default  SectionStyleEditor
