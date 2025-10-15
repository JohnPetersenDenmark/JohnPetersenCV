import { useCVData } from '../../GlobalData/GlobalCVDataContext';

import parse from 'html-react-parser';

function Skills() {

    const { currenrCVData, setCurrentCVData } = useCVData();

    let htmlStarString: string = "";
    let tsxStarString: any;

    for (let i = 0; i < currenrCVData.Skills.entries.length; i++) {
        let skillEntry = currenrCVData.Skills.entries[i]
        htmlStarString += '<p class="skill_entry_indent">' + skillEntry.description + '</p>';
        htmlStarString += '<div class="skill_entry_indent">';
        for (let y = 0; y < 5; y++) {

            if (y < skillEntry.stars) {
                htmlStarString += '<span class="fas fa-star star_checked skill_entry_star_indent"></span>';
            }
            else {
                // htmlStarString +=  '<span class="fa-sharp far fa-star"></span>';  
                htmlStarString += "";
            }
        }

        htmlStarString += '</div>'
    }

    htmlStarString += '<hr class="section_ruler">';
    tsxStarString = parse(htmlStarString);

    let tmp = currenrCVData.Skills.thisClassName;
    let x = tmp;

    return (
        <>
            <p className="section_title" id={currenrCVData.Skills.thisClassName}>{currenrCVData.Skills.sectionName}</p>

            {tsxStarString}
        </>
    );
}

export default Skills;