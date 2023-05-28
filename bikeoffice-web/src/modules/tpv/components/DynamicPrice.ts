export class DynamicPrice {
    iva: number;
    quantity: number;
    name: string;
    discount: number;
    #price: number;

    constructor(p) {
        this.iva = p.iva ?? 22;
        this.quantity = p.quantity ?? 1;
        this.name = p.name ?? '';
        this.discount = p.discount ?? 0;
        this.#price = p.price ?? 0;
    }

    get priceNoTax() {
        return parseFloat(((this.#price / (1 + this.iva / 100)) * (1 - this.discount / 100)).toFixed(2));
    }

    addQuantity() {
        this.quantity++;
    }

    get price() {
        const priceNoTax = (this.#price / (1 + this.iva / 100)) * (1 - this.discount / 100);
        return parseFloat((priceNoTax + (priceNoTax * (this.iva / 100))).toFixed(2));
    }

    set price(value) {
        this.#price = value
    }
}
