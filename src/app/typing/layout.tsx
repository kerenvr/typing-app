import styles from './typing.module.css'

const BlogLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <div className={styles.container}>
                <h1>This is the Typing Page Layout</h1>
            </div>
            {children}
        </div>
    );
};

export default BlogLayout;