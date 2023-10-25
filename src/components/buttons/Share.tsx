"use client"
declare global {
    interface Window {
        androidShare?: (title: string, text: string, url: string) => void;
    }
}

import { Share2 } from 'lucide-react';
import React from 'react';

/**
 * Renders a share button that allows the user to share the current page using the Web Share API or Android Share API.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the page to be shared.
 * @param {string} props.text - The text to be shared.
 * @returns {JSX.Element} - The rendered Share button.
 */
const Share = ({ title }: { title: string }): JSX.Element => {
    const handleShareClick = async () => {
        const shareData = {
            title: title,
            text: `Hey, I'm Watching ${title} on AnimeTrix, you would like it too! Watch it for FREE on AnimeTrix now!`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else if (window.androidShare) {
                window.androidShare(shareData.title, shareData.text, shareData.url);
            } else {
                alert('Sharing is not supported on this device.');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button onClick={handleShareClick} className="dark:bg-white bg-black p-2 rounded-lg font-semibold dark:text-black text-white flex items-center gap-3">
            <Share2 />
            Share
        </button>
    );
};

export default Share;
