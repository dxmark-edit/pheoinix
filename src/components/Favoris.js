import { useState } from "react";

export default function Favoris() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Solo Leveling",
      image: "/assets/solo-leveling.jpg",
    },
    {
      id: 2,
      title: "Attack on Titan",
      image: "/assets/aot.jpg",
    },
    {
      id: 3,
      title: "Jujutsu Kaisen",
      image: "/assets/jujutsu-kaisen.jpg",
    },
  ]);

  return (
    <div className="favoris-page">
      <h2 className="text-2xl font-bold mb-6">Your Favorite Anime</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">You have no favorites yet. Start adding some!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((anime) => (
            <div
              key={anime.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={anime.image}
                alt={anime.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{anime.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
