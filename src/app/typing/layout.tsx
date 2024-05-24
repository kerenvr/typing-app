import styles from './typingPage.module.css'

const TypingLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default TypingLayout;