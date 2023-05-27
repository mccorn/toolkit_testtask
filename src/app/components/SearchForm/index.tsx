import './styles.module.css'


function SearchForm(props: {onChange: (value: string) => void, value: string | undefined}) {
  const {onChange, value = ''} = props;

  const handleChange = (event: { preventDefault: () => void, target: { value: string } }) => {
    const value = event.target.value;
    event.preventDefault();

    onChange(value);
  }

  return (
    <form>
      <input onChange={handleChange} value={value}></input>
      <button>search</button>
    </form>
  )
}

export default SearchForm