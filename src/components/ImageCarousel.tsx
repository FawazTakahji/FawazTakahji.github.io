import styles from "./ImageCarousel.module.css";
import { useCallback, useEffect, useState, type TouchEvent } from "react";
import { combineClassNames } from "../utils";

const minSwipeDistance = 50;
export function ImageCarousel({ images }: { images: string[] }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)

    const navPrev = useCallback(() => {
        setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
    }, [currentImage, images.length]);

    const navNext = useCallback(() => {
        setCurrentImage((currentImage + 1) % images.length);
    }, [currentImage, images.length]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            navPrev();
        } else if (e.key === 'ArrowRight') {
            navNext();
        }
    }, [navNext, navPrev]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe) {
            navNext();
        } else if (isRightSwipe) {
            navPrev();
        }
    };

    return (
        <div>
            <div className={styles.imageContainer}
                 onTouchStart={onTouchStart}
                 onTouchMove={onTouchMove}
                 onTouchEnd={onTouchEnd}>
                {images.map((image, index) => (
                    <img key={index}
                         className={index !== currentImage ? styles.hidden : undefined}
                         src={image}
                         alt="&#10006;" />
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <button className={combineClassNames(styles.navButton, styles.left, images.length === 1 ? styles.hidden : undefined)}
                        onClick={() => navPrev()}>
                    <span>◀</span>
                </button>
                <button className={combineClassNames(styles.navButton, styles.right, images.length === 1 ? styles.hidden : undefined)}
                        onClick={() => navNext()}>
                    <span>▶</span>
                </button>
            </div>
        </div>
    );
}