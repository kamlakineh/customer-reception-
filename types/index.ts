export type Role = 'ADMIN' | 'COMPANY';

export interface Company {
  id: string;
  name: string;
  username: string;
  passwordHash: string;
  plainPassword?: string; // For admin view as requested
}

export type CustomerStatus = 'NOT_ARRIVED' | 'ARRIVED';

export interface Customer {
  id: string;
  companyId: string;
  name: string;
  phone: string;
  status: CustomerStatus;
  arrivalTime?: string;
  pain?: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  role: Role;
  companyId?: string;
}

export type Language = 'en' | 'am';
