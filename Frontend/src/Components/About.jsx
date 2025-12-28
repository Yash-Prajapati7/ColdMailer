import React from "react";
import { Heart } from "lucide-react";

export default function About() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6 pt-32 pb-16">
            <div className="max-w-3xl p-10 bg-white rounded-3xl shadow-xl border border-slate-100 animate-slide-up">
                <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">
                    About ColdMailer
                </h2>

                <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                    <p>
                        ColdMailer is a modern, high-impact cold email automation platform designed to revolutionize your outreach strategy.
                    </p>

                    <p>
                        Built with precision and user experience in mind, ColdMailer empowers professionals, marketers, and businesses to send personalized, effective cold emails at scale. Our platform combines cutting-edge technology with intuitive design to ensure your messages reach the right audience and drive meaningful engagement.
                    </p>

                    <p>
                        With features like high delivery rates, personalized campaign management, easy integrations, and robust security, ColdMailer takes the complexity out of cold emailing. Whether you're a startup founder, sales professional, or marketing expert, our tool adapts to your needs and helps you build authentic connections.
                    </p>

                    <p>
                        We believe in ethical outreach practices and providing value to both senders and recipients. That's why we focus on deliverability, personalization, and transparency in every email sent through our platform.
                    </p>

                    <p>
                        Join thousands of professionals who have transformed their outreach with ColdMailer. Start building relationships that matter, one email at a time.
                    </p>

                    <div className="pt-6 font-serif italic text-lavender-600 flex flex-col items-start gap-2">
                        <p className="flex items-center gap-2">
                            Made with Love <Heart size={18} className="fill-current" />
                        </p>
                        <p>The ColdMailer Team</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
