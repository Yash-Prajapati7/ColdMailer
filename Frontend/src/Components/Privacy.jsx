import React from "react";

export default function Privacy() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-2xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Information We Collect</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We may collect personal information such as your name, email address, and any other details you provide while using our site.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">How We Use Your Information</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Your information is used to improve your experience on our platform, respond to inquiries, and send updates.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Third-Party Sharing</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We do not share your personal information with third parties without your consent, except as required by law.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Rights</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You have the right to access, update, or delete your personal information at any time.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Contact Us</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    If you have any questions about this Privacy Policy, feel free to contact us.
                </p>
            </div>
        </div>
    );
}
