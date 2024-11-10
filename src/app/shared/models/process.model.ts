export interface Process {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export interface ProcessDTO {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}
