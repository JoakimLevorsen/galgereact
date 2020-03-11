import React, { useEffect } from "react";
import lottie, { AnimationItem, AnimationSegment } from "lottie-web";
import galge from "../galge.json";

let animation: AnimationItem | undefined;
const segments: AnimationSegment[] = [
    [0, 61],
    [60, 91],
    [90, 121],
    [120, 151],
    [150, 181],
    [180, 211],
    [210, 241],
    [240, 301],
];

interface Props {
    playSegment: number;
}

export default ({ playSegment }: Props) => {
    useEffect(() => {
        if (!animation) {
            const element = document.querySelector(".galge");
            if (element) {
                animation = lottie.loadAnimation({
                    animationData: galge,
                    container: element,
                    renderer: "svg",
                    autoplay: false,
                });
            }
        }
        animation?.playSegments(segments[playSegment], playSegment === 0);
    }, [playSegment]);

    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            className="galge"
        />
    );
};
