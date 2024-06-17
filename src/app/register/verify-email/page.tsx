import { MailOpen } from "lucide-react";

const page = () => {
    return (
        <section className="flex justify-center p-4 gap-4 items-center h-[50vh] flex-col mt-12">
            <h1 className="text-4xl flex flex-wrap font-bold items-center gap-3">
                <MailOpen />
                Verify your Email
            </h1>
            <span className=" text-center mt-4 font-medium text-lg">Check your inbox (and spam folder)! to verify your email address and activate your account</span>
        </section>
    );
};

export default page;
