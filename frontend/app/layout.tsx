import "@/styles/globals.css";

interface IRootLayoutProps {
	children: React.ReactNode;
}

import Providers from "@/app/providers";

export default function RootLayout(props: IRootLayoutProps) {
	const { children } = props;

	return (
		<html lang="en">
			<head>
				<title>Co:Helm Dashboard</title>
			</head>
			<body>
				<Providers>
					{children}
				</Providers>
				<div id="modal" />
			</body>
		</html>
	)
}