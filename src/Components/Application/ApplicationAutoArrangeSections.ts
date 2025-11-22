import { ApplicationData, SectionPosition } from "../../Classes/ClassesApplicationData";

export function applicationAutoArrangeSections(sections: ApplicationData) {

  sections.ApplicantInfo.sectionPosition.startYPosition = 100
  sections.ApplicantInfo.sectionPosition.startXPosition = 480

  sections.EmployerInfo.sectionPosition.startYPosition = 100
  sections.EmployerInfo.sectionPosition.startXPosition = 20

  sections.ApplicationJobTitle.sectionPosition.startYPosition = 300
  sections.ApplicationJobTitle.sectionPosition.startXPosition = 20

  sections.ApplicationDate.sectionPosition.startYPosition = 300
  sections.ApplicationDate.sectionPosition.startXPosition = 480

  sections.ApplicantContent.sectionPosition.startYPosition = 500
  sections.ApplicantContent.sectionPosition.startXPosition = 20
  sections.ApplicantContent.sectionPosition.width = 754

  return (sections)
}
