import Header from "../components/Header";
import Carousel from "../components/Carousel/Carousel";
import axios from "../axios-config";

import CategorySection from "../components/CategorySection/CategorySection";
import Card from "../components/Card/Card";

import { useState, useEffect } from "react";

import "./Home.css";

const Home = () => {
  // const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("users/books/66a3f31891ae8751357cda7f");

        const categorizedBooks = res.data.reduce((accumulator, book) => {
          book.bookId.categories.forEach((category) => {
            if (!accumulator[category]) {
              accumulator[category] = [];
            }
            accumulator[category].push(book);
          });
          return accumulator;
        }, {});

        setCategories(categorizedBooks);
      } catch (error) {
        console.log(error);
      }
    };

    getBooks();
  }, []);

  const categoryKeys = Object.keys(categories);

  return (
    <>
      <Header />
      <div id="home">
        <h1 className="bem-vindo">
          Bem vindo(a), <span>Usuário</span>
        </h1>
        <Carousel />
        {console.log(categories)}
        {categoryKeys.length > 0 &&
          categoryKeys.map((category) => (
            <CategorySection
              key={category}
              category={category}
              books={categories[category]}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
