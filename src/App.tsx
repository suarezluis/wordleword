import React, { useRef, useState } from "react";

import "./App.css";
import styled from "styled-components";
import words from "./words";
import differenceInDays from "date-fns/differenceInDays";
import { ReactComponent as GithubLogo } from "./Octicons-mark-github.svg";

const xFrameByPassURL = "https://x-frame-options-suarezluis.herokuapp.com/";
const wordleURL = "https://www.nytimes.com/games/wordle/index.html";
const githubURL = "https://github.com/suarezluis/wordleword";

function App() {
  const [isWordRevealed, setIsWordRevealed] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const launchDate = new Date("2021-06-19");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysSince = differenceInDays(today, launchDate);
  const wordIndex =
    daysSince <= words.length ? daysSince : daysSince - words.length;
  const todayWord = words[wordIndex];
  const toggleReveal = () => {
    setIsWordRevealed(!isWordRevealed);
  };

  return (
    <Wrapper className="App">
      {!isWordRevealed && (
        <StyledGithubLogo
          onClick={() => {
            window.open(githubURL);
          }}
        />
      )}
      <Header>
        Wordle of The Day:{" "}
        {isWordRevealed && (
          <WordOfTheDay>
            {todayWord
              .toUpperCase()
              .split("")
              .map((letter, index) => {
                return <Letter key={`letter-index-${index}`}>{letter}</Letter>;
              })}
          </WordOfTheDay>
        )}
        <RevealButton onClick={toggleReveal} isWordRevealed={isWordRevealed}>
          {isWordRevealed ? "Hide" : "Reveal"}
        </RevealButton>
      </Header>
      <Iframe
        src={`${xFrameByPassURL}?url=${wordleURL}`}
        ref={iframeRef}
      ></Iframe>

      <Bottom></Bottom>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Iframe = styled.iframe`
  width: 99vw;
  height: 95vh;
  border: none;
`;

const Bottom = styled.div``;

const RevealButton = styled.div<{
  isWordRevealed: boolean;
}>`
  background-color: ${({ isWordRevealed }) =>
    isWordRevealed ? "#b8452b" : "#6ab82b"};
  color: #fff;
  padding: 3px 5px;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;
`;

const WordOfTheDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Letter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #538d4e;
  color: #fff;
  padding: 3px 5px;
  margin: 0 2px;
  width: 20px;
  height: 25px;
`;

const StyledGithubLogo = styled(GithubLogo)`
  position: absolute;
  top: 9px;
  left: 9px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
