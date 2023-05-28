
export const fetchProducts = async () => {
    return fetch('/api/products?filter={}&range=[0,9]&sort=["id","ASC"]')
        .then(response => response.json())
        .then(data => data)
        .catch(error => error);
};

export const filterProducts = async (name: string, category: string | undefined) => {
    return fetch('/api/products?filter={}&range=[0,9]&sort=["id","ASC"]')
        .then(response => response.json())
        .then(data => data.filter((p: any) => (name !== '' ? p.name.includes(name) : true) && (category ? p.category === category : true)))
}

export const fetchInfo = async () => {
    return fetch('/api/info')
        .then(response => response.json())
        .then(data => data)
        .catch(error => error);
};
