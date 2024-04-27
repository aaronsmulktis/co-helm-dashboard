import { Case, Evidence, Option, Step } from "@/types/case";
import { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { UseQueryResult } from "@tanstack/react-query";
import { FaClock, FaCheck, FaStop, FaCopy } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import cptCodes from "@/utils/cpt-codes";
import { StatusText } from "@/components/shared/loading";
import { Collapsible } from "@/components/shared/collapsible";
import { relativeTime } from "@/utils/time";
import { statusBgColor, statusTextColor } from "@/utils/colors";

interface CaseDetailsProps {
  caseData?: Case;
  caseLoading: boolean;
  caseError: UseQueryResult["isError"];
}

export default function CaseDetails({ caseData, caseLoading, caseError }: CaseDetailsProps) {
  const [statusBackgroundColor, setStatusBackgroundColor] = useState<string>("bg-gray-100");
  const [statusTextColor, setStatusTextColor] = useState<string>("text-gray-500");

  const renderCptCodes = (codes: string[] | undefined) => {
    return codes?.map((cptCode: string, index: number) => (
      <div key={index} className="flex flex-row gap-2 mt-5 ml-2">
        <button
          key={index}
          className="ctp-link px-4 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full mr-2 mb-2"
          data-tooltip-id={`cpt-code-${index}`}
          data-tooltip-content={cptCodes[cptCode]}
          data-tooltip-place="top"
        >
          {cptCode}
        </button>
        <Tooltip
          key={index}
          place="top"
          events={['click']}
          anchorSelect=".ctp-link"
          className="py-6 px-2 bg-gray-800 text-white font-semibold"
          style={{ width: "280px", padding: "8px 10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"}}
          // id={`cpt-code-${index}`}
        />
      </div>
    ));
  }

  const renderEvidence = (evidence: Evidence[]) => {
    return evidence.map((evidence: Evidence, index: number) => {
      const angle = Math.floor(Math.random() * 3) + 1;
      return (
        <div className={`bg-white rounded-md shadow p-4 mb-4 rotate-${angle}`} key={index}>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Page: {evidence.page_number}</p>
            <button
              className="relative p-1 rounded-sm bg-gray-200 hover:bg-gray-300 focus:outline-none"
              onClick={() => {navigator.clipboard.writeText(evidence.content).then(() => toast.success("Copied to clipboard!"))}}
            >
              <FaCopy className="text-gray-500" />
            </button>
          </div>
          <p className="text-sm text-gray-500">File: {evidence.pdf_name}</p>
          <p className="text-gray-700 py-2">{evidence.content}</p>
          <p className="text-sm text-gray-500 italic">{moment(evidence.event_datetime).format("MMM DD, yyyy") || 'N/A'}</p>
        </div>
      )
    });
  };

  useEffect(() => {
    const bgColor = statusBgColor(caseData?.status as string);
    const textColor = statusTextColor(caseData?.status as string);

    setStatusBackgroundColor(bgColor);
    setStatusTextColor(textColor);
  }, [caseData?.status]);

  if (caseLoading) return (
		<div className="bg-green-300 min-h-screen flex flex-col py-12 sm:px-6 lg:px-8" style={{ backgroundImage: "url(https://www.toptal.com/designers/subtlepatterns/uploads/rockywall.png)", backgroundRepeat: "repeat", backgroundBlendMode: "overlay", backgroundAttachment: "fixed"}}>
			<div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <div className="container mx-auto w-auto rounded-lg overflow-hidden shadow-lg p-10 bg-white flex justify-center">
          <StatusText defaultText="Loading case data..." successText="Great! One sec..." status={caseLoading} />
        </div>
			</div>
		</div>
	)
	
	if (caseError) return (
		<div className="bg-green-300 min-h-screen flex flex-col py-12 sm:px-6 lg:px-8" style={{ backgroundImage: "url(https://www.toptal.com/designers/subtlepatterns/uploads/rockywall.png)", backgroundRepeat: "repeat", backgroundBlendMode: "overlay", backgroundAttachment: "fixed"}}>
			<div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <p>Uh Oh!</p>
			</div>
		</div>
	)

  return (
    <div className="container mx-auto rounded-lg overflow-hidden shadow-lg p-10 bg-white">
      
      <h1 className="text-2xl font-bold mb-2">{caseData?.procedure_name}</h1>
      
      <div className="grid grid-cols-3 gap-4 w-full mb-4">
        <div className={`flex flex-row rounded-lg p-4 bg-gray-100 justify-center items-center shadow border-2`}>
          <FaClock className="text-4xl text-gray-300 text-shadow mt-1 -ml-2 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Created</h3>
            <p>{relativeTime(caseData?.created_at)} ago</p>
          </div>
        </div>
        <div className={`flex flex-row rounded-lg p-4 ${statusBackgroundColor} justify-center items-center shadow border-2`}>
          <FaCheck className="text-4xl text-green-500 text-shadow mt-1 -ml-2 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Status</h3>
            <p>{caseData?.status}</p>
          </div>
        </div>
        <div className={`flex flex-row rounded-lg p-4 ${caseData?.is_met ? 'bg-green-100' : 'bg-red-100'} justify-center items-center shadow border-2`}>
          {caseData?.is_met ? (
            <FaCheck className="text-4xl text-green-500 text-shadow mt-1 -ml-2 mr-4" />
          ) : (
            <FaStop className="text-4xl text-red-500 text-shadow mt-1 -ml-2 mr-4" />
          )}
          <div>
            <h3 className="text-lg font-semibold">Decision</h3>
            <p>{caseData?.is_met ? "Likely covered" : "Not covered"}</p>
          </div>
        </div>
      </div>
      
      <Collapsible key="summary" title="Show Decision" hasBorder>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Summary</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{caseData?.summary}</p>
        </div>
      </Collapsible>
      
      <div className="flex flex-row gap-2">
        <h1 className="text-2xl font-bold mt-4">CPT Codes</h1>
        {renderCptCodes(caseData?.cpt_codes)}
      </div>

      <div>
        <h1 className="text-2xl font-bold mt-4">Patient Questions</h1>
        {caseData?.steps.map((step: Step) => (
          <Collapsible key={step.key} title={step.question} hasBorder>
            <div>
              <h3 className="text-lg font-semibold">Selected Options:</h3>
              <ul className="list-disc">
                {step.options.map((option: Option) => (
                  <li key={option.key} className="flex items-center border px-4 py-4">
                  <label htmlFor={option.key} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id={option.key}
                      name={option.key}
                      checked={option.selected}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <div className={`w-6 h-6 flex justify-center items-center mr-2 rounded-full border-2 transition-colors duration-300 focus:ring-2 focus:ring-kelp-300 ${option.selected ? 'border-kelp-500 bg-kelp-500 hover:bg-kelp-600' : 'border-gray-400 hover:border-gray-500'}`}>
                      {option.selected && <FaCheck className="text-white text-sm" />}
                    </div>
                    <span className="ml-2">{option.text}</span>
                  </label>
              </li>
                ))}
              </ul>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Section {step.decision} was chosen because:</h3>
                <p style={{ whiteSpace: 'pre-wrap' }}>{step.reasoning}</p>
              </div>
              <div className="mt-4">
                <Collapsible key={step.key} title="Evidence">
                  {renderEvidence(step.evidence)}
                </Collapsible>
              </div>
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}