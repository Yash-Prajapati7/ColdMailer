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
    <div className="px-4 py-10 bg-white min-h-screen dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-violet-600 dark:text-violet-400">
          How to Use Cold Mailer
        </h1>

        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-12 bg-violet-50 dark:bg-gray-800 border border-violet-200 dark:border-violet-400 p-6 rounded-xl shadow hover:shadow-md transition duration-300"
          >
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {step.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              {step.video && (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={step.video}
                    title={step.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-600"
                  ></iframe>
                </div>
              )}
            </div>
            {step.image && (
              <img
                src={step.image}
                alt={step.title}
                className="w-full md:w-60 rounded-lg shadow-md border border-gray-200 dark:border-gray-600"
              />
            )}
          </div>
        ))}

        <div className="text-center pt-10">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white text-lg font-medium rounded-xl shadow transition duration-300"
          >
            Ready to Start? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
