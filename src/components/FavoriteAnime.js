import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './FavoriteAnime.css';

const FavoriteAnime = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate(); // Pour la redirection

  useEffect(() => {
    fetch("http://localhost:8000/api/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  const handleCardClick = (animeId) => {
    navigate(`/anime/${animeId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mes Animes Favoris</h2>
      <div className="favorites-grid">
        {favorites.map((anime) => (
          <div
            key={anime.id}
            className="favorite-card"
            onClick={() => handleCardClick(anime.anime_id)} // Redirige vers AnimeDetails
            style={{ cursor: "pointer" }}
          >
            <img src={anime.image} alt={anime.title} />
            <p>{anime.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteAnime;
