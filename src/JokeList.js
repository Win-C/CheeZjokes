import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

const BASE_URL = "https://icanhazdadjoke.com";

/** List of jokes.
 *
 *  Props:
 *  - numJokesToGet: default to the number 5 for number of jokes
 *
 *  State:
 *  - jokes: is an array of jokes contains jokes object with
 *      {
 *        "id": "R7UfaahVfFd",
 *        "joke": "My dog used to chase people on a bike a lot. It got so bad I had to take his bike away.",
 *        "status": 200
 *      }
 *  - isLoading: Boolean for is loading, default to true
 *
 * App -> JokeList -> Joke
 * */

function JokeList({ numJokesToGet = 5 }) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* On mount, retrieve jokes from API */

  useEffect(function fetchJokesOnRender() {
    async function fetchJokes() {
      // load jokes one at a time, adding not-yet-seen jokes
      let jokes = [];
      let seenJokes = new Set();
      try {
        while (jokes.length < numJokesToGet) {
          // Note: could wrap try and catch around axios request
          let res = await axios.get(
            BASE_URL,
            {
              headers: { Accept: "application/json" },
            });
            
          let {...joke } = res.data;
          if (!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id);
            jokes.push({ ...joke, votes: 0 });
          } else {
            console.warn("duplicate found!");
          }
        }
      } catch (err) {
        console.error(err);
      }
      if (isLoading) {
        setJokes(jokes);
        setIsLoading(false);
      }
    }
    fetchJokes();

  }, [isLoading, numJokesToGet]);

  /* empty joke list, set to loading state, and then call getJokes */

  function generateNewJokes() {
    setIsLoading(true);
  }

  /* change vote for this id by delta (+1 or -1) */

  function vote(id, delta) {
    const newjokes = jokes.map(joke => joke.id === id ? { ...joke, votes: joke.votes + delta } : joke);
    setJokes(newjokes);
  }

  /* render: either loading spinner or list of sorted jokes. */

  const sortedJokes = jokes.sort((a, b) => b.votes - a.votes);
  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    )
  }

  return (
    <div className="JokeList">
      <button
        className="JokeList-getmore"
        onClick={generateNewJokes}
      >
        Get New Jokes
        </button>
      {/* Note you can spread j */}
      {sortedJokes.map(j => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={vote}
        />
      ))}
    </div>
  );
}

export default JokeList;
