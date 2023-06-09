type HangManWordProps = {
  guessedLetters: string[]
  wordToGuess: string
  reveal?: boolean
}


export function HangManWord({guessedLetters, wordToGuess, reveal = false}: HangManWordProps) {
   
    return (
      <div
        style={{
          display: "flex",
          gap: ".25em",
          fontSize: "6rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontFamily: "monospace"
        }}
      >
        {wordToGuess.split("").map((letter, index) => {
          return <span style={{ borderBottom: ".1em solid black" }} key={letter + index}>
            <span style={{
                visibility: guessedLetters.includes(letter) ||  reveal ? "visible" : "hidden",
                color: !guessedLetters.includes(letter) && reveal ? "red" : "black"
            }}
            > 
            {letter} 
            </span>
            </span>;
        })}
      </div>
    );
  }
  