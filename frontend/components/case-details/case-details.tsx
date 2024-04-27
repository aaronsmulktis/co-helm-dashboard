import { Case, Evidence, Option, Step } from "@/types/case";
import moment from "moment";
import { toast } from "react-toastify";
import { UseQueryResult } from "@tanstack/react-query";
import { FaClock, FaCheck, FaStop, FaCopy, FaArrowRight } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import cptCodes from "@/utils/cpt-codes";
import { StatusText } from "@/components/shared/loading";
import { Collapsible } from "@/components/shared/collapsible";
import { relativeTime } from "@/utils/time";

interface CaseDetailsProps {
  caseData?: Case;
  caseLoading: boolean;
  caseError: UseQueryResult["isError"];
}

export default function CaseDetails({ caseData, caseLoading, caseError }: CaseDetailsProps) {

  const renderCptCodes = (codes: string[] | undefined) => {
    return codes?.map((cptCode: string, index: number) => (
      <div key={index} className="flex flex-row gap-2 mt-5 ml-2">
        <button
          key={index}
          className="ctp-link px-4 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full mr-2 mb-2 shadow-sm active:outline-none hover:bg-gray-300 transition-colors duration-300"
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
          style={{ width: "280px", padding: "8px 10px", boxShadow: "0 3px 8px rgba(0, 0, 0, 0.066)"}}
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
            <h3 className="text-lg text-gray-400">Created</h3>
            <p className="text-gray-500 font-semibold">{relativeTime(caseData?.created_at)} ago</p>
          </div>
        </div>

        <div className={`flex flex-row justify-center items-center shadow rounded-lg p-4 ${caseData?.status !== "complete" ? caseData?.status === "processing" ? "bg-yellow-100" : "bg-gray-200" : "bg-kelp-100"} border-2 ${caseData?.status !== "complete" ? caseData?.status === "processing" ? "border-yellow-300" : "border-gray-300" : "border-kelp-300"}`}>
          {caseData?.status === "complete" ? (
            <FaCheck className="text-4xl text-green-500 text-shadow mt-1 -ml-2 mr-4" />
          ) : (
            <FaClock className={`text-4xl ${caseData?.status !== "submitted" ? "text-yellow-400" : "text-gray-400"} text-shadow mt-1 -ml-2 mr-4`} />
          )}
          <div>
            <h3 className={`text-lg ${caseData?.status !== "complete" ? caseData?.status === "processing" ? "text-yellow-400" : "text-gray-400" : "text-kelp-300"} `}>Status</h3>
            <p className={`font-semibold capitalize ${caseData?.status !== "complete" ? caseData?.status === "processing" ? "text-yellow-500" : "text-gray-500" : "text-kelp-300"}`}>{caseData?.status}</p>
          </div>
        </div>
        
        <div className={`flex flex-row rounded-lg p-4 ${caseData?.is_met ? 'bg-green-100' : 'bg-red-100'} justify-center items-center shadow border-2 ${caseData?.is_met ? 'border-kelp-300' : 'border-red-300'}`}>
          {caseData?.is_met ? (
            <FaCheck className="text-4xl text-green-500 text-shadow mt-1 -ml-2 mr-4" />
          ) : (
            <FaStop className="text-4xl text-red-300 text-shadow mt-1 -ml-2 mr-4" />
          )}
          <div>
            <h3 className={`text-lg ${caseData?.is_met ? 'text-green-300' : 'text-red-300'}`}>Decision</h3>
            <p className={`font-semibold capitalize ${caseData?.is_met ? 'text-green-300' : 'text-red-400'}`}>{caseData?.is_met ? "Likely covered" : "Not covered"}</p>
          </div>
        </div>
      </div>
      
      <Collapsible key="summary" title="Show Decision" hasBorder>
        <div className={`flex flex-col gap-4 p-6 mb-2 rounded-lg ${caseData?.is_met ? 'bg-green-50' : 'bg-red-50'} border-4 ${caseData?.is_met ? 'border-green-100' : 'border-red-100'}`}>
          <h3 className="text-lg font-semibold">Summary</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{caseData?.summary?.length ? caseData?.summary : "Processing..."}</p>
        </div>
      </Collapsible>
      
      <div className="flex flex-row gap-2 mb-3">
        <h2 className="text-xl font-bold mt-4">CPT Codes</h2>
        {renderCptCodes(caseData?.cpt_codes)}
      </div>

      <hr />

      <div className="w-full flex flex-row gap-2 my-4">
        <h2 className="text-xl font-bold">Decision Journey</h2>

        <div className="flex flex-row gap-2">
          {caseData?.steps.map((step: Step, index: number) => (
            <div key={index} className="flex flex-row gap-2 mt-1 ml-4">
              <p>{`${step.decision}`}</p>
              {index !== caseData.steps.length - 1 && <FaArrowRight className="text-gray-300 text-xl" />}
            </div>
          ))}
        </div>
      </div>

      <hr />
      
      <div>
        <h2 className="text-xl font-bold mt-4">Patient Questions</h2>
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