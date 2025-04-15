import React, { useState, useEffect } from "react";
import "./Home.css";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animeImages, setAnimeImages] = useState([]);
  const [trendingAnimeImages, setTrendingAnimeImages] = useState([]); // ✅ New state
  const [rotations, setRotations] = useState({});

  const images = [
    "/assets/bg_character.png",
    "/assets/text_logo.png",
    "/assets/character.png",
  ];

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  // Fetch first 3 anime images
  useEffect(() => {
    const animeIds = [54803, 54865, 55673]; // Solo Leveling S2, Wind Breaker, Kaiju No. 8

    const fetchAnimeImages = async () => {
      try {
        const responses = await Promise.all(
          animeIds.map((id) =>
            fetch(`https://api.jikan.moe/v4/anime/${id}`).then((res) => res.json())
          )
        );

        const images = responses.map((res) => res.data.images.jpg.image_url);
        setAnimeImages(images);
      } catch (error) {
        console.error("Error fetching anime images:", error);
      }
    };

    fetchAnimeImages();
  }, []);

  // Fetch 10 trending anime (NEW METHOD)
  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=15");
        const data = await response.json();
        const trendingImages = data.data.map((anime) => anime.images.jpg.image_url);
        setTrendingAnimeImages(trendingImages); // ✅ Store in state
      } catch (error) {
        console.error("Error fetching trending anime images:", error);
      }
    };

    fetchTrendingAnime();
  }, []);

  const handleMouseMove = (e, index) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left - width / 2) / width) * 20;
    const y = -((e.clientY - top - height / 2) / height) * 20;
    setRotations((prev) => ({ ...prev, [index]: { rotateX: y, rotateY: x } }));
  };

  const handleMouseLeave = (index) => {
    setRotations((prev) => ({ ...prev, [index]: { rotateX: 0, rotateY: 0 } }));
  };



  
  useEffect(() => {
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the 'animate' class when the element enters the viewport
          entry.target.classList.add('animate');
        } else {
          // Remove the 'animate' class when the element leaves the viewport
          entry.target.classList.remove('animate');
        }
      });
    }, {
      threshold: 0.5 // Trigger animation when 20% of the container is visible
    });

    // Select the containers
    const containers = document.querySelectorAll('.home-container2, .home-container3, .home-container4');
    
    // Observe each container
    containers.forEach(container => {
      observer.observe(container);
    });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []); // Only run once when the component mounts

  return (
    <div className="bigger-section">
      <div className="home-container" onClick={nextImage}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`background-img ${index === activeIndex ? "active" : ""} img-${index}`}
            alt={`bg-${index}`}
          />
        ))}
        <button className="trailer-btn">Watch Trailer</button>
        <div className="blur-solid"></div>
      </div>

      <div className="home-container2">
        <div className="Gl">
          <div className="cards-container">
            <div className="cards-img">
              <div className="Glows"></div>
                    {animeImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`anime-${index}`}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                        style={{
                          transform: `perspective(500px) rotateX(${rotations[index]?.rotateX || 0}deg) rotateY(${rotations[index]?.rotateY || 5}deg) skewY(-2deg) ${index === 1 ? "translateZ(50px)" : ""}`,
                          width: "172.2px",
                          height: "255px",
                          objectFit: "cover",
                          borderRadius: "5px",
                          transition: "transform 0.1s ease-out",
                          zIndex: index === 1 ? 5 : 1,
                        }}
                      />
                    ))}
            </div>

            <div className="cards">
              <h3>Upcoming Movies</h3>
              <p>
                Get ready for thrills, drama, and <br /> unforgettable stories with this
                <br /> season's movie lineup—action, <br /> comedy, mystery, and more
                <br /> await!
              </p>
              <button className="watch-btn">
                <img className="play-button" src="/assets/Polygon.png" alt="play" />
                Watch For Free
              </button>
            </div>
          </div>
        </div>
        <div className="blur-solid2"></div>
      </div>
                <div className="Glows3"></div>
                
      <div className="home-container3">
        <div className="trending">
          <h3>Trending</h3>
          <div className="anime-result">
            {trendingAnimeImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`trending-anime-${index}`}
                style={{
                 
                  objectFit: "cover",
                  borderRadius: "5px",
                  margin: "10px",
                }}
              />
            ))}
          </div>
        </div>

        <div className="popular">
          <h3>Popular Anime</h3>
          <div className="anime-result">
            {trendingAnimeImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`popular-anime-${index}`}
                style={{
                  
                  objectFit: "cover",
                  borderRadius: "5px",
                  margin: "10px",
                }}
              />
            ))}
          </div>
        </div>
        <div className="blur-solid3"></div>
      </div>

      <div className="home-container4">
        <div className="subscription">
          <h2>Subscribe to Our Newsletter</h2>
          <p>(to get more info)</p>
          <div className="sub-btn">
            <button>Subscribe</button>
          </div>
          
        </div>
        <div className="blur-solid3"></div>
      </div>
    </div>
  );
}
