import { useEffect, useState } from "react";
import { Barcode } from "../../Barcode";

export const TicketFooter = ({ id }) => {
	const [info, setInfo] = useState<any>({});

	useEffect(() => {
		setInfo(JSON.parse(localStorage.getItem("info") as string));
	}, []);

	return (
		<div className="ticket-footer-body">
			<div>Gracias por su compra</div>
			<span>{info.website}</span>
			<Barcode text={id} width={265} height={110} />
		</div>
	);
};
