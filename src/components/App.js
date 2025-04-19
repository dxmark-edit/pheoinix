import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Login";
import SignupForm from "./SignupForm";
import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Settings from "./settings";

import Profil from "./Profil";
import Loading from "./Loading"; // make sure this path is correct
import SearchAnime from "./SearchAnime";
import AnimeDetails from "./AnimeDetails";
import FavoriteAnime from "./FavoriteAnime";
import WatchEpisode from "./WatchEpisode";



function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fake loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<Layout />}>
          
          <Route index element={<Home />} />
          <Route path="profil" element={<Profil />} />
          
          <Route path="settings" element={<Settings />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="searchanime" element={<SearchAnime />} />
          <Route path="anime/:id" element={<AnimeDetails />} />
          <Route path="/watch/:id/episode/:episodeId" element={<WatchEpisode />} />

          <Route path="FavoriteAnime" element={<FavoriteAnime />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
