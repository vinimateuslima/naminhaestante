import Header from "../components/Header";
import Carousel from "../components/Carousel/Carousel";
import axios from "../axios-config";

import CategorySection from "../components/CategorySection/CategorySection";
import Card from "../components/Card/Card";

import { useState, useEffect } from "react";

import "./Home.css";
import { useUser } from "../Context/UserContext";

const Home = () => {
  // const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user, loading } = useUser();

  useEffect(() => {
    // Verifica se o usuário está carregando ou é nulo
    if (loading || !user) {
      return; // Sai da função se o usuário ainda está sendo carregado ou não existe
    }

    console.log(user);

    const getBooks = async () => {
      try {
        const res = await axios.get(`users/books/${user.id}`);

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
  }, [user]);

  const categoryKeys = Object.keys(categories);

  if (loading) {
    return <div>Carregando...</div>; // Feedback visual enquanto carrega
  }

  return (
    <>
      <Header />
      <div id="home">
        <h1 className="bem-vindo">
          Bem vindo(a), <span>{user.username}</span>
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
