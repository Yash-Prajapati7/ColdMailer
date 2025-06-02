import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Index() {
    const [emailInput, setEmailInput] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("emails", emailInput);
            formData.append("subject", subject);
            formData.append("body", body);

            if (attachment) {
                formData.append("attachment", attachment);
            }

            await axios.post('https://coldmailer-aw4c.onrender.com/v1/sendEmails', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setShowModal(true);
        } catch (error) {
            navigate('/troubles');
            console.error("Error sending emails:", error);
        }
    };

    const modalChange = () => {
        setShowModal(false);
        setEmailInput("");
        setBody("");
        setSubject("");
        setAttachment(null);
    };

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label htmlFor="emails" className="block text-sm font-medium text-gray-300">
                        Recipient Emails (comma-separated):
                    </label>
                    <input
                        type="text"
                        id="emails"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="email1@example.com, email2@example.com"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                        Subject:
                    </label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your email subject"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="body" className="block text-sm font-medium text-gray-300">
                        Body:
                    </label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows="5"
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your email body content"
                        required
                    ></textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="attachment" className="block text-sm font-medium text-gray-300">
                        Attachment:
                    </label>
                    <input
                        type="file"
                        id="attachment"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                >
                    Send Emails
                </button>
            </form>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="relative w-full max-w-sm bg-gray-800 text-white rounded-xl shadow-2xl p-6">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                            onClick={modalChange}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <div className="flex flex-col items-center justify-center">
                            <div className="bg-green-700 rounded-full p-3 mb-4">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Emails Sent Successfully</h2>
                            <p className="text-sm text-gray-300 mb-4 text-center">
                                Your email has been delivered to the recipients.
                            </p>
                            <button
                                onClick={modalChange}
                                className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}