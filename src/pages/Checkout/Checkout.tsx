/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, removeFromCart, updateQuantity, setCart } from "@/redux/features/cart/cartSlice";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useCreateOrderMutation } from "@/redux/features/cart/orderApi";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetAllProductsQuery } from "@/redux/features/product/productsApi";

interface Order {
  userEmail: string;
  products: { productId: string; quantity: number }[];
  totalPrice: number;
  address: string;
  contactNumber: string;
  status: "unpaid" | "paid" | "progressing" | "delivered";
}

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const currentUser = useSelector(useCurrentUser);
  const { data: productsData } = useGetAllProductsQuery({undefined});
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<any[]>([]);

  // Initialize quantities and match cart items with product details
  useEffect(() => {
    // Set initial quantities from cart
    const initialQuantities = cart.reduce((acc, item) => ({
      ...acc,
      [item.productId]: item.quantity
    }), {});
    setQuantities(initialQuantities);

    // Match cart items with product details
    if (productsData?.data) {
      const matchedItems = cart.map((cartItem) => {
        const product = productsData.data.find(
          (p: any) => p._id.toString() === cartItem.productId.toString()
        );
        return product ? {
          ...cartItem,
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
        } : null;
      }).filter(Boolean);

      setCartItemsWithDetails(matchedItems);
    }
  }, [cart, productsData]);

  const handleOrder = async()=>{
    
  }



  // Calculate total price
  const totalPrice = cartItemsWithDetails.reduce(
    (sum, item) => sum + (item.price * (quantities[item.productId] || item.quantity)),
    0
  );

  // Handle quantity changes
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const quantity = Math.max(1, newQuantity);
    setQuantities(prev => ({ ...prev, [productId]: quantity }));
    dispatch(updateQuantity({ productId, quantity }));
  };

  // Remove item from cart
  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart");
  };

  // Submit order
  const handleCheckout = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentUser?.userEmail) {
      toast.error("Please login to complete your order");
      return;
    }

    if (cartItemsWithDetails.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData: Order = {
      userEmail: currentUser.userEmail,
      products: cartItemsWithDetails.map(item => ({
        productId: item.productId,
        quantity: quantities[item.productId] || item.quantity
      })),
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      address,
      contactNumber: phone,
      status: "unpaid",
    };

    try {
      const result = await createOrder(orderData).unwrap();
      
      if (result.success) {
        toast.success("Order placed successfully!");
        dispatch(setCart([]));
        setPhone("");
        setAddress("");
        
        // Redirect to payment page if URL exists
        if (result.PaymentGatewayPageURL) {
          window.location.href = result.PaymentGatewayPageURL;
        }
      } else {
        toast.error(result.message || "Failed to place order");
      }
    } catch (error) {
      toast.error("Failed to create order");
      console.error("Order creation error:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      {cartItemsWithDetails.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="divide-y">
                {cartItemsWithDetails.map((item) => (
                  <div key={item.productId} className="py-4 flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded mr-4"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80';
                      }}
                    />
                    
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                      <p className="font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Input
                        type="number"
                        min="1"
                        value={quantities[item.productId] || item.quantity}
                        onChange={(e) => handleQuantityChange(
                          item.productId, 
                          parseInt(e.target.value) || 1
                        )}
                        className="w-20"
                      />
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={currentUser?.userEmail || ""}
                    disabled
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+8801XXXXXXXXX"
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full address"
                    required
                    className="mt-1"
                  />
                </div>
                
                <Button
                  onClick={handleOrder}
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-600">Add some products to your cart before checking out</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;