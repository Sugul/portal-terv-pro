import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, UserCheck, Mail, Phone, Calendar, Hash, FileText } from 'lucide-react';
import { motion } from 'motion/react';

const EVENT_TYPES = ['All', 'Hackathon', 'Cultural', 'Seminar', 'Workshop', 'Meetup', 'Social', 'Academic'];
const SORT_OPTIONS = ['Date (Newest)', 'Date (Oldest)', 'Name (A-Z)', 'Reg No (A-Z)'];

type StudentData = {
  id: string;
  name: string;
  regNo: string;
  email: string;
  phone: string;
  date: string;
  event: string;
  type: string;
};

export default function StudentAccess() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('Date (Newest)');
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/registrations')
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map((reg: any) => ({
          id: reg.id,
          name: reg.name,
          regNo: reg.regNo,
          email: reg.email,
          phone: reg.phone,
          date: reg.subEvent?.date || 'N/A',
          event: reg.subEvent?.title || 'Unknown Event',
          type: reg.subEvent?.event?.category || 'General'
        }));
        setStudentData(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch registrations', err);
        setLoading(false);
      });
  }, []);

  const filteredData = useMemo(() => {
    let data = [...studentData];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        item.regNo.toLowerCase().includes(lowerQuery) ||
        item.email.toLowerCase().includes(lowerQuery) ||
        item.event.toLowerCase().includes(lowerQuery)
      );
    }

    if (selectedType !== 'All') {
      data = data.filter(item => item.type === selectedType);
    }

    data.sort((a, b) => {
      switch (sortBy) {
        case 'Date (Newest)': return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'Date (Oldest)': return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'Name (A-Z)': return a.name.localeCompare(b.name);
        case 'Reg No (A-Z)': return a.regNo.localeCompare(b.regNo);
        default: return 0;
      }
    });

    return data;
  }, [searchQuery, selectedType, sortBy, studentData]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <section className="space-y-6 pt-8">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-on-surface">Student Access</h1>
        <p className="text-lg text-on-surface-variant">View and manage student event participation records.</p>
      </section>

      {/* Controls */}
      <section className="bg-white p-6 rounded-[32px] border border-outline-variant shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, roll number, or event..." 
              className="w-full pl-12 pr-4 py-4 bg-background rounded-2xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
            <div className="flex items-center gap-2 bg-background border border-outline-variant rounded-2xl p-2 px-4 whitespace-nowrap">
              <Filter size={18} className="text-on-surface-variant" />
              <select className="bg-transparent outline-none cursor-pointer" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 bg-background border border-outline-variant rounded-2xl p-2 px-4 whitespace-nowrap">
              <ArrowUpDown size={18} className="text-on-surface-variant" />
              <select className="bg-transparent outline-none cursor-pointer" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                {SORT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Data Table */}
      <section className="bg-white rounded-[32px] border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-sm uppercase tracking-wider border-b border-outline-variant">
                <th className="p-6 font-semibold"><div className="flex items-center gap-2"><UserCheck size={16}/> Name</div></th>
                <th className="p-6 font-semibold"><div className="flex items-center gap-2"><Hash size={16}/> Reg No</div></th>
                <th className="p-6 font-semibold"><div className="flex items-center gap-2"><Mail size={16}/> Email ID</div></th>
                <th className="p-6 font-semibold"><div className="flex items-center gap-2"><Phone size={16}/> Phone</div></th>
                <th className="p-6 font-semibold"><div className="flex items-center gap-2"><FileText size={16}/> Event</div></th>
                <th className="p-6 font-semibold"><div className="flex items-center gap-2"><Calendar size={16}/> Date</div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-on-surface-variant">
                    Loading student records...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? filteredData.map((row, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  key={i} className="hover:bg-background/50 transition-colors group"
                >
                  <td className="p-6 font-medium text-on-surface">{row.name}</td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-lg text-sm font-bold tracking-wider">
                      {row.regNo}
                    </span>
                  </td>
                  <td className="p-6 text-on-surface-variant">{row.email}</td>
                  <td className="p-6 text-on-surface-variant">{row.phone}</td>
                  <td className="p-6 font-medium text-primary">{row.event}</td>
                  <td className="p-6 text-on-surface-variant whitespace-nowrap">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                </motion.tr>
              )) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-on-surface-variant">
                    No student records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
