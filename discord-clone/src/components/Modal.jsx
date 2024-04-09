import React, { useEffect } from 'react';

const Modal = ({ children, isOpen, close }) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                close();
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => window.removeEventListener('keydown', handleEscape);
    }, [close]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            id="modalBackdrop"
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={handleBackdropClick}
        >
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div
                className="relative bg-white p-6 rounded shadow-lg z-50 overflow-auto"
                onClick={(e) => e.stopPropagation()} // Prevent click through
            >
                {children}
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={close}
                >
                    Close
                </button>
            </div>
        </div>
    );

    function handleBackdropClick(event) {
        if (event.currentTarget === event.target) {
            close();
        }
    }
};

export default Modal;
