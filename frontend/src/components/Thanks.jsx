import './Thanks.css'

const Thanks = ({data}) => {
  return (
    <div className="thanks">
      <h1>Deseja salvar o livro?</h1>
      <div className="thumbnail">
        <img src={data.thumbnail} alt="" />
      </div>
    </div>
  )
}

export default Thanks