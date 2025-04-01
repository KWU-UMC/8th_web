import { AlertTriangle } from "lucide-react";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-lime-200 text-3xl font-semibold gap-4">
      <AlertTriangle className="w-16 h-16 text-red-400" />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;