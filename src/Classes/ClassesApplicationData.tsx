
import { SectionEntryLabels, SectionEntryInput } from './ClassesCVData'


export class SectionPosition {
    //width: number = 0
   // height: number = 0
    startXPosition: number = 0
    startYPosition: number = 0;

}

export class EmployerInfo {

    thisClassName: string
    sectionName: string
    sectionNameLabel: string
    sectionPosition: SectionPosition
    cssStyles: React.CSSProperties
    entries: EmployerInfoEntry[];

    public constructor(thisClassName: string, sectionName: string, entries: EmployerInfoEntry[], sectionNameLabel: string, cssStyles: React.CSSProperties, sectionPosition: SectionPosition) {
        this.thisClassName = thisClassName
        this.sectionName = sectionName
        this.entries = entries
        this.sectionNameLabel = sectionNameLabel
        this.cssStyles = cssStyles
        this.sectionPosition = sectionPosition
    }
}

export class EmployerInfoEntry {
    name: string
    AddressLine1: string
    AddressLine2: string
    zipcode: string
    city: string
    attention: string
    jobtitle: string
    sortorder: number
    labels: SectionEntryLabels;
    sectionEntryInput: SectionEntryInput


    public constructor(name: string, AddressLine1: string,
        AddressLine2: string, zipcode: string,
        city: string, attention: string, jobtitle: string,
        sortorder: number, labels: SectionEntryLabels, sectionEntryInput: SectionEntryInput
    ) {
        this.name = name;
        this.AddressLine1 = AddressLine1;
        this.AddressLine2 = AddressLine2;
        this.zipcode = zipcode;
        this.city = city;
        this.attention = attention;
        this.jobtitle = jobtitle
        this.sortorder = sortorder
        this.labels = labels;
        this.sectionEntryInput = sectionEntryInput
    }
}



export class ApplicantInfoEntry {
    description: string
    icon: string
    type: string
    sortorder: number
    labels: SectionEntryLabels;
    sectionEntryInput: SectionEntryInput

    public constructor(description: string, icon: string, type: string, sortorder: number, labels: SectionEntryLabels, sectionEntryInput: SectionEntryInput) {
        this.description = description;
        this.icon = icon
        this.type = type
        this.sortorder = sortorder
        this.labels = labels;
        this.sectionEntryInput = sectionEntryInput
    }
}
export interface IApplicantInfo {
    thisClassName: string
    sectionName: string
    sectionNameLabel: string
    applicantname: string
    csstyles: React.CSSProperties
    entries: ApplicantInfoEntry[];
}

export class ApplicantInfo {
    thisClassName: string
    sectionName: string
    sectionNameLabel: string
    applicantname: string
    sectionPosition: SectionPosition
    cssStyles: React.CSSProperties
    entries: ApplicantInfoEntry[];


    public constructor(applicantname: string, entries: ApplicantInfoEntry[], thisClassName: string, sectionName: string, sectionNameLabel: string, cssStyles: React.CSSProperties, sectionPosition: SectionPosition) {
        this.applicantname = applicantname;
        this.entries = entries;
        this.sectionNameLabel = sectionNameLabel
        this.sectionName = sectionName
        this.thisClassName = thisClassName
        this.cssStyles = cssStyles
        this.sectionPosition = sectionPosition
    }
}


export class ApplicantContent {
    thisClassName: string
    sectionName: string
    sectionNameLabel: string
    cssStyles: React.CSSProperties
    sectionPosition: SectionPosition
    entries: ApplicantContentEntry[];
    public constructor(entries: ApplicantContentEntry[], sectionName: string, thisClassName: string, sectionNameLabel: string, cssStyles: React.CSSProperties, sectionPosition: SectionPosition) {

        this.entries = entries;
        this.sectionName = sectionName
        this.thisClassName = thisClassName
        this.sectionNameLabel = sectionNameLabel
        this.cssStyles = cssStyles
        this.sectionPosition = sectionPosition
    }
}

export class ApplicantContentEntry {
    bodyparagraph: string;
    sortorder: number
    labels: SectionEntryLabels;
    sectionEntryInput: SectionEntryInput
    public constructor(bodyparagraph: string, sortorder: number, labels: SectionEntryLabels, sectionEntryInput: SectionEntryInput) {
        this.bodyparagraph = bodyparagraph;
        this.sortorder = sortorder
        this.labels = labels
        this.sectionEntryInput = sectionEntryInput
    }
}

export class ApplicantContentHeadline {
    thisClassName: string
    sectionName: string
    sectionNameLabel: string
    sectionPosition: SectionPosition
    cssStyles: React.CSSProperties
    entries: ApplicantContentHeadlineEntry[];
    public constructor(entries: ApplicantContentHeadlineEntry[], sectionName: string, thisClassName: string, sectionNameLabel: string, cssStyles: React.CSSProperties, sectionPosition: SectionPosition) {
        this.entries = entries
        this.sectionName = sectionName
        this.thisClassName = thisClassName
        this.sectionNameLabel = sectionNameLabel
        this.cssStyles = cssStyles
        this.sectionPosition = sectionPosition
    }
}

export class ApplicantContentHeadlineEntry {
    text: string
    sortorder: number
    labels: SectionEntryLabels;
    sectionEntryInput: SectionEntryInput

    public constructor(text: string, sortorder: number, labels: SectionEntryLabels, sectionEntryInput: SectionEntryInput) {
        this.sortorder = sortorder
        this.labels = labels
        this.sectionEntryInput = sectionEntryInput
        this.text = text

    }
}

export class ApplicationDate {
    thisClassName: string
    sectionName: string
    sectionNameLabel: string
    headline: string
    cssStyles: React.CSSProperties
    sectionPosition: SectionPosition
    entries: ApplicationDateEntry[];

    public constructor(headline: string, entries: ApplicationDateEntry[], sectionName: string, thisClassName: string, sectionNameLabel: string, cssStyles: React.CSSProperties, sectionPosition: SectionPosition) {
        this.headline = headline;
        this.entries = entries;
        this.sectionName = sectionName
        this.thisClassName = thisClassName
        this.sectionNameLabel = sectionNameLabel
        this.cssStyles = cssStyles
        this.sectionPosition = sectionPosition
    }
}

export class ApplicationDateEntry {
    date: string;
    sortorder: number
    labels: SectionEntryLabels;
    sectionEntryInput: SectionEntryInput

    public constructor(date: string, sortorder: number, labels: SectionEntryLabels, sectionEntryInput: SectionEntryInput) {
        this.date = date;
        this.sortorder = sortorder
        this.labels = labels
        this.sectionEntryInput = sectionEntryInput
    }
}

export class ApplicationJobTitle {
    thisClassName: string
    sectionName: string
    sectionNameLabel: string
    headline: string
    cssStyles: React.CSSProperties
    sectionPosition: SectionPosition
    entries: ApplicationJobTitleEntry[];

    public constructor(headline: string, entries: ApplicationJobTitleEntry[], sectionName: string, thisClassName: string, sectionNameLabel: string, cssStyles: React.CSSProperties, sectionPosition: SectionPosition) {
        this.headline = headline;
        this.entries = entries;
        this.sectionName = sectionName
        this.thisClassName = thisClassName
        this.sectionNameLabel = sectionNameLabel
        this.cssStyles = cssStyles
        this.sectionPosition = sectionPosition
    }
}

export class ApplicationJobTitleEntry {
    jobtitle: string;
    sortorder: number
    labels: SectionEntryLabels;
    sectionEntryInput: SectionEntryInput

    public constructor(jobtitle: string, sortorder: number, labels: SectionEntryLabels, sectionEntryInput: SectionEntryInput) {
        this.jobtitle = jobtitle;
        this.sortorder = sortorder
        this.labels = labels
        this.sectionEntryInput = sectionEntryInput
    }
}

export class ApplicationData {
      CssStyles : React.CSSProperties
    ApplicantInfo: ApplicantInfo;
    EmployerInfo: EmployerInfo;
    ApplicationJobTitle: ApplicationJobTitle;
    ApplicationDate: ApplicationDate;
    ApplicantContent: ApplicantContent;
    ApplicantContentHeadline: ApplicantContentHeadline



    public constructor(
        CssStyles : {},
        ApplicantInfo: ApplicantInfo,
        EmployerInfo: EmployerInfo,
        ApplicationJobTitle: ApplicationJobTitle,
        ApplicationDate: ApplicationDate,
        ApplicantContent: ApplicantContent,
        ApplicantContentHeadline: ApplicantContentHeadline,
    ) {
        this.ApplicantInfo = ApplicantInfo;
        this.EmployerInfo = EmployerInfo;
        this.ApplicationJobTitle = ApplicationJobTitle
        this.ApplicationDate = ApplicationDate;
        this.ApplicantContent = ApplicantContent;
        this.ApplicantContentHeadline = ApplicantContentHeadline
        this.CssStyles = CssStyles
    }
}



export interface Section {
    id: string;
    label: string;
    component: React.ReactNode;
    x: number; // grid column start
    y: number; // grid row start
    w: number; // width in columns
    h: number; // height in rows
    style: React.CSSProperties;
}

