
// import { connect } from "react-redux";

const login = 'mccorn';
const client_id = 'a2a89d23045a4d75b2d7';
const redirect_uri = 'http://localhost:3000/home';

function Login(props: any) {
    return (
        <div className="page">
            <a
                className="login-link"
                // href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                href={`https://github.com/login/oauth/authorize?user=${login}&client_id=${client_id}&redirect_uri=${redirect_uri}`}
            >
                <span>Login with GitHub</span>
            </a>
        </div>
    )
}


// const mapStateToProps = (state: {defaultReducer: any}) => state.defaultReducer
// export default connect(mapStateToProps)(Login);
export default Login;
