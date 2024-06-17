import { Frown } from "lucide-react";

interface ContentNotFoundProps {
    message: string;
}

const ContentNotFound: React.FC<ContentNotFoundProps> = ({ message }) => {
    return (
        <div className="flex capitalize items-center justify-center text-3xl font-semibold gap-3">
            <Frown />
            <h1>No {message} Found</h1>
        </div>
    );
};

export default ContentNotFound;
