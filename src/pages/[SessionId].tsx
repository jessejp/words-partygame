import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./index.module.css";
import gameStyles from "./game.module.css";
import WordCategories from "../components/WordCategories/WordCategories";
import { trpc } from "../utils/trpc";

const DUMMY_WORDS = [
  "Koira",
  "Raketti",
  "Donitsi",
  "Pakettiauto",
  "Rosvo",
  "Kana",
  "Hiusharja",
  "Kuulokkeet",
  "Pehmolelu",
  "Sierain",
  "Rehtori",
  "Kuu",
  "Naamataulu",
  "Palveluala",
  "Lukukausi",
  "Soitin",
  "Näkökyky",
  "Panttilainaamo",
  "Amorinkaari",
  "Nuohooja",
  "Lomalento",
  "Räyhähenki",
  "Naula",
  "Pöydänjalka",
];

const DUMMY_PLAYERS = [
  "Jesse",
  "Tatu",
  "Tatu",
  "Rasse",
  "Tommi",
  "Riina",
  "Aapo",
  "Lotta",
  "Sakri",
  "Joona",
];

const SessionId: NextPage = () => {
  //cant be set default here since refresh would break player's session.
  const [gameReady, setGameReady] = useState(false);

  return (
    <div className={styles.containerOuter}>
      {!gameReady && (
        <Lobby
          onSetGameReady={() => {
            setGameReady(true);
          }}
        />
      )}
      {gameReady && <GameView />}
    </div>
  );
};

const Lobby: React.FC<{ onSetGameReady: () => void }> = (props) => {
  const nextRouter = useRouter();
  const lobbySession = nextRouter.query.SessionId;

 // const getSession = trpc.useQuery(["getSession", { session: lobbySession }]);

  return (
    <>
      <div className={styles.containerInner}>
        <h1 className={styles.title}>LOBBY: {lobbySession}</h1>
        <div>
          <h3>Players:</h3>
          <div>
            {DUMMY_PLAYERS.map((player, index) => (
              <span key={`${player}${index}`}>
                {player}
                {++index !== DUMMY_PLAYERS.length && ","}{" "}
              </span>
            ))}
            ...
          </div>
        </div>
        <button onClick={props.onSetGameReady}>READY</button>
      </div>

      <div className={styles.containerInner}>
        <WordCategories />
      </div>
    </>
  );
};

const GameView = () => {
  const [suggestedWords, setSuggestedWords] = useState<string[]>([]);

  /* suggested word is going to have to be an object with the playername that suggested the word
    multiple players can suggest the same word
    logic will have to only filter the word out if no player suggests it
  */
  const updateSuggestedWords = (eventWord: string) => {
    const word = suggestedWords.find(
      (suggestions) => suggestions === eventWord
    );

    if (word) {
      setSuggestedWords((state) => state.filter((f) => f !== word));
    } else {
      setSuggestedWords((state) => [...state, eventWord]);
    }
  };

  return (
    <div className={styles.containerInner}>
      <div className={`${gameStyles.suggestionGrid} ${gameStyles.grid}`}>
        {suggestedWords.map((word, index) => (
          <SuggestionCard
            key={index + "suggestions"}
            word={word}
            playerName={["Jesse", "Tommi", "Riina", "Tatu"]}
          />
        ))}
      </div>

      <div className={`${gameStyles.wordGrid} ${gameStyles.grid}`}>
        {DUMMY_WORDS.map((word, index) => (
          <WordCard
            key={index + "words"}
            word={word}
            onUpdateSuggestedWords={updateSuggestedWords}
          />
        ))}
      </div>

      <div className={gameStyles.playersUI}>
        <div className={gameStyles.clueMaster}>
          <div>JESSE</div>
          <div className={gameStyles.clueContainer}>
            <div>SÄHKÖ</div>
            <div>3</div>
          </div>
        </div>
        <div className={gameStyles.team}>
          {DUMMY_PLAYERS.slice(3, 5).map((player, index) => (
            <span key={`${player}${index}`}>
              {player}
              {++index !== DUMMY_PLAYERS.length && ","}{" "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SuggestionCard: React.FC<{
  word: string;
  playerName: string[];
}> = (props) => {
  return (
    <div className={gameStyles.suggestionBlock}>
      <div className={gameStyles.suggestionPlayersGrid}>
        {props.playerName?.map((player) => (
          <span className={gameStyles.suggestionPlayerName}>{player}</span>
        ))}
      </div>

      <div>{props.word}</div>

      <div>
        <button>KÄÄNNÄ</button>
      </div>
    </div>
  );
};

const WordCard: React.FC<{
  word: string;
  onUpdateSuggestedWords: (word: string) => void;
}> = (props) => {
  const [selected, setSelected] = useState(false);

  const onWordSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelected((state) => !state);

    const button: HTMLButtonElement = event.currentTarget;
    props.onUpdateSuggestedWords(button.name);
  };

  return (
    <button
      className={`${gameStyles.wordGridCard} ${
        selected ? gameStyles.active : gameStyles.inactive
      }`}
      name={props.word}
      onClick={onWordSelection}
    >
      {props.word}
    </button>
  );
};

export default SessionId;
