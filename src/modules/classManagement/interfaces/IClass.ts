export interface IClass {
  PartitionKey?: string;
  RowKey?: string;
  classCode: string;
  className: string;
  accessCode: string;
  professorID?: string;
  studentCount?: number;
  students?: string[] | string;
}

export interface ICreateClassRequest {
  classCode: string;
  accessCode: string;
  className: string;
  students: string[];
}

export interface IAddStudentsRequest {
  classCode: string;
  emails: string[];
}

export interface IRemoveStudentRequest {
  classCode: string;
  email: string;
}
