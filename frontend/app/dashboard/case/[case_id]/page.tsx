"use client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QueryKeys } from "@/types/query-keys";
import { getCaseById } from "@/lib/case-client";
import Header from "@/components/shared/header";
import CaseDetails from "@/components/case-details/case-details";
import { Case } from "@/types/case";

export const revalidate = 0;

export default function CaseResult() {
	const case_id = typeof window !== "undefined" ? window.location.pathname.split("/").pop() as string : "";

	const { data: caseData, isLoading, isError }: UseQueryResult = useQuery({
		queryKey: [QueryKeys.CASE_BY_ID, case_id],
		queryFn: () => getCaseById(case_id),
		retry: 3,
		retryDelay: 300,
		staleTime: 3000,
	});

	return (
		// <div className="w-full flex flex-col justify-center items-center h-screen">
		<div className="bg-green-300 min-h-screen flex flex-col py-12 sm:px-6 lg:px-8" style={{ backgroundImage: "url(https://www.toptal.com/designers/subtlepatterns/uploads/rockywall.png)", backgroundRepeat: "repeat", backgroundBlendMode: "overlay", backgroundAttachment: "fixed"}}>
			<div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Header />
				{caseData !== null && (
					<CaseDetails
						caseData={caseData as Case}
						caseLoading={isLoading}
						caseError={isError}
					/>)}
			</div>
		</div>
	)
}
