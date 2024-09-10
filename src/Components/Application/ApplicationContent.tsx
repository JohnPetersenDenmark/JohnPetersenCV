import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';
import parse from 'html-react-parser';



function ApplicationContent() {


    return (
        <div>
            <p className="section_title" id={currentApplicationData.ApplicantContent.thisClassName}>
                {/* {currentApplicationData.ApplicantContent.sectionName} */}
            </p>

            {currentApplicationData.ApplicantContent.entries.map((paragraph) => (


                <p className='application_content_paragraphs'> {paragraph.bodyparagraph} </p>

            ))}

        </div>
    );
}

export default ApplicationContent; 