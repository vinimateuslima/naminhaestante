import "./ConfirmBook.css";

const ConfirmBook = ({ data, updateFieldHandler }) => {
  console.log(data);

  return (
    <div className="confirmBook">
      <div className="confirmBook-img">
        <img src={data.thumbnail} alt="" />
      </div>
      <div className="confirmBook-info">
        <h1>{data.title}</h1>
        {data.authors.map((author, index) => (
          <span key={index}>{author}, </span>
        ))}

        <p>{data.categories}</p>
        <div className="description">
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBook;
