import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Calendar, Award, Code, Users, Presentation, CheckCircle2, Music, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PARTICIPATED_EVENTS = [
  {
    id: '1',
    title: 'Spring Cultural Festival',
    date: '2024-04-10',
    description: 'Participated in the university wide cultural festival, featuring dance, music, and art.',
    type: 'Cultural',
    status: 'Completed',
    icon: Music,
    color: 'bg-primary-container',
    images: ['/cultural_fest_photo.png', '/meetup_photo.png', '/workshop_photo.png', '/seminar_photo.png', '/hackathon_photo.png']
  },
  {
    id: '2',
    title: 'Global Hackathon 2024',
    date: '2024-03-15',
    description: 'Participated in the 48-hour coding challenge. Built an AI-powered study assistant.',
    type: 'Hackathon',
    status: 'Completed',
    icon: Code,
    color: 'bg-primary',
    images: ['/hackathon_photo.png', '/workshop_photo.png', '/seminar_photo.png', '/meetup_photo.png', '/cultural_fest_photo.png']
  },
  {
    id: '3',
    title: 'Future of AI Seminar',
    date: '2024-03-10',
    description: 'Attended the keynote session by industry leaders on generative AI.',
    type: 'Seminar',
    status: 'Completed',
    icon: Presentation,
    color: 'bg-secondary',
    images: ['/seminar_photo.png', '/meetup_photo.png', '/hackathon_photo.png', '/cultural_fest_photo.png', '/workshop_photo.png']
  },
  {
    id: '4',
    title: 'Web Dev Bootcamp',
    date: '2024-02-28',
    description: 'Completed the intensive 3-day workshop on modern web frameworks.',
    type: 'Workshop',
    status: 'Completed',
    icon: Code,
    color: 'bg-tertiary',
    images: ['/workshop_photo.png', '/hackathon_photo.png', '/seminar_photo.png', '/cultural_fest_photo.png', '/meetup_photo.png']
  },
  {
    id: '5',
    title: 'Campus Tech Meetup',
    date: '2024-02-15',
    description: 'Networking event with local tech startups and alumni.',
    type: 'Meetup',
    status: 'Completed',
    icon: Users,
    color: 'bg-primary',
    images: ['/meetup_photo.png', '/cultural_fest_photo.png', '/workshop_photo.png', '/hackathon_photo.png', '/seminar_photo.png']
  }
];

const CATEGORIES = ['All', 'Cultural', 'Hackathon', 'Seminar', 'Workshop', 'Meetup'];
const SORT_OPTIONS = ['Newest First', 'Oldest First', 'A-Z', 'Z-A'];

export default function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);

  const filteredAndSortedEvents = useMemo(() => {
    let data = [...PARTICIPATED_EVENTS];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.description.toLowerCase().includes(lowerQuery)
      );
    }

    if (selectedCategory !== 'All') {
      data = data.filter(item => item.type === selectedCategory);
    }

    data.sort((a, b) => {
      switch (sortBy) {
        case 'Newest First':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'Oldest First':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'A-Z':
          return a.title.localeCompare(b.title);
        case 'Z-A':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return data;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <>
      <div className="space-y-8 animate-in fade-in duration-700 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <section className="space-y-6 pt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-on-surface">Participated Events</h1>
              <p className="text-lg text-on-surface-variant mt-2">
                Review and manage the events, workshops, and festivals you've attended.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-[32px] border border-outline-variant shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search events by name or description..."
                className="w-full pl-12 pr-4 py-4 bg-background rounded-2xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-on-surface placeholder:text-on-surface-variant/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-background border border-outline-variant rounded-2xl p-2">
                <Filter size={18} className="text-on-surface-variant ml-2" />
                <select 
                  className="bg-transparent border-none outline-none py-2 pr-4 text-on-surface cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-background border border-outline-variant rounded-2xl p-2">
                <ArrowUpDown size={18} className="text-on-surface-variant ml-2" />
                <select 
                  className="bg-transparent border-none outline-none py-2 pr-4 text-on-surface cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {SORT_OPTIONS.map(sort => (
                    <option key={sort} value={sort}>{sort}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              className="md:hidden flex items-center justify-center gap-2 bg-background border border-outline-variant rounded-2xl p-4 text-on-surface"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={20} />
              <span>Filters & Sort</span>
            </button>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden space-y-4 overflow-hidden"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface-variant">Event Type</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          selectedCategory === cat 
                            ? 'bg-primary text-white' 
                            : 'bg-background border border-outline-variant text-on-surface'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface-variant">Sort By</label>
                  <div className="grid grid-cols-2 gap-2">
                    {SORT_OPTIONS.map(sort => (
                      <button
                        key={sort}
                        onClick={() => setSortBy(sort)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          sortBy === sort 
                            ? 'bg-secondary text-white' 
                            : 'bg-background border border-outline-variant text-on-surface'
                        }`}
                      >
                        {sort}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-semibold text-on-surface">
              Your Events <span className="text-on-surface-variant text-lg font-normal">({filteredAndSortedEvents.length})</span>
            </h2>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedEvents.length > 0 ? (
                filteredAndSortedEvents.map((item, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    key={item.id}
                    className="bg-white p-6 rounded-[24px] border border-outline-variant shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row gap-6 md:items-center"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center shrink-0 shadow-inner`}>
                      <item.icon size={24} />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-background border border-outline-variant text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                          {item.type}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-on-surface-variant">
                          <Calendar size={14} />
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        {item.status === 'Completed' && (
                          <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                            <CheckCircle2 size={14} />
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-on-surface-variant leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="shrink-0 mt-4 md:mt-0">
                      {item.images && item.images.length > 0 ? (
                        <button 
                          onClick={() => setSelectedImages(item.images)}
                          className="px-6 py-3 rounded-xl bg-background border border-outline-variant text-primary font-semibold hover:bg-primary hover:text-white transition-colors w-full md:w-auto"
                        >
                          View Images
                        </button>
                      ) : (
                        <button 
                          disabled
                          className="px-6 py-3 rounded-xl bg-background border border-outline-variant text-on-surface-variant font-semibold cursor-not-allowed w-full md:w-auto opacity-50"
                        >
                          No Images
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white rounded-[32px] border border-outline-variant border-dashed"
                >
                  <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-4 text-outline-variant">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">No events found</h3>
                  <p className="text-on-surface-variant max-w-md mx-auto">
                    We couldn't find any participated events matching your current filters and search query.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedImages(null)}
          >
            <div 
              className="relative w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={() => setSelectedImages(null)}
                  className="w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 max-h-[80vh] overflow-y-auto">
                <div className="grid gap-6">
                  {selectedImages.map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      alt={`Event photo ${i + 1}`} 
                      className="w-full h-auto rounded-2xl object-cover shadow-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}