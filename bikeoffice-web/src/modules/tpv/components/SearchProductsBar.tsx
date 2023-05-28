import { useGetList } from "react-admin";
import { filterProducts } from "../../../api"

export const SearchProductsBar = ({ setProducts }) => {
    const { data } = useGetList('categories');

    const searchProducts = () => {
        filterProducts(document.querySelector('.searchbar input')?.value,
                       document.querySelector('aside[aria-label="Categories"] .selected')?.dataset.category)
        .then((ps: any) => setProducts(ps))
    }

    const selectCategory = (e: any) => {
        document.querySelector('aside[aria-label="Categories"] .selected')?.classList.remove('selected')
        e.target.classList.add('selected')
        searchProducts()
    }

    return (
        <>
            <div>
                <div className="fill"></div>
                <div className="searchbar">
                    <input onInput={searchProducts}
                        type="text" placeholder="Search..." />
                </div>
                <div className="fill"></div>
            </div>
            <aside aria-label="Categories">
                <ul>
                    {data?.map((c: any) => (
                        <li onClick={selectCategory} key={c.id} data-category={c.id}>{c.name}</li>
                    ))}
                </ul>
            </aside>
        </>
    )
}
