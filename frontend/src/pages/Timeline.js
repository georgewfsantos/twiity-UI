import React, { useState, useEffect } from "react";
import api from "../services/api";
import socket from "socket.io-client";

import "./Timeline.css";
import twittyLogo from "../assets/twitter.svg";

import Tweet from "../components/Tweet";

export default function Timeline() {
  const [newTweet, setNewTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  function subscribeToEvents() {
    const io = socket("http://localhost:3333");

    io.on("tweet", data => {
      setTweets(prev => [data, ...prev]);
    });

    io.on("like", data => {
      setTweets(prev =>
        prev.map(tweet => (tweet._id === data._id ? data : tweet))
      );
    });
  }

  async function loadTweets() {
    const response = await api.get("/tweets");

    setTweets(response.data);
  }

  useEffect(() => {
    subscribeToEvents();
    loadTweets();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleNewTweet(e) {
    if (e.keyCode !== 13) {
      return;
    }

    const author = localStorage.getItem("@Twitty:username");
    const content = newTweet;

    await api.post("/tweets", {
      author,
      content
    });

    setNewTweet("");
  }

  return (
    <div className="timeline-wrapper">
      <img src={twittyLogo} height={24} alt="logo" />

      <form>
        <textarea
          value={newTweet}
          onChange={e => setNewTweet(e.target.value)}
          onKeyDown={handleNewTweet}
          placeholder="O que está rolando ?"
        />
      </form>

      <ul className="tweet-list">
        {tweets.map(tweet => (
          <Tweet tweet={tweet} key={tweet._id} />
        ))}
      </ul>
    </div>
  );
}
