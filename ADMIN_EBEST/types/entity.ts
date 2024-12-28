import { BasicStatus, PermissionType } from './enum';

export interface UserToken {
  accessToken?: string;
  refreshToken?: string;
}

export interface UserInfo {
  id: string;
  email: string;
  username: string;
  password?: string;
  avatar?: string;
  role?: Role;
  status?: BasicStatus;
  permissions?: Permission[];
}

export interface Course {
  id : string;
  name : string;
  desc : string;
  numberClass: number;
  fee: number;
}

export interface Organization {
  id: string;
  name: string;
  status: 'enable' | 'disable';
  statusLearn: 'enable' | 'disable';
  desc?: string;
  order?: number;
  children?: Organization[];
}

export interface Student {
  id: string;
  name: string;
  userName: string;
  password: string;
  phone: string;
  job: string;
  email: string;
  sex: string;
  birthdate: string;
  objectivesLearn: string;
  course: string;
  statusSalary: string;
  statusLearn: string;
}

export interface Class {
  id: string;
  name: string;
  numberStudent: number;
  createDate: string;
  endDate: string;
  status: 'Đang mở' | 'Đã khoá';
  desc?: string;
}

export interface Teacher {
  id: string;
  userName: string;      // Tài khoản
  password: string;      // Mật khẩu (nếu cần)
  name: string;          // Họ và tên
  phone: string;         // Số điện thoại
  email: string;         // Email
  birthday?: string;    // Ngày sinh (tuỳ chọn)
  sex?: string; // Giới tính (tuỳ chọn)
  jobTitle: string; // Chức vụ
  status?: string; // Trạng thái (tuỳ chọn)
  desc?: string;         // Mô tả (tuỳ chọn)
}


export interface Permission {
  id: string;
  parentId: string;
  name: string;
  label: string;
  type: PermissionType;
  route: string;
  status?: BasicStatus;
  order?: number;
  icon?: string;
  component?: string;
  hide?: boolean;
  hideTab?: boolean;
  frameSrc?: string;
  newFeature?: boolean;
  children?: Permission[];
}

export interface Role {
  id: string;
  name: string;
  label: string;
  status: BasicStatus;
  order?: number;
  desc?: string;
  permission?: Permission[];
}
