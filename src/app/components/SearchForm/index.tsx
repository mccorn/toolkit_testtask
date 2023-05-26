import './index.css'


function SearchForm(props) {
  const {onChange, value = ''} = props;

  return (
    <form>
      <input onChange={onChange} value={value}></input>
      <button>search</button>
    </form>
  )
}

export default SearchForm