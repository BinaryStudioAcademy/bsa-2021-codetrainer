import React, { FC, HTMLProps } from "react";
import { Avatar } from "components/basic";

export const defaultImage: FC<HTMLProps<HTMLImageElement>> = ({
	src,
	width,
	height,
}: HTMLProps<HTMLImageElement>) => (
	<Avatar avatar={src} size={Number(width || height || 50)}/>
)
