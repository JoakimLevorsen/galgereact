import React from "react";

interface Props {
    size?: number;
}

export default ({ size }: Props) => <div style={{ flex: size ?? 1 }} />;
