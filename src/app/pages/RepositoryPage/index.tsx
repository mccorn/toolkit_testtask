import { useQuery } from '@apollo/client'
import './index.css'
import { useLocation } from 'react-router-dom'
import { GET_REPO_INFO } from '../../query/repos'

function RepositoryPage() {
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  
  const { data } = useQuery(GET_REPO_INFO, {
    variables: {
      getId: `${id}`,
    },
  });

  if (!data) return <></>;

  const { name, stargazers, defaultBranchRef, owner, languages, description } = data.node;
  const { url, avatarUrl, login } = owner;

  const committedDate = defaultBranchRef?.target.committedDate;
  const langs = languages?.nodes || [];
  const stars = stargazers?.totalCount;

  return (
    <div className='page repo' data-id={id}>
      <div className='box'>
        <div className='card'>
          <div className='card_main list'>
            <div className='card_header'>
              <h3>{name.toUpperCase()}</h3>
              <h6>
                <>{"\u2606 " + stars}, </>
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
            </div>

            <p>
              {description}
            </p>
          </div>

          <div className='card_add flex'>
            <a href={url}>
              <div className='flex card_header'>
                <img className='avatar' src={avatarUrl} />
                <div>
                  {login}
                </div>
              </div>
            </a>
            <div>
              {!!langs.length &&
                <>
                  <b>langs:</b> {langs.map((node: { name: string }) => node.name || "").join(", ")}
                </>
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RepositoryPage