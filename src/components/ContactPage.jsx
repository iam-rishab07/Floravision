import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    try {
      const res = await fetch('http://localhost:8080/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });
      if (!res.ok) throw new Error('API submission failed.');
      setFormSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to send inquiry to the database server.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 reveal-on-load">
      
      {/* Title */}
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#C2A684] font-semibold">Get In Touch</span>
        <h1 className="text-4xl md:text-6xl font-bold text-[#1B362F]">Contact Our Experts</h1>
        <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
          Need help picking the right plant or have questions about botanical care? Send us a message or visit our greenhouse.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Contact Cards and Address */}
        <div className="space-y-8">
          
          <div className="bg-white p-8 rounded-3xl border border-editorial shadow-soft space-y-6">
            <h3 className="text-2xl font-bold text-[#1B362F]">Botanica Greenhouse</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Drop by and experience the botanicals in person. Our staff of experienced gardeners is ready to guide you.
            </p>
            
            <hr className="border-editorial" />

            <div className="space-y-4 text-xs font-semibold">
              <div className="flex items-center gap-4 text-[#2D3230]">
                <div className="p-3 bg-[#EAECE6] text-[#1B362F] rounded-xl">
                  <MapPin size={16} />
                </div>
                <span>456 Greenhouse Lane, Botanical Gardens, Mumbai 400012</span>
              </div>
              
              <div className="flex items-center gap-4 text-[#2D3230]">
                <div className="p-3 bg-[#EAECE6] text-[#1B362F] rounded-xl">
                  <Phone size={16} />
                </div>
                <span>+91 22 5555 1234</span>
              </div>

              <div className="flex items-center gap-4 text-[#2D3230]">
                <div className="p-3 bg-[#EAECE6] text-[#1B362F] rounded-xl">
                  <Mail size={16} />
                </div>
                <span>care@botanica.in</span>
              </div>

              <div className="flex items-center gap-4 text-[#2D3230]">
                <div className="p-3 bg-[#EAECE6] text-[#1B362F] rounded-xl">
                  <Clock size={16} />
                </div>
                <div>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat - Sun: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stylized Mock Map Location Container */}
          <div className="bg-[#EAECE6] h-60 rounded-3xl relative overflow-hidden flex items-center justify-center border border-editorial group shadow-soft">
            <div className="absolute inset-0 bg-cover bg-center bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/72.8777,19.0760,11,0/600x300?access_token=mock')] opacity-40 filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"></div>
            <div className="relative z-10 text-center space-y-2 pointer-events-none">
              <div className="w-12 h-12 bg-[#1B362F] text-white rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce">
                <MapPin size={20} />
              </div>
              <p className="text-xs font-bold text-[#1B362F] uppercase tracking-wider">Botanica HQ</p>
              <p className="text-[10px] text-gray-500 font-semibold">Mumbai, Maharashtra, IN</p>
            </div>
          </div>

        </div>

        {/* Right Column: Inquiry Form */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-editorial shadow-soft">
          {formSubmitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="flex justify-center text-[#1B362F]">
                <CheckCircle2 size={56} className="animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#1B362F]">Inquiry Sent!</h3>
                <p className="text-gray-400 text-xs max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-[#1B362F]">{formData.name}</span>. Our horticulturists have received your message and will reach out to you within 24 hours.
                </p>
              </div>
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-6 py-2.5 bg-[#F2F0EB] text-[#1B362F] font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-[#1B362F] hover:text-white transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#1B362F]">Send a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 px-3 focus:outline-none focus:border-[#C2A684]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 px-3 focus:outline-none focus:border-[#C2A684]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Botanical Care / Shipping details"
                    className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 px-3 focus:outline-none focus:border-[#C2A684]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Your Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 px-3 focus:outline-none focus:border-[#C2A684] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1B362F] hover:bg-[#1B362F]/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md mt-4"
                >
                  Submit Inquiry
                  <Send size={12} />
                </button>

              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
