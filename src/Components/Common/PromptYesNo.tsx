import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function PromptYesNo(props: any) {

    const [selectedOption, setSelectedOption] = useState(props.defaultValue);

    const onOptionChange = (event: any) => {
        setSelectedOption(event.target.value)
    }

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.getUserChoice(selectedOption)
        //navigate(-1);
    }

 

    return (
        <>
        
            {props.promptText}
     
         <label htmlFor="promptyes">Ja</label>
            <input
            id='promptyes'
                type="radio"
                name="Yes"
                checked={selectedOption === 'yes'}
                value='yes'
                onChange={onOptionChange}
            >
            </input>
           
            <label htmlFor="promptno">Nej</label>
            <input
             id='promptno'
                type="radio"
                name="No"
                checked={selectedOption === 'no'}
                value='no'
                onChange={onOptionChange}
            >
            </input>         
            <button className='download_button' type="button" onClick={handleSubmit}>Ok Yes/no</button>  
        </>
    )
}

export default PromptYesNo