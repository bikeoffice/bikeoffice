import { useEffect, useState } from "react";

export const TicketHeader = ({ id, date }) => {
	const [info, setInfo] = useState<any>({});

	useEffect(() => {
		setInfo(JSON.parse(localStorage.getItem("info") as string));
	}, []);

	return (
		<>
			<div className="ticket-header">
				<img src={info.logo} alt="Logo" />
				<p>{info.address}</p>
				<p>{info.city}</p>
				<p>CIF: {info.code}</p>
				<p>Tel: {info.tel}</p>
			</div>
			<div className="ticket-subheader">
				<p>Order: #{id}</p>
				<p>{new Date(date).toLocaleString()}</p>
			</div>
		</>
	);
};
