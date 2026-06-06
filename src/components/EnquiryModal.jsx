import { useState } from "react";

function EnquiryModal({
    title,
    whatsappNumber,
    onClose
}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dogName: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        const whatsappMessage = `
Hello,

I would like to enquire about:

Listing: ${title}

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Pet Name: ${formData.dogName || "N/A"}

Message:
${formData.message || "Please share more details."}

Thank you.
`;

        const encodedMessage = encodeURIComponent(
            whatsappMessage.trim()
        );

        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
            "_blank"
        );

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#f8f7f4] w-full max-w-xl rounded-3xl border border-stone-300 shadow-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-stone-200 bg-[#f2eee7]">

                    <h2 className="text-xl font-black text-stone-900">
                        Request a Callback
                    </h2>

                    <p className="text-sm text-stone-500 mt-1">
                        Fill in your details and our team will contact you shortly.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-4"
                >
                    <div className="bg-white border border-stone-200 rounded-xl p-3">
                        <p className="text-xs uppercase tracking-wider text-stone-500">
                            Enquiry For
                        </p>

                        <p className="font-semibold text-stone-900 mt-1">
                            {title}
                        </p>
                    </div>
                    <input
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 transition-all"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                        }
                        className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 transition-all"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Your Phone No *"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phone: e.target.value,
                            })
                        }
                        className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 transition-all"
                        required
                    />


                    <input
                        type="text"
                        placeholder="Dog Name"
                        value={formData.dogName}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                dogName: e.target.value,
                            })
                        }
                        className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 transition-all"
                    />

                    <textarea
                        rows="3"
                        placeholder={`Message regarding ${title}`}
                        value={formData.message}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                message: e.target.value,
                            })
                        }
                        className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-4 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 transition-all resize-none"
                    />


                    <div className="flex gap-4 pt-2">
                        <button
                            type="submit"
                            className="bg-stone-900 hover:bg-black text-white px-8 py-3 rounded-2xl font-semibold transition-all"
                        >
                            Send Message
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 px-6 py-3 rounded-2xl font-semibold transition-all"
                        >
                            Close
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default EnquiryModal;