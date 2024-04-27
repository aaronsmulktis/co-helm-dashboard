import { FaCheck, FaSpinner } from "react-icons/fa";

type StatusTextProps = {
  defaultText: string;
  successText: string;
  status: any;
};

export const StatusText = ({ defaultText, successText, status }: StatusTextProps) => {
  return (
    <>
      {status === null && (
        <span key="default" className="transition-opacity duration-500 ease-out opacity-0 animate-fade-in">
          {defaultText}
        </span>
      )}
      {status === true && (
        <span key="loading" className="flex flex-row transition-opacity duration-500 ease-out opacity-0 animate-fade-in">
          <FaSpinner className="animate-spin-slow h-5 w-5" />
          &nbsp;&nbsp;Loading
        </span>
      )}
      {status === false && (
        <span key="success" className="text-green-600 flex flex-row gap-1 items-center transition-opacity duration-500 ease-out opacity-0 animate-fade-in">
          <FaCheck />
          <span>{successText}</span>
        </span>
      )}
    </>
  );
}