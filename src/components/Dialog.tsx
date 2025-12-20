import styles from "./Dialog.module.css";
import type { project } from "../common/types.ts";
import { ImageCarousel } from "./ImageCarousel.tsx";
import { useCallback, useEffect } from "react";

interface DialogProps {
    item: project;
    close: () => void;
}

export function Dialog({ item, close }: DialogProps) {
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close();
        }
    }, [close]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    return (
        <dialog className={styles.popupContainer}
                open={true}
                onClick={close}>
            <div className={styles.popupContent}
                 onClick={(e) => e.stopPropagation()}>
                <div className={styles.titleContainer}>
                    <h2 className={styles.popupTitle} title={item.title}>
                        {item.title}
                    </h2>

                    <button className={styles.closeButton}
                            onClick={close}>
                        <span>✕</span>
                    </button>
                </div>

                {item.images && item.images.length > 0 &&
                <ImageCarousel images={item.images} />}

                <div className={styles.descriptionContainer}>
                    <p className={styles.description}>
                        {item.description}
                    </p>
                </div>

                <div className={styles.buttonContainer}>
                    <a className={styles.downloadButton}
                       href={item.url}
                       target="_blank"
                       rel="noopener noreferrer">
                        <h3>Download</h3>
                    </a>
                </div>
            </div>
        </dialog>
    );
}