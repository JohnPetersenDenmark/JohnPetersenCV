import { CVData } from "../../Classes/ClassesCVData";
import {SectionPosition } from "../../Classes/ClassesApplicationData";

export function CVAutoArrangeSections(sections: CVData) {

  sections.ContactInfo.sectionPosition.startYPosition = 20
  sections.ContactInfo.sectionPosition.startXPosition = 20

  sections.Motivation.sectionPosition.startYPosition = 150
  sections.Motivation.sectionPosition.startXPosition = 340

  sections.Profile.sectionPosition.startYPosition = 400
  sections.Profile.sectionPosition.startXPosition = 340

   sections.Skills.sectionPosition.startYPosition = 150
  sections.Skills.sectionPosition.startXPosition = 20


  sections.Educations.sectionPosition.startYPosition = 300
  sections.Educations.sectionPosition.startXPosition = 20

  sections.Languages.sectionPosition.startYPosition = 400
  sections.Languages.sectionPosition.startXPosition = 20

  sections.WorkingExperience.sectionPosition.startYPosition = 660
  sections.WorkingExperience.sectionPosition.startXPosition = 20

  
 
  sections.Sparetime.sectionPosition.startYPosition = 540
  sections.Sparetime.sectionPosition.startXPosition = 20
  

  return (sections)
}
