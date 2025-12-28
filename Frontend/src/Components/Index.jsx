import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Index() {
    const [emailInput, setEmailInput] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

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
        } finally {
            setIsLoading(false);
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
        <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="bg-lavender-600 px-8 py-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <Mail size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-display font-bold text-white">Compose Campaign</h2>
                            <p className="text-lavender-100 mt-1">Send personalized emails to your list</p>
                        </div>
                    </div>                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div>
                            <label htmlFor="emails" className="block text-sm font-medium text-slate-700 mb-1">
                                Recipients
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="emails"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-300"
                                    placeholder="email1@example.com, email2@example.com"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-slate-400 text-sm">Comma separated</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                                Subject Line
                            </label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-300"
                                placeholder="Enter a catchy subject..."
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="body" className="block text-sm font-medium text-slate-700 mb-1">
                                Message Body
                            </label>
                            <textarea
                                id="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                rows="8"
                                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-300 resize-none"
                                placeholder="Write your message here..."
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Attachment (Optional)
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-lavender-400 transition-colors duration-300 bg-slate-50">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-slate-600 justify-center">
                                        <label htmlFor="attachment" className="relative cursor-pointer bg-white rounded-md font-medium text-lavender-600 hover:text-lavender-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-lavender-500">
                                            <span>Upload a file</span>
                                            <input id="attachment" name="attachment" type="file" className="sr-only" onChange={handleFileChange} />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        {attachment ? attachment.name : "PDF, DOC, JPG up to 10MB"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-lavender-600 hover:bg-lavender-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender-500 transition-all duration-300 glow-effect ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    "Send Campaign"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={modalChange}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-slide-up">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-slate-900" id="modal-title">
                                            Emails Sent Successfully
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-slate-500">
                                                Your campaign has been queued and emails are being sent to your recipients.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-lavender-600 text-base font-medium text-white hover:bg-lavender-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300"
                                    onClick={modalChange}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}