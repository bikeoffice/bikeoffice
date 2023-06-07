import { ticketAPI } from "../../../../api/ticket";
import { DynamicInput } from "../../DynamicInput";

export const TicketProductList = ({ selectedProducts, setSelectedProducts, ticketId }: any) => {
	const setValue = (id: number, name: string, value: string) => {
		selectedProducts.get(id)[name] = value;
		setSelectedProducts(new Map(selectedProducts));
	};

	const afterChange = (id: number, _: string) => {
		ticketAPI.put(selectedProducts.get(id), ticketId);
	};

	const afterQuantity = (id: number, value: string) => {
		if (value === "0" || !value) {
			ticketAPI.delete(ticketId, id);
			selectedProducts.delete(id);
			setSelectedProducts(new Map(selectedProducts));
		} else {
			afterChange(id, "");
		}
	};

	return (
		<ul className="ticket-body">
			{selectedProducts &&
				Array.from(selectedProducts as Map<number, any>).map(([key, value]) => (
					<li key={key} id={key.toString()}>
						<DynamicInput name="quantity" id={key} value={value.quantity} setValue={setValue} afterChange={afterQuantity} minWidth={40} maxValue={999} />
						<span>{value.name}</span>
						<DynamicInput name="discount" id={key} value={value.discount} setValue={setValue} afterChange={afterChange} maxValue={100} growth={7.5} />
						<DynamicInput name="price" id={key} value={value.price} setValue={setValue} afterChange={afterChange} growth={7} />
					</li>
				))}
		</ul>
	);
};
