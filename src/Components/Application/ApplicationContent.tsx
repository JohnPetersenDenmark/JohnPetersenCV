import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';
import parse from 'html-react-parser';



function ApplicationContent() {


    return (
        <div>

            {currentApplicationData.ApplicantContent.paragraphs.map((paragraph) => (


                <p className='application_content_paragraphs'> {paragraph.bodyparagraph} </p>

            ))}

        </div>
    );
}

export default ApplicationContent; 