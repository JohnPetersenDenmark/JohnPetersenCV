export class inputFieldDescription {
    type : string

    public constructor(type: string) {
        this.type = type;

    }
}

export type SectionEntryLabels = {
    [key: string]: string;
};

export type SectionEntryInput = {
    [key: string]: inputFieldDescription;
};



export class Profile {
    sectionName: string
    sectionNameLabel: string
    entries: ProfileEntry[];
   

    public constructor(sectionName: string,  sectionNameLabel: string, entries: ProfileEntry[]) {
        this.sectionName = sectionName;
        this.entries = entries;
        this.sectionNameLabel =  sectionNameLabel;
    }
}

export class ProfileEntry {   
    description: string
    labels : SectionEntryLabels
    sectionEntryInput : SectionEntryInput
    public constructor(description: string,   labels : SectionEntryLabels, sectionEntryInput : SectionEntryInput) {
        this.description = description;
        this.labels =   labels 
        this.sectionEntryInput = sectionEntryInput
    }
}

export class Motivation {
    sectionName: string   
    sectionNameLabel: string
    entries: MotivationEntry[];

    public constructor(sectionName: string,  entries: MotivationEntry[],  sectionNameLabel: string) {
        this.sectionName = sectionName;        
        this.entries = entries;
        this.sectionNameLabel = sectionNameLabel
    }
}

export class MotivationEntry {
    description: string
    labels : SectionEntryLabels
    sectionEntryInput : SectionEntryInput
    public constructor(description: string, labels : SectionEntryLabels,  sectionEntryInput : SectionEntryInput) {
        this.description = description;
        this.labels = labels;
        this.sectionEntryInput = sectionEntryInput
    }
}



export class ContactInfoEntry {
    description: string
    icon: string
    type: string
    labels : SectionEntryLabels
    sectionEntryInput : SectionEntryInput

    public constructor(description: string, icon: string, type: string,  labels : SectionEntryLabels, sectionEntryInput : SectionEntryInput) {
        this.description = description;
        this.icon = icon
        this.type = type
        this.labels = labels
        this.sectionEntryInput = sectionEntryInput
    }
}

export class ContactInfo {
    sectionName: string
    sectionNameLabel: string
    entries: ContactInfoEntry[];
    public constructor(sectionName: string, sectionNameLabel: string, entries: ContactInfoEntry[]) {
        this.sectionName = sectionName;
        this.entries = entries;
        this.sectionNameLabel = sectionNameLabel;
    }
}



export class WorkingExperienceEntry {

    title: string
    fromdate: string
    todate: string
    usedskills: string[]
    descriptions: string[]
    achievements: string[]
    icon: string
    labels : SectionEntryLabels
    sectionEntryInput : SectionEntryInput


    public constructor(title: string, fromdate: string, todate: string, usedskills: string[], 
        descriptions: string[], achievements: string[], icon: string,   labels : SectionEntryLabels,  sectionEntryInput : SectionEntryInput) {
        this.title = title
        this.fromdate = fromdate
        this.todate = todate
        this.usedskills = usedskills
        this.descriptions = descriptions;
        this.achievements = achievements;
        this.icon = icon
        this.labels  = labels
        this.sectionEntryInput = sectionEntryInput
    }
}

export class WorkingExperience {
    sectionName: string
    sectionNameLabel: string
    achivementstitle: string
    entries: WorkingExperienceEntry[]

    public constructor(sectionName: string, achivementstitle: string, entries: WorkingExperienceEntry[], sectionNameLabel: string) {
        this.sectionName = sectionName;
        this.achivementstitle = achivementstitle
        this.entries = entries
        this.sectionNameLabel = sectionNameLabel
    }
}

export class SkillEntry {
    description: string
    stars: number
    labels : SectionEntryLabels
    sectionEntryInput : SectionEntryInput

    public constructor(description: string, stars: number, labels : SectionEntryLabels,  sectionEntryInput : SectionEntryInput) {

        this.description = description;
        this.stars = stars;
        this.labels = labels;
        this.sectionEntryInput = sectionEntryInput
    }
}
 
export class Skills {
    sectionName: string
    sectionNameLabel: string
    entries: SkillEntry[]

    public constructor(sectionName: string, entries: SkillEntry[], sectionNameLabel: string) {

        this.sectionName = sectionName;
        this.entries = entries;
        this.sectionNameLabel = sectionNameLabel
    }
}

export class Educations {
    sectionName: string
    sectionNameLabel: string
    entries : EducationEntry[]

    public constructor(sectionName: string,  entries : EducationEntry[], sectionNameLabel: string) {

        this.sectionName = sectionName;
        this.entries = entries;
        this.sectionNameLabel = sectionNameLabel
    }
}
 
export class EducationEntry {
    title: string
    todate: string
    location: string 
    labels : SectionEntryLabels
    sectionEntryInput : SectionEntryInput

    public constructor(title: string, todate: string, location: string,   labels : SectionEntryLabels,   sectionEntryInput : SectionEntryInput) {

        this.title = title;
        this.todate = todate;
        this.location = location
        this.labels = labels
        this.sectionEntryInput = sectionEntryInput
    }
} 

export class LanguageEntry {
    language: string
    level: string
    labels : SectionEntryLabels
    sectionEntryInput : SectionEntryInput
    
    public constructor(language: string, level: string, labels : SectionEntryLabels, sectionEntryInput : SectionEntryInput) {

        this.language = language;
        this.level = level;
        this.labels =  labels
        this.sectionEntryInput = sectionEntryInput
      
    }
}

export class Languages {
    sectionName: string
    entries : LanguageEntry[]
    sectionNameLabel: string

    public constructor(sectionName: string,  entries : LanguageEntry[],  sectionNameLabel: string) {

        this.sectionName = sectionName;
        this.entries = entries;
        this. sectionNameLabel = sectionNameLabel
    }
}

export class Sparetime {
    sectionName: string
    sectionNameLabel: string
    entries : SparetimeEntry[]

    public constructor(sectionName: string,  entries : SparetimeEntry[], sectionNameLabel: string) {
        this.sectionName = sectionName;
        this.entries = entries;
        this.sectionNameLabel = sectionNameLabel              
    }
}


export class SparetimeEntry {
    interest: string
    labels : SectionEntryLabels
    sectionEntryInput : SectionEntryInput

    public constructor(interest: string, labels : SectionEntryLabels,  sectionEntryInput : SectionEntryInput ) {

        this.interest = interest; 
        this.labels = labels 
        this.sectionEntryInput = sectionEntryInput     
    }
}

export class CVData {
    Sparetime  : Sparetime;
    Skills  : Skills;
    WorkingExperience :WorkingExperience;
    Languages  : Languages;
    Educations  : Educations;
    Motivation  :Motivation;
    ContactInfo  : ContactInfo
    Profile  : Profile;

    public constructor(
        ContactInfo  : ContactInfo, 
        Profile  : Profile, 
        Motivation  :Motivation,
        WorkingExperience :WorkingExperience,
        Skills  : Skills,
        Educations  : Educations,
        Languages  : Languages,
        Sparetime  : Sparetime    
    ) {

        this.ContactInfo = ContactInfo;     
        this.Profile = Profile;  
        this.Motivation = Motivation;
        this.WorkingExperience = WorkingExperience;
        this.Skills = Skills;
        this.Educations = Educations;
        this.Languages = Languages;
        this.Sparetime = Sparetime;
    }

  } 
