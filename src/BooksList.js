const BooksList = ({ books }) => {
    const handleCategorize = (book, category) => {
        const savedCategories = JSON.parse(localStorage.getItem("categorizedBooks")) || {};
        const updatedCategories = {
            ...savedCategories,
            [category]: [...(savedCategories[category] || []), book],
        };

        localStorage.setItem("categorizedBooks", JSON.stringify(updatedCategories));
        alert(`Libro categorizado en ${category}`);
    };

    const categories = ["Aventuras", "Ciencia Ficción", "Histórica", "Novela Negra", "Romántica", "Terror", "Tecnología"];

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {books.map((book) => (
                <div key={book.id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
                    <h3>{book.volumeInfo.title}</h3>
                    <p>{book.volumeInfo.authors?.join(", ")}</p>
                    {book.volumeInfo.imageLinks?.thumbnail && (
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                    )}
                    <div>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategorize(book, category)}
                                style={{ margin: "5px", padding: "5px", fontSize: "12px" }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BooksList;