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
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }, [isOpen]);

    if (!isOpen) return null;

    const modalStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark overlay for contrast
    };

    const modalContentStyle = {
        position: 'relative',
        backgroundColor: '#36393F', // Discord dark theme background color
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.2)',
        zIndex: 50,
        overflow: 'auto',
        color: 'white', // Text color
    };

    const closeButtonStyle = {
        marginTop: '20px',
        backgroundColor: '#5865F2', // Discord blue for buttons
        color: 'white',
        fontWeight: 'bold',
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    };

    return (
        <div id="modalBackdrop" style={modalStyle} onClick={handleBackdropClick}>
            <div style={overlayStyle}></div>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                {children}
                <button style={closeButtonStyle} onClick={close}>
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
