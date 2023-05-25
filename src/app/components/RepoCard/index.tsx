import { Link } from 'react-router-dom';
import './index.css'

type RepositoryCardProps = {
  id: string,
  name: string,
  stargazers: { totalCount: number },
  defaultBranchRef: {
    target: { committedDate: Date }
  },
  url: string,
}

function RepoCard(props: {data: RepositoryCardProps}) {
  const { name, stargazers, defaultBranchRef, url, id } = props.data;

  const committedDate = defaultBranchRef?.target.committedDate;
  const stars = stargazers?.totalCount;

  const options = {
    locale: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <div className='page'>
      <div className='box'>
        <div className='card'>
          <div className='card_main'>
            <a href={url} target='_blank'>
              <h3>{name.toUpperCase()}</h3>
            </a>

            <h6>
              {(new Date(committedDate)).toLocaleString('ru-Ru', options)}
            </h6>

            <h6>
              {"\u2606 " + stars}
            </h6>
          </div>

          <div className='card_add'>
            <div className='moreinfo text_align_right'><Link to={"/repo/" + id}>Details {'>>'}</Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepoCard