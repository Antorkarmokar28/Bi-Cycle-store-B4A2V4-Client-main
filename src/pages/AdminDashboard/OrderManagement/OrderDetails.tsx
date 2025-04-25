import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllOrdersQuery } from "@/redux/features/cart/orderApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const OrderDetails = () => {
  const { data: allOrderData, isLoading, error } = useGetAllOrdersQuery(undefined);
  console.log(allOrderData)
  // Calculate total amount
  const totalAmount = allOrderData?.data?.reduce((sum, order) => sum + order.totalPrice, 0) || 0;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (error) {
    return (
      <div className="container mx-auto bg-white p-4 md:p-8 text-red-500">
        Error loading orders: {error?.message || 'Failed to fetch orders'}
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-white p-4 md:p-8 rounded-lg shadow-sm">
      <Table>
        <TableCaption>A list of all recent orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px] ml-auto" /></TableCell>
              </TableRow>
            ))
          ) : (
            // Actual data
            allOrderData?.data?.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">#{order._id.slice(-6).toUpperCase()}</TableCell>
                <TableCell>{order.name || 'N/A'}</TableCell>
                <TableCell>
                  <Badge className="text-black" variant={
                    order.status === 'completed' ? 'default' : 
                    order.status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell className="capitalize">{order.transaction?.method || 'N/A'}</TableCell>
                <TableCell className="text-right">{formatCurrency(order.totalPrice)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right font-medium">Total</TableCell>
            <TableCell className="text-right font-medium">
              {isLoading ? <Skeleton className="h-4 w-[80px] ml-auto" /> : formatCurrency(totalAmount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default OrderDetails;