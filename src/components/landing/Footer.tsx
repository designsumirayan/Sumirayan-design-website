import { Link } from "@tanstack/react-router";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Send, 
  Phone, 
  Mail, 
  MapPin 
} from "lucide-react";

import logoUrl from "@/assets/sumirayan design.png";

export function Footer() {
  return (
    <footer className="pt-24 pb-8 px-6 bg-black border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-brand opacity-50" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 text-left">
        <div className="md:col-span-4 space-y-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="grid place-items-center w-12 h-12 rounded-xl bg-white shadow-md group-hover:scale-105 transition-transform">
              <img src={logoUrl} alt="Sumirayan Design" className="w-8 h-auto" />
            </div>
            <div>
              <span className="font-black text-lg text-white block">Sumirayan Design</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Patna, Bihar</span>
            </div>
          </Link>
          <p className="text-white/50 text-sm font-medium max-w-xs leading-relaxed">
            Patna's #1 creative agency. Design, Photography, Videography & Art — crafting visual excellence for brands across Bihar and India.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#1f5fb7] hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#1f5fb7] hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#e63027] hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#1f5fb7] hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">Services</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/design" className="text-white/60 hover:text-white transition-colors">Design Identity</Link></li>
            <li><Link to="/photography" className="text-white/60 hover:text-white transition-colors">Photography</Link></li>
            <li><Link to="/art" className="text-white/60 hover:text-white transition-colors">Art & Canvas</Link></li>
            <li><Link to="/learn" className="text-white/60 hover:text-white transition-colors">Internships</Link></li>
            <li><Link to="/design" className="text-white/60 hover:text-white transition-colors">Digital Marketing</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/blog" className="text-white/60 hover:text-white transition-colors">Blog & Journal</Link></li>
            <li><Link to="/careers" className="text-white/60 hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="text-white/60 hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/about" className="text-white/60 hover:text-white transition-colors">About Founder</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">Stay Updated</h4>
          <p className="text-white/50 text-sm mb-4">Subscribe for creative insights, design trends, and Patna business news.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="your@email.com" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-[#1f5fb7] transition-colors placeholder:text-white/20" />
            <button className="bg-[#1f5fb7] hover:bg-[#163f7a] text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-6 p-4 bg-white/3 border border-white/5 rounded-xl">
            <p className="text-[11px] font-black text-white/50 uppercase tracking-widest mb-2">Quick Contact</p>
            <a href="tel:+919123456789" className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#1f5fb7] transition-colors">
              <Phone className="w-3.5 h-3.5" /> +91 89368 41201
            </a>
            <a href="mailto:hello@sumirayandesign.com" className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#1f5fb7] transition-colors mt-1">
              <Mail className="w-3.5 h-3.5" /> sumirayandesign@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/40">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#e63027]" />
          <p>© {new Date().getFullYear()} Sumirayan Design Pvt. Ltd. · Patna, Bihar · All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
