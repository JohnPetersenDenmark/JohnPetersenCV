import { Profile, Motivation, MotivationEntry, ContactInfo, ContactInfoEntry, WorkingExperience, WorkingExperienceEntry, CVData, ProfileEntry } from '../Classes/ClassesCVData';
import { Skills, SkillEntry, Educations, EducationEntry, LanguageEntry, Languages, SparetimeEntry, Sparetime } from '../Classes/ClassesCVData';
import { SectionEntryLabels, inputFieldDescription, SectionEntryInput } from '../Classes/ClassesCVData';


export const ProfileSectionEntryLabels: SectionEntryLabels = {};
ProfileSectionEntryLabels['description'] = "Profil-beskrivelse";

export const ProfileSectionInputFields: SectionEntryInput = {};
ProfileSectionInputFields['description'] = new inputFieldDescription('textarea')


let defaultprofileentries: ProfileEntry[] = [];

let defaultProfileEntry = {} as ProfileEntry
defaultProfileEntry.labels = ProfileSectionEntryLabels
defaultProfileEntry.sectionEntryInput = ProfileSectionInputFields
defaultProfileEntry.sortorder = 0;
defaultProfileEntry.description = 'Dedikeret og effektiv full stack-udvikler med mere end 30 års erfaring inden for systemudvikling. Har stor erfaring med frontend, backend og databaser. Jeg har med succes optimeret kode med 30% reduktion og opnået 20% hastighedsforøgelse i flere legacy-applikationer. Fokus ligger altid på at koden skal være nem at vedligeholde og appetitligt for mine kolleger. Deltagelse i alle faser af systemudviklingen er en naturlig ting. Jeg kommunikerer på alle niveauer i organisationen og deltager derfor gerne i specifikation af nye features.'
defaultprofileentries.push(defaultProfileEntry)

let defaultprofiledataTmp = {} as Profile
defaultprofiledataTmp.sectionName = 'Profil'
defaultprofiledataTmp.sectionNameLabel = "Sektion";
defaultprofiledataTmp.entries = defaultprofileentries
defaultprofiledataTmp.cssStyles = { backgroundColor: "#ffffff", color: "#000000", fontSize: "16px", fontWeight: "normal" }
defaultprofiledataTmp.sectionPosition = {  startXPosition: 1, startYPosition: 401 , width : 300 , height : 100}
defaultprofiledataTmp.sectionContent = 'Profil info'
defaultprofiledataTmp.sectionContainerDiv = 'main'

let defaultprofiledata = new Profile(defaultprofiledataTmp.sectionName, defaultprofiledataTmp.sectionNameLabel, 
    defaultprofiledataTmp.entries, defaultprofiledataTmp.cssStyles, defaultprofiledataTmp.sectionPosition , defaultprofiledataTmp.sectionContent , defaultprofiledataTmp.sectionContainerDiv)




export const MotivationInputFields: SectionEntryInput = {};
MotivationInputFields['description'] = new inputFieldDescription('textarea')

export const MotivationSectionEntryLabels: SectionEntryLabels = {};
MotivationSectionEntryLabels['description'] = "Motivation entry label";

let defaultmotivationentries: MotivationEntry[] = [];

let defaultmotivationEntry = {} as MotivationEntry
defaultmotivationEntry.description = 'Lige som jer i OK prioriterer jeg høj kvalitet i kodebasen. Jeg anvender SOLID principperne for at opnå en god struktur som gør koden nem at vedligeholde. Jeg har mindre erfaring med mobile-apps men tænker at denne viden skulle insources i OK? Jeg går gerne i front med denne opgave. I april i år mødte OK ved IT-messen i Ålborg hvor jeg oplevede en høj grad af holdånd og passion. Det er præcis sådan et miljø jeg gerne vil arbejde i.  Som person er jeg ekstrovert og deltager gerne med at definere use-cases, yde support og andre udadvendte aktiviteter.'
defaultmotivationEntry.labels = MotivationSectionEntryLabels
defaultmotivationEntry.sectionEntryInput = MotivationInputFields
defaultmotivationEntry.sortorder = 0;
defaultmotivationentries.push(defaultmotivationEntry);

let defaultmotivationdataTmp = {} as Motivation
defaultmotivationdataTmp.sectionName = 'Det er helt OK at støtte sporten'
defaultmotivationdataTmp.sectionNameLabel = "Sektion"
defaultmotivationdataTmp.entries = defaultmotivationentries
defaultmotivationdataTmp.sectionPosition = {  startXPosition: 1, startYPosition: 401 , width : 300 , height : 100}
defaultmotivationdataTmp.cssStyles = { backgroundColor: "#ffffff", color: "#000000", fontSize: "16px", fontWeight: "normal" }
defaultmotivationdataTmp.sectionContent = 'Motivation for dette job'
defaultmotivationdataTmp.sectionContainerDiv = 'main'

let defaultmotivationdata = new Motivation(defaultmotivationdataTmp.sectionName, 
    defaultmotivationdataTmp.entries, defaultmotivationdataTmp.sectionNameLabel, 
    defaultmotivationdataTmp.cssStyles, defaultmotivationdataTmp.sectionPosition,
defaultmotivationdataTmp.sectionContent, defaultmotivationdataTmp.sectionContainerDiv)




export const ContactInfoInputFields: SectionEntryInput = {};
ContactInfoInputFields['description'] = new inputFieldDescription('input')
ContactInfoInputFields['type'] = new inputFieldDescription('input')
ContactInfoInputFields['icon'] = new inputFieldDescription('input')

export const ContactInfoSectionEntryLabels: SectionEntryLabels = {};
ContactInfoSectionEntryLabels['type'] = "media type";
ContactInfoSectionEntryLabels['icon'] = "icon value";
ContactInfoSectionEntryLabels['description'] = "Kontakt beskrivelse";


let defaultcontactinfoentries: ContactInfoEntry[] = [];


let defaultcontactinfoentry = {} as ContactInfoEntry;
defaultcontactinfoentry.description = 'Systemudvikler'
defaultcontactinfoentry.icon = 'fa fa-briefcase icon_vertical_center'
defaultcontactinfoentry.type = ''
defaultcontactinfoentry.sortorder = 0;
defaultcontactinfoentry.labels = ContactInfoSectionEntryLabels
defaultcontactinfoentry.sectionEntryInput = ContactInfoInputFields
defaultcontactinfoentries.push(defaultcontactinfoentry);


defaultcontactinfoentry = {} as ContactInfoEntry;
defaultcontactinfoentry.description = '8410 Rønde'
defaultcontactinfoentry.icon = 'fa fa-home fa-fw  icon_vertical_center'
defaultcontactinfoentry.type = ''
defaultcontactinfoentry.sortorder = 1;
defaultcontactinfoentry.labels = ContactInfoSectionEntryLabels
defaultcontactinfoentry.sectionEntryInput = ContactInfoInputFields
defaultcontactinfoentries.push(defaultcontactinfoentry);


defaultcontactinfoentry = {} as ContactInfoEntry;
defaultcontactinfoentry.description = 'johnpetersen1959@gmail.com'

defaultcontactinfoentry.icon = 'fa fa-envelope fa-fw  icon_vertical_center'
defaultcontactinfoentry.type = 'email'
defaultcontactinfoentry.sortorder = 2;
defaultcontactinfoentry.labels = ContactInfoSectionEntryLabels
defaultcontactinfoentry.sectionEntryInput = ContactInfoInputFields
defaultcontactinfoentries.push(defaultcontactinfoentry);


defaultcontactinfoentry = {} as ContactInfoEntry;
defaultcontactinfoentry.description = '28933014'
defaultcontactinfoentry.icon = 'fa fa-phone fa-fw icon_vertical_center'
defaultcontactinfoentry.type = ''
defaultcontactinfoentry.sortorder = 3;
defaultcontactinfoentry.labels = ContactInfoSectionEntryLabels
defaultcontactinfoentry.sectionEntryInput = ContactInfoInputFields
defaultcontactinfoentries.push(defaultcontactinfoentry);


let defaultcontactinfoTmp = {} as ContactInfo;
defaultcontactinfoTmp.sectionName = 'John Petersen'
defaultcontactinfoTmp.sectionNameLabel = "CV for "
defaultcontactinfoTmp.entries = defaultcontactinfoentries
defaultcontactinfoTmp.cssStyles = { backgroundColor: "#ffffff", color: "#000000", fontSize: "16px", fontWeight: "normal" }
defaultcontactinfoTmp.sectionPosition = {  startXPosition: 1, startYPosition: 401 , width : 300 , height : 100}
defaultcontactinfoTmp.sectionContent = 'Kontakt info'
defaultcontactinfoTmp.sectionContainerDiv = 'main'

let defaultcontactinfo = new ContactInfo(defaultcontactinfoTmp.sectionName, defaultcontactinfoTmp.sectionNameLabel, 
    defaultcontactinfoTmp.entries, defaultcontactinfoTmp.cssStyles, 
    defaultcontactinfoTmp.sectionPosition, defaultcontactinfoTmp.sectionContent, defaultcontactinfoTmp.sectionContainerDiv)




export const WorkingExpirienceInputFields: SectionEntryInput = {};
WorkingExpirienceInputFields['title'] = new inputFieldDescription('input')
WorkingExpirienceInputFields['descriptions'] = new inputFieldDescription('textarea')
WorkingExpirienceInputFields['fromdate'] = new inputFieldDescription('input')
WorkingExpirienceInputFields['todate'] = new inputFieldDescription('input')
WorkingExpirienceInputFields['usedskills'] = new inputFieldDescription('textarea')
WorkingExpirienceInputFields['icon'] = new inputFieldDescription('input')
WorkingExpirienceInputFields['achievements'] = new inputFieldDescription('textarea')



export const WorkingExpirienceSectionEntryLabels: SectionEntryLabels = {};
WorkingExpirienceSectionEntryLabels['title'] = "Jobtite";
WorkingExpirienceSectionEntryLabels['fromdate'] = "Fra dato";
WorkingExpirienceSectionEntryLabels['todate'] = "Til Data";
WorkingExpirienceSectionEntryLabels['icon'] = "Ikon";
WorkingExpirienceSectionEntryLabels['usedskills'] = "Anvendt";
WorkingExpirienceSectionEntryLabels['descriptions'] = "Beskrivelse";
WorkingExpirienceSectionEntryLabels['achievements'] = "Resultater";


let defaultworkingExperienceEntries: WorkingExperienceEntry[] = [];

let defaultworkingExperienceEntry: WorkingExperienceEntry = {} as WorkingExperienceEntry
defaultworkingExperienceEntry.title = 'Systemarkitekt, udvikler og DevOps i Wolters Kluwer A/S'
defaultworkingExperienceEntry.sortorder = 0;
defaultworkingExperienceEntry.fromdate = 'December 2020'
defaultworkingExperienceEntry.todate = 'Juni 2024'
defaultworkingExperienceEntry.usedskills = ['C#', 'TypeScript', 'JavaScript', 'React', 'CSS', 'SQL', '.NET-Core', 'WPF', 'TFS', 'Team-City', 'GIT', 'Visual Studio', 'VS Code', 'REST-API']
defaultworkingExperienceEntry.descriptions = ['- Rådgivet produktejer i forhold til tekniske muligheder/begrænsninger',
    '- Design, programmering og deployment af produktet: Årsafslutning',
    '- Design og implementering af elektronisk indberetning til Erhversstyrelsen',
    '- Implementering af integration ekstern api til elektronisk underskrift'
]

defaultworkingExperienceEntry.achievements = [
    'Optimering af kode med 30% reduktion i kode-massen',
    'Optimering svartiden på 20%',
    'Forgangsperson for en smidig kommunikation mellem udviklere og produktejere'

]
defaultworkingExperienceEntry.icon = 'fa fa-calendar fa-fw span_icon_color'
defaultworkingExperienceEntry.labels = WorkingExpirienceSectionEntryLabels
defaultworkingExperienceEntry.sectionEntryInput = WorkingExpirienceInputFields



defaultworkingExperienceEntries.push(defaultworkingExperienceEntry);

defaultworkingExperienceEntry = {} as WorkingExperienceEntry

defaultworkingExperienceEntry.title = 'Systemarkitekt, udvikler og DevOps i WeDigit ApS'
defaultworkingExperienceEntry.sortorder = 1;
defaultworkingExperienceEntry.fromdate = 'Juli 2018'
defaultworkingExperienceEntry.todate = 'December 2020'
defaultworkingExperienceEntry.usedskills = ['C#', 'TypeScript', 'JavaScript', 'CSS', 'Angular', 'SQL', '.NET-Core', 'GIT', 'Visual Studio', 'REST-API']
defaultworkingExperienceEntry.descriptions = [
    '- Arkitektur, design og programmering af SaaS system ”Iværksætter”',
    '-	Udvikling af moduler til: Lagerstyring, kundestyring salg, indkøb samt booking-kalender',
    '- Integrationer til Dinero, CVR-registeret, Google Email og Kalender',
    '- Arkitektur, design og programmering af SaaS system ”Den digitale ejendomsmægler”',
]
defaultworkingExperienceEntry.achievements = [
    'Ene mand realiseret 2 web-applikationer. Helt fra den innovative fase frem til idriftsættelse'
]
defaultworkingExperienceEntry.icon = 'fa fa-calendar fa-fw span_icon_color'
defaultworkingExperienceEntry.labels = WorkingExpirienceSectionEntryLabels
defaultworkingExperienceEntry.sectionEntryInput = WorkingExpirienceInputFields

defaultworkingExperienceEntries.push(defaultworkingExperienceEntry);


defaultworkingExperienceEntry = {} as WorkingExperienceEntry
defaultworkingExperienceEntry.title = 'Systemarkitekt og systemudvikler i Gravgaard & Co.'
defaultworkingExperienceEntry.sortorder = 2;
defaultworkingExperienceEntry.fromdate = 'Februar 2015'
defaultworkingExperienceEntry.todate = 'Juli 2018'
defaultworkingExperienceEntry.usedskills = ['C', 'Domino C-API', 'Java', 'LotusScript', 'JavaScript', 'CSS', 'Domino', 'Eclipse', 'Visual Studio', 'Web service']
defaultworkingExperienceEntry.descriptions = [
    '- Arkitektur, design og programmering af GDPR-logger til kommuner',
    '- Kryptering af log-data',
    '- Installation af GDPR-loggeren på kundernes Domino-servere',
    '- Undervisning af systemadministratorerne hos kommunerne',
    '- Fast Domino-konsulent hos BMS-kraner',
    '-	Kravspecifikationer sammen med BMS på nye features']
defaultworkingExperienceEntry.achievements = [
    'Jeg lykkedes med GDPR-loggeren, selvom teknologien som jeg anvendte beherskes af max. 10 udviklere i Europa.',
    'Optimeret vedligeholdelsen af BMS kundestyringssystem ved at implementere et andet framework'
]
defaultworkingExperienceEntry.icon = 'fa fa-calendar fa-fw span_icon_color'
defaultworkingExperienceEntry.labels = WorkingExpirienceSectionEntryLabels
defaultworkingExperienceEntry.sectionEntryInput = WorkingExpirienceInputFields
defaultworkingExperienceEntries.push(defaultworkingExperienceEntry);



defaultworkingExperienceEntry = {} as WorkingExperienceEntry
defaultworkingExperienceEntry.title = 'Udviklings-konsulent for Sander Software ApS'
defaultworkingExperienceEntry.sortorder = 4;
defaultworkingExperienceEntry.fromdate = 'September 2012'
defaultworkingExperienceEntry.todate = 'Februar 2015'
defaultworkingExperienceEntry.usedskills = ['LotusScript', 'Java', 'JavaScript', 'Domino', 'Eclipse', 'Web service']
defaultworkingExperienceEntry.descriptions = [
    '-	Web Service integration Domino og Java-baseret kernesystem hos SDC A/S',
    '-	Udvikling af web-applikation for salg af alarmsystemer (Verisure)',
    '-	Udvikling af web-applikation for vægtere (Securitas)',
    '-	Kravspecifikationer sammen med kunder på nye features'
]
defaultworkingExperienceEntry.achievements = []
defaultworkingExperienceEntry.icon = 'fa fa-calendar fa-fw span_icon_color'
defaultworkingExperienceEntry.labels = WorkingExpirienceSectionEntryLabels
defaultworkingExperienceEntry.sectionEntryInput = WorkingExpirienceInputFields

defaultworkingExperienceEntries.push(defaultworkingExperienceEntry);



let defaultworkingexperienceTmp = {} as WorkingExperience
defaultworkingexperienceTmp.achivementstitle = 'Resultater'
defaultworkingexperienceTmp.sectionName = 'Erfaring'
defaultworkingexperienceTmp.entries = defaultworkingExperienceEntries
defaultworkingexperienceTmp.sectionNameLabel = 'Sektion'
defaultworkingexperienceTmp.cssStyles = { backgroundColor: "#ffffff", color: "#000000", fontSize: "16px", fontWeight: "normal" }
defaultworkingexperienceTmp.sectionPosition = {  startXPosition: 1, startYPosition: 401 , width : 300 , height : 100 }
defaultworkingexperienceTmp.sectionContent = 'Erfaring'
defaultworkingexperienceTmp.sectionContainerDiv = 'main'

let defaultworkingexperience = new WorkingExperience(
    defaultworkingexperienceTmp.sectionName,
    defaultworkingexperienceTmp.achivementstitle,
    defaultworkingexperienceTmp.entries,
    defaultworkingexperienceTmp.sectionNameLabel,
    defaultworkingexperienceTmp.cssStyles,
    defaultworkingexperienceTmp.sectionPosition,
    defaultworkingexperienceTmp.sectionContent,
    defaultworkingexperienceTmp.sectionContainerDiv
)



export const SkillsSectionEntryLabels: SectionEntryLabels = {};
SkillsSectionEntryLabels['description'] = "Kompetence beskrivelse";
SkillsSectionEntryLabels['stars'] = "Niveau";

export const SkillsSectionInputFields: SectionEntryInput = {};
SkillsSectionInputFields['description'] = new inputFieldDescription('input')
SkillsSectionInputFields['stars'] = new inputFieldDescription('input')

let defaultskillEntries: SkillEntry[] = [];

let defaultskillentry = {} as SkillEntry
defaultskillentry.description = 'Systemudvikling'
defaultskillentry.stars = 5
defaultskillentry.labels = SkillsSectionEntryLabels
defaultskillentry.sectionEntryInput = SkillsSectionInputFields
defaultskillentry.sortorder = 0;
defaultskillEntries.push(defaultskillentry);


defaultskillentry = {} as SkillEntry
defaultskillentry.description = 'Udviklingsprincipper'
defaultskillentry.stars = 5
defaultskillentry.labels = SkillsSectionEntryLabels
defaultskillentry.sectionEntryInput = SkillsSectionInputFields
defaultskillentry.sortorder = 1;
defaultskillEntries.push(defaultskillentry);

defaultskillentry = {} as SkillEntry
defaultskillentry.description = 'Systemarkitektur'
defaultskillentry.stars = 4
defaultskillentry.labels = SkillsSectionEntryLabels
defaultskillentry.sortorder = 2;
defaultskillentry.sectionEntryInput = SkillsSectionInputFields
defaultskillEntries.push(defaultskillentry);


defaultskillentry = {} as SkillEntry
defaultskillentry.description = 'Analyse af kundebehov'
defaultskillentry.stars = 5
defaultskillentry.labels = SkillsSectionEntryLabels
defaultskillentry.sectionEntryInput = SkillsSectionInputFields
defaultskillentry.sortorder = 3;
defaultskillEntries.push(defaultskillentry);

defaultskillentry = {} as SkillEntry
defaultskillentry.description = 'DevOps'
defaultskillentry.stars = 4
defaultskillentry.labels = SkillsSectionEntryLabels
defaultskillentry.sortorder = 4;
defaultskillentry.sectionEntryInput = SkillsSectionInputFields
defaultskillEntries.push(defaultskillentry);



let defaultskillsdataTmp = {} as Skills
defaultskillsdataTmp.sectionName = 'Kompetencer'
defaultskillsdataTmp.entries = defaultskillEntries
defaultskillsdataTmp.sectionNameLabel = "Sektion";
defaultskillsdataTmp.cssStyles = { backgroundColor: "#ffffff", color: "#000000", fontSize: "16px", fontWeight: "normal" }
defaultskillsdataTmp.sectionPosition = {  startXPosition: 1, startYPosition: 401 , width : 300 , height : 100 }
defaultskillsdataTmp.sectionContent = 'Færdigheder'
defaultskillsdataTmp.sectionContainerDiv = 'main'

let defaultskillsdata = new Skills(
    defaultskillsdataTmp.sectionName,
    defaultskillsdataTmp.entries,
    defaultskillsdataTmp.sectionNameLabel,
    defaultskillsdataTmp.cssStyles,
    defaultskillsdataTmp.sectionPosition,
    defaultskillsdataTmp.sectionContent,
    defaultskillsdataTmp.sectionContainerDiv
)


export const EducationSectionInputFields: SectionEntryInput = {};
EducationSectionInputFields['title'] = new inputFieldDescription('input')
EducationSectionInputFields['todate'] = new inputFieldDescription('input')
EducationSectionInputFields['location'] = new inputFieldDescription('input')

export const EducationsSectionEntryLabels: SectionEntryLabels = {};
EducationsSectionEntryLabels['title'] = "Uddannelse";
EducationsSectionEntryLabels['todate'] = "afsluttet";
EducationsSectionEntryLabels['location'] = "sted";



let defaulteducationentries: EducationEntry[] = [];

let defaulteducationentry = {} as EducationEntry
defaulteducationentry.title = 'IT-teknolog'
defaulteducationentry.todate = 'December 1982'
defaulteducationentry.sortorder = 0;
defaulteducationentry.labels = EducationsSectionEntryLabels
defaulteducationentry.sectionEntryInput = EducationSectionInputFields
defaulteducationentry.location = '2000 Frederiksberg'
defaulteducationentries.push(defaulteducationentry);


defaulteducationentry = {} as EducationEntry
defaulteducationentry.title = 'Merkonom i informatik'
defaulteducationentry.todate = 'Juni 1997'
defaulteducationentry.sortorder = 1;
defaulteducationentry.labels = EducationsSectionEntryLabels
defaulteducationentry.sectionEntryInput = EducationSectionInputFields
defaulteducationentry.location = '2750 Ballerup'
defaulteducationentries.push(defaulteducationentry);



let defaulteducationdataTmp = {} as Educations
defaulteducationdataTmp.sectionName = 'Uddannelse'
defaulteducationdataTmp.entries = defaulteducationentries
defaulteducationdataTmp.sectionNameLabel = "Sektion"
defaulteducationdataTmp.cssStyles = { backgroundColor: "#ffffff", color: "#000000", fontSize: "16px", fontWeight: "normal" }
defaulteducationdataTmp.sectionPosition = {  startXPosition: 1, startYPosition: 401 , width : 300 , height : 100}
defaulteducationdataTmp.sectionContent = 'Uddannelse'
defaulteducationdataTmp.sectionContainerDiv = 'main'

let defaulteducationdata = new Educations(
    defaulteducationdataTmp.sectionName,
    defaulteducationdataTmp.entries,
    defaulteducationdataTmp.sectionNameLabel,
    defaulteducationdataTmp.cssStyles,
    defaulteducationdataTmp.sectionPosition = {  startXPosition: 1, startYPosition: 401 , width : 300 , height : 100 },
    defaulteducationdataTmp.sectionContent ,
    defaulteducationdataTmp.sectionContainerDiv
)


export const LanguageSectionInputFields: SectionEntryInput = {};
LanguageSectionInputFields['language'] = new inputFieldDescription('input')
LanguageSectionInputFields['level'] = new inputFieldDescription('input')


export const LanguageSectionEntryLabels: SectionEntryLabels = {};
LanguageSectionEntryLabels['language'] = "sprog beskrivelse";
LanguageSectionEntryLabels['level'] = "sprog niveau";

let defaultlanguageentries: LanguageEntry[] = [];

let defaultlanguageentry = {} as LanguageEntry
defaultlanguageentry.language = 'Dansk'
defaultlanguageentry.level = 'modersmål'
defaultlanguageentry.labels = LanguageSectionEntryLabels
defaultlanguageentry.sortorder = 0;
defaultlanguageentry.sectionEntryInput = LanguageSectionInputFields
defaultlanguageentries.push(defaultlanguageentry);

defaultlanguageentry = {} as LanguageEntry
defaultlanguageentry.language = 'Engelsk'
defaultlanguageentry.level = 'Professionelt'
defaultlanguageentry.labels = LanguageSectionEntryLabels
defaultlanguageentry.sortorder = 1;
defaultlanguageentry.sectionEntryInput = LanguageSectionInputFields
defaultlanguageentries.push(defaultlanguageentry);

defaultlanguageentry = {} as LanguageEntry
defaultlanguageentry.language = 'Svensk'
defaultlanguageentry.level = 'Flydende daglidags brug'
defaultlanguageentry.labels = LanguageSectionEntryLabels
defaultlanguageentry.sortorder = 2;
defaultlanguageentry.sectionEntryInput = LanguageSectionInputFields
defaultlanguageentries.push(defaultlanguageentry);



let defaultlanguagedataTmp = {} as Languages
defaultlanguagedataTmp.sectionName = 'Sprog'
defaultlanguagedataTmp.entries = defaultlanguageentries
defaultlanguagedataTmp.sectionNameLabel = "Sektion"
defaultlanguagedataTmp.cssStyles = { backgroundColor: "#ffffff", color: "#000000", fontSize: "16px", fontWeight: "normal" }
defaultlanguagedataTmp.sectionPosition = {  startXPosition: 1, startYPosition: 401 , width : 300 , height : 100}
defaultlanguagedataTmp.sectionContent = "Sprog"
defaultlanguagedataTmp.sectionContainerDiv = 'main'

let defaultlanguagedata = new Languages(
    defaultlanguagedataTmp.sectionName,
    defaultlanguagedataTmp.entries,
    defaultlanguagedataTmp.sectionNameLabel,
    defaultlanguagedataTmp.cssStyles,
    defaultlanguagedataTmp.sectionPosition,
    defaultlanguagedataTmp.sectionContent,
    defaultlanguagedataTmp.sectionContainerDiv
)

 
export const SparetimeSectionInputFields: SectionEntryInput = {};
SparetimeSectionInputFields['interest'] = new inputFieldDescription('input')


export const SparetimeSectionEntryLabels: SectionEntryLabels = {};
SparetimeSectionEntryLabels['interest'] = "Beskrivelse";

let defaultsparetimeentries: SparetimeEntry[] = [];

let sparetimeentry = {} as SparetimeEntry
sparetimeentry.interest = 'Jeg bruger en del tid på at lære nye teknologier inden for IT-området. Jeg holder mig fysisk aktiv ved at gå på jagt og træne vores jagthunde. Som afslapning nyder jeg at læse nordiske krimier'
sparetimeentry.labels = SparetimeSectionEntryLabels
sparetimeentry.sectionEntryInput = SparetimeSectionInputFields
sparetimeentry.sortorder = 0;
defaultsparetimeentries.push(sparetimeentry);

let defaultsparetimedataTmp = {} as Sparetime
defaultsparetimedataTmp.sectionName = 'Fritidsinteresser'
defaultsparetimedataTmp.entries = defaultsparetimeentries
defaultsparetimedataTmp.sectionNameLabel = "Sektion"
defaultsparetimedataTmp.cssStyles = { backgroundColor: "#ffffff", color: "#000000", fontSize: "16px", fontWeight: "normal" }
defaultsparetimedataTmp.sectionPosition = {  startXPosition: 1, startYPosition: 401 , width : 300 , height : 100}
defaultsparetimedataTmp.sectionContent = "Fritid"

let defaultsparetimedata = new Sparetime(
    defaultsparetimedataTmp.sectionName,
    defaultsparetimedataTmp.entries,
    defaultsparetimedataTmp.sectionNameLabel,
defaultsparetimedataTmp.cssStyles,
    defaultsparetimedataTmp.sectionPosition = {  startXPosition: 1, startYPosition: 401 , width : 300 , height : 100},
    defaultsparetimedataTmp.sectionContent = "Fritid",
    defaultsparetimedataTmp.sectionContainerDiv = 'main'
)

let defaultCssStyles :  React.CSSProperties = (
    {backgroundColor : '#ffffff'}
)

let defaultCVData = new CVData(
    defaultcontactinfo,
    defaultprofiledata,
    defaultmotivationdata,
    defaultworkingexperience,
    defaultskillsdata,
    defaulteducationdata,
    defaultlanguagedata,
    defaultsparetimedata,
    defaultCssStyles
);

export { defaultcontactinfo }
export { defaultprofiledata }
export { defaultmotivationdata }
export { defaultworkingexperience }
export { defaultskillsdata }

export { defaultCVData }

let currenrCVData = new CVData(
    defaultcontactinfo,
    defaultprofiledata,
    defaultmotivationdata,
    defaultworkingexperience,
    defaultskillsdata,
    defaulteducationdata,
    defaultlanguagedata,
    defaultsparetimedata,
    defaultCssStyles
);

export { currenrCVData }


// export function setCurrentCVData(json: CVData) {
//     currenrCVData = new CVData(
//         json.ContactInfo,
//         json.Profile,
//         json.Motivation,
//         json.WorkingExperience,
//         json.Skills,
//         json.Educations,
//         json.Languages,
//         json.Sparetime
//     )

// }

// export function CopyCVDataToNew(CVdataCopyFrom: CVData): CVData {

//     let copyOfCurrentCVData: CVData = new CVData(
//         CVdataCopyFrom.ContactInfo,
//         CVdataCopyFrom.Profile,
//         CVdataCopyFrom.Motivation,
//         CVdataCopyFrom.WorkingExperience,
//         CVdataCopyFrom.Skills,
//         CVdataCopyFrom.Educations,
//         CVdataCopyFrom.Languages,
//         CVdataCopyFrom.Sparetime
//     )

//     return (copyOfCurrentCVData);
// }

export function CopyCVDataToNew(CVdataCopyFrom: CVData): CVData {

    let CssStyles : React.CSSProperties = CVdataCopyFrom.CssStyles;
    let cvContactInfo;
    if (true) {
        let { sectionName, sectionNameLabel, entries, cssStyles, sectionPosition , sectionContent , sectionContainerDiv } = CVdataCopyFrom.ContactInfo;
        cvContactInfo = new ContactInfo (sectionName, sectionNameLabel, entries.map(ae => ({ ...ae })) , cssStyles, sectionPosition, sectionContent , sectionContainerDiv);
    }
    
    let profile;
    if (true) {
        let { sectionName, sectionNameLabel, entries, cssStyles, sectionPosition , sectionContent , sectionContainerDiv } = CVdataCopyFrom.Profile;
        profile = new Profile (sectionName, sectionNameLabel, entries.map(ae => ({ ...ae })), cssStyles, sectionPosition , sectionContent, sectionContainerDiv);
    }

    let motivation;
    if (true) {
        let { sectionName, entries, sectionNameLabel, cssStyles, sectionPosition , sectionContent , sectionContainerDiv } = CVdataCopyFrom.Motivation;
        motivation = new Motivation (sectionName,  entries.map(ae => ({ ...ae })), sectionNameLabel,cssStyles, sectionPosition , sectionContent, sectionContainerDiv);
    }

    let workingExperience;
    if (true) {
        let { sectionName, achivementstitle, entries, sectionNameLabel ,cssStyles, sectionPosition, sectionContent, sectionContainerDiv  } = CVdataCopyFrom.WorkingExperience;
        workingExperience = new WorkingExperience (sectionName, achivementstitle,  entries.map(ae => ({ ...ae })), sectionNameLabel, cssStyles, sectionPosition , sectionContent , sectionContainerDiv);
    }

    let skills;
    if (true) {
        let { sectionName,  entries, sectionNameLabel, cssStyles, sectionPosition , sectionContent , sectionContainerDiv } = CVdataCopyFrom.Skills;
        skills = new Skills (sectionName,   entries.map(ae => ({ ...ae })), sectionNameLabel, cssStyles, sectionPosition , sectionContent , sectionContainerDiv );
    }

    let educations;
    if (true) {
        let { sectionName,  entries, sectionNameLabel, cssStyles, sectionPosition ,sectionContent ,sectionContainerDiv } = CVdataCopyFrom.Educations;
        educations = new Educations (sectionName,   entries.map(ae => ({ ...ae })), sectionNameLabel,cssStyles, sectionPosition , sectionContent, sectionContainerDiv);
    }

    let languages;
    if (true) {
        let { sectionName,  entries, sectionNameLabel , cssStyles, sectionPosition , sectionContent , sectionContainerDiv} = CVdataCopyFrom.Languages;
        languages = new Languages (sectionName,   entries.map(ae => ({ ...ae })), sectionNameLabel,cssStyles, sectionPosition , sectionContent, sectionContainerDiv);
    }

    let sparetime;
    if (true) {
        let { sectionName,  entries, sectionNameLabel  , cssStyles, sectionPosition , sectionContent , sectionContainerDiv } = CVdataCopyFrom.Sparetime;
        sparetime = new Sparetime (sectionName,   entries.map(ae => ({ ...ae })), sectionNameLabel  , cssStyles, sectionPosition , sectionContent , sectionContainerDiv);
    }


    let copyOfCurrentCVData: CVData = new CVData(
        cvContactInfo,
        profile,
       motivation,
       workingExperience,
       skills,       
       educations,
        languages,
        sparetime,
        CssStyles
    )

    return (copyOfCurrentCVData);
}

export function setNewCurrentCVData(CVdatanew: any) {

    let tmpCVData: CVData = new CVData(

        { ...CVdatanew.ContactInfo },
        { ...CVdatanew.Profile },
        { ...CVdatanew.Motivation },
        { ...CVdatanew.WorkingExperience },
        { ...CVdatanew.Skills },
        { ...CVdatanew.Educations },
        { ...CVdatanew.Languages },
        { ...CVdatanew.Sparetime },
        { ...CVdatanew.CssStyles },
    )
    currenrCVData = tmpCVData;
    
}

export function setCurrentCVData(CVdatanew: any) {

    // let tmpApplicationData: ApplicationData = new ApplicationData(

    //     { ...applicationdatanew.ApplicantInfo },
    //     { ...applicationdatanew.EmployerInfo },
    //     { ...applicationdatanew.ApplicationJobTitle },
    //     { ...applicationdatanew.ApplicationDate },
    //     { ...applicationdatanew.ApplicantContent },
    //     { ...applicationdatanew.ApplicantContentHeadline }
    // )
    // currentApplicationData = tmpApplicationData;

    currenrCVData = CVdatanew;
}

export function setCurrentCVData_v2(cvdatanew: CVData) {

    currenrCVData = cvdatanew;
}










