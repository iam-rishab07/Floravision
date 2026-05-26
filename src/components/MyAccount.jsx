import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Hash, ShoppingBag, Calendar, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

const MyAccount = ({ currentUser, onUpdateSession }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // User details state (loaded from currentUser)
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    zipCode: currentUser?.zipCode || ''
  });

  // Orders list state
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (activeTab === 'orders' && currentUser?.id) {
      fetchUserOrders();
    }
  }, [activeTab, currentUser]);

  const fetchUserOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/orders/user/${currentUser.id}`);
      if (!res.ok) throw new Error('Failed to load your orders.');
      const data = await res.json();
      setUserOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/users/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          zipCode: formData.zipCode
        })
      });

      const updatedUser = await res.json();
      if (!res.ok) {
        throw new Error(updatedUser.error || 'Failed to update profile.');
      }

      setSuccess('Profile updated successfully!');
      onUpdateSession(updatedUser); // Update state in App.jsx
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 reveal-on-load">
      
      {/* Title */}
      <div className="border-b border-editorial pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#C2A684] font-bold">Personal Account</span>
        <h1 className="text-3xl md:text-5xl font-bold text-[#1B362F]">My Account</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-editorial pb-4 justify-start gap-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`text-xs uppercase tracking-widest font-bold pb-2 relative transition-all ${
            activeTab === 'profile' ? 'text-[#1B362F]' : 'text-gray-400 hover:text-[#1B362F]'
          }`}
        >
          My Profile
          {activeTab === 'profile' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C2A684]" />}
        </button>
        
        <button
          onClick={() => setActiveTab('orders')}
          className={`text-xs uppercase tracking-widest font-bold pb-2 relative transition-all ${
            activeTab === 'orders' ? 'text-[#1B362F]' : 'text-gray-400 hover:text-[#1B362F]'
          }`}
        >
          Order History
          {activeTab === 'orders' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C2A684]" />}
        </button>
      </div>

      {/* Notifications */}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 py-3.5 px-6 rounded-xl text-xs font-bold animate-pulse">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 py-3.5 px-6 rounded-xl text-xs font-bold">
          {error}
        </div>
      )}

      {/* TAB PANELS */}
      <div className="bg-white rounded-3xl border border-editorial shadow-soft p-6 md:p-12">
        
        {/* TAB 1: PROFILE DETAILS FORM */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-6 text-xs font-semibold">
            <h3 className="text-xl font-bold text-[#1B362F] mb-6">Security and Shipping Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Full Name *</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#C2A684]"><User size={14} /></span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-[#C2A684] text-[#2D3230]"
                  />
                </div>
              </div>

              {/* Email Address (Disabled) */}
              <div className="space-y-1.5 opacity-75">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Email Address</label>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Lock size={10} /> Locked
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400"><Lock size={14} /></span>
                  <input
                    type="email"
                    disabled
                    value={currentUser?.email || ''}
                    className="w-full bg-[#F2F0EB] border border-editorial rounded-lg py-3 pl-10 pr-4 text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Phone Number</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#C2A684]"><Phone size={14} /></span>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-[#C2A684] text-[#2D3230]"
                  />
                </div>
              </div>

              {/* ZIP / Postcode */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">ZIP / Postcode</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#C2A684]"><Hash size={14} /></span>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="e.g. 400001"
                    className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-[#C2A684] text-[#2D3230]"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Default Shipping Address</label>
                <div className="relative flex items-start">
                  <span className="absolute left-3 top-3.5 text-[#C2A684]"><MapPin size={14} /></span>
                  <textarea
                    rows="3"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Flat 402, Green Avenue, Mumbai"
                    className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-[#C2A684] text-[#2D3230] resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-[#1B362F] hover:bg-[#1B362F]/90 text-white rounded-xl font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
            >
              {loading ? 'Saving Profile...' : 'Save Profile Changes'}
            </button>
          </form>
        )}

        {/* TAB 2: ORDER HISTORY */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#1B362F] mb-6">Your Purchase Receipts</h3>
            
            {loading && (
              <div className="py-12 text-center text-xs text-gray-400 font-bold uppercase animate-pulse">
                Retrieving order records...
              </div>
            )}

            {!loading && userOrders.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <ShoppingBag size={48} className="mx-auto text-gray-300" />
                <p className="text-gray-400 text-sm">You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {userOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="border border-editorial rounded-2xl p-6 hover:shadow-soft transition-shadow bg-[#F9F8F6]/30"
                  >
                    
                    {/* Header: ID, Date, Status */}
                    <div className="flex flex-wrap justify-between items-center border-b border-editorial pb-4 mb-4 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2.5 bg-[#EAECE6] text-[#1B362F] rounded-xl"><ShoppingBag size={16} /></span>
                        <div>
                          <p className="text-sm font-bold text-[#1B362F]">Order #ORD-{order.id}</p>
                          <p className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
                            <Calendar size={10} /> Placed: {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          order.orderStatus === 'Delivered' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : order.orderStatus === 'Cancelled'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                        }`}>
                          {order.orderStatus}
                        </span>
                        
                        <span className="font-bold text-[#1B362F] bg-white border border-editorial px-3 py-1 rounded-full">
                          Rs. {order.totalAmount}/-
                        </span>
                      </div>
                    </div>

                    {/* Body: Itemized List */}
                    <div className="space-y-3 pl-1 text-xs">
                      {order.orderItems && order.orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-gray-600">
                            <ChevronRight size={10} className="text-[#C2A684]" />
                            <span className="font-bold text-[#1B362F]">{item.plant?.name}</span>
                            <span className="font-semibold text-gray-400">x{item.quantity}</span>
                          </div>
                          <span className="font-bold text-[#1B362F]">Rs. {parseInt(item.unitPrice) * item.quantity}/-</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer Address */}
                    <div className="mt-4 pt-3 border-t border-editorial border-dashed text-[10px] text-gray-400 font-semibold">
                      Delivery to: {order.customerName} | Address: {order.shippingAddress}, {order.zipCode}
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default MyAccount;
