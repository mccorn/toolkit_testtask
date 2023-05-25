import { gql } from "@apollo/client";

export const GET_VIEWER = gql`
query { 
    viewer { 
      login
    }
}
`

export const GET_REPOS_BY_USER = gql`
query GetReposByUser($getQuery: String!) { 
    user(login: $getQuery) {
        repositories(first: 100, isFork: false) {
          nodes {
            ... on Repository {
                id
                name
                url
                  description
                languages(first: 100) {
                  nodes {
                    name
                  }
                }
                  owner {
                    url
                    avatarUrl
                    login
                  }
                stargazers {
                    totalCount
                }
                defaultBranchRef {
                    target {
                        ... on Commit {
                            committedDate
                        }
                    }
                }
            }
          }
        }
      }
}
`

export const GET_REPOS = gql`
query GetRepos($getQuery: String!) { 
    search(query: $getQuery, type: REPOSITORY, first: 100) {
        repositoryCount
        nodes {
            ... on Repository {
                id
                name
                url
                  description
                languages(first: 100) {
                  nodes {
                    name
                  }
                }
                  owner {
                    url
                    avatarUrl
                    login
                  }
                stargazers {
                    totalCount
                }
                defaultBranchRef {
                    target {
                        ... on Commit {
                            committedDate
                        }
                    }
                }
            }
        }
    }
}
`

export const GET_REPO_INFO = gql`
	query GetRepoInfo($getId: ID!) {
		node(id: $getId) {
			... on Repository {
				name
				stargazers {
					totalCount
				}
				defaultBranchRef {
					target {
						... on Commit {
							committedDate
						}
					}
				}
				owner {
					avatarUrl
					login
					url
				}
				languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
					nodes {
						name
					}
				}
				description
				url
			}
		}
	}
`;