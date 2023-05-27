import { Link } from 'react-router-dom';
import './styles.css'

type RepositoryCardProps = {
  id: string,
  name: string,
  stargazers: { totalCount: number },
  defaultBranchRef: {
    target: { committedDate: Date }
  },
  url: string,
}

function RepositoryCard(props: { data: RepositoryCardProps }) {
  const { name, stargazers, defaultBranchRef, url, id } = props.data;

  const committedDate = defaultBranchRef?.target.committedDate;
  const stars = stargazers?.totalCount

  return (
    <div className='card'>
      <div className='card__body'>
        <Link to={"/repo/" + id}>
          <h3>{name.toUpperCase()}</h3>
        </Link>

        <h6>
          {(
            new Date(committedDate)).toLocaleString(
              'ru-Ru',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }
            )}
        </h6>

        <h6>
          {"\u2606 " + stars}
        </h6>
      </div>

      <div className='card__aside'>
        <div className='moreinfo text_align_right'>
          <a href={url} target='_blank'>Link to github {'>>'}</a>
        </div>
      </div>
    </div>
  )
}

export default RepositoryCard