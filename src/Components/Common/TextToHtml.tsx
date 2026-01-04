import { useState } from "react";


interface InputProps {
    htmlString: string
}
//const [html, setHtml] = useState('<div><p className="bg-red">Hello</p></div>');

const TextToHtml: React.FC<InputProps> = ({ htmlString }) => {

    return (
        <div
            dangerouslySetInnerHTML={{ __html: htmlString }}
        />
    );
}

export default TextToHtml;