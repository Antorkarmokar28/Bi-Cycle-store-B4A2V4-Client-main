
import { NavLink } from "react-router";

export const AdminSidebarItems = [
  {
    key: "Home",
    title: "Home",
    link: <NavLink to="/" />,
  },
  {
    key: "Product-Management",
    title: "Product Management",
    children: [
      {
        key: "Create-Product",
        title: "Create Product",
        link: <NavLink to="/create-product" />,
      },
      {
        key: "All-Product",
        title: "All Product",
        link: <NavLink to="/get-product" />,
      },
    ],
  },
  {
    key: "Order-Management",
    title: "Order Management",
    children: [
      {
        key: "All-Order",
        title: "All Order",
        link: <NavLink to="/get-order" />
      }
    ]
  },
  {
    key: "Total-Revenue",
    title: "Total Revenue",
    link: <NavLink to="/total-revenue" />
  }
];
