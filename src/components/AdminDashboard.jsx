import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, RefreshCw, MessageSquare, ShoppingBag, Leaf, Eye, EyeOff } from 'lucide-react';
import { API_BASE_URL } from '../config.js';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('plants');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // States for database entities
  const [plants, setPlants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // Modal / Form state for Add/Edit Plant
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlantId, setEditingPlantId] = useState(null);
  const [plantForm, setPlantForm] = useState({
    name: '',
    slug: '',
    category: 'Indoor',
    price: '',
    imageUrl: '/images/mini_cactus.png',
    description: '',
    sunlight: 'Medium indirect light',
    water: 'Once a week',
    difficulty: 'Easy',
    size: '10-15" Tall',
    petFriendly: false,
    about: '',
    stockQuantity: 10
  });

  // Fetch initial data on load & tab changes
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'plants') {
        const res = await fetch(`${API_BASE_URL}/plants`);
        if (!res.ok) throw new Error('Failed to fetch plants.');
        const data = await res.json();
        setPlants(data);
      } else if (activeTab === 'orders') {
        const res = await fetch(`${API_BASE_URL}/orders`);
        if (!res.ok) throw new Error('Failed to fetch orders.');
        const data = await res.json();
        setOrders(data);
      } else if (activeTab === 'reviews') {
        const res = await fetch(`${API_BASE_URL}/reviews/all`);
        if (!res.ok) throw new Error('Failed to fetch reviews.');
        const data = await res.json();
        setReviews(data);
      } else if (activeTab === 'inquiries') {
        const res = await fetch(`${API_BASE_URL}/inquiries/all`);
        if (!res.ok) throw new Error('Failed to fetch inquiries.');
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg, isError = false) => {
    if (isError) {
      setError(msg);
    } else {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  // --- Plant CRUD Operations ---
  const handleOpenAddModal = () => {
    setEditingPlantId(null);
    setPlantForm({
      name: '',
      slug: '',
      category: 'Indoor',
      price: '',
      imageUrl: '/images/mini_cactus.png',
      description: '',
      sunlight: 'Medium indirect light',
      water: 'Once a week',
      difficulty: 'Easy',
      size: '10-15" Tall',
      petFriendly: false,
      about: '',
      stockQuantity: 10
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plant) => {
    setEditingPlantId(plant.id);
    setPlantForm({
      name: plant.name,
      slug: plant.slug,
      category: plant.category,
      price: plant.price.toString(),
      imageUrl: plant.imageUrl,
      description: plant.description,
      sunlight: plant.sunlight,
      water: plant.water,
      difficulty: plant.difficulty,
      size: plant.size,
      petFriendly: plant.petFriendly,
      about: plant.about,
      stockQuantity: plant.stockQuantity
    });
    setIsModalOpen(true);
  };

  const handlePlantFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Generate slug from name if blank
    let slugVal = plantForm.slug.trim();
    if (!slugVal) {
      slugVal = plantForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const payload = {
      ...plantForm,
      slug: slugVal,
      price: parseFloat(plantForm.price),
      stockQuantity: parseInt(plantForm.stockQuantity)
    };

    try {
      let res;
      if (editingPlantId) {
        // Edit update
        res = await fetch(`${API_BASE_URL}/plants/${editingPlantId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // Add new
        res = await fetch(`${API_BASE_URL}/plants`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to save plant.');
      }

      showNotification(editingPlantId ? 'Plant updated successfully!' : 'Plant added to catalog!');
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  const handleDeletePlant = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plant from the catalog?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/plants/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Cannot delete this plant (it is likely referenced in past customer orders).');
      showNotification('Plant deleted.');
      fetchData();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  // --- Order Operations ---
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update order status.');
      showNotification(`Order status set to ${newStatus}.`);
      fetchData();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  // --- Review Operations ---
  const handleToggleReviewApproval = async (reviewId, currentApproval) => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: !currentApproval })
      });
      if (!res.ok) throw new Error('Failed to moderate review.');
      showNotification(!currentApproval ? 'Review approved & shown.' : 'Review hidden.');
      fetchData();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Delete this review permanently?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete review.');
      showNotification('Review deleted.');
      fetchData();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  // --- Inquiry Operations ---
  const handleToggleInquiryResolved = async (inquiryId, currentResolved) => {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries/${inquiryId}/resolve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolved: !currentResolved })
      });
      if (!res.ok) throw new Error('Failed to resolve inquiry.');
      showNotification(!currentResolved ? 'Inquiry marked as Resolved.' : 'Inquiry marked as Open.');
      fetchData();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteInquiry = async (inquiryId) => {
    if (!window.confirm('Delete this inquiry request?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries/${inquiryId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete inquiry.');
      showNotification('Inquiry deleted.');
      fetchData();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8 reveal-on-load">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-editorial pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C2A684] font-bold">Admin Console</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1B362F]">Store Dashboard</h1>
        </div>
        
        {/* Refresh trigger */}
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-editorial text-[#1B362F] hover:bg-[#F2F0EB] transition-colors rounded-xl text-xs font-bold"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh Data
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 py-3 px-6 rounded-xl text-xs font-bold animate-pulse">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 py-3 px-6 rounded-xl text-xs font-bold">
          {error}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-editorial pb-4">
        {[
          { id: 'plants', label: 'Plants Catalogue', icon: Leaf },
          { id: 'orders', label: 'Customer Orders', icon: ShoppingBag },
          { id: 'reviews', label: 'Reviews Board', icon: MessageSquare },
          { id: 'inquiries', label: 'Inquiries/Inboxes', icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-6 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#1B362F] text-white'
                  : 'bg-white hover:bg-[#F2F0EB] text-[#2D3230] border border-editorial'
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* MAIN TAB PANELS */}
      <div className="bg-white rounded-3xl border border-editorial shadow-soft overflow-hidden min-h-[400px]">
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <RefreshCw className="animate-spin text-[#C2A684] w-8 h-8" />
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Synchronizing with Database...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* 1. PLANTS CATALOGUE TAB */}
            {activeTab === 'plants' && (
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#1B362F]">Manage Botanicals ({plants.length})</h3>
                  <button
                    onClick={handleOpenAddModal}
                    className="flex items-center gap-2 py-3 px-5 bg-[#1B362F] hover:bg-[#1B362F]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-transform hover:scale-105"
                  >
                    <Plus size={14} /> Add Botanical
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-editorial bg-[#F9F8F6] text-[10px] uppercase font-bold tracking-widest text-[#1B362F]">
                        <th className="p-4">Plant</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-editorial text-xs">
                      {plants.map((plant) => (
                        <tr key={plant.id} className="hover:bg-[#F9F8F6]/50">
                          <td className="p-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#F2F0EB] rounded-lg p-1 border border-editorial flex items-center justify-center">
                              <img src={plant.imageUrl} alt={plant.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <p className="font-bold text-[#1B362F]">{plant.name}</p>
                              <p className="text-[10px] text-gray-400">/{plant.slug}</p>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-gray-500">{plant.category}</td>
                          <td className="p-4 font-bold text-[#1B362F]">Rs. {plant.price}/-</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              plant.stockQuantity <= 5 
                                ? 'bg-red-50 text-red-700 border border-red-200' 
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {plant.stockQuantity} in stock
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditModal(plant)}
                              className="p-2 bg-gray-100 hover:bg-[#C2A684] hover:text-white rounded-lg transition-colors text-gray-600"
                              title="Edit Plant"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeletePlant(plant.id)}
                              className="p-2 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-red-600"
                              title="Delete Plant"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. ORDERS MANAGEMENT TAB */}
            {activeTab === 'orders' && (
              <div className="p-6 md:p-8 space-y-6">
                <h3 className="text-xl font-bold text-[#1B362F]">Customer Transactions ({orders.length})</h3>
                
                {orders.length === 0 ? (
                  <p className="text-gray-400 text-sm py-12 text-center">No orders registered in the system.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-editorial bg-[#F9F8F6] text-[10px] uppercase font-bold tracking-widest text-[#1B362F]">
                          <th className="p-4">Order ID</th>
                          <th className="p-4">Recipient</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Total</th>
                          <th className="p-4">Shipping Address</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Payment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-editorial text-xs">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-[#F9F8F6]/50">
                            <td className="p-4 font-bold text-[#1B362F]">#ORD-{order.id}</td>
                            <td className="p-4">
                              <p className="font-bold text-[#1B362F]">{order.customerName}</p>
                              <p className="text-[10px] text-gray-400">{order.customerEmail}</p>
                            </td>
                            <td className="p-4 text-gray-500 font-medium">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 font-bold text-[#1B362F]">Rs. {order.totalAmount}/-</td>
                            <td className="p-4 text-gray-500 max-w-[200px] truncate" title={order.shippingAddress}>
                              {order.shippingAddress}, {order.zipCode}
                            </td>
                            <td className="p-4">
                              <select
                                value={order.orderStatus}
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                className="bg-[#F9F8F6] border border-editorial rounded-lg py-1 px-2.5 font-semibold text-[#1B362F] focus:outline-none"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                order.paymentStatus === 'Paid' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                  : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                              }`}>
                                {order.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 3. REVIEWS MODERATION TAB */}
            {activeTab === 'reviews' && (
              <div className="p-6 md:p-8 space-y-6">
                <h3 className="text-xl font-bold text-[#1B362F]">Client Reviews Panel ({reviews.length})</h3>

                {reviews.length === 0 ? (
                  <p className="text-gray-400 text-sm py-12 text-center">No reviews submitted.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-editorial bg-[#F9F8F6] text-[10px] uppercase font-bold tracking-widest text-[#1B362F]">
                          <th className="p-4">User</th>
                          <th className="p-4">Rating</th>
                          <th className="p-4">Comment</th>
                          <th className="p-4">Plant Target</th>
                          <th className="p-4 text-right">Moderation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-editorial text-xs">
                        {reviews.map((rev) => (
                          <tr key={rev.id} className={`hover:bg-[#F9F8F6]/50 ${!rev.approved ? 'bg-red-50/20' : ''}`}>
                            <td className="p-4 flex items-center gap-3">
                              <img src={rev.avatar || 'https://i.pravatar.cc/150'} className="w-8 h-8 rounded-full border" alt="avatar" />
                              <div>
                                <p className="font-bold text-[#1B362F]">{rev.customerName}</p>
                                {rev.badge && <span className="text-[9px] bg-[#C2A684] text-white px-1.5 py-0.2 rounded">Buyer</span>}
                              </div>
                            </td>
                            <td className="p-4 font-bold text-amber-500">★ {rev.rating}</td>
                            <td className="p-4 text-gray-600 max-w-sm font-medium leading-relaxed">{rev.comment}</td>
                            <td className="p-4 text-gray-400 italic">
                              {rev.plant ? rev.plant.name : 'General Boutique Testimonial'}
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => handleToggleReviewApproval(rev.id, rev.approved)}
                                className={`p-2 rounded-lg transition-colors border ${
                                  rev.approved 
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-500 hover:text-white' 
                                    : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-[#1B362F] hover:text-white'
                                }`}
                                title={rev.approved ? "Hide Review" : "Approve Review"}
                              >
                                {rev.approved ? <Eye size={14} /> : <EyeOff size={14} />}
                              </button>
                              <button
                                onClick={() => handleDeleteReview(rev.id)}
                                className="p-2 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-200 text-red-600"
                                title="Delete Permanently"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 4. INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="p-6 md:p-8 space-y-6">
                <h3 className="text-xl font-bold text-[#1B362F]">Contact Inboxes ({inquiries.length})</h3>

                {inquiries.length === 0 ? (
                  <p className="text-gray-400 text-sm py-12 text-center">No inquiry messages received.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-editorial bg-[#F9F8F6] text-[10px] uppercase font-bold tracking-widest text-[#1B362F]">
                          <th className="p-4">Sender</th>
                          <th className="p-4">Subject</th>
                          <th className="p-4">Message</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-right">Status / Resolve</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-editorial text-xs">
                        {inquiries.map((inq) => (
                          <tr key={inq.id} className={`hover:bg-[#F9F8F6]/50 ${inq.resolved ? 'bg-emerald-50/10' : ''}`}>
                            <td className="p-4">
                              <p className="font-bold text-[#1B362F]">{inq.name}</p>
                              <p className="text-[10px] text-gray-400">{inq.email}</p>
                            </td>
                            <td className="p-4 font-bold text-[#1B362F]">{inq.subject || 'No Subject'}</td>
                            <td className="p-4 text-gray-600 max-w-xs font-medium leading-relaxed">{inq.message}</td>
                            <td className="p-4 text-gray-400">
                              {new Date(inq.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => handleToggleInquiryResolved(inq.id, inq.resolved)}
                                className={`px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider border transition-colors ${
                                  inq.resolved 
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-500 hover:text-white' 
                                    : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-emerald-600 hover:text-white'
                                }`}
                              >
                                {inq.resolved ? 'Resolved' : 'Mark Resolved'}
                              </button>
                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="p-2 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-200 text-red-600"
                                title="Delete inquiry"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* PLANT ADD / EDIT POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1B362F]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] border border-editorial shadow-soft p-8 md:p-12 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#1B362F]"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold text-[#1B362F] text-center">
              {editingPlantId ? 'Edit Botanical Details' : 'Add New Botanical'}
            </h3>

            <form onSubmit={handlePlantFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Botanical Name *</label>
                <input
                  type="text"
                  required
                  value={plantForm.name}
                  onChange={(e) => setPlantForm({ ...plantForm, name: e.target.value })}
                  placeholder="e.g. Fiddle Leaf Fig"
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Slug/URL Handle (Optional)</label>
                <input
                  type="text"
                  value={plantForm.slug}
                  onChange={(e) => setPlantForm({ ...plantForm, slug: e.target.value })}
                  placeholder="e.g. fiddle-leaf-fig"
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Category *</label>
                <select
                  value={plantForm.category}
                  onChange={(e) => setPlantForm({ ...plantForm, category: e.target.value })}
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C2A684]"
                >
                  <option value="Indoor">Indoor</option>
                  <option value="Desk Decor">Desk Decor</option>
                  <option value="Succulents">Succulents</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Price (Rs.) *</label>
                <input
                  type="number"
                  required
                  value={plantForm.price}
                  onChange={(e) => setPlantForm({ ...plantForm, price: e.target.value })}
                  placeholder="e.g. 450"
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Image Asset Path *</label>
                <input
                  type="text"
                  required
                  value={plantForm.imageUrl}
                  onChange={(e) => setPlantForm({ ...plantForm, imageUrl: e.target.value })}
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Stock Inventory Quantity *</label>
                <input
                  type="number"
                  required
                  value={plantForm.stockQuantity}
                  onChange={(e) => setPlantForm({ ...plantForm, stockQuantity: e.target.value })}
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Sunlight Needs</label>
                <input
                  type="text"
                  value={plantForm.sunlight}
                  onChange={(e) => setPlantForm({ ...plantForm, sunlight: e.target.value })}
                  placeholder="e.g. Low to bright indirect light"
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Water Cycle</label>
                <input
                  type="text"
                  value={plantForm.water}
                  onChange={(e) => setPlantForm({ ...plantForm, water: e.target.value })}
                  placeholder="e.g. Every 1-2 weeks"
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Care Difficulty</label>
                <input
                  type="text"
                  value={plantForm.difficulty}
                  onChange={(e) => setPlantForm({ ...plantForm, difficulty: e.target.value })}
                  placeholder="e.g. Easy / Medium"
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Dimensions</label>
                <input
                  type="text"
                  value={plantForm.size}
                  onChange={(e) => setPlantForm({ ...plantForm, size: e.target.value })}
                  placeholder='e.g. 12-18" Tall in 6" Pot'
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="petFriendly"
                  checked={plantForm.petFriendly}
                  onChange={(e) => setPlantForm({ ...plantForm, petFriendly: e.target.checked })}
                  className="w-4 h-4 accent-[#1B362F] cursor-pointer"
                />
                <label htmlFor="petFriendly" className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider cursor-pointer">
                  🐾 Safe and Pet Friendly
                </label>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Brief Description *</label>
                <input
                  type="text"
                  required
                  value={plantForm.description}
                  onChange={(e) => setPlantForm({ ...plantForm, description: e.target.value })}
                  placeholder="Short marketing snippet..."
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C2A684]"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Extended About *</label>
                <textarea
                  required
                  rows="4"
                  value={plantForm.about}
                  onChange={(e) => setPlantForm({ ...plantForm, about: e.target.value })}
                  placeholder="Detailed information for the product page..."
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#C2A684] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="md:col-span-2 mt-4 py-4 bg-[#1B362F] hover:bg-[#1B362F]/90 text-white rounded-xl font-bold uppercase tracking-widest shadow-md transition-colors"
              >
                Save Botanical
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
