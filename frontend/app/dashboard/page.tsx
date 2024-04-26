"use client";
import { ToastContainer } from 'react-toast';
import { useState, useEffect } from "react";
import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/dashboard-context";

export const revalidate = 0;

export default function DashboardRoot() {
	const { medicalRecord, guidelinesFile } = useDashboard();
	const router = useRouter();
	const CASE_ID = "case_891a_6fbl_87d1_4326";
	const isDisabled = medicalRecord === null || guidelinesFile === null;

	const [animationClass, setAnimationClass] = useState("");

	useEffect(() => {
		if (isDisabled) {
			setAnimationClass("fade-out");
		} else {
			setAnimationClass("fade-in");
		}
	}, [isDisabled]);

	const handleContinue = () => {
		router.push(`/dashboard/case/${CASE_ID}`)
	}

	return (
		<div className="w-full flex flex-col justify-center items-center h-screen">
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
			<ToastContainer delay={3000} />
		</div>
	)
}
