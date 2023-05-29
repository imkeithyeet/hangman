export function HangManWord() {
    const word = "test";
    const guessedLetters = ["t", "e", "g"]
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
        {word.split("").map((letter, index) => {
          return <span style={{ borderBottom: ".1em solid black" }}>
            <span style={{
                visibility: guessedLetters.includes(letter) ? "visible" : "hidden",
            }}
            > 
            {letter} 
            </span>
            </span>;
        })}
      </div>
    );
  }
  