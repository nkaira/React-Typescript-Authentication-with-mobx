import { Link } from "react-router-dom";

import styles from './homePage.module.scss';

const HomePage = () => {

    return (
        <section className={styles.main}>
            <h1>welcome to auth app!</h1>
            <p>
                Already registered? <Link className={styles.login} to='/login'>Login</Link>
            </p>
            <p>
                New to site? <Link className={styles.login} to='/register'>Create Account</Link>
            </p>
        </section >
    )
};

export default HomePage;