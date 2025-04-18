import { TAdminSidebarItems } from "@/types/sidebar";
import { Bike, House, LayoutDashboard, ListOrdered, ShieldCheck } from "lucide-react";



export const AdminSidebarItems: TAdminSidebarItems = [
  {
    key:"Admin-Dashboard",
    icon: <LayoutDashboard />,
    title: "Dashboard",
    link: "/admin-dashboard"
  },
  {
    key: "Home",
    icon: <House />,
    title: "Home",
    link: "/",
  },

  {
    key: "Create-Product",
    icon: <Bike />,
    title: "Create Product",
    link: "/admin/create-product",
  },
  {
    key: "All-Product",
    icon: <Bike />,
    title: "All Product",
    link: "/admin/products",
  },
  {
    key: "All-Order",
    icon: <ListOrdered />,
    title: "All Order",
    link: "/admin/orders",
  },
  {
    key: "Total-Revenue",
    icon: <ShieldCheck />,
    title: "Total Revenue",
    link: "/admin/total-revenue",
  },
];
