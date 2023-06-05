import { ticketAPI } from "../../../../api/ticket";
import { DynamicInput } from "../../DynamicInput";

export const TicketPayment = ({ cash, setCash, id, totalPrice }: any) => {

    const onCashChange = (_: null, __: string, value: string) => {
        ticketAPI.put({ id, cashAmount: parseFloat(value) });
        setCash({ total: parseFloat(value), selected: true });
    }

    const togglePayment = () => {
        ticketAPI.put({ id, payment: !cash.selected ? "cash" : "card" });
        setCash({ total: cash.total, selected: !cash.selected });
    }

    return (
        <div className="ticket-footer-head">
            {cash.selected ? <>
                <div id="type">
                    <span><span className="toggle" onClick={togglePayment}>EFECTIVO</span>:</span>
                    <DynamicInput name="cash" id="type" value={cash.total} setValue={onCashChange} growth={7} />
                </div>
                <div className="change">
                    <span>CAMBIO EFECTIVO:</span>
                    <span>{cash.total - totalPrice > 0 ? parseFloat((cash.total - totalPrice).toFixed(2)) : 0}€</span>
                </div>
            </> :
                <div id="type">
                    <span><span className="toggle" onClick={togglePayment}>TARGETA</span>:</span>
                    <span>{totalPrice}€</span>
                </div>
            }
        </div>
    )
}
