import styles from './typingPage.module.css'

const TypingLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div style={{ minHeight: 'calc(100vh - 100px)' }} className={` ${styles.container}`}>
            {children}
        </div>
    );
};

export default TypingLayout;