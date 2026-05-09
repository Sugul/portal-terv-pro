import React, { useState } from 'react';
import { Users, Star, MapPin, ArrowRight, Circle, PlusCircle, QrCode, Map as MapIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  return (
    <div className="space-y-xl animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-[32px] overflow-hidden group shadow-xl border border-outline-variant">
        <img 
          alt="Campus Life" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvHbe_6duvEFaN3zsSUN4ILUMNdOsV4YJ5FmxtsThMpqx3n2Po8EYWEnxtmgtBy-RP8Bim9E06z9QIFpb7u_2NjpZf56GpkHXj6Zi48gnZhaFZq4zXTkBDTmnugakOp_W0LVrsRGyqIFBP5G6evXDph7fg_4RwsmNi8fETnNCbO6ERtqrY5rjywokh-oT3KLVcRucm-2ih_m_R6AfyiQWs6kmPjRGt2uqJxxY27IrO0McWE3R8LdCFdcq1ers4Q1Q59h37WfTQT8M"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/40 to-transparent flex flex-col justify-end p-margin md:p-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl space-y-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-widest">
              Featured Campus
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1]">
              Shape Your Future at TERV PRO
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-lg font-sans">
              Experience the synergy of academic excellence and vibrant student initiatives. Explore upcoming events, workshops, and social gatherings.
            </p>
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => navigate('/events')}
                className="bg-secondary text-on-secondary px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg cursor-pointer"
              >
                Explore Events
              </button>
              <button 
                onClick={() => setShowCalendarModal(true)}
                className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-full font-bold hover:bg-white/30 transition-all cursor-pointer"
              >
                My Calendar
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-surface-container rounded-3xl p-8 flex flex-col justify-between border border-outline-variant shadow-sm tonal-elevation-1"
        >
          <Users className="text-secondary" size={40} />
          <div className="mt-8">
            <div className="text-5xl font-display font-bold text-on-surface">2.4k</div>
            <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mt-1">Active Students</div>
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-primary-container text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl"
        >
          <Star className="text-secondary-fixed" size={40} />
          <div className="mt-8">
            <div className="text-5xl font-display font-bold">15</div>
            <div className="text-sm font-bold text-on-primary-container uppercase tracking-wider mt-1">Upcoming Events</div>
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-surface-container-high rounded-3xl p-8 flex flex-col justify-between border border-outline-variant shadow-sm tonal-elevation-1"
        >
          <MapPin className="text-secondary" size={40} />
          <div className="mt-8">
            <div className="text-5xl font-display font-bold text-on-surface">12</div>
            <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mt-1">Prime Venues</div>
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* In-Progress Events */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-3xl font-display font-bold text-on-surface">In-Progress Events</h3>
              <p className="text-on-surface-variant mt-1">Live happenings across the campus right now</p>
            </div>
            <button className="flex items-center gap-2 text-primary font-bold hover:underline transition-all">
              View Schedule <ArrowRight size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "AI Innovation Lab",
                tag: "Workshop",
                type: "live",
                desc: "Deep dive into generative models and neural architectures.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlavDGx9_tqnBOMdr87u97xssI3Gd3MahG05wXAEuDd1fycdpqtCi6Y-XWYkXXN69K1HweRwCq7BkawRGeAgaSN2PzbDb4ThR9Ymdve-0sogU038useKgJAMl9VeoO_gD2xUT7zXy8aUX_ZAqad7sxoyeRijN9XJ0PoIKitsTj1gsaCca-D-jD6PQhFUn3RpaO_vOsU1Nl8eHt6iTQmjAjiId155McodEgqlpcgpWFWzKeFlp1L0AdjyojVDv1BP69KTYZaQDf7hg",
                info: "2:00 PM - 5:00 PM",
                action: "Join Session"
              },
              {
                title: "Autumn Welcome Mixer",
                tag: "Social",
                type: "recent",
                desc: "Meet and greet with fellow students and department heads.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1i-W3hBIP-7jCqH7ogCKdBddKXynrFfJHpCWpZOvmnlQSNMZqmL4HYH1TxxO5UHkbLIc8tSlHdwivrszOMEeRyPVuSSz2zJG1hnRhVkYIwAChQvhbuwdkLWUpifIAEA2yVZRSRQ1SJPyu_oTiiiOWrLSgo4TFLg1Ot4r84zxQoM3RZjCxVw3VdOo_p_IQtdLvlnk1K5MQ9Rnm15zht9XfK63t_deD_u1VucAHPeoRReJM8WfwY7IzglIQ-e20SNRPfRiyYsvZnnU",
                info: "Central Plaza North",
                action: "View Map"
              },
              {
                title: "Startup Leadership 101",
                tag: "Seminar",
                type: "ending",
                desc: "Master the fundamentals of team building and venture capital.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuChtAuVaUEzUDFfavGL_Fkb7T7sUyHvZsEgYAYTkWQazwSoBfFBakoMONP29_BRK9A1o1rwpWvSaDbEVknv8Dff7odloUkSSBhxPkiYzyr7S240KCcf-EHE7iSq0y7N5lAfBTu9FDsR8-md5xsz4e1ak1aRJIjDUW2tZcP4Fun6qSbBk0JDXtYWOMDfQBDwX15o0IyjcYDxNYvuPX0nLQo3KXp_4L4qjuAPhrZHQo4JYphqJVln3WlBK0S_qo0Lbs1DFZfC6Vc9KyY",
                info: "145 Attendees",
                action: "Get Certificate"
              }
            ].map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="group bg-white p-4 rounded-3xl border border-outline-variant tonal-elevation-1 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-6"
              >
                <div className="w-full sm:w-48 h-40 rounded-2xl overflow-hidden shrink-0">
                  <img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {event.tag}
                      </span>
                      {event.type === 'live' && (
                        <div className="flex items-center text-tertiary gap-2">
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1] }} 
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-2 h-2 bg-tertiary rounded-full" 
                          />
                          <span className="text-xs font-bold uppercase">Live</span>
                        </div>
                      )}
                      {event.type === 'recent' && <span className="text-xs font-bold text-on-surface-variant">Started 20m ago</span>}
                      {event.type === 'ending' && <span className="text-xs font-bold text-on-surface-variant">Ending soon</span>}
                    </div>
                    <h4 className="text-2xl font-display font-bold text-on-surface mt-2 group-hover:text-secondary transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-on-surface-variant mt-1 line-clamp-1">
                      {event.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Circle size={12} className="text-secondary fill-secondary" />
                      <span className="text-sm font-bold">{event.info}</span>
                    </div>
                    <button className="bg-primary text-on-primary px-6 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all">
                      {event.action}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sidebar Actions & Flow */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant tonal-elevation-1">
            <h3 className="text-xl font-display font-bold text-on-surface mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: PlusCircle, label: 'New Event' },
                { icon: QrCode, label: 'Check-in' },
                { icon: MapIcon, label: 'Reports' },
                { icon: Star, label: 'Settings' }
              ].map((action, i) => (
                <button 
                  key={i}
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-outline-variant hover:border-secondary hover:bg-secondary-container transition-all group"
                >
                  <action.icon className="text-primary group-hover:text-secondary mb-2" size={28} />
                  <span className="text-xs font-bold">{action.label}</span>
                </button>
              ))}
            </div>
            <button className="w-full mt-4 flex items-center gap-3 p-4 bg-surface-container-highest rounded-2xl border border-outline-variant hover:bg-secondary-container transition-all">
              <MapIcon className="text-secondary" />
              <span className="text-sm font-bold">Interactive Campus Map</span>
            </button>
          </div>

          <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant tonal-elevation-1">
            <h3 className="text-xl font-display font-bold text-on-surface mb-6">Daily Flow</h3>
            <div className="relative pl-2 space-y-8">
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-outline-variant" />
              {[
                { time: "09:00 AM", title: "Dean's Keynote Address", venue: "Main Auditorium", active: true },
                { time: "11:30 AM", title: "Career Fair Setup", venue: "Student Union Hall", active: false },
                { time: "01:00 PM", title: "Networking Lunch", venue: "Campus Gardens", active: true },
                { time: "04:00 PM", title: "Hackathon Kickoff", venue: "CS Wing", active: false }
              ].map((item, i) => (
                <div key={i} className="relative pl-8">
                  <div className={`absolute left-[-4px] top-1.5 w-3 h-3 rounded-full border-2 border-white ${item.active ? 'bg-secondary ring-4 ring-secondary-container' : 'bg-outline-variant'}`} />
                  <p className={`text-xs font-bold leading-none ${item.active ? 'text-secondary' : 'text-on-surface-variant'}`}>{item.time}</p>
                  <h5 className="text-sm font-bold text-on-surface mt-1">{item.title}</h5>
                  <p className="text-xs text-on-surface-variant">{item.venue}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Calendar Modal */}
      <AnimatePresence>
        {showCalendarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowCalendarModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 bg-surface-container-low border-b border-outline-variant flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-display font-bold text-on-surface">Today's Events</h2>
                  <p className="text-on-surface-variant mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <button onClick={() => setShowCalendarModal(false)} className="p-2 bg-surface-container hover:bg-surface-container-high rounded-full transition-colors cursor-pointer">
                  <X size={24} className="text-on-surface" />
                </button>
              </div>
              <div className="p-8 overflow-y-auto space-y-4">
                {[
                  { title: "Dean's Keynote Address", time: "09:00 AM - 10:30 AM", venue: "Main Auditorium", onSpot: true },
                  { title: "Career Fair Setup & Networking", time: "11:30 AM - 01:00 PM", venue: "Student Union Hall", onSpot: false },
                  { title: "AI Innovation Workshop", time: "02:00 PM - 05:00 PM", venue: "CS Wing", onSpot: true }
                ].map((ev, i) => (
                  <div key={i} className="border border-outline-variant rounded-2xl p-6 hover:shadow-md transition-shadow bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-bold text-on-surface">{ev.title}</h4>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-on-surface-variant">
                        <span className="flex items-center gap-1"><Circle size={12} className="text-secondary fill-secondary" /> {ev.time}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {ev.venue}</span>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap self-start sm:self-auto ${ev.onSpot ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      On-Spot Registration: {ev.onSpot ? 'Available' : 'Closed'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-outline-variant bg-surface-container-low text-right">
                 <button onClick={() => navigate('/events')} className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-primary/90 transition-all cursor-pointer">
                    View Full Calendar
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
