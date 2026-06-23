import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import type { companyProfile } from '../../data/haclabData';

interface ContactTabProps {
  companyProfile: typeof companyProfile;
  contactForm: { name: string; email: string; subject: string; message: string };
  setContactForm: (form: { name: string; email: string; subject: string; message: string }) => void;
  formSubmitted: boolean;
  loading: boolean;
  handleContactSubmit: (e: React.FormEvent) => void;
}

export default function ContactTab({ companyProfile, contactForm, setContactForm, formSubmitted, loading, handleContactSubmit }: ContactTabProps) {
  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full h-auto md:h-full flex flex-col md:flex-row gap-6 md:overflow-hidden min-h-0 justify-center"
    >
      <div className="w-full md:w-[35%] space-y-4 shrink-0 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="space-y-1.5 select-none text-center md:text-left">
            <span className="text-[13.5px] font-mono uppercase tracking-widest text-brand-red-bright font-bold">// SECURE REGISTRATION</span>
            <h1 className="text-2xl font-bold text-white tracking-tight leading-none font-sans">Contact Console</h1>
            <p className="text-sm text-slate-300 font-normal">Connect with our principal advisors in Kampala. Expect responses within 24 hours.</p>
          </div>

          <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="text-[13px] font-mono text-slate-500 uppercase block leading-none select-none">EMAIL ROUTE:</span>
                <a href={`mailto:${companyProfile.email}`} className="text-sm font-mono text-white hover:text-brand-red transition break-all select-all leading-tight">
                  {companyProfile.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="text-[13px] font-mono text-slate-500 uppercase block leading-none select-none">TELEPHONE LINE:</span>
                <a href={`tel:${companyProfile.phone}`} className="text-sm font-mono text-white hover:text-brand-red transition break-all select-all leading-tight">
                  {companyProfile.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className="w-4 h-4 text-[#25D366] mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="text-[13px] font-mono text-slate-500 uppercase block leading-none select-none">WHATSAPP DIRECT:</span>
                <a href={`https://wa.me/${companyProfile.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-white hover:text-[#25D366] transition break-all select-all leading-tight">
                  {companyProfile.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="text-[13px] font-mono text-slate-500 uppercase block leading-none select-none">KAMPALA OFFICE:</span>
                <span className="text-sm text-slate-300 leading-tight">
                  {companyProfile.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-slate-900 shadow-lg relative">
          <iframe
            title="Kampala Office Map"
            src="https://maps.google.com/maps?q=Haclab%20Company%20Limited,%20Kampala&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(110%) grayscale(20%)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-slate-900/50 rounded-xl mix-blend-overlay"></div>
        </div>

        <div className="p-3 bg-red-950/5 border border-red-900/10 rounded-xl select-none text-center hidden md:block">
          <span className="text-[13.5px] font-mono text-brand-red-bright block mb-1 font-bold">DEVELOPER CHEATSHEET</span>
          <p className="text-[12.5px] text-slate-450 leading-relaxed font-mono">
            Execute <span className="text-white hover:underline cursor-pointer">run Contact_Config.sh</span> under the IDE Workspace mode to stream client parameters directly.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-slate-900/10 border border-slate-900 rounded-2xl p-5 flex flex-col justify-center md:overflow-y-auto relative shadow-2xl h-auto md:h-full">
        <AnimatePresence mode="wait">
          {!formSubmitted ? (
            <motion.form
              key="contact-form"
              onSubmit={handleContactSubmit}
              className="space-y-3"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[13px] font-mono text-slate-450 uppercase font-bold">Your Name *</label>
                  <input
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    type="text"
                    required
                    disabled={loading}
                    placeholder="Douglas Were"
                    className="w-full bg-slate-950 border border-slate-900 focus:border-brand-red/35 px-3 py-2 rounded text-sm text-white font-medium placeholder-slate-800 outline-none transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] font-mono text-slate-450 uppercase font-bold">Email Address *</label>
                  <input
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    type="email"
                    required
                    disabled={loading}
                    placeholder="douglas@haclab.net"
                    className="w-full bg-slate-950 border border-slate-900 focus:border-brand-red/35 px-3 py-2 rounded text-sm text-white font-medium placeholder-slate-800 outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[13px] font-mono text-slate-450 uppercase font-bold">Inquiry Subject</label>
                <input
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  type="text"
                  disabled={loading}
                  placeholder="Custom ERP platform specifications"
                  className="w-full bg-slate-950 border border-slate-900 focus:border-brand-red/35 px-3 py-2 rounded text-sm text-white font-medium placeholder-slate-800 outline-none transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[13px] font-mono text-slate-450 uppercase font-bold">Project Scope *</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  disabled={loading}
                  rows={3}
                  placeholder="Describe your transaction targets, timelines, and software requirements..."
                  className="w-full bg-slate-950 border border-slate-900 focus:border-brand-red/35 px-3 py-2 rounded text-sm text-white font-medium placeholder-slate-800 outline-none transition resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-brand-red hover:bg-brand-red-hover text-white-pure font-mono font-bold text-sm rounded transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 select-none shadow-lg shadow-brand-red/10 border border-transparent"
              >
                <span>{loading ? 'Submitting secure session...' : 'Send Message Stream'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success-form"
              className="py-6 flex flex-col items-center justify-center text-center space-y-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-12 h-12 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 min-w-0 p-1">
                <h3 className="text-white text-sm font-bold">Secure Delivery Confirmed</h3>
                <p className="text-sm text-slate-400 max-w-xs leading-relaxed mx-auto font-normal">
                  Your correspondence has been submitted securely to the Haclab master node. Our technical advisory squad will review and reply shortly.
                </p>
              </div>
              <span className="text-[12px] font-mono text-slate-500 bg-slate-950 px-3 py-1 rounded inline-block select-all leading-none border border-slate-900">
                status: transaction_hashed_ok
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
