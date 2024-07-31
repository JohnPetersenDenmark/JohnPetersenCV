import   {currenrCVData}  from '../../GlobalData/GlobalCVData';

import parse from 'html-react-parser';

function Skills() {


    let htmlStarString : string = "";
    let tsxStarString : any ;
   
    for (let i = 0; i < currenrCVData.Skills.entries.length; i++) {
        let skillEntry = currenrCVData.Skills.entries[i]
         htmlStarString += '<p class="skill_entry_indent">' + skillEntry.description + '</p>';
         htmlStarString += '<div class="skill_entry_indent">';
        for (let y = 0; y < 5; y++) {
           
            if ( y < skillEntry.stars)
                {
                    htmlStarString +=  '<span class="fas fa-star star_checked skill_entry_star_indent"></span>';
                }
                else{
                   // htmlStarString +=  '<span class="fa-sharp far fa-star"></span>';  
                   htmlStarString += "";
                }               
        }
       
         htmlStarString += '</div>'
    }

    htmlStarString += '<hr class="section_ruler">';
    tsxStarString = parse(htmlStarString);

    return (
        <div>
            <p className="section_title">{currenrCVData.Skills.sectionName}</p>
            {tsxStarString}
        </div>
    );
}

export default Skills;