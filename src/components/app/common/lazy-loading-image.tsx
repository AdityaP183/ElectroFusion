import { cn } from "@/lib/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyLoadingImage = ({
	imgUrl,
	className,
}: {
	imgUrl: string;
	className?: string;
}) => {
	return (
		<LazyLoadImage
			width={"100%"}
			height={"100%"}
			src={imgUrl}
			effect="blur"
			className={cn(
				"h-full lazyImage object-cover object-center",
				className
			)}
		/>
	);
};

export default LazyLoadingImage;