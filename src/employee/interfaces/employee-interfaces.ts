export interface ICreateEmployee {
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
}

export interface ICreateManyEmployees {
  employees: ICreateEmployee[];
}
