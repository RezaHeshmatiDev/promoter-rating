export interface ListItem {
  id: number;
  avatar: string;
  name: string;
  location: string;
}

export interface Rate {
  rate: number;
  label: string;
  color: string;
}

export interface CashTurn {
  id: number;
  name: string;
}

export interface Promoter {
  invoiceID: number;
  invoiceDate: string;
  invoiceIDTotalValue: number;
  barCode: string;
  customerName: string;
  customerCellPhone: string;
  promoterID: number;
  promoterAvatar: string;
  promoterCode: string;
  promoterName: string;
  activityLocationName: string;
  cashID: number;
  cashName: string;
  cashTurn: number;
  rate: number;
  rateSum: number;
  invoiceCount: number;
  name: string;
}

export interface User {
  access_token: string;
}
