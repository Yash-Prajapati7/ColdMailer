import React from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, Sparkles, TrendingUp, Link2, Gem, Lock, Heart } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const features = [
    {
      title: "High Delivery Rates",
      desc: "Ensure your emails land in the inbox, not the spam folder.",
      icon: <Rocket className="w-8 h-8 text-lavender-600" />
    },
    {
      title: "Personalized Campaigns",
      desc: "Customize your emails to engage recipients effectively.",
      icon: <Sparkles className="w-8 h-8 text-lavender-600" />
    },
    {
      title: "Free",
      desc: "Start sending emails without any upfront costs.",
      icon: <Gem className="w-8 h-8 text-lavender-600" />
    },
    {
      title: "Easy Integration",
      desc: "Seamlessly connect with your CRM or email provider. (Coming soon)",
      icon: <Link2 className="w-8 h-8 text-lavender-600" />
    },
    {
      title: "Secure and Reliable",
      desc: "Experience peace of mind with industry-grade security.",
      icon: <Lock className="w-8 h-8 text-lavender-600" />
    },
    {
      title: "Real-Time Analytics",
      desc: "Track email opens, clicks, and responses instantly. (Coming soon)",
      icon: <TrendingUp className="w-8 h-8 text-lavender-600" />
    }
  ]

  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32 pb-16">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-lavender-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pastel-purple rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto space-y-8 animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight leading-tight">
            Cold Emailing, <br />
            <span className="kinetic-text font-display italic">Reimagined.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Automate your outreach with precision, personalization, and speed.
            The premium tool for modern professionals.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-lavender-600 text-white rounded-full font-medium text-lg shadow-lg shadow-lavender-500/30 hover:bg-lavender-700 hover:scale-105 transition-all duration-300 glow-effect"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/guide")}
              className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-medium text-lg hover:border-lavender-400 hover:text-lavender-600 transition-all duration-300"
            >
              How to use
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Why ColdMailer?</h2>
            <p className="text-slate-600 text-lg">Everything you need to scale your outreach.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ title, desc, icon }, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-lavender-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 bg-lavender-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-3 text-slate-900 group-hover:text-lavender-600 transition-colors">
                  {title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-8 px-4 bg-slate-50/50 text-center">
        <p className="text-slate-600">
          Made with <Heart className="inline w-4 h-4 text-red-500" /> by{" "}
          <a
            href="https://yp7.xyz"
            className="text-lavender-600 hover:text-lavender-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yash Prajapati
          </a>
        </p>
      </section>
    </div>
  );
}
