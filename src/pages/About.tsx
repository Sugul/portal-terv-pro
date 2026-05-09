import { Rocket, Users, Building2, ChevronRight, GraduationCap, Briefcase, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="space-y-xl animate-in fade-in duration-700 pb-20">
      {/* Legacy Section */}
      <section className="relative rounded-[40px] overflow-hidden h-[500px] flex items-center shadow-2xl border border-outline-variant">
        <img 
          alt="TERV PRO Vision" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCilsPDzjUSpVCeYpXxLm8bm_Mg1I5fD0VQOtrxXYu5LRTe57gxO_QDYGDji17KXys5EGHpbWA_Bc-U5Iv-2bVAx2uZkFtLAnI9z4Ivto3ESjmFgpIXtV9iL66fgYAnpLuU1JbcVJlMikhTGIxjskrO5BCrGiMQSi7hRf2WnyoLCGmMs9cmk7M7nwR3AV3ffTQfMBsQYpshfrdvWzJzgA_nSjW21SyXUIOLtOE5Eo46lm9fjlKWS75ApUVAL20Oib0aF-4fNCcL2Bc" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        <div className="relative z-10 px-margin flex flex-col gap-6 max-w-3xl text-white">
          <span className="text-secondary-fixed font-bold tracking-[0.2em] uppercase text-xs text-secondary-container">Welcome to TERV PRO</span>
          <h2 className="text-5xl md:text-6xl font-display font-bold leading-tight text-white">Empowering the Next Generation of Tech Leaders</h2>
          <p className="text-xl text-primary-fixed-dim font-sans text-on-primary-container max-w-2xl">
            Bridging the gap between academic learning and industry expectations through world-class training, events, and placement management.
          </p>
        </div>
      </section>

      {/* Mission & Core Bento */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[32px] border border-outline-variant shadow-sm flex flex-col justify-center tonal-elevation-1">
          <h3 className="text-4xl font-display font-bold text-primary mb-6">Our Mission</h3>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            At TERV PRO, our core mission is to transform raw student potential into professional excellence. We believe that true learning happens when academic rigor meets practical industry application. Our comprehensive digital ecosystem empowers students to upskill, participate in meaningful events, and seamlessly connect with top tech companies for their dream careers.
          </p>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-primary-container p-8 rounded-3xl text-center shadow-lg flex flex-col items-center justify-center">
            <GraduationCap className="text-white mb-2" size={32} />
            <span className="text-5xl font-display font-bold text-white block">500k+</span>
            <span className="text-xs font-bold text-on-primary-container uppercase tracking-widest mt-2 block">Students Upskilled</span>
          </div>
          <div className="bg-secondary-container p-8 rounded-3xl text-center shadow-md flex flex-col items-center justify-center">
            <Briefcase className="text-on-secondary-container mb-2" size={32} />
            <span className="text-5xl font-display font-bold text-on-secondary-container block">300+</span>
            <span className="text-xs font-bold text-on-secondary-container/80 uppercase tracking-widest mt-2 block">Hiring Partners</span>
          </div>
          <div className="bg-surface-container-high p-8 rounded-3xl text-center border border-outline-variant flex flex-col items-center justify-center">
            <Building2 className="text-primary mb-2" size={32} />
            <span className="text-5xl font-display font-bold text-primary block">50+</span>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-2 block">Partner Institutions</span>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="bg-white/50 backdrop-blur-md rounded-[40px] p-margin border border-outline-variant relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-2">
            <h3 className="text-4xl font-display font-bold text-primary">The TERV PRO Journey</h3>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          
          <div className="relative pt-8">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-outline-variant/50 hidden md:block" />
            
            <div className="space-y-16">
              {[
                { year: "2018", title: "The Vision", desc: "Started as a focused technical training initiative to help engineering students crack top product companies.", align: "right" },
                { year: "2021", title: "Digital Platform Launch", desc: "Scaled our impact by launching a comprehensive ed-tech platform featuring interactive coding environments.", align: "left" },
                { year: "2024", title: "Industry Integration", desc: "Evolved into a full-scale ecosystem managing campus events, hackathons, and direct placements with tech giants.", align: "right" },
                { year: "2026", title: "Global Reach", desc: "Expanding our footprint to empower millions of students worldwide with AI-driven personalized learning paths.", align: "left" }
              ].map((milestone, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center gap-12 group">
                  <div className={`md:w-1/2 order-2 ${milestone.align === 'right' ? 'md:text-right' : 'md:order-3'}`}>
                    <h4 className="text-2xl font-display font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{milestone.title}</h4>
                    <p className="text-on-surface-variant leading-relaxed">{milestone.desc}</p>
                  </div>
                  <div className="relative z-10 order-1 md:order-2 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center font-display font-bold text-xl border-8 border-white shadow-xl group-hover:scale-110 transition-transform">
                      {milestone.year}
                    </div>
                  </div>
                  <div className={`md:w-1/2 hidden md:block ${milestone.align === 'right' ? 'order-3' : 'order-1'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Instructors */}
      <section className="space-y-8">
        <div className="text-center">
          <h3 className="text-4xl font-display font-bold text-primary mb-2">Minds Behind TERV PRO</h3>
          <p className="text-on-surface-variant max-w-2xl mx-auto">Led by industry veterans and passionate educators dedicated to student success.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              name: "Karthik Subramanian", 
              role: "Chief Learning Officer", 
              img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
              desc: "Architect of our curriculum with 20 years of experience in technical education."
            },
            { 
              name: "Ananya Desai", 
              role: "Head of Product", 
              img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
              desc: "Dedicated to building seamless platforms that connect students with employers."
            }
          ].map((person, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden border border-outline-variant shadow-sm group hover:shadow-xl transition-all"
            >
              <div className="h-72 overflow-hidden relative">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="p-6">
                <h5 className="text-xl font-display font-bold text-primary">{person.name}</h5>
                <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">{person.role}</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">{person.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
