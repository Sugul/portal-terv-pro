import { Search, ChevronDown, MessageSquare, Mail, Phone, MapPin, Zap, ArrowRight, FileText, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Help() {
  return (
    <div className="space-y-xl animate-in fade-in duration-700 pb-20">
      {/* Hero Search */}
      <section className="text-center md:text-left space-y-6">
        <h2 className="text-5xl md:text-6xl font-display font-bold text-on-surface">How can we help?</h2>
        <p className="text-lg text-on-surface-variant max-w-2xl">
          Access campus support, find event management guides, or get in touch with our dedicated student services team.
        </p>
        <div className="relative max-w-3xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={24} />
          <input 
            className="w-full pl-14 pr-8 py-5 bg-white border border-outline-variant rounded-3xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all shadow-xl text-lg font-sans" 
            placeholder="Search for answers, guides, or help topics..." 
            type="text"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* FAQs */}
        <div className="lg:col-span-8 bg-white border border-outline-variant rounded-3xl p-8 tonal-elevation-1">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-bold text-on-surface">Top Questions</h3>
            <button className="text-secondary font-bold hover:underline flex items-center gap-2">
              View all <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "How do I register my organization for an event?", a: "Navigate to the 'About Us' section and fill out the Organization Registration Form. Once verified, your dashboard will enable 'Create Event' options." },
              { q: "Where can I find my ticket QR codes?", a: "All your active registrations and ticket codes are stored in the 'History' tab under the 'Active Events' subsection." },
              { q: "Can I cancel an event registration?", a: "Yes, cancellations are allowed up to 24 hours before the event starts. Refunds are processed automatically." }
            ].map((faq, i) => (
              <details key={i} className="group border-b border-outline-variant pb-4 last:border-0">
                <summary className="flex justify-between items-center cursor-pointer list-none py-4 text-lg font-bold text-on-surface group-hover:text-secondary transition-colors">
                  {faq.q}
                  <ChevronDown className="group-open:rotate-180 transition-transform text-outline" />
                </summary>
                <p className="pb-4 text-on-surface-variant leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Quick Help Items */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-primary-container text-white rounded-3xl p-8 flex flex-col justify-between h-full shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <MessageSquare className="text-secondary-fixed mb-4" size={32} />
              <h4 className="text-2xl font-display font-bold mb-2">Live Support</h4>
              <p className="text-on-primary-container text-sm leading-relaxed">
                Chat with our campus ambassadors for immediate assistance.
              </p>
            </div>
            <button className="relative z-10 mt-8 bg-secondary text-on-secondary py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
              <Zap size={18} /> Start Chat
            </button>
          </div>

          <div className="bg-secondary-container text-on-secondary-container rounded-3xl p-8 border border-secondary/20 shadow-md">
            <FileText className="text-on-secondary-container mb-4" size={32} />
            <h4 className="text-2xl font-display font-bold mb-2">Guides & Handbooks</h4>
            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              Detailed PDF documentation for event organizers and attendees.
            </p>
            <a className="font-bold underline flex items-center gap-2 hover:gap-3 transition-all" href="#">
              Download PDF Library <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <section className="bg-surface-container-low rounded-[40px] p-8 md:p-12 border border-outline-variant tonal-elevation-1">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold text-on-surface">Send us a Message</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Can't find what you're looking for? Reach out and our team will get back to you within 24 hours.
            </p>
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-secondary group-hover:text-white transition-all">
                  <Mail size={20} className="text-secondary group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Email Us</p>
                  <p className="font-bold text-on-surface">support@tervpro.edu</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-secondary group-hover:text-white transition-all">
                  <Phone size={20} className="text-secondary group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Call Support</p>
                  <p className="font-bold text-on-surface">+1 (555) 012-3456</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-secondary group-hover:text-white transition-all">
                  <MapPin size={20} className="text-secondary group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Office</p>
                  <p className="font-bold text-on-surface">Student Union, Level 2</p>
                </div>
              </div>
            </div>
          </div>

          <form className="bg-white p-8 rounded-3xl shadow-xl border border-outline-variant space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Full Name</label>
              <input className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all" type="text" placeholder="John Doe" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Category</label>
              <select className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:border-secondary outline-none appearance-none cursor-pointer">
                <option>Event Registration</option>
                <option>Technical Bug</option>
                <option>Verification</option>
                <option>Feedback</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Your Message</label>
              <textarea className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:border-secondary outline-none resize-none h-32" placeholder="Tell us more about your inquiry..." />
            </div>
            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-on-surface transition-all active:scale-95" type="submit">
              Submit Ticket
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
