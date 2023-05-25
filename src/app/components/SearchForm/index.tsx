import './index.css'


function SearchForm(props) {
  const {onChange} = props;

  return (
    <form>
      <input onChange={onChange}></input>
      <button>search</button>
    </form>
  )
}

export default SearchForm