import React, { useState, useEffect, useCallback } from 'react';
import words from "./wordList.json";
import { HangmanDrawing } from './HangmanDrawing';
import { HangManWord } from './HangmanWord';
import { Keyboard } from './Keyboard';

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState(new Set<string>());

  const incorrectLetters = Array.from(guessedLetters).filter(
    letter => !wordToGuess.includes(letter)
  );
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.has(letter));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.has(letter) || isLoser || isWinner) return;
    setGuessedLetters(currentLetters => new Set([...currentLetters, letter]));
  }, [guessedLetters, isWinner, isLoser]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters, addGuessedLetter]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;
      e.preventDefault();
      setGuessedLetters(new Set());
      setWordToGuess(getWord());
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center"
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try! - Refresh to try again"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangManWord
        reveal={isLoser}
        guessedLetters={Array.from(guessedLetters)}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={Array.from(guessedLetters).filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
