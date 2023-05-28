import { useEffect, useRef } from "react"
import { ProductList } from "./components/ProductList"
import { Ticket } from "./components/Ticket"

export const TPVPage = () => {
    useEffect(() => {
        document.querySelector(".MuiDrawer-root")?.setAttribute("style", "display: none")
        return () => document.querySelector(".MuiDrawer-root")?.setAttribute("style", "display: block")
    }, [])

    const ref = useRef();
    const selectProduct = function(this: any) {
        (ref.current as any).selectProduct.call(this);
    }

    return (
        <span style={{ display: "flex" }}>
            <ProductList selectProduct={selectProduct} />
            <Ticket ref={ref} />
        </span>
    )
}
