import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";

import { GET_REPOS, GET_REPOS_BY_USER, GET_VIEWER } from "../../query/repos.ts";

import Slider from "../../components/Slider";
import RepoCard from "../../components/RepositoryCard/index.tsx";
import "./styles.css";
import SearchForm from "../../components/SearchForm/index.tsx";
import { connect } from "react-redux";
import * as actions from "../../redux/actionTypes";

function Home(props: any) {
  const { repositories, searchRequestString } = props;
  const [hasChange, setHasChange] = useState<boolean>(false);
  const [userLogin, setUserLogin] = useState<string>("");

  const { data: user } = useQuery(GET_VIEWER);

  const [executeUser, { data: dataUser }] = useLazyQuery(GET_REPOS_BY_USER, {
    variables: {
      getQuery: `${userLogin}`,
    },
  });

  const [executeSearch, { data: dataSearch, loading }] = useLazyQuery(GET_REPOS, {
    variables: {
      getQuery: `${searchRequestString}`,
    },
  });

  useEffect(() => {
    if (!repositories || hasChange) {
      if (searchRequestString) {
        executeSearch();

        if (dataSearch) {
          setHasChange(false);
          const nodes = dataSearch.search.nodes

          props.dispatch({ type: actions.SET_ITEMS, payload: nodes });
          localStorage.setItem('repositories', JSON.stringify(nodes));
        }
      } else if (user) {
        setUserLogin(user.viewer.login);

        if (userLogin) executeUser();

        if (dataUser) {
          const nodes = dataUser.user.repositories.nodes;

          props.dispatch({ type: actions.SET_ITEMS, payload: nodes });
          localStorage.setItem('repositories', JSON.stringify(nodes));
        }
      }
    }
  }, [dataSearch, user, userLogin, dataUser, hasChange])

  const handleSubmit = (value: string) => {
    setHasChange(true);
    
    props.dispatch({type: actions.SET_SEARCH_REQUEST_STRING, payload: value})
    localStorage.setItem('searchRequestString', value);
  }

  const [pageNum, setPageNum] = useState<number>(0);

  const nextPage = () => setPageNum(Math.min(pageNum + 1, total - 1))

  const prevPage = () => setPageNum(Math.max(pageNum - 1, 0))

  const setPage = (num: number) => setPageNum(Math.min(total, Math.max(0, num)))

  const repositoriesCut = repositories ? repositories.slice(pageNum * 10, (pageNum + 1) * 10) : [];
  const total = repositories ? Math.ceil(repositories.length / 10) : 0

  return (
    <div className="page">
      <div className="header flex">
        <div className="form_wrapper">
          <SearchForm onChange={handleSubmit} value={props.searchRequestString} />
        </div>
      </div>

      <div className="box list">
        {
          loading
            ? <div className="text_align_center">Loading..</div>
            : repositoriesCut.length ? repositoriesCut.map((node: any, idx: number) => <RepoCard key={idx} data={node} />) : <div className="text_align_center">Not found</div>
        }

      </div>

      {repositories &&
        <Slider
          nav={{ current: pageNum, total }}
          onNextPageClick={nextPage}
          onPrevPageClick={prevPage}
          onPageClick={setPage}
          disable={{ right: pageNum + 1 >= repositories.length / 10, left: pageNum <= 0 }}
        />
      }
    </div>
  )
}

const mapStateToProps = (state: {defaultReducer: any}) => state.defaultReducer


export default connect(mapStateToProps)(Home);
