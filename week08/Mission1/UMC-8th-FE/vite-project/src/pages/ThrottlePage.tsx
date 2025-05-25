import { useEffect, useState } from "react";

const ThrottlePage = () => {
    const[scrollY, setScrollY] = useState<number>(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return(
        <div className="h-dvh flex flex-col items-center justify-center">
            <div>
                <h1>쓰로통이 무엇일까요?</h1>
                <p>ScrollY : {scrollY}px</p>
            </div>
        </div>
    );
};

export default ThrottlePage;

