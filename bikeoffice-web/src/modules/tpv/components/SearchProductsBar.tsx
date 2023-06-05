import { useEffect, useState } from "react";
import { useGetList } from "react-admin";
import { filterProducts } from "../../api/ticket";

export const SearchProductsBar = ({ setProducts }) => {
    const { data } = useGetList("categories");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        filterProducts(searchTerm, selectedCategory)
            .then(filteredProducts => setProducts(filteredProducts));
    }, [searchTerm, selectedCategory, setProducts]);

    return (
        <>
            <div>
                <div className="fill"></div>
                <div className="searchbar">
                    <input onInput={e => setSearchTerm((e.target as HTMLInputElement).value)}
                        type="text" placeholder="Search..." />
                </div>
                <div className="fill"></div>
            </div>
            <aside aria-label="Categories">
                <ul>
                    {data?.map((category) => (
                        <li key={category.id} className={selectedCategory === category.id ? "selected" : ""}
                            onClick={_ => setSelectedCategory(category.id)} >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
};

