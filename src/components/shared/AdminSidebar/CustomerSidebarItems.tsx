import { TCustomeridebarItems } from "@/types/sidebar";
import { House, ShoppingCart, User } from "lucide-react";

export const CustomerSidebarItems: TCustomeridebarItems = [
  { key: "home", title: "Home", link: "/", icon: <House /> },
  {
    key: "my-orders",
    title: "My Orders",
    link: "/orders",
    icon: <ShoppingCart />,
  },
  { key: "profile", title: "Profile", link: "/profile", icon: <User /> },
];
