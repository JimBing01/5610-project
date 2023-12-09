import React, { useState, useEffect } from "react";
import "./swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import * as client from "./client"; // Assuming client has the necessary fetch method

function SandwichSlider() {
    const [sandwiches, setSandwiches] = useState([]);

    useEffect(() => {
        // Fetch sandwich data from the server or database
        const fetchSandwiches = async () => {
            try {
                const fetchedSandwiches = await client.fetchSandwiches(); // Replace with your actual data fetching method
                setSandwiches(fetchedSandwiches);
            } catch (error) {
                console.error("Failed to fetch sandwiches:", error);
            }
        };

        fetchSandwiches();
    }, []); // Empty dependency array to run only once on component mount

    return (
        <div className="body">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={3}
                spaceBetween={25}
                loop={true}
                centeredSlides={true}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={true}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    520: { slidesPerView: 2 },
                    950: { slidesPerView: 3 },
                }}
                className="slide-container swiper-slide">
                {sandwiches.map((sandwich, index) => (
                    <SwiperSlide key={index}>
                        <div className="card">
                            <div className="image-content">
                                <span className="overlay"></span>
                                <div className="card-image">
                                    <img src={sandwich.image} alt={sandwich.alt} className="card-img"/>
                                </div>
                            </div>
                            <div className="card-content">
                                <h2 className="name">{sandwich.name}</h2>
                                <p className="description">{sandwich.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SandwichSlider;
