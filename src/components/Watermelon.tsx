import React, { useEffect } from "react";
import lottie, { AnimationItem } from "lottie-web";
import watermelon from "../watermelon.json";

let animation: AnimationItem | undefined;

export default () => {
    useEffect(() => {
        const element = document.querySelector(".watermelon");
        if (element) {
            animation = lottie.loadAnimation({
                animationData: watermelon,
                container: element,
                renderer: "svg",
                autoplay: true,
            });
            animation.addEventListener("complete", () => {
                if (element) {
                    animation?.goToAndPlay(300, true);
                }
            });
        }
    }, []);

    return (
        <div
            style={{
                margin: -20,
                height: 150,
                width: 340,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="watermelon"
                style={{ height: 340, minWidth: 340 }}
            />
        </div>
    );
};
