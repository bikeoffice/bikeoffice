import { useEffect, useState } from "react";
import "./ProductList.scss";
import { SearchProductsBar } from "./SearchProductsBar";
import { fetchProducts } from "../../api/ticket";

export const ProductList = ({ selectProduct }) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts().then(fetchedProducts => {
			setProducts(fetchedProducts);
		});
	}, []);

	return (
		<section aria-label="Product List">
			<SearchProductsBar setProducts={setProducts} />
			<article style={{ overflowY: "scroll" }}>
				<ul>
					{products.map((product: any) => (
						<li key={product.id} onClick={() => selectProduct(product)}>
							{product.name}
						</li>
					))}
				</ul>
			</article>
		</section>
	);
};

export default ProductList;
