import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { aniListAPI } from "../constants/api"; // Import shared API URL
import "./SearchAnime.css";

function SearchAnime() {
  const [searchQuery, setSearchQuery] = useState("");
  const [animeResults, setAnimeResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [showGenreList, setShowGenreList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0); // To track the total number of results
  const navigate = useNavigate();

  // Fetch anime from AniList using GraphQL
  const fetchAnimes = async (page = 1) => {
    setLoading(true);
    try {
      const query = `
        query ($page: Int, $perPage: Int) {
          Page(page: $page, perPage: $perPage) {
            pageInfo {
              total
            }
            media(type: ANIME, format_in: [TV, MOVIE], sort: POPULARITY_DESC) {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
              }
              genres
              averageScore
              description
            }
          }
        }`;

      const variables = {
        page,
        perPage: 48, // 48 animes per page
      };

      const response = await fetch(aniListAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();
      if (data.data) {
        setTotalResults(data.data.Page.pageInfo.total);
        setAnimeResults(data.data.Page.media);
      } else {
        console.error("Invalid API response or no data returned");
      }
    } catch (err) {
      console.error("Error fetching anime data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch genres (we'll use hardcoded genre values here since AniList's GraphQL doesn't provide a direct genres query)
  const fetchGenres = () => {
    // Hardcoded genres as AniList API doesn't return them directly.
    const allGenres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Romance", "Slice of Life", "Mystery", "Thriller"];
    setGenres(allGenres);
  };

  // Execute API calls when component mounts
  useEffect(() => {
    fetchAnimes(currentPage); // Fetch animes based on the current page
    fetchGenres();
  }, [currentPage]); // Fetch when page changes

  // Function for search functionality
  const handleSearch = async () => {
    if (!searchQuery) {
      fetchAnimes(currentPage);
      return;
    }
    setLoading(true);
    try {
      const query = `
        query ($searchQuery: String, $page: Int, $perPage: Int) {
          Page(page: $page, perPage: $perPage) {
            pageInfo {
              total
            }
            media(type: ANIME, search: $searchQuery) {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
              }
              genres
              averageScore
              description
            }
          }
        }`;

      const variables = {
        searchQuery,
        page: 1,
        perPage: 48,
      };

      const response = await fetch(aniListAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();
      if (data.data) {
        setAnimeResults(data.data.Page.media);
        setTotalResults(data.data.Page.pageInfo.total);
      } else {
        console.error("No data found for the search query");
      }
    } catch (err) {
      console.error("Error fetching search data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to filter by genre
  const filterByGenre = async (genre) => {
    setLoading(true);
    setShowGenreList(false);
    try {
      const query = `
        query ($genre: String, $page: Int, $perPage: Int) {
          Page(page: $page, perPage: $perPage) {
            pageInfo {
              total
            }
            media(type: ANIME, genre: $genre) {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
              }
              genres
              averageScore
              description
            }
          }
        }`;

      const variables = {
        genre,
        page: 1,
        perPage: 48,
      };

      const response = await fetch(aniListAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();
      if (data.data) {
        setAnimeResults(data.data.Page.media);
        setTotalResults(data.data.Page.pageInfo.total);
      } else {
        console.error("No data found for this genre");
      }
    } catch (err) {
      console.error("Error filtering anime by genre:", err);
    } finally {
      setLoading(false);
    }
  };

  // Pagination control
 
  // Searchbar functionality
  const [searchActive, setSearchActive] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      setTimeout(() => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setSearchActive(false);
          setSearchQuery(""); // ✅ Clear the input when closing
        }
      }, 0);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSearchClick = () => {
    if (!searchActive) {
      setSearchActive(true);
    } else {
      if (searchQuery.trim() !== "") {
        handleSearch(searchQuery); // Trigger search
      }
    }
  };

  // Generate pagination numbers
  



  
  const totalPages = Math.ceil(totalResults / 48); // Calculate total pages
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAnimes(page); // Call the fetch function for the new page
  };

  // Get the pagination buttons (always 3 buttons at a time)
  const getPaginationPages = () => {
    let pages = [];

    // Show pages around current page, with 3 buttons at a time
    if (currentPage === 1) {
      pages = [1, 2, 3];
    } else if (currentPage === totalPages) {
      pages = [totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [currentPage - 1, currentPage, currentPage + 1];
    }

    return pages;
  };















  return (
    <div className="search-container">
      {/* Filter icon */}
      <div className="filter-container">
        <div
          className={`filter-icon ${showGenreList ? "active" : ""}`}
          onClick={() => setShowGenreList(!showGenreList)}
        >
          <FaFilter size={24} />
        </div>

        {/* Genre list */}
        {showGenreList && (
          <div className="genre-list">
            {genres.map((genre) => (
              <button key={genre} onClick={() => filterByGenre(genre)}>
                {genre}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search bar */}
      <div className={`search-bar ${searchActive ? "active" : ""}`} ref={searchRef}>
        <input
          type="text"
          placeholder="Rechercher un anime..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
        />
        <button onClick={onSearchClick}>
          <FaSearch size={20} />
        </button>
      </div>
        <div className="anime-results-container">
          <div className="Glowsanime"></div>
              {/* Display anime results */}
              <div className="anime-results">
                {loading && <p>Chargement...</p>}
                {!loading && animeResults.length === 0 && <p>Aucun anime trouvé.</p>}
                {animeResults.length > 0 &&
                  animeResults.map((anime) => (
                    <div
                      key={anime.id}
                      className="anime-item"
                      onClick={() => navigate(`/anime/${anime.id}`)} // Redirect to AnimeDetails
                    >
                      <img src={anime.coverImage.large} alt={anime.title.romaji} />
                      <h3>{anime.title.romaji}</h3>
                    </div>
                  ))}
              </div>
    </div>
      {/* Pagination controls */}
      <div className="pagination">
      {/* Previous Button (<) */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-button"
      >
        &lt;
      </button>

      {/* Pagination Buttons (3 page buttons) */}
      {getPaginationPages().map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`page-button ${currentPage === number ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}

      {/* Next Button (>) */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="page-button"
      >
        &gt;
      </button>
    </div>
  

    </div>
  );
}

export default SearchAnime;
