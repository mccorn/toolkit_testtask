import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import * as actions from "../../redux/actionTypes";

import { GET_AUTH } from "../../query/repos.ts";
import { connect } from "react-redux";

const client_id = 'a2a89d23045a4d75b2d7';
const redirect_uri = 'http://localhost:3000/home';
// const code = '00e9b55cb96ec8102424';

function Login(props: any) {


    // const { data } = useQuery(GET_AUTH);
    const {state, dispatch} = props;
    const [data, setData] = useState({ errorMessage: "", isLoading: false });

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");

        console.log(1, hasCode)

        if (hasCode) {
            const newUrl = url.split("?code=");

            console.log(2, hasCode, newUrl)

            setData({ ...data, isLoading: true });
            // props.dispatch({type: actions.SET_AUTH, payload: data})
            const requestData = {
                code: newUrl[1]
            };

            const proxy_url = state.proxy_url;

            // Use code parameter and other parameters to make POST request to proxy_server
            fetch(proxy_url, {
                method: "POST",
                body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    dispatch({
                        type: "LOGIN",
                        payload: { user: data, isLoggedIn: true }
                    });
                })
                .catch(error => {
                    setData({
                        isLoading: false,
                        errorMessage: "Sorry! Login failed"
                    });
                });
        }


        // if (data) console.log(data)
    }, [])

    const setLogin = () => {
        // event?.preventDefault();

        dispatch({ type: actions.SET_AUTH, payload: data })
    }

    console.log('data', data)

    return (
        <div className="page">
            {/* Login */}

            <a
                className="login-link"
                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                onClick={setLogin}
            >
                <span>Login with GitHub</span>
            </a>
        </div>
    )
}


const mapStateToProps = (state: {defaultReducer: any}) => state.defaultReducer


export default connect(mapStateToProps)(Login);
// export default Login;
