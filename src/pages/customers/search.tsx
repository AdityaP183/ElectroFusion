import Searchbar from "@/components/app/common/searchbar";
import { ProductCard } from "@/components/app/store";
import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getProductsPublic } from "@/db/api-product";
import { categories } from "@/lib/app-data";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Search() {
	const [searchValue, setSearchValue] = useState("");
	const [values, setValues] = useState([10000, 150000]);

	// const { data, isLoading, isError, error } = useQuery({
	// 	queryKey: ["search-products"],
	// 	queryFn: () => getProductsPublic(),
	// 	staleTime: 1000 * 60 * 1,
	// 	refetchOnWindowFocus: false,
	// });
	const data = [
		{
			id: 11,
			created_at: "2025-01-12T13:33:59.113538+00:00",
			productName: "Fujifilm Instax Mini 12 Instant Camera-Blue",
			rating: "3.2",
			originalPrice: 9599,
			isDiscounted: false,
			discountPercent: 0,
			stock: 5,
			description:
				" If you are looking for an instant camera to capture your favourite moments, then this Fujifilm Instax Mini 12 is ideal for you. It comes with a pull-out selfie lens so that you can click beautiful selfies and great close-up shots. Moreover, you can capture and print your pictures on high-quality mini-films that are as big as a credit card. Furthermore, you can customize the shutter button to suit your style. ",
			productImage:
				"https://rmjhwfdbdksuchpegnuu.supabase.co/storage/v1/object/public/product_image/ilYvVNEDWN9blp78RKI7_61erc7ly+ZL._SX679_",
			categories: ["Cameras"],
			createdBy: "639b69a8-f31f-4ab4-bdcc-5090c19fb685",
		},
		{
			id: 10,
			created_at: "2025-01-12T13:14:49.797002+00:00",
			productName:
				"JBL Quantum 910 Wireless Over Ear Gaming Headset with Mic and ANC",
			rating: "3.8",
			originalPrice: 24500,
			isDiscounted: true,
			discountPercent: 12,
			stock: 12,
			description:
				"Get the professional edge with JBL QuantumSPHERE 360 on PC. This 3D-audio positioning, powered by JBL QuantumENGINE and head-tracking technology, provides next-gen accuracy and a fixed, independent soundscape for improved gaming instincts. Also equipped with DTS Headphone X: v2.0\nGet the competitive advantage with JBL QuantumSPATIAL 360 on consoles. Utilize integrated head-tracking technology for extra accuracy and acoustic presence, giving you the edge to win the game\nExperience epic gaming with JBL QuantumSOUND Signature. From footsteps to explosions, our Hi-Res certified 50mm neodymium drivers create an immersive and competitive advantage with a realistic soundscape designed by JBL audiologists ",
			productImage:
				"https://rmjhwfdbdksuchpegnuu.supabase.co/storage/v1/object/public/product_image/lrO0eZTmSb5wBAwGZKuA_8a3f0367e54b904dc61e890339fc8a89",
			categories: ["Headphones"],
			createdBy: "639b69a8-f31f-4ab4-bdcc-5090c19fb685",
		},
		{
			id: 9,
			created_at: "2024-12-22T11:32:00.219844+00:00",
			productName: "Apple Iphone 15 (128gb)",
			rating: "4.7",
			originalPrice: 79600,
			isDiscounted: true,
			discountPercent: 12,
			stock: 20,
			description:
				' DYNAMIC ISLAND COMES TO IPHONE 15 — Dynamic Island bubbles up alerts and Live Activities — so you don’t miss them while you’re doing something else. You can see who’s calling, track your next ride, check your flight status, and so much more.\nINNOVATIVE DESIGN — iPhone 15 features a durable color-infused glass and aluminum design. It’s splash, water, and dust resistant. The Ceramic Shield front is tougher than any smartphone glass. And the 6.1" Super Retina XDR display is up to 2x brighter in the sun compared to iPhone 14.\n48MP MAIN CAMERA WITH 2X TELEPHOTO — The 48MP Main camera shoots in super-high resolution. So it’s easier than ever to take standout photos with amazing detail. The 2x optical-quality Telephoto lets you frame the perfect close-up. ',
			productImage:
				"https://rmjhwfdbdksuchpegnuu.supabase.co/storage/v1/object/public/product_image/BK2CJ7HUOIWtx7BYA6VC_a1ca24c04a56dcd7c19dabf9e44c7f7f",
			categories: ["Smartphones"],
			createdBy: "639b69a8-f31f-4ab4-bdcc-5090c19fb685",
		},
		{
			id: 7,
			created_at: "2024-12-22T11:23:33.837574+00:00",
			productName: "Samsung Galaxy S24 Ultra 512GB｜12GB Titanium Gray",
			rating: "4.3",
			originalPrice: 144999,
			isDiscounted: true,
			discountPercent: 9,
			stock: 20,
			description:
				" Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 17.25cm (6.8\") flat display. It's an absolute marvel of design.\nThe legacy of Galaxy Note is alive and well. Write, tap and navigate with precision your fingers wish they had on the new, flat display.\nWith the most megapixels on a smartphone and AI processing, Galaxy S24 Ultra sets the industry standard for image quality every time you hit the shutter. What's more, the new ProVisual engine recognizes objects — improving colour tone, reducing noise and bringing out detail. ",
			productImage:
				"https://rmjhwfdbdksuchpegnuu.supabase.co/storage/v1/object/public/product_image/puq1BRgbjaul4xcAlzat_4b97084eba29c7c10b3f60eadf05c238",
			categories: ["Smartphones"],
			createdBy: "639b69a8-f31f-4ab4-bdcc-5090c19fb685",
		},
	];

	return (
		<div className="flex gap-3 mt-10">
			<div className="w-[250px] flex-col gap-2">
				<div className="flex items-center justify-between mb-4">
					<h3 className="mb-2 text-xl font-medium">Filters</h3>
					<Button size={"sm"}>Apply</Button>
				</div>

				<Separator className="my-4" />

				<Searchbar
					searchValue={searchValue}
					onSearchValueChange={setSearchValue}
				/>

				<Separator className="my-4" />

				<div className="space-y-2">
					<Label>Categories</Label>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Select a category" />
						</SelectTrigger>
						<SelectContent>
							{categories.map((category) => (
								<SelectItem
									key={category}
									value={category}
									className="capitalize"
								>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="my-4 space-y-10 ">
					<Label>Price Range</Label>
					<div className="px-5">
						<DualRangeSlider
							label={(value) => <span>&#x20B9;{value}</span>}
							value={values}
							onValueChange={setValues}
							min={10000}
							max={150000}
							step={1}
						/>
					</div>
				</div>

				<div className="my-4 space-y-2">
					<Label>Sort</Label>
					<RadioGroup defaultValue="price-low">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="price-low" id="price-low" />
							<Label htmlFor="price-low">Low</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="price-high"
								id="price-high"
							/>
							<Label htmlFor="price-high">High</Label>
						</div>
					</RadioGroup>
				</div>

				<div className="my-4 space-y-2">
					<Label>Rating</Label>
					<RadioGroup defaultValue="4" aria-label="Filter by rating">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="5" id="rating-5" />
							<Label htmlFor="rating-5">5 Stars</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="4" id="rating-4" />
							<Label htmlFor="rating-4">4+ Stars</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="3" id="rating-3" />
							<Label htmlFor="rating-3">3+ Stars</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="2" id="rating-2" />
							<Label htmlFor="rating-2">2+ Stars</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="1" id="rating-1" />
							<Label htmlFor="rating-1">1+ Stars</Label>
						</div>
					</RadioGroup>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4">
				{data.map((product) => (
					<ProductCard
						key={product.id}
						image={product.productImage}
						title={product.productName}
						description={product.description}
						price={product.originalPrice}
						isDiscounted={product.isDiscounted}
						discountedPercent={product.discountPercent}
					/>
				))}
			</div>
		</div>
	);
}
