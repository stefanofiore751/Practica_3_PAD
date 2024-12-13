const API_URL = "https://www.googleapis.com/books/v1/volumes";

export async function fetchBooks(query) {
    const response = await fetch(`${API_URL}?q=${query}`);
    if (!response.ok) {
        throw new Error("Error fetching books");
    }
    const data = await response.json();
    return data.items || [];
}