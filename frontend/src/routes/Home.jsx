import Header from "../components/Header";
import Carousel from "../components/Carousel/Carousel";
import axios from "../axios-config";

import { useState, useEffect } from "react";

import "./Home.css";

const Home = () => {
 // const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("users/books/66a3f31891ae8751357cda7f");

      const categorizedBooks = res.data.reduce((acc, book) => {
        book.bookId.categories.forEach((category) => {
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(book);
        });
        return acc;
      }, {});

      setCategories(categorizedBooks);
    };

    getBooks();
  }, []);

  return (
    <>
      <Header />
      <div id="home">
        <h1 className="bem-vindo">
          Bem vindo(a), <span>Usuário</span>
        </h1>
        <Carousel />

        {console.log(categories)}
      </div>
    </>
  );
};

export default Home;
