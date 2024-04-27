"use client";
import { useState, useEffect } from "react";
import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useDashboard } from "@/context/dashboard-context";
import { createCase } from "@/lib/case-client";
import { MutationKeys } from "@/types/mutation-keys";
import Header from "@/components/shared/header";

export const revalidate = 0;

export default function DashboardRoot() {
	const queryClient = useQueryClient();

	const { medicalRecord, guidelinesFile } = useDashboard();
	const router = useRouter();
	// const CASE_ID = "case_891a_6fbl_87d1_4326";
	const CASE_ID = process.env.NEXT_PUBLIC_TEST_CASE_ID;
	const isDisabled = medicalRecord === null || guidelinesFile === null;

	const [animationClass, setAnimationClass] = useState("");

	useEffect(() => {
		if (isDisabled) {
			setAnimationClass("fade-out");
		} else {
			setAnimationClass("fade-in");
		}
	}, [isDisabled]);

	const { mutate, isPending, error } = useMutation({
		mutationKey: [MutationKeys.CREATE_CASE],
		mutationFn: createCase,
		onSuccess: (data) => {
				console.log(data);
				queryClient.invalidateQueries();
		},
		onError: (error) => {
				console.error("Failed to create case:", error);
		}
	});

	const handleContinue = async () => {
		// fetch(`${API_URL}/cases`, {
		// 	method: "POST"
		// });
		mutate();
		router.push(`/dashboard/case/${CASE_ID}`);
	};

	return (
		<div className="bg-green-300 min-h-screen flex flex-col py-12 sm:px-6 lg:px-8" style={{ backgroundImage: "url(https://www.toptal.com/designers/subtlepatterns/uploads/rockywall.png)", backgroundRepeat: "repeat", backgroundBlendMode: "overlay", backgroundAttachment: "fixed"}}>
			<div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Header />
				<div className="container mx-auto p-8 rounded-lg overflow-hidden shadow-lg p-10 bg-white">
					<div className="w-full flex flex-row gap-2 items-center">
						<MedicalRecordUpload />
						<GuidelinesUpload />
					</div>
					<div className="w-full py-4 flex flex-row justify-center">
						<button
							disabled={(medicalRecord === null || guidelinesFile === null) ? true : false}
							// className="animate-fade-in disabled bg-green-600 font-medium text-white py-2 px-4 rounded disabled:bg-slate-100 disabled:text-slate-200 disabled:border-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
							className={`${animationClass} disabled bg-green-600 font-medium text-white py-2 px-4 rounded disabled:bg-slate-100 disabled:text-slate-200 disabled:border-slate-300 disabled:shadow-none disabled:cursor-not-allowed`}
							onClick={handleContinue}
						>
							Continue
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
