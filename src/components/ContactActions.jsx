import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import EnquiryModal from "./EnquiryModal";

function ContactActions({
    title,
    category,
    whatsappNumber = "917300526177",
}) {
    const [open, setOpen] = useState(false);

    const whatsappMessage = encodeURIComponent(
        `Hello,

        I am interested in ${title} (${category}).

        Please share more details.

        Thank you.`
    );

    return (
        <>
            <div className="flex gap-3 mt-5">
                <button
                    onClick={() => setOpen(true)}
                    className="flex-1 bg-black text-white py-3 rounded-full font-semibold"
                >
                    ENQUIRY NOW
                </button>

                <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl"
                >
                    <FaWhatsapp />
                </a>
            </div>

            {open && (
                <EnquiryModal
                    title={title}
                    whatsappNumber={whatsappNumber}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
}

export default ContactActions;