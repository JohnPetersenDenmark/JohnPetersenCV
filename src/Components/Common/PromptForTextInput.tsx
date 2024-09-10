import { useState } from 'react';

function PromptForTextInput(props: any) {

    const [fileName, setFileName] = useState("");


    const handleSubmit = (e: any) => {
        e.preventDefault();
        //props.getUserChoice(selectedOption)
        
        props.getUserTextInput(fileName)
        //navigate(-1);
    }

    const onTextChange = (e: any) => {
        setFileName(e.target.value)
        
    }

    return (

        <>
            <p>
                {props.promptText}
            </p>

            <input
            className='inputfield'
                type='text'
                onChange={onTextChange}>
            </input>
            <button className='download_button' type="button" onClick={handleSubmit}>Gem</button>
        </>

    );
}

export default PromptForTextInput