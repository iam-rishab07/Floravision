import React, { useState, useEffect } from 'react';
import { ShoppingBag, Trash2, ArrowRight, CheckCircle } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://botanica-by-rishi.onrender.com/api';

const CartPage = ({ cart, currentUser, onUpdateQty, onRemoveItem, onClearCart, onBackToShop }) => {
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    zip: currentUser?.zipCode || '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // Synchronize form fields if the user logs in while viewing the checkout screen
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email,
        address: currentUser.address || prev.address,
        zip: currentUser.zipCode || prev.zip
      }));
    }
  }, [currentUser]);

  const subtotal = cart.reduce((acc, item) => acc + parseInt(item.price) * item.qty, 0);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const tax = Math.round(subtotal * 0.05); // 5% mock tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    // Verify inputs
    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill in the required name, email, and shipping address.");
      return;
    }

    const payload = {
      user: currentUser ? { id: currentUser.id } : null,
      customerName: formData.name,
      customerEmail: formData.email,
      shippingAddress: formData.address,
      zipCode: formData.zip || '400001',
      orderItems: cart.map(item => ({
        plant: { id: item.id },
        quantity: item.qty
      }))
    };

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'API order submission failed.');
      }
      
      setIsCheckoutSuccess(true);
      onClearCart();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to process order with backend database.');
    }
  };

  if (isCheckoutSuccess) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center space-y-6 reveal-on-load">
        <div className="flex justify-center text-[#1B362F] animate-pulse">
          <CheckCircle size={64} />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-[#1B362F]">Order Confirmed!</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Thank you for shopping with Botanica. Your plants are being carefully prepared for shipping. An email receipt has been sent to <span className="font-bold text-[#1B362F]">{formData.email}</span>.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-editorial shadow-soft text-left text-xs space-y-3">
          <p className="font-bold uppercase tracking-wider text-gray-400">Shipment Details</p>
          <p className="text-[#2D3230]"><span className="font-bold text-[#1B362F]">Recipient:</span> {formData.name}</p>
          <p className="text-[#2D3230]"><span className="font-bold text-[#1B362F]">Address:</span> {formData.address}, {formData.zip}</p>
          <p className="text-[#2D3230]"><span className="font-bold text-[#1B362F]">Estimated Delivery:</span> 3 - 5 business days</p>
        </div>
        <button
          onClick={onBackToShop}
          className="w-full py-4 bg-[#1B362F] hover:bg-[#1B362F]/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-colors shadow-md"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center space-y-6 reveal-on-load">
        <div className="flex justify-center text-gray-300">
          <ShoppingBag size={80} strokeWidth={1} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#1B362F]">Your Basket is Empty</h2>
          <p className="text-gray-400 text-sm">You haven't added any botanicals to your cart yet.</p>
        </div>
        <button
          onClick={onBackToShop}
          className="px-8 py-3.5 bg-[#1B362F] hover:bg-[#1B362F]/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-colors shadow-md"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8 reveal-on-load">
      <h1 className="text-3xl md:text-5xl font-bold text-[#1B362F]">Shopping Basket</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-editorial shadow-soft overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-editorial bg-[#F9F8F6] text-[10px] uppercase font-bold tracking-widest text-[#1B362F]">
                  <th className="p-6">Product</th>
                  <th className="p-6 hidden sm:table-cell">Price</th>
                  <th className="p-6">Quantity</th>
                  <th className="p-6">Total</th>
                  <th className="p-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-editorial">
                {cart.map((item) => (
                  <tr key={item.id} className="text-sm">
                    {/* Product visual details */}
                    <td className="p-6 flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#F2F0EB] rounded-xl flex items-center justify-center p-2 border border-editorial">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="font-bold text-[#1B362F]">{item.name}</p>
                        <p className="text-[10px] text-gray-400">{item.category}</p>
                      </div>
                    </td>
                    
                    {/* Unit Price */}
                    <td className="p-6 hidden sm:table-cell text-gray-500 font-medium">
                      Rs. {item.price}/-
                    </td>

                    {/* Quantity Controller */}
                    <td className="p-6">
                      <div className="flex items-center bg-[#F2F0EB] border border-editorial rounded-lg w-fit">
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-500"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#1B362F]">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-500"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Total Price */}
                    <td className="p-6 font-bold text-[#1B362F]">
                      Rs. {parseInt(item.price) * item.qty}/-
                    </td>

                    {/* Action Trash */}
                    <td className="p-6 text-right">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg text-gray-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Checkout Billing & Shipping form */}
        <div className="space-y-6">
          
          {/* Summary Box */}
          <div className="bg-white p-6 rounded-3xl border border-editorial shadow-soft space-y-4">
            <h3 className="text-lg font-bold text-[#1B362F]">Order Summary</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>Rs. {subtotal}/-</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping Fee</span>
                <span>{shipping === 0 ? 'FREE' : `Rs. ${shipping}/-`}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Estimated Tax (5%)</span>
                <span>Rs. {tax}/-</span>
              </div>
              <hr className="border-editorial" />
              <div className="flex justify-between text-sm font-bold text-[#1B362F]">
                <span>Total Amount</span>
                <span>Rs. {total}/-</span>
              </div>
            </div>
          </div>

          {/* Billing/Shipping Form */}
          <div className="bg-white p-6 rounded-3xl border border-editorial shadow-soft space-y-4">
            <h3 className="text-lg font-bold text-[#1B362F]">Billing Details</h3>
            <form onSubmit={handleCheckout} className="space-y-4 text-xs">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              {/* Shipping Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Shipping Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Botanist St"
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              {/* Zip / Code */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">ZIP / Postcode</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="400001"
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              {/* Mock Credit Card */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Mock Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="4111 2222 3333 4444"
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              {/* Place Order button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#1B362F] hover:bg-[#1B362F]/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md mt-4"
              >
                Place Order
                <ArrowRight size={14} />
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CartPage;
