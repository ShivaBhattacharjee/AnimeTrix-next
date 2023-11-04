"use client";

import toast from "react-hot-toast";

const Toast = {
    SuccessshowToast: (message: string) => {
        toast.success(message, {
            style: {
                border: "1px solid #28a745",
                padding: "16px",
                color: "#fff",
                backgroundColor: "#000",
            },
            iconTheme: {
                primary: "#000",
                secondary: "#28a745",
            },
        });
    },

    ErrorShowToast: (message: string) => {
        toast.error(message, {
            style: {
                border: "1px solid #FF0000",
                padding: "16px",
                color: "#fff",
                backgroundColor: "#000",
            },
            iconTheme: {
                primary: "#000",
                secondary: "#FF0000",
            },
        });
    },
};

export default Toast;
