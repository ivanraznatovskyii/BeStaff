export interface Developer {
  developerId: string;
  name: string;
  location: string;
  position: string;
  seniority: string;
  speciality: string;
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
