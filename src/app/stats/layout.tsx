import styles from './statsPage.module.css'

const StatsLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default StatsLayout;