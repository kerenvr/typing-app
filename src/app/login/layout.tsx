import styles from './login.module.css'

const LoginPageLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default LoginPageLayout;