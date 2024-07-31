import { EmployerInfo, ApplicantInfo, ApplicantInfoEntry, ApplicantContent, ApplicantContentEntry, ApplicationData } from '../Classes/ClassesApplicationData';

let defaultApplicationEmployerdata = new EmployerInfo(
    'CarBuddii',
    'Rosensgade 2',
    '',
    '2300',
    "København S",
    'Att.Dorte Kollerup',
    'Ansøgning til stillingen som Systemudvikler'

)

let defaultApplicantContactdataList: ApplicantInfoEntry[] = [];


let defaultApplicantContactdata = new ApplicantInfoEntry(
    'Trekronervej 9A',
    'fa fa-home fa-fw  icon_vertical_center',
    ''
)
defaultApplicantContactdataList.push(defaultApplicantContactdata);

defaultApplicantContactdata = new ApplicantInfoEntry(
    '8410 Rønde',
    'fa fa-home fa-fw  icon_vertical_center',
    ''
)
defaultApplicantContactdataList.push(defaultApplicantContactdata);



defaultApplicantContactdata = new ApplicantInfoEntry(
    'johnpetersen1959@gmail.com',
    'fa fa-envelope fa-fw  icon_vertical_center',
    'email'
)
defaultApplicantContactdataList.push(defaultApplicantContactdata);



defaultApplicantContactdata = new ApplicantInfoEntry(
    '28933014',
    'fa fa-phone fa-fw icon_vertical_center',
    ''
)
defaultApplicantContactdataList.push(defaultApplicantContactdata);

let defaultApplicantinfo = new ApplicantInfo(
    'John Petersen',
    defaultApplicantContactdataList
)



export { ApplicationDate }
export { ApplicationJobTitle }

let defaultContentEntries: ApplicantContentEntry[] = [];

let applicantContentEntry = new ApplicantContentEntry(
    `
     i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen
    i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen
  
    `
)
defaultContentEntries.push(applicantContentEntry);

applicantContentEntry = new ApplicantContentEntry(
    `
     i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen
    i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen
  
    `
)
defaultContentEntries.push(applicantContentEntry);

applicantContentEntry = new ApplicantContentEntry(
    `
       i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen
    i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen
  
    `
)
defaultContentEntries.push(applicantContentEntry);

applicantContentEntry = new ApplicantContentEntry(
    `
      i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen
    i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen
  
    `
)
defaultContentEntries.push(applicantContentEntry);

applicantContentEntry = new ApplicantContentEntry(
    `
   i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen
    i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen  i den elektroniske overførsel til Erhvervsstyrelsen
    `
)
defaultContentEntries.push(applicantContentEntry);


applicantContentEntry = new ApplicantContentEntry(
    `
 Jeg håber, vi kan arrangere et møde bla. bla.
    `
)
defaultContentEntries.push(applicantContentEntry);

applicantContentEntry = new ApplicantContentEntry(
    `
 Med venlig hilsen,
    `
)
defaultContentEntries.push(applicantContentEntry);

applicantContentEntry = new ApplicantContentEntry(
    `
 John Petersen,
    `
)
defaultContentEntries.push(applicantContentEntry);





let defaultapplicationContent = new ApplicantContent(
    ' Ja tak. Regn mig ind',
    defaultContentEntries

)

let ApplicationDate = 'Rønde, den 7. juli 2024'
let ApplicationJobTitle = 'Ansøgning til stillingen som Full Stack Developer'

let defaultApplicationData = new ApplicationData(
    defaultApplicantinfo,
    defaultApplicationEmployerdata,
    ApplicationJobTitle,
    ApplicationDate,
    defaultapplicationContent
)

export { defaultApplicationData }

let currentApplicationData = new ApplicationData(
    defaultApplicantinfo,
    defaultApplicationEmployerdata,
    ApplicationJobTitle,
    ApplicationDate,
    defaultapplicationContent
);

// let currentApplicationData : {} as ApplicationData

 let tmpDummy : any = null;
 currentApplicationData = tmpDummy;
 
export { currentApplicationData }

export function setCurrentApplicationData(applicationdatanew: any) {    
         
    currentApplicationData = applicationdatanew;    
}