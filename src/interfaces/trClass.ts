export interface TrClass {
  createdAt: Date;
  date: Date;
  duration: number;
  files: Files[];
  id: string;
  name: string;
  room: string;
  schoolId: string;
  schoolName: string;
  teacherId: string;
  trAssistantId: string;
  trAssistantName: string;
  updatedAt: Date;
}

export interface Files {
  link: string;
  title: string;
}
