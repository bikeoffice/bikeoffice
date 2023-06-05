export class DynamicPrice {
    id: number;
    iva: any;
    quantity: number;
    name: string;
    discount: number;
    _price: number;

    constructor(p) {
        console.log(p);
        this.id = p.id ?? null;
        this.iva = p.iva;
        this.quantity = p.quantity ?? 1;
        this.name = p.name ?? '';
        this.discount = p.discount ?? 0;
        this._price = p.price ?? 0;
    }

    get priceNoTax() {
        return parseFloat(((this._price / (1 + this.iva / 100)) * (1 - this.discount / 100)).toFixed(2));
    }

    addQuantity() {
        this.quantity++;
    }

    get price() {
        const priceNoTax = (this._price / (1 + this.iva / 100)) * (1 - this.discount / 100);
        return parseFloat((priceNoTax + (priceNoTax * (this.iva / 100))).toFixed(2));
    }

    set price(value) {
        this._price = value
    }
}
