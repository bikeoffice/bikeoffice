import { useEffect, useState } from "react";
import "./ProductList.scss";
import { fetchProducts } from "../../../api";
import { SearchProductsBar } from "./SearchProductsBar";

export const ProductList = ({ selectProduct }) => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetchProducts()
            .then((ps: any) => setProducts(ps))
            .catch(e => console.error('Error retrieving products:', e));
    }, []);

    return (
        <section aria-label="Product List">
            <SearchProductsBar setProducts={setProducts}/>
            <article>
                <ul>
                    {products.map((p: any) => (
                        <li key={p.id} onClick={selectProduct.bind(p)}>{p.name}</li>
                    ))}
                </ul>
            </article>
        </section>
    )
}
