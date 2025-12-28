import React from "react";
import { useNavigate } from "react-router-dom";

export default function Guide() {
  const navigate = useNavigate();

  const steps = [
    {
      title: "1. Create an App Password",
      description: "Watch this YouTube video to generate the App Password.",
      video: "https://www.youtube.com/embed/MkLX85XU5rU",
    },
    {
      title: "2. Click Get Started",
      description:
        "From the homepage, click the 'Get Started' button to begin setting up your cold email campaign.",
      image: "https://res.cloudinary.com/dlxxeq0bh/image/upload/v1750852917/Step_2_g9b5xu.png",
    },
    {
      title: "3. Login with Email & App Password",
      description:
        "Login using the email ID and the app password you generated in Step 1. This connects your email to our sender.",
      image: "https://res.cloudinary.com/dlxxeq0bh/image/upload/v1750852918/Step_3_j4vaga.png",
    },
    {
      title: "4. Add Recipients",
      description:
        "Enter the email addresses of your recipients (separated by commas or line breaks). These are the people who will receive your cold emails.",
      image: "https://res.cloudinary.com/dlxxeq0bh/image/upload/v1750853466/step_4_wtqgua.png",
    },
    {
      title: "5. Compose Your Email",
      description:
        "Write the subject and body of your email. You can also add an attachment (optional). Once done, click 'Submit' to send!",
    },
  ];

  return (
    <div className="px-4 pt-32 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900">
            How to Use <span className="text-lavender-600">ColdMailer</span>
          </h1>
          <p className="text-xl text-slate-600">Master your outreach in 5 simple steps</p>
        </div>

        {steps.map((step, index) => (
          <div
            key={index}
            className="group flex flex-col md:flex-row items-center gap-8 bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-lavender-100 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-display font-bold text-slate-900 group-hover:text-lavender-600 transition-colors">
                {step.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
              {step.video && (
                <div className="aspect-w-16 aspect-h-9 mt-4 rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={step.video}
                    title={step.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}
            </div>
            {step.image && (
              <div className="w-full md:w-1/3">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full rounded-xl shadow-md border border-slate-100 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>
        ))}

        <div className="text-center pt-12">
          <button
            onClick={() => navigate("/signup")}
            className="px-10 py-4 bg-lavender-600 text-white text-lg font-medium rounded-full shadow-lg shadow-lavender-500/30 hover:bg-lavender-700 hover:-translate-y-1 transition-all duration-300 glow-effect"
          >
            Ready to Start? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}