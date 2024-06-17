"use client";

interface CustomGlobalThis {
    androidShare?: (title: string, text: string, url: string) => void;
}

declare global {
    interface Window {
        androidShare?: (title: string, text: string, url: string) => void;
    }

    const globalThis: CustomGlobalThis;
}

import { Share2 } from "lucide-react";

import Toast from "@/utils/toast";

/**
 * Renders a share button that allows the user to share the current page using the Web Share API or Android Share API.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the page to be shared.
 * @returns {JSX.Element} - The rendered Share button.
 */
const Share = ({ title }: { title: string }): JSX.Element => {
    const handleShareClick = async () => {
        const shareData = {
            title: title,
            text: `Hey, I'm Watching ${title} on AnimeTrix, you would like it too! Watch it for FREE on AnimeTrix now!`,
            url: globalThis.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else if (globalThis.window && globalThis.window.androidShare) {
                globalThis.window.androidShare(shareData.title, shareData.text, shareData.url);
            } else {
                Toast.ErrorShowToast("Your browser does not support sharing.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button onClick={handleShareClick} className="bg-white p-2 rounded-lg font-semibold text-black flex items-center gap-3">
            <Share2 />
            Share
        </button>
    );
};

export default Share;
