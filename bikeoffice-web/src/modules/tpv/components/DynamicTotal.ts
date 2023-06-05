export class DynamicTotal {
    id: number;
    iva: Map<number, number>;
    discount: number;
    _total: number;

    constructor(t) {
        this.id = t.id ?? null;
        this.iva = t.iva;
        this.discount = t.discount ?? 0;
        this._total = t.total ?? 0;
    }

    get total() {
        return parseFloat((this._total * (1 - this.discount / 100)).toFixed(2));
    }

}
