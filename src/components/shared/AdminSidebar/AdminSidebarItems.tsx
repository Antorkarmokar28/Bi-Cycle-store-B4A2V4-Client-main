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
    key: "Create-product",
    icon: <Bike />,
    title: "Create Product",
    link: "create-product",
  },
  {
    key: "All-Product",
    icon: <Bike />,
    title: "All Product",
    link: "allProducts",
  },
  {
    key: "All-Order",
    icon: <ListOrdered />,
    title: "All Order",
    link: "order-details",
  },
  {
    key: "Total-Revenue",
    icon: <ShieldCheck />,
    title: "Total Revenue",
    link: "total-revenue",
  },
];
