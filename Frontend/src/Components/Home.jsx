import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Intro Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4 space-y-6">
        <b className="text-4xl font-bold text-sky-600">What is Cold Mailer?</b>

        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
          Cold Mailer is an innovative platform designed to streamline the process of sending multiple emails efficiently.
          It's best for cold mailing with high delivery rates and advanced features to help you connect with your audience.
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/guide")}
            className="px-6 py-3 bg-violet-100 text-violet-700 rounded-lg border border-violet-300 hover:bg-violet-200 transition duration-200 text-lg"
          >
            How to Use
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition duration-200 text-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {[
            {
              title: "High Delivery Rates",
              desc: "Ensure your emails land in the inbox, not the spam folder.",
            },
            {
              title: "Personalized Campaigns",
              desc: "Customize your emails to engage recipients effectively.",
            },
            {
              title: "Real-Time Analytics",
              desc: "Track email opens, clicks, and responses instantly.",
            },
            {
              title: "Easy Integration",
              desc: "Seamlessly connect with your CRM or email provider.",
            },
            {
              title: "Affordable Plans",
              desc: "Get the best value for your email campaigns with our pricing.",
            },
            {
              title: "Secure and Reliable",
              desc: "Experience peace of mind with industry-grade security.",
            },
          ].map(({ title, desc }, index) => (
            <div
              key={index}
              className="max-w-sm w-full p-6 bg-white border border-violet-200 rounded-2xl shadow-md hover:shadow-lg 
             transition-transform duration-300 transform hover:scale-105 dark:bg-gray-800 dark:border-violet-400"
            >
              <h5 className="mb-2 text-2xl font-semibold text-sky-600 dark:text-sky-300">
                {title}
              </h5>
              <p className="text-gray-600 dark:text-gray-400">{desc}</p>
            </div>

          ))}
        </div>
      </section>
    </div>
  );
}
