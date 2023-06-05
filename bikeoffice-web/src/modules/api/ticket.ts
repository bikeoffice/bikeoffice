export const fetchProducts = async () => {
    return fetch('/api/products?filter={}&sort=["id","ASC"]')
        .then(response => response.json())
        .then(data => data.filter((p: any) => p.stock > 0))
        .catch(error => error);
};

export const filterProducts = async (name: string, category: string | undefined) => {
    return fetch('/api/products?filter={}&sort=["id","ASC"]')
        .then(response => response.json())
        .then(data => data.filter((p: any) => p.stock > 0).filter((p: any) => (name !== '' ? p.name.includes(name) : true) && (category ? p.categoryId == category : true)))
}

export const ticketAPI = {} as any;

ticketAPI.get = async (id: any = "") => {
    return fetch(`/api/ticket/${id}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => error);
}

ticketAPI.post = async (body: any, id: any | undefined) => {
    const path = id ? `/api/ticket/${id}/${body.id}` : `/api/ticket/${body.id}`;
    return fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).catch(error => error);
}

ticketAPI.put = async (body: any, id: any | undefined) => {
    const path = id ? `/api/ticket/${id}/${body.id}` : `/api/ticket/${body.id}`;
    return fetch(path, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).catch(error => error);
}

ticketAPI.delete = async (id: any, productId: any) => {
    const path = productId ? `/api/ticket/${id}/${productId}` : `/api/ticket/${id}`;
    return fetch(path, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(error => error);
}


