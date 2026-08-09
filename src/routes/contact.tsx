import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { EditorialShell } from "@/components/site/EditorialShell";
import { submitContact } from "@/lib/portal.functions";
import { 
  Mail, Phone, MapPin, MessageCircle, 
  Send, CheckCircle2, Plus, Minus, Sparkles 
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Sumirayan Design" },
      { name: "description", content: "Get in touch with Patna's best creative agency. Let's build your brand together." },
    ],
  }),
  component: ContactPage,
});

// ─── FAQ DATA ───
const faqs = [
  { q: "What services does Sumirayan Design provide?", a: "Sumirayan Design Pvt. Ltd. is a creative digital agency offering Graphic Design, Branding, Photography, Videography, Website Development, Social Media Marketing, Digital Marketing, AI-based creative solutions, and complete business branding services." },
  { q: "Where is Sumirayan Design located?", a: "Sumirayan Design Pvt. Ltd. is based in Patna, Bihar, and provides creative and digital services to businesses, startups, educational institutions, and organizations across India." },
  { q: "Why should I choose Sumirayan Design for my business branding?", a: "We combine artistic creativity with modern digital strategies to create unique brand identities, engaging visuals, and marketing solutions that help businesses build trust and grow online." },
  { q: "Do you provide graphic design services for businesses?", a: "Yes, we provide professional graphic design services including Logo Design, Brand Identity, Social Media Creatives, Posters, Brochures, Packaging Design, Advertisements, and Marketing Materials." },
  { q: "Do you offer website design and development services?", a: "Yes, Sumirayan Design develops modern, responsive, and user-friendly websites for businesses, startups, educational institutions, and personal brands with a focus on design, performance, and SEO." },
  { q: "Do you provide digital marketing services in Patna?", a: "Yes, we provide digital marketing solutions including Social Media Marketing, Google Ads, Meta Ads, Content Creation, Campaign Management, SEO, and Online Brand Promotion." },
  { q: "How much does social media marketing cost?", a: "The cost of social media marketing depends on business requirements, content needs, platforms, and campaign goals. We offer customized packages for startups, small businesses, and established brands." },
  { q: "Do you provide professional photography and videography services?", a: "Yes, we provide professional photography and videography services including Product Photography, Corporate Photography, Event Coverage, Brand Films, Promotional Videos, and Creative Content Production." },
  { q: "Can you help startups build their brand identity?", a: "Yes, we help startups create a complete brand identity including Logo Design, Brand Guidelines, Marketing Creatives, Website Design, Social Media Strategy, and Digital Presence." },
  { q: "Do you work with educational institutions and organizations?", a: "Yes, we work with schools, colleges, hospitals, businesses, and organizations to create branding campaigns, promotional content, photography, videos, websites, and digital marketing solutions." },
  { q: "How long does a typical project take?", a: "Project timelines depend on the scope of work. Logo and branding projects may take 2–4 weeks, websites usually take 4–10 weeks, and marketing campaigns are planned according to business goals." },
  { q: "Do you work with small businesses and startups?", a: "Yes, we work with startups, entrepreneurs, and small businesses by providing affordable and scalable creative solutions to help them establish and grow their brand." },
  { q: "Do you provide customized design solutions?", a: "Yes, every project is customized according to the client's brand goals, audience, industry requirements, and marketing objectives." },
  { q: "Do you offer AI-based creative services?", a: "Yes, we use modern AI tools and technologies for creative design, content development, automation, visual storytelling, and improving digital marketing efficiency." },
  { q: "Does Sumirayan Design provide internship programs?", a: "Yes, Sumirayan Design offers Creative & AI Internship Programs where students learn Graphic Design, Video Editing, Photography, Social Media Management, AI Tools, and work on practical projects." },
  { q: "Who can join your Creative & AI Internship Program?", a: "Students, beginners, designers, photographers, and creative enthusiasts who want practical industry experience and career growth can join our internship program." },
  { q: "Do you provide certificates after internship completion?", a: "Yes, successful interns receive an Internship Certificate and practical experience that helps them build their portfolio and career opportunities." },
  { q: "How can I start a project with Sumirayan Design?", a: "You can contact us through our website contact form, call, or email. Our team will understand your requirements and suggest the best creative solution for your business." },
  { q: "Do you provide services outside Patna?", a: "Yes, we work with clients across India through online collaboration and provide digital services remotely." },
];

function ContactPage() {
  const submitMsg = useServerFn(submitContact);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ─── LIVE DATABASE MUTATION ───
  const submitMut = useMutation({
    mutationFn: (v: any) => submitMsg({ data: v }),
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
    },
    onError: (err: any) => {
      alert("Error sending message:\n\n" + (err?.message || "Please try again later."));
    }
  });

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    const name = String(fd.get("name")).trim();
    const email = String(fd.get("email")).trim();
    const company = String(fd.get("company")).trim() || "N/A";
    const message = String(fd.get("message")).trim();

    submitMut.mutate({
      name,
      email,
      company: `Client: ${company}`.substring(0, 190),
      message: `GENERAL INQUIRY:\n\n${message}`
    });
    
    (e.target as HTMLFormElement).reset();
  };

  return (
    <EditorialShell title={<span className="hidden"></span>} intro="" eyebrow="">
      
      {/* ─── PREMIUM HERO SECTION ─── */}
      <div className="relative pt-30 md:pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none z-0"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none z-0"></div>

        <div className="relative z-10 w-full max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Sparkles className="w-4 h-4" /> Let's Connect
          </div>
          <h1 className="text-5xl md:text-7xl serif mb-6 tracking-tight text-white leading-tight">
            Tell us what you're <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-300">building.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            One thoughtful sentence is enough. We'll get back to you within one business day to discuss your vision.
          </p>
        </div>
      </div>

      {/* ─── CONTACT FORM & INFO SECTION ─── */}
      <div className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Left Form Area */}
          <div className="lg:col-span-3">
            <div className="bg-[#050505] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl serif text-white mb-3">Message Sent!</h3>
                  <p className="text-white/60 text-lg">Thank you for reaching out. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-widest text-white/50 mb-2 block">Name *</span>
                      <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-blue-500/50 outline-none transition-colors" />
                    </label>
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-widest text-white/50 mb-2 block">Email *</span>
                      <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-blue-500/50 outline-none transition-colors" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-widest text-white/50 mb-2 block">Company (Optional)</span>
                    <input name="company" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-blue-500/50 outline-none transition-colors" />
                  </label>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-widest text-white/50 mb-2 block">What can we help with? *</span>
                    <textarea required name="message" rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-blue-500/50 outline-none transition-colors resize-none"></textarea>
                  </label>
                  <button 
                    type="submit" 
                    disabled={submitMut.isPending}
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {submitMut.isPending ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            <a href="mailto:sumirayandesign@gmail.com" className="group flex items-center gap-5 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Email</span>
                <span className="text-white group-hover:text-blue-300 transition-colors">sumirayandesign@gmail.com</span>
              </div>
            </a>

            <a href="tel:+918936841201" className="group flex items-center gap-5 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Phone</span>
                <span className="text-white group-hover:text-emerald-300 transition-colors">+91 89368 41201</span>
              </div>
            </a>

            <div className="group flex items-center gap-5 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Studio</span>
                <span className="text-white text-sm leading-relaxed">Boring Road, Patna<br/>Bihar 800001</span>
              </div>
            </div>

            <a href="https://wa.me/918936841201" target="_blank" rel="noreferrer" className="group flex items-center gap-5 p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-emerald-300 font-medium group-hover:text-emerald-200 transition-colors">
                Chat on WhatsApp
              </div>
            </a>
          </div>

        </div>
      </div>

      {/* ─── PREMIUM FAQ SECTION ─── */}
      <div className="max-w-6xl mx-auto px-6 pb-32 relative z-10 border-t border-white/10 pt-24 mt-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl serif text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-white/50 text-lg">Everything you need to know about our services and processes.</p>
        </div>

        {/* 2-Column Grid for Compact & Premium Look */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-start">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openFaq === index ? "bg-white/[0.04] border-blue-500/30" : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"}`}
            >
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <span className={`text-sm md:text-base pr-4 font-medium transition-colors ${openFaq === index ? "text-blue-300" : "text-white/80"}`}>
                  {faq.q}
                </span>
                <span className="shrink-0 text-white/40">
                  {openFaq === index ? <Minus className="w-4 h-4 text-blue-400" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-96 opacity-100 pb-6 px-5 md:px-6" : "max-h-0 opacity-0 px-5 md:px-6"}`}
              >
                <p className="text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </EditorialShell>
  );
}
