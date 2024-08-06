import Carousel from "../Carousel/Carousel"

const CategorySection = ({category, books}) => {
  return (
    <div className="category-section">
      <h2>{category}</h2>
      <Carousel>
      {books.map(book => (
              <div key={book._id}>
                <h3>{book.bookId.title}</h3>
              </div>
            ))}
      </Carousel>
    </div>
  )
}

export default CategorySection