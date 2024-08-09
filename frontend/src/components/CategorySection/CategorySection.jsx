import Carousel from "../Carousel/Carousel";

import Card from "../Card/Card";

import './CategorySection.css'

const CategorySection = ({ category, books }) => {
  return (
    <div className="category-section">
      <div className="category"><h2>{category}</h2></div>
      <Carousel>
        {books.map((book) => (
          <Card
            key={book._id}
            id={book._id}
            thumbnail={book.bookId.thumbnail}
            title={book.bookId.title}
            authors={book.bookId.authors}
            rate={book.rating}
            pageCount={book.bookId.pageCount}
            currentPage={book.currentPage}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default CategorySection;
