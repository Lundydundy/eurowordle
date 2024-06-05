import { useEffect, useState } from 'react';
import './App.css';
import 'animate.css';

const soccerPlayers = [
  "nesta",
  "klose",
  "henry",
  "pires", 
  "pirlo",
  "vieri",
  "keane",
  "totti",
  "terry",
  "giggs",
  "puyol",
  "pique",
  "ramos"
];

function App() {
  const [guess, setGuess] = useState("");
  const [error, setError] = useState("");
  const [strWord, setStrWord] = useState("");
  const [guesses, setGuesses]: any = useState([]);
  const [gameWon, setGameWon]: any = useState(false);
  const [guessCount, setGuessCount]: any = useState(6);
  const [players, setPlayers]: any = useState(new Set(soccerPlayers))


  
  useEffect(() => {

    console.log("use effect called")
    newWord()

  }, []);

  const newWord = async () => {
        if(players.size < 1) setPlayers(soccerPlayers)
        let idx = Math.floor(Math.random() * soccerPlayers.length)
        const newWord = soccerPlayers[idx];
        console.log("newword", newWord);
        setStrWord(newWord);
       
  }

  const handleReset = () => {
    setGuessCount(6);
    setGuesses([]);
    setGameWon(false);
    setError("");
    newWord();
  };

  async function fetchWordDefinition(guess: any) {

    return players.has(guess.toLowerCase())
  }

  const handleGuess = (e: any) => {
    const value = e.target.value;
    if (value.length > 5 || !alphaOnly(value) && value !== "") return;
    setGuess(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const validWord = await fetchWordDefinition(guess);

    if (!validWord) {
      setGuess("");
      setError("Not a player")
      return
    };

    if (guess.length < 5) {
      setError("Make sure you have a 5 letter guess");
      setGuess("");
      return;
    }
    setError("");
    const result = checkGuess(guess.toLowerCase());
    if (result.join("") === "ggggg") setGameWon(true)

    setGuessCount(guessCount - 1);
    setGuesses((prevGuesses: any) => [...prevGuesses, { guess, result }]);
    setGuess("");
  };

  const checkGuess = (g: string) => {
    console.log(strWord);

    const checkCount = {} as any

    for (let i = 0; i < 5; i++) {
      if (checkCount[strWord[i]]) {
        checkCount[strWord[i]].count += 1;
        checkCount[strWord[i]].index.push(i);
      } else {
        checkCount[strWord[i]] = {
          count: 1,
          index: [i],
          matches: 0
        };
      }
    }

    for (let i = 0; i < 5; i++) {
      if (checkCount[g[i]]) {
        checkCount[g[i]].index.forEach((idx: number) => {
          if (i === idx) {
            checkCount[g[i]].matches += 1;
            checkCount[g[i]].count -= 1;
          }
        })
      }
    }

    let ans = "";

    for (let i = 0; i < 5; i++) {
      if (checkCount[g[i]]) {
        let bool: boolean = false;
        checkCount[g[i]].index.forEach((idx: number) => {
          if (i === idx) {
            ans += "g";
            bool = true;
          }
        })

        if (bool) continue;

        if (checkCount[g[i]].count > 0) {
          ans += "y";
          checkCount[g[i]].count -= 1;
        } else {
          ans += "r";
        }
      } else {
        ans += "r";
      }
    }
    console.log(ans);
    return ans.split("");
  };

  const alphaOnly = (event: any) => {
    var pattern = new RegExp(/^[a-zA-Z]+$/);
    return pattern.test(event);
  };



  return (
    <>
      <p>{gameWon ? "Congratulations" : "Guess the Word"}</p>
      <p>{guessCount > 0 ? `Guess Left: ${guessCount}` : `Game Over!`}</p>
      <input
        style={{ margin: "0 0 3px 0", minWidth: "300px", minHeight: "40px", fontSize: "30px", textAlign: "center" }}
        onChange={handleGuess}
        type="text"
        placeholder="Type guess here"
        value={guess}
      />
      <button style={{ display: gameWon || guessCount < 1 ? "none" : "block", margin: "auto" }} onClick={handleSubmit}>
        Check
      </button>
      <p style={{ margin: "5px", padding: 0 }}>{error}</p>

      <div>
        {guesses.map((guessObj: any, i: number) => (
          <div key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {guessObj.result.map((letter: string, index: number) => {

              const l = guessObj.guess[index];

              return (
                <div
                  key={index}
                  style={{
                    width: "50px",
                    height: "50px",
                    background: letter === "g" ? "green" : letter === "y" ? "yellow" : "transparent",
                    border: "2px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "2px",
                  }
                  }
                  className={`animate__animated animate__flipInX animate-delay-${i}`}
                >
                  <p style={{ color: letter === "r" ? "white" : "black", fontSize: "30px", padding: 0, margin: 0 }}>
                    {l}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button style={{ display: gameWon || guessCount === 0 ? "block" : "none", margin: "auto" }} onClick={handleReset} type="button">Reset</button>
    </>
  );
}

export default App;
