export interface Developer {
  developerId: string;
  name: string;
  location: string;
  position: string;
  seniority: string;
  specialty: string;
  experienceYears: number;
  description: string;
  email: string;
  agreementAccepted: boolean,
  skills: string[];
  otherSkills: string[];
  rate?: {
    hours: number;
    months: number;
  };
}

/* export interface SearchQueryObject {
  searchstring: string,
  experienceYears: number,
  stacks: any[],
  seniority: string[],
  page: number,
  resultsonpage: number,
} */