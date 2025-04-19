import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { aniListAPI } from "../constants/api"; // Import shared API URL
import {
  FaStar,
  FaPlay,
  FaThumbsUp,
  FaThumbsDown,
  FaChevronDown,
} from "react-icons/fa";
import "./AnimeDetails.css";

function AnimeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [poster, setPoster] = useState("");
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("Season 1");
  const [episodes, setEpisodes] = useState([]);
  const [similarAnimes, setSimilarAnimes] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const [liked, setLiked] = useState(false);

  const maxWords = 50;

  const getTruncatedText = (text) => {
    const words = text?.split(" ") || [];
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const fetchAnimeDetails = async () => {
    setLoading(true);
    const query = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          title {
            romaji
            english
          }
          description(asHtml: false)
          episodes
          duration
          averageScore
          genres
          studios {
            nodes {
              name
            }
          }
          coverImage {
            large
          }
          bannerImage
        }
      }
    `;
    const variables = { id: parseInt(id) };

    try {
      const res = await fetch(aniListAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      const json = await res.json();
      const data = json.data.Media;

      setAnime({
        id: data.id,
        title: data.title.romaji || data.title.english,
        synopsis: data.description,
        duration: data.duration ? `${data.duration} min` : "Inconnue",
        score: data.averageScore / 10,
        genres: data.genres.map((g) => ({ name: g })),
        studios: data.studios.nodes.map((s) => ({ name: s.name })),
        images: {
          jpg: {
            image_url: data.coverImage.large,
          },
        },
        aired: {
          string: "N/A",
        },
      });

      setPoster(data.bannerImage || data.coverImage.large);
      const randSeasons = Math.max(1, Math.floor(Math.random() * 4) + 1);
      setSeasons([...Array(randSeasons)].map((_, i) => `Season ${i + 1}`));
      const episodeCount = data.episodes || 12;
      setEpisodes([...Array(episodeCount)].map((_, i) => ({ mal_id: i + 1 })));
    } catch (err) {
      console.error("Erreur lors du chargement de l’anime :", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarAnimes = async () => {
    if (!anime || !anime.genres || anime.genres.length === 0) return;

    const query = `
      query ($genre: String) {
        Page(page: 1, perPage: 12) {
          media(genre_in: [$genre], type: ANIME, isAdult: false) {
            id
            title {
              romaji
            }
            coverImage {
              large
            }
          }
        }
      }
    `;
    const variables = { genre: anime.genres[0].name };

    try {
      const res = await fetch(aniListAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      const json = await res.json();
      const filtered = json.data.Page.media.filter((a) => a.id !== anime.id);

      setSimilarAnimes(
        filtered.map((a) => ({
          mal_id: a.id,
          title: a.title.romaji,
          images: {
            jpg: {
              image_url: a.coverImage.large,
            },
          },
        }))
      );
    } catch (err) {
      console.error("Erreur lors du chargement des animes similaires :", err);
    }
  };

  const checkIfLiked = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/favorites"); // Replace with correct API base URL
      const data = await response.json();
      const isFavorited = data.some((fav) => fav.anime_id === anime.id);
      setLiked(isFavorited);
    } catch (error) {
      console.error("Erreur lors de la vérification des favoris :", error);
    }
  };

  const handleLike = async () => {
    try {
      if (!liked) {
        await fetch("http://localhost:8000/api/favorites", { // Replace with correct API base URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            anime_id: anime.id,
            title: anime.title,
            image: anime.images.jpg.image_url,
          }),
        });
      } else {
        await fetch(`http://localhost:8000/api/favorites/${anime.id}`, { // Replace with correct API base URL
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
      }

      checkIfLiked(); // Update the liked state
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
  };

  useEffect(() => {
    fetchAnimeDetails();
  }, [id]);

  useEffect(() => {
    if (anime) {
      fetchSimilarAnimes();
      checkIfLiked();
    }
  }, [anime]);

  const handleSeasonChange = (e) => setSelectedSeason(e.target.value);

  const getFilledStars = (score) => Math.round((score / 10) * 5);

  const handleWatchEpisode = (episodeId) => {
    navigate(`/watch/${id}/episode/${episodeId}`);
  };

  const handleSelectSimilarAnime = (animeId) => {
    navigate(`/anime/${animeId}`);
  };

  if (loading) return <p>Chargement...</p>;
  if (!anime) return <p>Aucun anime trouvé.</p>;

  const filledStars = getFilledStars(anime.score);

  return (
    <>
      <div className="anime-details-container">

      <div className="anime-details">
        <div
          className="anime-container"
          style={{
            backgroundImage: `url(${poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.8,
          }}
        >
          <div className="bg-gradiant"></div>
          <div className="anime-image">
            <img src={anime.images.jpg.image_url} alt={anime.title} />
          </div>

          <div className="anime-info">
            <div className="Box1">
              <h1>{anime.title}</h1>
              <p>
                <strong>Overview:</strong> <br />
                <br />
                {showFullText
                  ? anime.synopsis
                  : getTruncatedText(anime.synopsis)}
                <span
                  onClick={() => setShowFullText(!showFullText)}
                  style={{
                    color: "#ED1BAD",
                    cursor: "pointer",
                    marginLeft: "5px",
                  }}
                >
                  {showFullText ? "Lire moins" : "Lire plus"}
                </span>
              </p>

              <div className="anime-score">
                <div className="thumbs-icons">
                  <FaThumbsUp
                    size={17}
                    style={{
                      marginLeft: "10px",
                      color: liked ? "#ED1BAD" : "#ccc",
                      cursor: "pointer",
                    }}
                    onClick={handleLike}
                  />
                  <FaThumbsDown
                    size={17}
                    style={{
                      marginLeft: "5px",
                      transform: "scaleX(-1)",
                    }}
                  />
                </div>

                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={index < filledStars ? "active" : ""}
                    />
                  ))}
                </div>

                <span>
                  {anime.score ? anime.score.toFixed(1) : "Non noté"} /10
                </span>
              </div>
            </div>

            <div className="Box2">
              <div className="right-box">
                <p>
                  <strong>Released:</strong> {anime.aired.string || "Inconnue"}
                </p>
                <p>
                  <strong>Genres:</strong>{" "}
                  {anime.genres.map((g) => g.name).join(", ")}
                </p>
              </div>

              <div className="left-box">
                <p>
                  <strong>Duration:</strong> {anime.duration}
                </p>
                <p>
                  <strong>Studio:</strong>{" "}
                  {anime.studios.map((s) => s.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="blur-solid"></div>
      </div>
      </div>

      <div className="seasons-episodes-container">
        <div className="dropdown-container">
          <select
            id="seasons"
            onChange={handleSeasonChange}
            className="anime-seasons"
            value={selectedSeason}
          >
            {seasons.map((season, index) => (
              <option key={index} value={season}>
                {season}
              </option>
            ))}
          </select>
          <FaChevronDown className="dropdown-icon" />
        </div>

        {selectedSeason && (
          <div className="episodes-container">
            {episodes.map((episode) => (
              <div
                key={episode.mal_id}
                className="episode"
                onClick={() => handleWatchEpisode(episode.mal_id)}
              >
                <div className="episode-image-shadow"></div>
                <img
                  className="episode-image"
                  src={anime.images.jpg.image_url}
                  alt={`Episode ${episode.mal_id}`}
                />
                <FaPlay className="play-icon" size={15} />
                <div className="play-icon-shadow"></div>
                <p className="episode-number">Episode {episode.mal_id}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="Simillar-anime">
      
        <div className="similar-anime-container">
          {similarAnimes.map((similar) => (
            <div
              key={similar.mal_id}
              className="similar-anime-card"
              onClick={() => handleSelectSimilarAnime(similar.mal_id)}
            >
              <img src={similar.images.jpg.image_url} alt={similar.title} />
              <p>{similar.title}</p>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/favorites")}>
          Voir mes favoris
        </button>
      </div>
    </>
  );
}

export default AnimeDetails;
