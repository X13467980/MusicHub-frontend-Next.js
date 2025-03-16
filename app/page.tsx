"use client";

import { useState, useEffect, Suspense } from "react";

export default function Home() {
  const [trackName, setTrackName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumImage, setAlbumImage] = useState<string | null>(null);

  useEffect(() => {
    if (!trackName || !artistName) return;

    const fetchAlbumImage = async () => {
      const response = await fetch(
        `http://localhost:8000/get_album_image?track_name=${encodeURIComponent(trackName)}&artist_name=${encodeURIComponent(artistName)}`
      );
      const data = await response.json();
      setAlbumImage(data.album_image);
    };

    fetchAlbumImage();
  }, [trackName, artistName]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">ジャケット画像取得</h1>

        <input
          type="text"
          placeholder="曲名を入力"
          className="p-2 rounded bg-gray-800 text-white mb-2"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        />

        <input
          type="text"
          placeholder="アーティスト名を入力"
          className="p-2 rounded bg-gray-800 text-white mb-4"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />

        <button
          className="bg-blue-500 px-4 py-2 rounded text-white mb-4"
          onClick={() => setAlbumImage(null)}
        >
          ジャケット画像を取得
        </button>

        {albumImage && (
          <div className="flex flex-col items-center">
            <img src={albumImage} alt="Album Cover" className="w-64 h-64 rounded-lg shadow-lg mb-4" />
          </div>
        )}
      </div>
    </Suspense>
  );
}