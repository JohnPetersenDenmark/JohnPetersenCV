export class EmployerInfo {
    name: string
    AddressLine1: string
    AddressLine2: string
    zipcode: string
    city: string
    attention: string
    jobtitle: string

    public constructor(name: string, AddressLine1: string, AddressLine2: string, zipcode: string, city: string, attention: string, jobtitle: string) {
        this.name = name;
        this.AddressLine1 = AddressLine1;
        this.AddressLine2 = AddressLine2;
        this.zipcode = zipcode;
        this.city = city;
        this.attention = attention;
        this.jobtitle = jobtitle
    }
}


export class ApplicantInfoEntry {
    description: string
    icon: string
    type: string

    public constructor(description: string, icon: string, type: string) {
        this.description = description;
        this.icon = icon
        this.type = type
    }
}

export class ApplicantInfo {
    applicantname: string
    entries: ApplicantInfoEntry[];
    public constructor(applicantname: string, entries: ApplicantInfoEntry[]) {
        this.applicantname = applicantname;
        this.entries = entries;
    }
}


export class ApplicantContent {
    headline: string
    paragraphs : ApplicantContentEntry[];
    public constructor(headline: string,  paragraphs : ApplicantContentEntry[] ) {
        this.headline = headline;
        this.paragraphs  = paragraphs;
    }
}

export class ApplicantContentEntry {
    bodyparagraph  : string;
    public constructor(bodyparagraph  : string ) {
        this.bodyparagraph = bodyparagraph;       
    }
}

export class ApplicationData {
    ApplicantInfo : ApplicantInfo;
    EmployerInfo : EmployerInfo;
    ApplicateJobTitle : string;
    ApplicationDate : string; 
    ApplicantContent  : ApplicantContent;
   
   

    public constructor(
        ApplicantInfo : ApplicantInfo, 
        EmployerInfo : EmployerInfo,
        ApplicateJobTitle : string,
        ApplicationDate : string,
        ApplicantContent  : ApplicantContent,                  
    ) 
    
    {
        this.ApplicantInfo = ApplicantInfo; 
        this.EmployerInfo = EmployerInfo;
        this.ApplicateJobTitle = ApplicateJobTitle
        this.ApplicationDate = ApplicationDate;
        this.ApplicantContent = ApplicantContent;                          
    }
  } 


