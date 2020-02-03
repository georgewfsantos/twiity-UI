import React from "react";
import api from "../services/api";

import "./Tweet.css";
import like from "../assets/like.svg";

export default function Tweet({ tweet }) {
  async function handleLike() {
    const id = tweet._id;

    await api.post(`/likes/${id}`);
  }
  return (
    <li className="tweet">
      <strong>{tweet.author}</strong>
      <p>{tweet.content}</p>
      <button onClick={handleLike}>
        <img src={like} alt="Like" />
        {tweet.likes}
      </button>
    </li>
  );
}
