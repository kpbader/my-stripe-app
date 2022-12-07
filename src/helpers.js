export const isInCart = (product, cartItems) => {
    return cartItems.find(item => item.id === product.id);
}

// when app is deployed, this will be the final url we deploy the server to 
const API = 'http://localhost:8080';

export async function fetchFromAPI(endpoint, opts) {
    const { method, body } = { method: 'POST', body: null, ...opts };

    const res = await fetch(`${API}/${endpoint}`, {
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
          'Content-Type': 'application/json',
        }
    });

    return res.json();
}