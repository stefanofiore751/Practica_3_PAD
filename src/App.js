import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import BooksList from "./BooksList";
import { fetchBooks } from "./GoogleBooksAPI";
import CategorizedBooks from "./CategorizedBooks";

const App = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const LOCAL_STORAGE_KEY = "lastSearchedBooks";

    useEffect(() => {
        // Recuperar libros desde localStorage al iniciar la app
        const savedBooks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (savedBooks) {
            setBooks(savedBooks);
        }
    }, []);

    const handleSearch = async (query) => {
        setLoading(true);
        setError("");
        try {
            const results = await fetchBooks(query);
            const updatedBooks = [...results.slice(0, 5)]; // Solo guardar 5 libros

            // Actualizar libros y localStorage
            setBooks(updatedBooks);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBooks));
        } catch (e) {
            setError("Error al buscar libros. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Buscador de Libros</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <BooksList books={books} />
            <CategorizedBooks />
        </div>
    );
};

export default App;