import styles from "./Card.module.css";
import type { project } from "../common/types.ts";

interface CardProps {
    item: project;
    setSelectedProject: (project: project | null) => void;
}

export function Card({ item, setSelectedProject }: CardProps) {
    return (
        <div className={styles.card}
             onClick={() => setSelectedProject(item)}>
            <div className={styles.thumbnailContainer}>
                <img src={item.displayImage} alt="&#10006;"  />
            </div>

            <h3 className={styles.cardTitle}
                title={item.title}>
                {item.title}
            </h3>
            <p className={styles.cardDescription}>
                {item.description}
            </p>
        </div>
    );
}