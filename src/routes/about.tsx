import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { 
  Palette, 
  Camera, 
  MonitorPlay, 
  PenTool, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Quote,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  TrendingUp
} from "lucide-react";

import { GlobalHeader } from "@/components/site/GlobalHeader";
import { Footer } from "@/components/landing/Footer";

// Import the uploaded image from your assets folder
import founderImage from "@/assets/Sumit (2).jpeg";

// --- TanStack Router Configuration ---
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Founder | Sumirayan Design" },
      { name: "description", content: "Learn about Sumit Singh, the founder and creative visionary behind Sumirayan Design." },
    ],
  }),
  component: AboutPage,
});

const skills = [
  { name: "Digital Business Growth Strategies", icon: <TrendingUp className="w-5 h-5 text-[#1f5fb7]" /> },
  { name: "Portrait Art & Illustration", icon: <PenTool className="w-5 h-5 text-[#1f5fb7]" /> },
  { name: "Graphic Design & Branding", icon: <Palette className="w-5 h-5 text-[#e63027]" /> },
  { name: "Photography", icon: <Camera className="w-5 h-5 text-[#1f5fb7]" /> },
  { name: "Video Editing", icon: <MonitorPlay className="w-5 h-5 text-[#e63027]" /> },
];

function AboutPage() {
  return (
    <>
      {/* 1. PREMIUM HEADER */}
      <GlobalHeader />

      {/* 2. FOUNDER CONTENT */}
      <main className="relative bg-[#050810] text-white min-h-screen overflow-hidden pt-32 pb-24 selection:bg-[#1f5fb7] selection:text-white">
        {/* Background Orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[160px] bg-[#1f5fb7]/10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] bg-[#e63027]/10 pointer-events-none" />
        
        {/* Dot Grid Background */}
        <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* HEADER SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4 mt-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1f5fb7]/30 bg-[#1f5fb7]/10 text-[11px] text-[#1f5fb7] font-black uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" /> Founder & CEO
            </div>
            {/* Name changed to be one color */}
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Sumit Singh
            </h1>
            <p className="text-white/50 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Renowned artist, photographer, graphic designer, and creative visionary.
            </p>
          </motion.div>

          {/* MAIN CONTENT GRID */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN - IMAGE & SOCIALS */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Image Space */}
              <div className="relative w-full aspect-[4/5] rounded-3xl p-1 bg-gradient-to-br from-[#1f5fb7]/40 via-white/5 to-[#e63027]/40">
                <div className="absolute inset-1 bg-[#0a0f1e] rounded-[22px] overflow-hidden group flex flex-col items-center justify-center border border-white/5 relative">
                  
                  {/* Uploaded Founder Image */}
                  <img 
                    src={founderImage} 
                    alt="Sumit Singh" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Decorative overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>
              </div>

              {/* Social Links (Added Facebook) */}
              <div className="flex justify-center gap-4">
                {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-[#0a0f1e] border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#1f5fb7] hover:text-white hover:border-[#1f5fb7] transition-all shadow-lg hover:-translate-y-1">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT COLUMN - BIO & DETAILS */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-7 space-y-8"
            >
              {/* Bio Quote */}
              <div className="relative p-8 rounded-3xl bg-[#0a0f1e] border border-white/5 overflow-hidden">
                <Quote className="absolute top-6 right-6 w-20 h-20 text-white/5 -rotate-12" />
                <p className="text-xl md:text-2xl font-bold text-white/90 leading-relaxed italic relative z-10">
                  "A perfect blend of artistic excellence and modern digital innovation."
                </p>
              </div>

              {/* Detailed Bio */}
              <div className="space-y-6 text-white/70 font-medium leading-relaxed">
                <p>
                  Sumit Singh is a renowned artist, photographer, graphic designer, and creative visionary known for his exceptional multi-dimensional talent in the world of art and digital media. His expertise spans across pencil and digital sketching, graphic designing, photography, video editing, branding, and digital business growth strategies. 
                </p>
                <p>
                  Particularly admired for his portrait art and creative illustrations, his work reflects a deep understanding of aesthetics and storytelling. Throughout his professional journey, he has worked with various companies as a graphic designer and flourished as a freelancer, delivering high-quality work in commercial painting, digital marketing, and logo design.
                </p>
                <p>
                  Apart from his artistic expertise, his photography skills are highly appreciated for capturing emotions, stories, and aesthetics with remarkable creativity.
                </p>
              </div>

              {/* Education & Career Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-[#1f5fb7]/50 transition-colors">
                  <GraduationCap className="w-8 h-8 text-[#1f5fb7] mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">Education</h3>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li><strong className="text-white/90">MFA</strong> — Banaras Hindu University (BHU)</li>
                    <li><strong className="text-white/90">BFA</strong> — College of Arts & Crafts, Patna University</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-[#e63027]/50 transition-colors">
                  <Briefcase className="w-8 h-8 text-[#e63027] mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">Entrepreneurship</h3>
                  <p className="text-sm text-white/60">
                    Founded <strong className="text-white/90">Sumirayan Design Pvt. Ltd.</strong> in 2023. Actively guiding businesses, startups, and leaders in building impactful digital identities.
                  </p>
                </div>
              </div>

              {/* Creative Expertise Grid */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-white/40 mb-4">Core Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0a0f1e] border border-white/10 shadow-sm">
                      {skill.icon}
                      <span className="text-sm font-bold text-white/90">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vision Statement */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-base text-white/60 font-medium">
                  With his visionary approach, creative excellence, and deep understanding of digital growth, Sumit Singh continues to inspire and transform brands through innovation and artistic brilliance.
                </p>
              </div>

            </motion.div>
          </div>
        </div>
      </main>

      {/* 3. INDEX-MATCHING FOOTER */}
      <Footer />
    </>
  );
}
