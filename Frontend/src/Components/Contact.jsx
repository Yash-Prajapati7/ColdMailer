import React from "react";

export default function Contact() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6 pt-32 pb-16">
            <div className="max-w-lg w-full p-10 bg-white rounded-3xl shadow-xl border border-slate-100 animate-slide-up">
                <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Contact Us</h2>
                <p className="text-slate-600 mb-8">
                    Have questions or want to get in touch? We'd love to hear from you!
                </p>
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-slate-700"
                        >
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-300"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-slate-700"
                        >
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-300"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-slate-700"
                        >
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-300 resize-none"
                            placeholder="Write your message here..."
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-lavender-600 hover:bg-lavender-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender-500 transition-all duration-300 glow-effect hover:-translate-y-0.5"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
