import React from "react";
import "./index.css";
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	EffectFade,
  breakpoints,
} from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

function SandwichSlider() {
	const cards = [
		{ src: "/images/sandwiches/example.jpg", alt: "Sandwich 1" },
		{ src: "/images/sandwiches/example.jpg", alt: "Sandwich 2" },
		{ src: "/images/sandwiches/example.jpg", alt: "Sandwich 3" },
		{ src: "/images/sandwiches/example.jpg", alt: "Sandwich 1" },
		{ src: "/images/sandwiches/example.jpg", alt: "Sandwich 2" },
		{ src: "/images/sandwiches/example.jpg", alt: "Sandwich 3" },
		{ src: "/images/sandwiches/example.jpg", alt: "Sandwich 1" },
		{ src: "/images/sandwiches/example.jpg", alt: "Sandwich 2" },
		{ src: "/images/sandwiches/example.jpg", alt: "Sandwich 3" },
		// ... more items
	];

	return (
		<div className="body">
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				slidesPerView={3}
				spaceBetween={25}
				loop={true}
				centeredSlides={true}
				fadeEffect={{ crossFade: true }}
				pagination={{ clickable: true, dynamicBullets: true }}
				navigation={true}
				scrollbar={{ draggable: true }}
				breakpoints={{
					0: {
						slidesPerView: 1,
					},
					520: {
						slidesPerView: 2,
					},
					950: {
						slidesPerView: 3,
					},
				}}
				className="slide-container swiper">
				{cards.map((card, index) => (
					<SwiperSlide key={index}>
						<div className="card">
							<div className="image-content">
								<span className="overlay"></span>
								<div className="card-image">
									<img
										src={card.src}
										alt={card.alt}
										className="card-img"
									/>
								</div>
							</div>
							<div className="card-content">
								<h2 className="name">Sandwich Name</h2>
								<p className="description">Absolutely an Banger</p>
								<button
									className="button"
									href="#">
									Order
								</button>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default SandwichSlider;
