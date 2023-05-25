import { useState, useEffect } from "react";
import {useQuery, useLazyQuery} from "@apollo/client";

import {GET_REPOS, GET_REPOS_BY_USER, GET_VIEWER} from "../../query/repos.ts";

import Slider from "../../components/Slider";
import RepoCard from "../../components/RepoCard";
import "./index.css";
import SearchForm from "../../components/SearchForm/index.tsx";

function Home() {
  const lastRequest = sessionStorage.getItem("lastRequest") || "";
  const [requestRepo, setRequestRepo] = useState<string>(lastRequest);
  const [userLogin, setUserLogin] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(0);
  const [repositoriesFull, setRepos] = useState([]);

  const {data: user} = useQuery(GET_VIEWER); 

  const [execute, {data, loading, error}] = useLazyQuery(requestRepo ? GET_REPOS : GET_REPOS_BY_USER, {
    variables: {
      getQuery: `${requestRepo || userLogin}`,
    },
  });

  useEffect(() => {
    if (user) {
      setUserLogin(user.viewer.login);
  
      if (userLogin) execute();

      if (data) setRepos(requestRepo ? data.search.nodes : data.user.repositories.nodes);
    }
  }, [user, data, userLogin])
 
  const nextPage = () => setPageNum(Math.min(pageNum + 1, total - 1))

  const prevPage = () => setPageNum(Math.max(pageNum - 1, 0))

  const setPage = (num: number) => setPageNum(Math.min(total, Math.max(0, num)))

  const handleSubmit = (event: {preventDefault: () => void, target: {value: string}}) => {
    event.preventDefault();
    setRequestRepo(event.target.value)
  }

  if (error) {
		return <h2>{error.message}</h2>;
	}

  const repositories = repositoriesFull.slice(pageNum * 10, (pageNum + 1) * 10);
  const total = Math.ceil(repositoriesFull.length / 10)

  return (
    <>
      <div className="header flex">
        <div className="form_wrapper">
          <SearchForm onChange={handleSubmit} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: '20px' }}>Login: {userLogin || '---'}</div>

      <div className="list">
        {
          loading 
            ? 'Loading..'
            : (repositories && repositories.map((node, idx: number) => <RepoCard key={idx} data={node} />))
        }
        
      </div>

      {!loading &&
        <Slider
          nav={{ current: pageNum, total: Math.ceil(repositoriesFull.length / 10) }}
          onNextPageClick={nextPage}
          onPrevPageClick={prevPage}
          onPageClick={setPage}
          disable={{ right: pageNum + 1 >= repositoriesFull.length / 10, left: pageNum <= 0 }}
        />
      }
    </>
  )
}

export default Home