import { JSX } from "react";

// admin Sidebar type
export type TAdminSidebarItems = {
  key: string;
  icon: JSX.Element;
  title: string;
  link: string;
}[];

// customer Sidebar type
export type TCustomeridebarItems = {
  key: string;
  icon: JSX.Element;
  title: string;
  link: string;
}[];
