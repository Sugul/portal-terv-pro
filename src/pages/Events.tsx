import React, { useState, useMemo } from 'react';
import { Search, Radio, Heart, Share2, ArrowRight, History as HistoryIcon, ArrowLeft, CheckCircle2, UserPlus, FileText, User, Mail, Phone, Hash, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type SubEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
};

type MainEvent = {
  id: string;
  title: string;
  category: string;
  date: string;
  img: string;
  desc: string;
  subEvents: SubEvent[];
};

const EVENT_CATEGORIES = ['All Events', 'Cultural', 'Academic', 'Workshops', 'Social'];

const EVENTS_DATA: MainEvent[] = [
  {
    id: 'pongal2026',
    title: 'Pongal 2026',
    category: 'Cultural',
    date: 'JAN 14, 2026',
    img: '/pongal_photo.png',
    desc: 'The harvest festival is in full swing at the Main Quad. Join us for traditional games, music, and the ceremonial boiling of Pongal rice.',
    subEvents: [
      { id: 'p1', title: 'Traditional Folk Dance', date: 'Jan 14, 10:00 AM', description: 'Participate in the inter-department folk dance competition.', image: '/cultural_fest_photo.png' },
      { id: 'p2', title: 'Rangoli Contest', date: 'Jan 14, 08:00 AM', description: 'Showcase your creativity in the grand Rangoli making contest.', image: '/meetup_photo.png' },
      { id: 'p3', title: 'Musical Night', date: 'Jan 14, 06:00 PM', description: 'Evening concert featuring traditional instruments.', image: '/seminar_photo.png' },
    ]
  },
  {
    id: 'techsymposium',
    title: 'National Tech Symposium',
    category: 'Academic',
    date: 'FEB 20, 2026',
    img: '/seminar_photo.png',
    desc: 'Annual technology symposium featuring paper presentations, project expos, and guest lectures from industry experts.',
    subEvents: [
      { id: 'ts1', title: 'Paper Presentation', date: 'Feb 20, 10:00 AM', description: 'Present your research papers to industry experts.', image: '/seminar_photo.png' },
      { id: 'ts2', title: 'Project Expo', date: 'Feb 20, 01:00 PM', description: 'Showcase your innovative projects to the campus.', image: '/workshop_photo.png' }
    ]
  },
  {
    id: 'reactworkshop',
    title: 'React Native Workshop',
    category: 'Workshops',
    date: 'MAR 05, 2026',
    img: '/workshop_photo.png',
    desc: 'A hands-on workshop covering the fundamentals of building cross-platform mobile apps with React Native.',
    subEvents: [
      { id: 'rw1', title: 'UI Fundamentals', date: 'Mar 05, 09:00 AM', description: 'Learn to build responsive and beautiful layouts.', image: '/hackathon_photo.png' },
      { id: 'rw2', title: 'State Management', date: 'Mar 05, 02:00 PM', description: 'Master Redux and Context API for large apps.', image: '/workshop_photo.png' }
    ]
  },
  {
    id: 'independence2026',
    title: 'Independence 2026',
    category: 'Cultural',
    date: 'AUG 15, 2026',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD183fHQ35t9piLoi0Fg_z9DHfCAikkiWbQtBFzbUmxJCwQLERthJ-qz5dH_xh9-az-wqeyFijIU3C1a_9wuJBp3mYGZ4YMdxKewX5KviUEkPWrQwW4sjNtKGYYk6OVZDUhYBAdqGAE5pN7HonH_s2DtRG3D8AlWq1bmww-y42xPz3u_s2Ar-YNQ9mMNtI9K5hIep2DU13lKkUxHxACy1lFHVo0yfn_oHJog-t02dDyhmumlv4fgIk3FEflzro3t-aQ8MMOdQc8vPI',
    desc: 'Formal flag hoisting ceremony followed by a patriotic cultural program and guest lectures.',
    subEvents: [
      { id: 'i1', title: 'Patriotic Singing', date: 'Aug 15, 09:30 AM', description: 'Group singing of patriotic songs by the choir.', image: '/cultural_fest_photo.png' },
      { id: 'i2', title: 'Debate Competition', date: 'Aug 15, 11:00 AM', description: 'Topic: The Future of Our Nation.', image: '/workshop_photo.png' },
    ]
  },
  {
    id: 'thanksgiving2026',
    title: 'Thanksgiving 2026',
    category: 'Social',
    date: 'NOV 26, 2026',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD76zXPjgl8qzB6V4FSKmTuL-6v7MHDzSAHhQ-sc8Fs2JnbvrhEmDvI7RjffS1fQYrFMZMyUlF3UzQsHWMDD-8_PnHh4r9YJ5JiuuPXeLfm-7ZUdiG0lwr0X7WgnrKEN5IAn0rE7a_8d6xCVEdffdXNUzIUFuBVrs743vDCShtF5YgnFuoiM260SzJuunrsgO5CCAV0_fSzD0UkEJwjxv8DrAObNoldAymggZXaf-4KuNTTVh-ZIcFltLIK_osCnfG_bKXUEZDlKQg',
    desc: 'Community dinner and gratitude circle hosted at the Student Union Hall for all residents.',
    subEvents: [
      { id: 't1', title: 'Community Dinner', date: 'Nov 26, 07:00 PM', description: 'A grand feast for all students and faculty.', image: '/meetup_photo.png' },
      { id: 't2', title: 'Gratitude Circle', date: 'Nov 26, 05:00 PM', description: 'Share what you are thankful for in a guided session.', image: '/workshop_photo.png' },
    ]
  },
  {
    id: 'christmas2026',
    title: 'Christmas 2026',
    category: 'Cultural',
    date: 'DEC 25, 2026',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNpV3aJcmP4dZXkNs7kb5qgzssLyzckDAadLRIOU0R8IJjv1BUzQzEn1hZgqgoL-yF03BqXEBzRNKvPLKfatLTu56_IY9Aoy4mWCp8aalHrC0Ejy-IDaHQ-8fBhftReQsOhVcWJqXTLhks6XF3DHz9nf9vDerjeyLPuXx_SH8ODwsd5YJqBW5pcIiGfuVF240fhgLWdt_5PfLzXcb_YKCrWqHky1P17T-Qorkb40zEkjLb5SrFKjBOhvx3xwyU_cgvJdibtVUr0Qg',
    desc: 'Tree lighting ceremony, carol competition, and the annual Winter Ball at the Grand Pavilion.',
    subEvents: [
      { id: 'c1', title: 'Carol Singing', date: 'Dec 25, 06:00 PM', description: 'Inter-hostel carol singing competition.', image: '/cultural_fest_photo.png' },
      { id: 'c2', title: 'Winter Ball Dance', date: 'Dec 25, 08:30 PM', description: 'The grand finale dance of the year.', image: '/meetup_photo.png' },
      { id: 'c3', title: 'Secret Santa Exchange', date: 'Dec 25, 04:00 PM', description: 'Gift exchange in the main lobby.', image: '/hackathon_photo.png' },
    ]
  }
];

export default function Events() {
  const [selectedMainEvent, setSelectedMainEvent] = useState<MainEvent | null>(null);
  const [selectedSubEvent, setSelectedSubEvent] = useState<SubEvent | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Events');

  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    email: '',
    phone: ''
  });

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Events' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubEvent) return;

    try {
      const response = await fetch('http://localhost:8080/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subEvent: { id: selectedSubEvent.id },
          name: formData.name,
          regNo: formData.regNo,
          email: formData.email,
          phone: formData.phone
        })
      });

      if (response.ok) {
        setIsRegistered(true);
      } else {
        alert('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error registering. Is the backend running?');
    }
  };

  const closeRegistration = () => {
    setSelectedSubEvent(null);
    setIsRegistered(false);
    setFormData({ name: '', regNo: '', email: '', phone: '' });
  };

  if (selectedMainEvent) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700 pb-20">
        <button 
          onClick={() => setSelectedMainEvent(null)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold"
        >
          <ArrowLeft size={20} /> Back to All Events
        </button>

        <section className="relative h-[300px] rounded-[32px] overflow-hidden shadow-lg border border-outline-variant">
          <img src={selectedMainEvent.img} alt={selectedMainEvent.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">{selectedMainEvent.title}</h1>
            <p className="text-lg text-white/80 max-w-2xl">{selectedMainEvent.desc}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-on-surface">Activities & Competitions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedMainEvent.subEvents.map((sub) => (
              <motion.div 
                key={sub.id}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden border border-outline-variant shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => setSelectedSubEvent(sub)}
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={sub.image} alt={sub.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-secondary">
                    {sub.date}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-bold text-on-surface mb-2">{sub.title}</h3>
                  <p className="text-on-surface-variant mb-6 flex-1">{sub.description}</p>
                  <button 
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
                  >
                    Register Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Registration Modal */}
        <AnimatePresence>
          {selectedSubEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={closeRegistration}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl relative"
                onClick={e => e.stopPropagation()}
              >
                {!isRegistered ? (
                  <>
                    <div className="p-8 bg-surface-container-low border-b border-outline-variant">
                      <h2 className="text-3xl font-display font-bold text-on-surface">Event Registration</h2>
                      <p className="text-on-surface-variant mt-1">Registering for: <span className="font-bold text-primary">{selectedSubEvent.title}</span></p>
                    </div>
                    <form onSubmit={handleRegister} className="p-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-on-surface-variant flex items-center gap-2"><User size={16}/> Full Name</label>
                          <input required type="text" className="w-full p-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Nithya Krishnakumar" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-on-surface-variant flex items-center gap-2"><Hash size={16}/> Register Number</label>
                          <input required type="text" className="w-full p-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. 21CS001" value={formData.regNo} onChange={e => setFormData({...formData, regNo: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-on-surface-variant flex items-center gap-2"><Mail size={16}/> Email ID</label>
                          <input required type="email" className="w-full p-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary outline-none" placeholder="student@university.edu" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-on-surface-variant flex items-center gap-2"><Phone size={16}/> Phone Number</label>
                          <input required type="tel" className="w-full p-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary outline-none" placeholder="+91 9876543210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-container p-4 rounded-2xl">
                        <div>
                          <p className="text-xs font-bold text-on-surface-variant uppercase">Event</p>
                          <p className="font-medium text-on-surface flex items-center gap-2 mt-1"><FileText size={16} className="text-primary"/> {selectedSubEvent.title}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-on-surface-variant uppercase">Date & Time</p>
                          <p className="font-medium text-on-surface flex items-center gap-2 mt-1"><Calendar size={16} className="text-secondary"/> {selectedSubEvent.date}</p>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button type="button" onClick={closeRegistration} className="flex-1 py-3 rounded-xl font-bold text-on-surface hover:bg-surface-container transition-colors">Cancel</button>
                        <button type="submit" className="flex-1 py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-md">Complete Registration</button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="p-12 text-center space-y-6">
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }}
                      className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <h2 className="text-4xl font-display font-bold text-on-surface">Congratulations!</h2>
                    <p className="text-lg text-on-surface-variant max-w-md mx-auto">
                      You have successfully registered for <span className="font-bold text-primary">{selectedSubEvent.title}</span>.
                    </p>
                    <button onClick={closeRegistration} className="mt-8 px-8 py-3 rounded-xl font-bold bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors">
                      Done
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-xl animate-in fade-in duration-700 pb-20">
      {/* Search Header */}
      <section className="space-y-6">
        <div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-on-surface">Events Discovery</h1>
          <p className="text-lg text-on-surface-variant mt-2 max-w-2xl">
            Connect with your community through workshops, seminars, and sports events. Click on an event to view and register for activities.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-white rounded-3xl border border-outline-variant shadow-lg sticky top-20 z-30 tonal-elevation-1">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
            <input 
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-none bg-surface-container focus:ring-2 focus:ring-secondary outline-none transition-all" 
              placeholder="Search for campus celebrations..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {EVENT_CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-surface-container hover:bg-secondary-container text-on-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {filteredEvents.length === 0 && (
        <section className="py-20 text-center text-on-surface-variant">
          <Search size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-bold">No events found</h3>
          <p>Try adjusting your search or category filters.</p>
        </section>
      )}

      {/* Happening Now (Only show if at least 1 event matches) */}
      {filteredEvents.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Radio className="text-secondary animate-pulse" size={24} />
            <h2 className="text-3xl font-display font-bold text-on-surface">Featured Event</h2>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase">{filteredEvents[0].category}</span>
          </div>
          
          <motion.div 
            onClick={() => setSelectedMainEvent(filteredEvents[0])}
            whileHover={{ scale: 1.005 }}
            className="relative h-[400px] rounded-[32px] overflow-hidden group shadow-2xl border border-outline-variant cursor-pointer"
          >
            <img 
              alt={filteredEvents[0].title} 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
              src={filteredEvents[0].img} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-margin md:p-12 text-white">
              <span className="bg-secondary text-on-secondary self-start px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase">{filteredEvents[0].category} FESTIVAL</span>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-2">{filteredEvents[0].title}</h3>
              <p className="text-lg text-white/80 max-w-2xl">
                {filteredEvents[0].desc}
              </p>
              <div className="flex gap-4 mt-8">
                <button className="bg-secondary text-on-secondary px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all flex items-center gap-2">
                  View Activities <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Upcoming Celebrations (Show remaining events) */}
      {filteredEvents.length > 1 && (
        <section className="space-y-8">
          <h2 className="text-3xl font-display font-bold text-on-surface">Upcoming Celebrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.slice(1).map((event) => (
              <motion.div 
                key={event.id}
                onClick={() => setSelectedMainEvent(event)}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden border border-outline-variant shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-secondary">
                    {event.subEvents.length} Activities
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-secondary font-bold text-xs border-2 border-secondary/20 px-3 py-1 rounded-full">{event.date}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container px-2 py-1 rounded-lg">{event.category}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-on-surface-variant line-clamp-2 mb-6 flex-1">{event.desc}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold group-hover:bg-primary/90 transition-colors">Explore Activities</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
      
      {/* Archive Bento */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HistoryIcon className="text-on-surface-variant" size={24} />
            <h2 className="text-3xl font-display font-bold text-on-surface">Archive: 2025 Highlights</h2>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:underline">
            View Full Archive <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[600px]">
          <div className="md:col-span-8 bg-surface-container rounded-3xl overflow-hidden relative group h-[300px] md:h-auto">
            <img src="/pongal_photo.png" alt="Archive" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all p-8 flex flex-col justify-end text-white">
              <h3 className="text-3xl font-display font-bold">Pongal 2025</h3>
              <p className="font-bold opacity-80 mt-1">January 14, 2025 • Main Courtyard</p>
            </div>
          </div>
          <div className="md:col-span-4 bg-surface-container rounded-3xl overflow-hidden relative group h-[300px] md:h-auto">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa3BzGZ8CduoWjfxZ8Gr_S0Fow2Ie-8vGnI_6iVwxirTS7GXltWeJTeqsQhT4eYhkdiY7LMPGoC2JkJrlvw25qO9HMt8PORKn2lDRzEPjrJJwzNmQZFXc2xpU6DaTpW9vGS4BrdWVRoFyPRmLbMbCSaz-l5d-Efp1mOBQEHmB7KACRLiq0KURmy_1gNV9Pp_QFjHw4PrRy-yEfb9wrnBD-7uxZ7NPE57ojTuriRS0SqvVQ3uOWBx_EXLdenPKftRSClJADFcC51jg" alt="Archive" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all p-8 flex flex-col justify-end text-white">
              <h3 className="text-2xl font-display font-bold">New Year 2026</h3>
              <p className="text-sm font-bold opacity-80">January 1, 2026 • Campus Central</p>
            </div>
          </div>
          <div className="md:col-span-4 bg-surface-container rounded-3xl overflow-hidden relative group h-[300px] md:h-auto">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkYt-xVASK5vSNuaBuzRtsYqPR2otArLVzeANWKEWt1M31TT-LtCRG2Q-cpvoeSk9sgvu8QbOzgSM5LZcWJq8O5G4XbYbfyU-OVedALJHvMCGQFyXU1Q84cmiFxVJ9kgB0_6mb3FMSqnssak8Z4OpyKtEgp0-3iayjRTL0S_JCyqcNFeFbtaw4WDHqTI93lmv2Mpo3JwDksw2WNVrtF8UqhPNpMV-3mV7cv68WEe2Y5hxBwim_s3s9agYLUFoznaziT-irQoDFGU4" alt="Archive" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all p-8 flex flex-col justify-end text-white">
              <h3 className="text-2xl font-display font-bold">Thanksgiving 2025</h3>
              <p className="text-sm font-bold opacity-80">November 27, 2025</p>
            </div>
          </div>
          <div className="md:col-span-8 bg-surface-container rounded-3xl overflow-hidden relative group h-[300px] md:h-auto">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdAqhHlKuW3_0SdibVoVls3KrRVdF3C9ca28i8my-LNWhPdOV3-bV9dHng27VVlEXyXBNaRdIDv9ABOyOZrMkyzapIQkVesmMGXnm6y3_Apc7e3Detoagonvfzn5NVYzOciYswuKBaYJOe1Q4dIBHVAf6Kn1NW3WI1_FF5PHMjyRj6ysGFP3OJuCNZzqvRtrs7382rY5gjkDfrNLb8IhJQahhWP3z7vxip4RK1clUU7FVoTRmCvdKLoGruGJycCDF7tUtn8lwafp4" alt="Archive" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all p-8 flex flex-col justify-end text-white">
              <h3 className="text-3xl font-display font-bold">Christmas 2025</h3>
              <p className="font-bold opacity-80 mt-1">December 25, 2025</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
