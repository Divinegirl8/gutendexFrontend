import style from "./index.module.css";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import pix from "../../../assests/navbarImg/fav.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const Search = () => {
    const params = useParams();
    const liberianId = params.liberianId;
    const [title, setTitle] = useState("");
    const [books, setBooks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const[isSideBarOpen, setSideBarOpen] = useState(false);
    const [readingList,setReadingList] = useState([]);
    const[errorReadingList, setErrorReadingList] = useState("");

    const handleReadingList = async () =>{

        try {

        const response = await fetch("http://localhost:9491/api/v1/readingList",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }   ,
            body: JSON.stringify({id:liberianId})
        })

        if (response.ok){
            const data = await response.json();
            setReadingList(data.books);
            setErrorReadingList("");

        }
        else {
            const errorData = await response.json();
            setReadingList([]);
            setErrorReadingList(errorData.error)
        }
        }catch (error){
             setErrorReadingList("network failed")

    }
    }


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
                console.log(errorData.error)
                setBooks([]);
                setErrorMessage(errorData.error);
            }
        } catch (error) {
            console.error("Error occurred while fetching data:", error);
            setErrorMessage("Book not found");
        }
    };
    const handleNavigateToFormat = (formatURL) => {
        window.open(formatURL, "_blank");
    };

    const toggleSidebar = async () => {
        setSideBarOpen(!isSideBarOpen);
        if (!isSideBarOpen) {
            try {
                await handleReadingList();
            } catch (error) {
                console.error("Error while fetching reading list:", error);
            }
        }
    }

    const closeSidebar = () => {
        setSideBarOpen(false);
    };

    return (
        <>
            <nav className={style.nav}>
                <img src={pix} alt={"nav-icon"} style={{ marginLeft: "30px" }} />
                <div className={style.lnk}>
                    <button className={style.read} onClick={toggleSidebar}>Reading list</button>
                    <Link to={"/signUp"}>
                        <button className={style.reg}>Register</button>
                    </Link>
                </div>
            </nav>
            {isSideBarOpen && (
                <div className={`${style.sidebar} ${isSideBarOpen ? style.sidebarOpen : ''}`}>
                    <div className={style.cancel} style={{ backgroundColor:"white",position: 'sticky', top: 0, zIndex: 1, display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <h3 style={{ fontSize: "20px", marginLeft: "40px", fontFamily: "DejaVu Sans, sans-serif" }}>Reading List</h3>
                        <FontAwesomeIcon onClick={closeSidebar} icon={faTimes} style={{ marginTop: "18px", fontSize: "22px", marginRight: "20px",cursor:"pointer" }} />
                    </div>

                    <div style={{marginTop:'20px',marginLeft:"41px"}}>
                        {errorReadingList && <span >{errorReadingList}</span>}
                    </div>


                    <ul style={{ listStyleType: "none", marginTop: "40px" }}>
                        {readingList.map((book) => (
                            <div className={style.container} key={book.bookId}>
                                <li><span style={{ fontSize: "18px", fontWeight: "800" }}>Title: </span> {book.title}</li>
                                <li><span style={{ fontSize: "18px", fontWeight: "800" }}>Author: </span> : {book.author.join(", ")}</li>
                                <li><span style={{ fontSize: "18px", fontWeight: "800" }}>Subjects: </span> {book.subjects}</li>
                                <li><span style={{ fontSize: "18px", fontWeight: "800" }}>Bookshelves: </span>{book.bookshelves}</li>
                                <li><span style={{ fontSize: "18px", fontWeight: "800" }}>Languages: </span> {book.languages}</li>
                                <button onClick={() => handleNavigateToFormat(book.formats[0])} style={{
                                    marginLeft: "450px",
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "130px",
                                    height: "35px",
                                    borderRadius: "5px",
                                    border: "none",
                                    fontSize: "18px",
                                    cursor: "pointer"
                                }}>Read</button>
                            </div>
                        ))}
                    </ul>
                </div>
            )}

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

                            <button onClick={() => handleNavigateToFormat(book.formats[0])} style={{ marginLeft: "450px", backgroundColor: "black", color: "white", width: "130px", height: "35px", borderRadius: "5px", border: "none", fontSize: "18px", cursor: "pointer" }}>Read</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Search;

