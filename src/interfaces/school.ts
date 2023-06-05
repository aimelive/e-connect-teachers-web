export interface School {
  updatedAt: Date;
  address: Address;
  name: string;
  poManager: string;
  image: string;
  teachers: string[];
  id: string;
  principalName: string;
  description: string;
  createdAt: Date;
  principalPhone: string;
}

export interface Address {
  location: string;
  mapLink: string;
  street: string;
}
