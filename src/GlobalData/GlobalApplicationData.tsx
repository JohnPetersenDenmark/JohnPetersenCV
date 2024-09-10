import { bool } from 'prop-types';
import { EmployerInfo, EmployerInfoEntry, ApplicantInfo, ApplicantInfoEntry, ApplicationJobTitle, ApplicantContentHeadlineEntry, ApplicantContentHeadline } from '../Classes/ClassesApplicationData';
import { ApplicantContent, ApplicantContentEntry, ApplicationData, ApplicationDate, ApplicationDateEntry, ApplicationJobTitleEntry } from '../Classes/ClassesApplicationData';


import { SectionEntryLabels, inputFieldDescription, SectionEntryInput } from '../Classes/ClassesCVData';
import ApplicationContent from '../Components/Application/ApplicationContent';


export const EmployerEntryLabels: SectionEntryLabels = {};
EmployerEntryLabels['name'] = "Firmanavn";
EmployerEntryLabels['AddressLine1'] = "Adresse";
EmployerEntryLabels['AddressLine2'] = "Adresse 2";
EmployerEntryLabels['zipcode'] = "Postnummer";
EmployerEntryLabels['city'] = "By";
EmployerEntryLabels['attention'] = "Til";
EmployerEntryLabels['jobtitle'] = "Jobtitel";

export const EmployerInputFields: SectionEntryInput = {};
EmployerInputFields['name'] = new inputFieldDescription('input')
EmployerInputFields['AddressLine1'] = new inputFieldDescription('input')
EmployerInputFields['AddressLine2'] = new inputFieldDescription('input')
EmployerInputFields['zipcode'] = new inputFieldDescription('input')
EmployerInputFields['city'] = new inputFieldDescription('input')
EmployerInputFields['attention'] = new inputFieldDescription('input')
EmployerInputFields['jobtitle'] = new inputFieldDescription('input')




let defaultEmployerDataList: EmployerInfoEntry[] = [];

let defaultEmployerData = new EmployerInfoEntry(

    "CarBuddii",
    "Rosengade 2",
    "",
    "2300",
    "København S",
    'Att.Dorte Kollerup',
    'Ansøgning til stillingen som Systemudvikler',
    0,
    EmployerEntryLabels,
    EmployerInputFields
)

defaultEmployerDataList.push(defaultEmployerData);


let defaultApplicationEmployerdata = new EmployerInfo(
    'EmployerInfo',
    'Virksomhed',
    defaultEmployerDataList,
    'Virksomhed'
)

export const ApplicantInfoEntryLabels: SectionEntryLabels = {};
ApplicantInfoEntryLabels['description'] = "Profil-beskrivelse";

export const ApplicantInfoInputFields: SectionEntryInput = {};
ApplicantInfoInputFields['description'] = new inputFieldDescription('textarea')
ApplicantInfoInputFields['icon'] = new inputFieldDescription('textarea')
ApplicantInfoInputFields['type'] = new inputFieldDescription('textarea')

let defaultApplicantContactdataList: ApplicantInfoEntry[] = [];


let defaultApplicantContactdata = new ApplicantInfoEntry(
    'Trekronervej 9A',
    'fa fa-home fa-fw  icon_vertical_center',
    '',
    0,
    ApplicantInfoEntryLabels,
    ApplicantInfoInputFields
)
defaultApplicantContactdataList.push(defaultApplicantContactdata);

defaultApplicantContactdata = new ApplicantInfoEntry(
    '8410 Rønde',
    'fa fa-home fa-fw  icon_vertical_center',
    '',
    1,
    ApplicantInfoEntryLabels,
    ApplicantInfoInputFields
)
defaultApplicantContactdataList.push(defaultApplicantContactdata);



defaultApplicantContactdata = new ApplicantInfoEntry(
    'johnpetersen1959@gmail.com',
    'fa fa-envelope fa-fw  icon_vertical_center',
    'email',
    2,
    ApplicantInfoEntryLabels,
    ApplicantInfoInputFields
)
defaultApplicantContactdataList.push(defaultApplicantContactdata);



defaultApplicantContactdata = new ApplicantInfoEntry(
    '28933014',
    'fa fa-phone fa-fw icon_vertical_center',
    '',
    3,
    ApplicantInfoEntryLabels,
    ApplicantInfoInputFields
)
defaultApplicantContactdataList.push(defaultApplicantContactdata);

let defaultApplicantinfo = new ApplicantInfo(
    'aaaaa',
    defaultApplicantContactdataList,
    'ApplicantInfo',
    "John Petersen",
    "Ansøger"
)


export { ApplicationDate }
export { ApplicationJobTitle }


export const ApplicantContentEntryLabels: SectionEntryLabels = {};
ApplicantContentEntryLabels['bodyparagraph'] = "Profil-beskrivelse";

export const ApplicantContentInputFields: SectionEntryInput = {};
ApplicantContentInputFields['bodyparagraph'] = new inputFieldDescription('textarea')


let defaultContentEntries: ApplicantContentEntry[] = [];

let applicantContentEntry = new ApplicantContentEntry(
    `
     i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen
    i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen
  
    `,
    0,
    ApplicantContentEntryLabels,
    ApplicantContentInputFields
)
defaultContentEntries.push(applicantContentEntry);





let defaultapplicationContent = new ApplicantContent(

    defaultContentEntries,
    'Indhold',
    'ApplicantContent',
    'Brødtekst'

)



export const ApplicationDateEntryLabels: SectionEntryLabels = {};
ApplicationDateEntryLabels['date'] = "Profil-beskrivelse";

export const ApplicationInputFields: SectionEntryInput = {};
ApplicationInputFields['date'] = new inputFieldDescription('textarea')

let defaultDateEntries1: ApplicationDateEntry[] = [];


let applicationDateEntry = new ApplicationDateEntry(

    'Rønde, den 7. juli 2024',
    0,
    ApplicationDateEntryLabels,
    ApplicationInputFields
)

defaultDateEntries1.push(applicationDateEntry);

export const defaultApplicationDate = new ApplicationDate(
    'Dato',
    defaultDateEntries1,
    'Ansøgningsdato',
    'ApplicationDate',
    'Dato for ansøgning'
)


export const ApplicationJobTitleEntryLabels: SectionEntryLabels = {};
ApplicationJobTitleEntryLabels['jobtitle'] = "Profil-beskrivelse";

export const ApplicationJobTitleInputFields: SectionEntryInput = {};
ApplicationJobTitleInputFields['jobtitle'] = new inputFieldDescription('textarea')

let defaultJobTitleEntries: ApplicationJobTitleEntry[] = [];

let defaultJobTitleEntry = new ApplicationJobTitleEntry(
    'Ansøgning til stillingen som Full Stack Developer',
    0,
    ApplicationJobTitleEntryLabels,
    ApplicationJobTitleInputFields
)

defaultJobTitleEntries.push(defaultJobTitleEntry)

let defaultApplicationJobTitle = new ApplicationJobTitle(
    'headline Jobtitel',
    defaultJobTitleEntries,
    'titel',
    'ApplicationJobTitle',
    'Jobtitel'
)


export const ApplicationContentHeadlineLabels: SectionEntryLabels = {};
ApplicationContentHeadlineLabels['text'] = "Profil-beskrivelse";

export const ApplicationContentHeadlineInputFields: SectionEntryInput = {};
ApplicationContentHeadlineInputFields['text'] = new inputFieldDescription('textarea')

let ApplicantContentHeadlineEntries: ApplicantContentHeadlineEntry[] = []
let applicantContentHeadlineEntry = new ApplicantContentHeadlineEntry(
    'overskriften i brødteksten',
    0,
    ApplicationContentHeadlineLabels,
    ApplicationContentHeadlineInputFields
)

ApplicantContentHeadlineEntries.push(applicantContentHeadlineEntry);


let defaultContentHeaderline = new ApplicantContentHeadline(
    ApplicantContentHeadlineEntries,
    'Overskrift',
    'ApplicantContentHeadline',
    'Brødtekst overskrift'
)

let defaultApplicationData = new ApplicationData(
    defaultApplicantinfo,
    defaultApplicationEmployerdata,
    defaultApplicationJobTitle,
    defaultApplicationDate,
    defaultapplicationContent,
    defaultContentHeaderline
)

export { defaultApplicationData }

let currentApplicationData = new ApplicationData(
    defaultApplicantinfo,
    defaultApplicationEmployerdata,
    defaultApplicationJobTitle,
    defaultApplicationDate,
    defaultapplicationContent,
    defaultContentHeaderline
);

export { currentApplicationData }

let copyOfCurrentApplicationApplicantInfo = { ...currentApplicationData.ApplicantInfo }
copyOfCurrentApplicationApplicantInfo.entries = { ...currentApplicationData.ApplicantInfo.entries }

for (let i = 0; i < copyOfCurrentApplicationApplicantInfo.entries.length; i++) {
    copyOfCurrentApplicationApplicantInfo.entries[i] = { ...currentApplicationData.ApplicantInfo.entries[i] }
}
let copyOfCurrentApplicationData = new ApplicationData(

    { ...currentApplicationData.ApplicantInfo },
    //copyOfCurrentApplicationApplicantInfo,
    { ...currentApplicationData.EmployerInfo },
    { ...currentApplicationData.ApplicationJobTitle },
    { ...currentApplicationData.ApplicationDate },
    { ...currentApplicationData.ApplicantContent },
    { ...currentApplicationData.ApplicantContentHeadline }
)

export { copyOfCurrentApplicationData }

//let copyOfCurrentApplicationData = {...currentApplicationData}
if (copyOfCurrentApplicationData.EmployerInfo === currentApplicationData.EmployerInfo) {
    let a = 'too bad';
}


export function setCurrentApplicationData(applicationdatanew: any) {

    // let tmpApplicationData: ApplicationData = new ApplicationData(

    //     { ...applicationdatanew.ApplicantInfo },
    //     { ...applicationdatanew.EmployerInfo },
    //     { ...applicationdatanew.ApplicationJobTitle },
    //     { ...applicationdatanew.ApplicationDate },
    //     { ...applicationdatanew.ApplicantContent },
    //     { ...applicationdatanew.ApplicantContentHeadline }
    // )
    // currentApplicationData = tmpApplicationData;

    currentApplicationData = applicationdatanew;
}

export function setNewCurrentApplicationData(applicationdatanew: any) {

    let tmpApplicationData: ApplicationData = new ApplicationData(

        { ...applicationdatanew.ApplicantInfo },
        { ...applicationdatanew.EmployerInfo },
        { ...applicationdatanew.ApplicationJobTitle },
        { ...applicationdatanew.ApplicationDate },
        { ...applicationdatanew.ApplicantContent },
        { ...applicationdatanew.ApplicantContentHeadline }
    )
    currentApplicationData = tmpApplicationData;


}



export function CopyApplicationDataToNew(applicationdataCopyFrom: ApplicationData): ApplicationData {

    let applicantInfo;
    if (true) {
        let { applicantname, entries, thisClassName, sectionName, sectionNameLabel } = applicationdataCopyFrom.ApplicantInfo;
        applicantInfo = new ApplicantInfo(applicantname, entries.map(ae => ({ ...ae })), thisClassName, sectionName, sectionNameLabel);
    }

    let employerInfo;
    if ( true)
    {
        let { thisClassName, sectionName, sectionNameLabel, entries } = applicationdataCopyFrom.EmployerInfo;
        employerInfo = new EmployerInfo( thisClassName, sectionName, entries.map(ae => ({ ...ae })),  sectionNameLabel);
    }

    let JobTitle;
    if ( true)
    {
        let { headline, entries,  sectionName, thisClassName,  sectionNameLabel } = applicationdataCopyFrom.ApplicationJobTitle;
        JobTitle = new ApplicationJobTitle( headline,  entries.map(ae => ({ ...ae })), sectionName,  thisClassName,sectionNameLabel);
    }

    let date;
    if ( true)
    {
        let { headline, entries,  sectionName, thisClassName,  sectionNameLabel } = applicationdataCopyFrom.ApplicationDate;
        date = new ApplicationDate( headline,  entries.map(ae => ({ ...ae })), sectionName,  thisClassName,sectionNameLabel);
    }

    let content;
    if ( true)
    {
        let {  entries,  sectionName, thisClassName,  sectionNameLabel } = applicationdataCopyFrom.ApplicantContent;
        content = new ApplicantContent(   entries.map(ae => ({ ...ae })), sectionName,  thisClassName,sectionNameLabel);
    }

    let contentHeadline;
    if ( true)
    {
        let {  entries,  sectionName, thisClassName,  sectionNameLabel } = applicationdataCopyFrom.ApplicantContentHeadline;
        contentHeadline = new ApplicantContentHeadline(   entries.map(ae => ({ ...ae })), sectionName,  thisClassName,sectionNameLabel);
    }
 

    let copyOfCurrentApplicationData: ApplicationData = new ApplicationData(
        applicantInfo,
        employerInfo,
        JobTitle,
        date,
       content,
       contentHeadline

    )
    return (copyOfCurrentApplicationData);
}

// let reloadDataFromFile = true;
// export {reloadDataFromFile}

// export function setReloadDataFromFileFlag()  {
//     reloadDataFromFile = true;
// }

// export function resetReloadDataFromFileFlag()  {
//     reloadDataFromFile = false;
// }
