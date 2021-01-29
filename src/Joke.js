import React from "react";
import "./Joke.css";

/** A single joke, along with vote up/down buttons. 
 * 
 *  Props:
 *  - id: joke id 
 *  - vote: fn passed down from the parent
 *  - votes: number of votes
 *  - text: string of the joke
 * 
 *  JokeList -> Joke
 * 
*/

function Joke({ id, vote, votes, text }) {
  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={evt => vote(id, +1)}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={evt => vote(id, -1)}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}

export default Joke;
