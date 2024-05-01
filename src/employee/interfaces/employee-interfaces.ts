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

export interface IUpdateEmployee {
  firstName?: string;
  lastName?: string;
  position?: string;
  phone?: string;
  email?: string;
}
