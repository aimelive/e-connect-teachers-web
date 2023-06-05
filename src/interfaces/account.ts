export interface Account {
  role: Role;
  fcm_id: string;
  profile_pic: string;
  id: string;
  names: string;
  tel: string;
  status: boolean;
  email: string;
  created_at?: any;
}

export interface Role {
  status: boolean;
  id: string;
  name: string;
  created_at?: any;
}
