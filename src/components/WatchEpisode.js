import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronDown, FaPlay } from "react-icons/fa";
import "./AnimeDetails.css";

function WatchEpisode() {
  const { id, episodeId } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("Season 1");
  const [episodes, setEpisodes] = useState([]);
  const [similarAnimes, setSimilarAnimes] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quality, setQuality] = useState("480p");
  const [comment, setComment] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [comments, setComments] = useState([]);

  const videoRef = useRef(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      const query = `
        query ($id: Int) {
          Media(id: $id, type: ANIME) {
            id
            title {
              romaji
              english
              native
            }
            description
            episodes
            genres
            averageScore
            coverImage {
              large
            }
          }
        }
      `;
      const variables = { id: parseInt(id) };

      try {
        const response = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ query, variables }),
        });
        const data = await response.json();
        const animeData = data.data.Media;
        setAnime(animeData);

        const randomSeasons = Math.max(1, Math.floor(Math.random() * 4) + 1);
        setSeasons([...Array(randomSeasons)].map((_, index) => `Season ${index + 1}`));

        const totalEpisodes = animeData.episodes || 12;
        const generatedEpisodes = Array.from({ length: totalEpisodes }, (_, i) => ({
          id: i + 1,
          number: i + 1,
        }));
        setEpisodes(generatedEpisodes);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'anime", error);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  useEffect(() => {
    const fetchSimilarAnimes = async () => {
      if (!anime || !anime.genres || anime.genres.length === 0) return;

      const genre = anime.genres[0];
      const query = `
        query ($genre: String) {
          Page(perPage: 12) {
            media(genre_in: [$genre], type: ANIME, sort: POPULARITY_DESC) {
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
      const variables = { genre };

      try {
        const response = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ query, variables }),
        });
        const data = await response.json();
        const similar = data.data.Page.media.filter(sim => sim.id !== anime.id);
        setSimilarAnimes(similar);
      } catch (error) {
        console.error("Erreur lors de la récupération des animes similaires", error);
      }
    };

    fetchSimilarAnimes();
  }, [anime]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [episodeId]);

  // 🔄 Recharger la vidéo quand la qualité change
  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [quality]);

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  const handleWatchEpisode = (episodeNumber) => {
    navigate(`/watch/${id}/episode/${episodeNumber}`);
  };

  const handleSelectSimilarAnime = (animeId) => {
    navigate(`/watch/${animeId}/episode/1`);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    setShowButton(event.target.value.trim() !== "");
  };

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setComments((prev) => [...prev, comment]);
      setComment("");
      setShowButton(false);
    }
  };

  const getVideoUrl = () => {
    return `/ep1_${quality}.mp4`;
  };

  return (
    <>
      <div className="anime-details">
        <div className="anime-container">
          {!isPlaying ? (
            <div className="video-placeholder" onClick={() => setIsPlaying(true)}>
              <FaPlay size={50} className="play-button" />
            </div>
          ) : (
            <div>
              <video ref={videoRef} width="100%" height="500px" controls autoPlay>
                <source src={getVideoUrl()} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de cette vidéo.
              </video>
              <select
                id="quality-select"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                <option value="480p">480p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="seasons-episodes-container">
        <div className="dropdown-container">
          <select id="seasons" onChange={handleSeasonChange} className="anime-seasons" value={selectedSeason}>
            {seasons.map((season, index) => (
              <option key={index} value={season}>{season}</option>
            ))}
          </select>
          <FaChevronDown className="dropdown-icon" />
        </div>

        {selectedSeason && (
          <div className="episodes-container">
            {episodes.map((episode) => (
              <div key={episode.id} className="episode" onClick={() => handleWatchEpisode(episode.number)}>
                <div className="episode-image-shadow"></div>
                <img
                  className="episode-image"
                  src={anime?.coverImage?.large}
                  alt={`Episode ${episode.number}`}
                />
                <FaPlay className="play-icon" size={15} />
                <div className="play-icon-shadow"></div>
                <p className="episode-number">Episode {episode.number}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="comments-section">
        <h2>Comments</h2><br />
        <div className="comment-input-container">
          <textarea
            className="comment-input"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add your comments"
          />
          {showButton && (
            <button className="add-comment-button" onClick={handleAddComment}>Add</button>
          )}
        </div>
        <div className="comments-container">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment">
                <p>{comment}</p>
              </div>
            ))
          ) : (
            <p>Aucun commentaire pour le moment.</p>
          )}
        </div>
      </div>

      <div className="Simillar-anime">
        
        <div className="similar-anime-container">
          {similarAnimes.map((similar) => (
            <div
              key={similar.id}
              className="similar-anime-card"
              onClick={() => handleSelectSimilarAnime(similar.id)}
            >
              <img src={similar.coverImage.large} alt={similar.title.romaji} />
              <p>{similar.title.romaji}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WatchEpisode;
