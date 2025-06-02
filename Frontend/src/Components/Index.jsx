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
            <h1 className="text-3xl font-bold mb-8">Cold Mailer</h1>
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
                <div
                    id="success-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75"
                >
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={modalChange}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <svg
                                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    ></path>
                                </svg>
                                <svg
                                    className="mx-auto mb-4 text-green-600 w-12 h-12"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Successfully sent emails.
                            </p>
                            <button
                                type="button"
                                className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
                                onClick={modalChange}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}