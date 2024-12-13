import React, { useState, useEffect } from "react";

const CategorizedBooks = () => {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const savedCategories = JSON.parse(localStorage.getItem("categorizedBooks")) || {};
        setCategories(savedCategories);
    }, []);

    return (
        <div>
            <h2>Libros Categorizados</h2>
            {Object.keys(categories).map((category) => (
                <div key={category} style={{ marginBottom: "20px" }}>
                    <h3>{category}</h3>
                    <ul>
                        {categories[category].map((book, index) => (
                            <li key={index}>{book.volumeInfo.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default CategorizedBooks;