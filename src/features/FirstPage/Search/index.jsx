import style from "./index.module.css";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import pix from "../../../assests/navbarImg/fav.svg";

const Search = () => {
    const params = useParams();
    const liberianId = params.liberianId;
    const [title, setTitle] = useState("");
    const [books, setBooks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSearchBook = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:9491/api/v1/searchBook/${liberianId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title }),
            });

            if (response.ok) {
                const data = await response.json();
                setBooks(data.books);
                setErrorMessage("");
            } else {
                const errorData = await response.json();
                setBooks([]);
                setErrorMessage(errorData.error);
            }
        } catch (error) {
            console.error("Error occurred while fetching data:", error);
            setErrorMessage("book not found");
        }
    };

    const handleReadButtonClick = (format) => {
        const bookFormat = books[0].formats[format];
        if (bookFormat) {
            const newTab = window.open(bookFormat, "_blank");
            if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
                // Popup blocked or failed to open
                console.error("Failed to open the link.");
            }
        } else {
            console.error("No link found for the specified format.");
        }
    };


    return (
        <>
            <nav className={style.nav}>
                <img src={pix} alt={"nav-icon"} style={{ marginLeft: "30px" }} />
                <div className={style.lnk}>
                    <button className={style.read}>Reading list</button>
                    <Link to={"/signUp"}>
                        <button className={style.reg}>Register</button>
                    </Link>
                </div>
            </nav>
            <div className={style.mainCon}>
                <div className={style.formCont}>
                    <form onSubmit={handleSearchBook}>
                        <div>
                            <input type="text" placeholder="Enter book name to search" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <button className={style.btn} type="submit">Search</button>
                            {errorMessage && <span className={style.titleError}>{errorMessage}</span>}
                        </div>
                    </form>
                </div>
                <div>
                    {books.map(book => (
                        <div key={book.bookId} style={{ backgroundColor: "white", maxWidth: "600px", padding: "20px", width: '100%', borderRadius: "10px" }}>
                            <p>Title: {book.title}</p>
                            <p>Authors: {book.author.join(", ")}</p>
                            <p>Subjects: {book.subjects}</p>
                            <p>Bookshelves: {book.bookshelves}</p>
                            <p>Languages: {book.languages}</p>
                            <button onClick={() => handleReadButtonClick("text/html")} style={{ marginLeft: "450px", backgroundColor: "black", color: "white", width: "130px", height: "35px", borderRadius: "5px", border: "none", fontSize: "18px", cursor: "pointer" }}>Read</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Search;

