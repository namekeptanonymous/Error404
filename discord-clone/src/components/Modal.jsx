import React, { useEffect } from 'react';

const Modal = ({ children, isOpen, close }) => {
    if (!isOpen) return null;

    // Close modal on Escape key press
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                close();
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [close]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close modal when backdrop is clicked
    const handleBackdropClick = (event) => {
        if (event.target.id === 'modalBackdrop') {
            close();
        }
    };

    return (
        <div id="modalBackdrop" className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center" onClick={handleBackdropClick}>
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

            <div className="modal-content bg-white p-6 rounded shadow-lg z-50 overflow-auto">
                {children}
                <button onClick={close}>Close</button>
            </div>

            {/* Modal styles */}
            <style jsx>{`
                .modal {
                    transition: opacity 0.25s ease;
                }
                .modal-content {
                    transition: transform 0.3s ease;
                }
                /* When isOpen is true */
                .modal {
                    opacity: 1;
                    visibility: visible;
                }
                .modal-content {
                    transform: translateY(0);
                }
                /* When isOpen is false */
                .modal {
                    opacity: 0;
                    visibility: hidden;
                }
                .modal-content {
                    transform: translateY(-50px);
                }
            `}</style>
        </div>
    );
};

export default Modal;
