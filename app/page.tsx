'use client';
import React from "react";

import { useState } from "react";

export default function Home() {
  const [trackName, setTrackName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumImage, setAlbumImage] = useState<string | null>(null);
  const [isImageFetched, setIsImageFetched] = useState(false); // 画像取得済みフラグ

  const fetchAlbumImage = async () => {
    if (!trackName || !artistName) {
      alert("曲名とアーティスト名を入力してください");
      return;
    }

    const response = await fetch(
      `http://localhost:8000/get_album_image?track_name=${encodeURIComponent(trackName)}&artist_name=${encodeURIComponent(artistName)}`
    );
    const data = await response.json();

    if (data.album_image) {
      setAlbumImage(data.album_image);
      setIsImageFetched(true); // 画像取得済みフラグをON
    } else {
      alert("ジャケット画像が見つかりませんでした。");
      setIsImageFetched(false);
    }
  };

  const downloadImage = () => {
    if (!albumImage) return;

    const link = document.createElement("a");
    link.href = albumImage;
    link.download = "album_cover.jpg"; // 保存時のファイル名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
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
        onClick={fetchAlbumImage}
      >
        ジャケット画像を取得
      </button>

      {isImageFetched && albumImage && (
        <div className="flex flex-col items-center">
          <img src={albumImage} alt="Album Cover" className="w-64 h-64 rounded-lg shadow-lg mb-4" />
          <button
            className="bg-green-500 px-4 py-2 rounded text-white"
            onClick={downloadImage}
          >
            画像を保存
          </button>
        </div>
      )}
    </div>
  );
}