import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import "./Ticket.scss";
import { DynamicInput } from "./DynamicInput";
import { DynamicPrice } from "./DynamicPrice";
import { Barcode } from "./Barcode";
import { fetchInfo } from "../../../api";


export const Ticket = forwardRef((_, ref) => {
    const [info, setInfo] = useState<any>({});
    const [selectedProducts, setSelectedProducts] = useState<Map<number, any>>(new Map<number, any>());
    const [totals, setTotals] = useState<DynamicPrice>({} as DynamicPrice);
    const [cash, _setCash] = useState<any>({total: 0, selected: true});
    const getTotalPrice = useCallback(() => Array.from(selectedProducts).reduce((acc, [_, value]) => acc + (value.price * value.quantity), 0), [selectedProducts]);

    useEffect(() => {
        fetchInfo()
            .then((info: any) => setInfo(info))
            .catch(e => console.error('Error retrieving info:', e));
    }, []);

    useEffect(() => {
        setTotals(oldTotals => new DynamicPrice({...oldTotals, price: getTotalPrice()}));
    }, [selectedProducts, getTotalPrice])

    useImperativeHandle(ref, () => ({
        selectProduct: function(this: any) {
            if (selectedProducts.has(this.id)) {
                selectedProducts.get(this.id).addQuantity();
            } else {
                selectedProducts.set(this.id, new DynamicPrice(this));
            }
            setSelectedProducts(new Map(selectedProducts))
        }
    }));

    const setValue = (id: number, name: string, value: string) => {
        selectedProducts.get(id)[name] = value;
        setSelectedProducts(new Map(selectedProducts))
    }

    const setTotalDiscount = (_: null, name: string, value: string) => {
        setTotals(new DynamicPrice({ price: getTotalPrice(), [name]: parseFloat(value)}));
    }

    const afterQuantity = (id: number, value: string) => {
        if (value === "0" || !value) {
            selectedProducts.delete(id)
            setSelectedProducts(new Map(selectedProducts))
        }
    }

    const setCash = (_: null, __: string, value: string) => {
        _setCash({total: parseFloat(value), selected: true});
    }

    const togglePayment = () => {
        _setCash({total: cash.total, selected: !cash.selected});
    }

    return  (
    <section aria-label="Ticket">
        <div className="ticket-header">
            <img src={info.logo} alt="Logo" />
            <p>{info.address}</p>
            <p>{info.city}</p>
            <p>CIF: {info.code}</p>
            <p>Tel: {info.tel}</p>
        </div>
        <div className="ticket-subheader">
            <p>Order: #000</p>
            <p>{new Date().toJSON().slice(0,16).replace("T", " ").replace(/-/g, "/")}</p>
        </div>
        <div className="ticket-separator"></div>
        <div className="ticket-body-header">
            <span>CANT</span>
            <span>DESCRIPCION</span>
            <span>PRECIO</span>
        </div>
        <div className="ticket-separator"></div>
        <ul className="ticket-body">
            {Array.from(selectedProducts).map(([key, value]) => (
                <li key={key} id={key.toString()}>
                    <DynamicInput name="quantity" id={key} value={value.quantity} setValue={setValue} afterChange={afterQuantity} minWidth={40} maxValue={999}/>
                    <span>{value.name}</span>
                    <DynamicInput name="discount" id={key} value={value.discount} setValue={setValue} maxValue={100} growth={7.5} />
                    <DynamicInput name="price" id={key} value={value.price} setValue={setValue} growth={7} />
                </li>
            ))}
        </ul>
        <div className="ticket-separator dashed"></div>
        <div className="ticket-body-total">
            <div className="iva">
                <span>I.V.A. 22%</span>
                <span>({(totals.price - totals.priceNoTax).toFixed(2)})</span>
                <span>{totals.priceNoTax}€</span>
            </div>
            <div id="total">
                <span>TOTAL:</span>
                <DynamicInput id="total" name="discount" value={totals?.discount} setValue={setTotalDiscount} growth={7} maxValue={100} />
                <span>{totals.price}€</span>
            </div>
        </div>
        <div className="ticket-separator dashed"></div>
        <div className="ticket-footer-head">
        {((cash.selected) && <>
            <div id="type">
                <span><span className="toggle" onClick={togglePayment}>EFECTIVO</span>:</span>
                <DynamicInput name="cash" id="type" value={cash.total} setValue={setCash} growth={7} />
            </div>
            <div className="change">
                <span>CAMBIO EFECTIVO:</span>
                <span>{cash.total - totals.price > 0 ? parseFloat((cash.total - totals.price).toFixed(2)) : 0}€</span>
            </div>
        </>) ||
            <div id="type">
                <span><span className="toggle" onClick={togglePayment}>TARGETA</span>:</span>
                <span>{totals.price}€</span>
            </div>
        }
        </div>
        <div className="ticket-footer-body">
            <div>Gracias por su compra</div>
            <span>{info.website}</span>
            <Barcode text="000" width={265} height={110}/>
        </div>
    </section>
    )
}
)
