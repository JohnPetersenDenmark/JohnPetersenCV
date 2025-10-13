import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';
import parse from 'html-react-parser';



function ApplicationContent() {

  if (!currentApplicationData?.ApplicantContent) {
      return null; // safe guard
    }
    let tmp = currentApplicationData;
    let x = tmp;
    return (
        <div>
            <p className="section_title" id={currentApplicationData.ApplicantContent.thisClassName}>
                {/* {currentApplicationData.ApplicantContent.sectionName} */}
            </p>

            {currentApplicationData.ApplicantContent.entries.map((paragraph) => (


                <p className='application_content_paragraphs' style={{whiteSpace: "pre-wrap"}}> {paragraph.bodyparagraph} </p>

            ))}

        </div>
    );
}

export default ApplicationContent; 