import React, { ReactNode } from 'react';
import styles from './Frame.module.css';

interface FrameProps {
    children: ReactNode;
}

const Frame: React.FC<FrameProps> = ({ children }) => {
    return <div className={styles.frame}>{children}</div>;
};

export default Frame;
