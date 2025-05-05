import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllOrdersQuery } from "@/redux/features/cart/orderApi";

const OrderDetails = () => {
  const {data: allOrderData} = useGetAllOrdersQuery(undefined)
  console.log(allOrderData)
  return (
    <div className="container mx-auto bg-white p-4 md:p-8">
    <Table>
      <TableCaption>All order</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allOrderData?.data?.map((item) => (
          <TableRow key={item.userId}>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.userEmail}</TableCell>
            <TableCell className="text-right">{item.totalPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  );
};

export default OrderDetails;
