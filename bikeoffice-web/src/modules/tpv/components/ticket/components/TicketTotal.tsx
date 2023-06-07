import { ticketAPI } from "../../../../api/ticket";
import { DynamicInput } from "../../DynamicInput";
import { DynamicTotal } from "../../DynamicTotal";

export const TicketTotal = ({ totals, setTotals, ticketId, getTotalPrice, getIva }: any) => {
	const setValue = (_: null, name: string, value: string) => {
		setTotals(new DynamicTotal({ total: getTotalPrice(), iva: getIva(), [name]: parseFloat(value) }));
	};

	const afterChange = (_: number, value: string) => {
		ticketAPI.put({ id: ticketId, discount: parseFloat(value) });
	};

	return (
		<div className="ticket-body-total">
			{totals.iva &&
				Array.from(totals.iva as Map<number, number>)?.map(([taxRate, total]) => (
					<div className="iva" key={taxRate}>
						<span>I.V.A. {taxRate}%</span>
						<span>({(total - (total / (1 + taxRate / 100)) * (1 - totals.discount / 100)).toFixed(2)}€)</span>
						<span>{((total / (1 + taxRate / 100)) * (1 - totals.discount / 100)).toFixed(2)}€</span>
					</div>
				))}
			<div id="total">
				<span>TOTAL:</span>
				<DynamicInput id="total" name="discount" value={totals?.discount} setValue={setValue} afterChange={afterChange} growth={7} maxValue={100} />
				<span>{totals.total}€</span>
			</div>
		</div>
	);
};
