import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import 'animate.css';

const soccerPlayers: { [key: string]: string } = {
  nesta: "Italy",
  klose: "Germany",
  henry: "France",
  pires: "France",
  pirlo: "Italy",
  vieri: "Italy",
  keane: "Ireland",
  totti: "Italy",
  terry: "England",
  puyol: "Spain",
  pique: "Spain",
  ramos: "Spain",
  viera: "France",
  silva: "Spain/ Portugal",
  petit: "France",
  kafes: "Greece",
  lakis: "Greece",
  senna: "Spain",
  navas: "Spain",
  costa: "Brazil",
  pedro: "Spain",
  fonte: "Portugal",
  alves: "Portugal",
  villa: "Spain",
  blanc: "France",
  mario: "Portugal",
  rossi: "Italy",
  turan: "Turkey",
  guiza: "Spain",
  gomes: "Portugal",
  payet: "France",
  vardy: "England",
  vokes: "Wales",
  pelle: "Italy",
  allen: "Wales",
  kante: "France"
};

function App() {
  const [guess, setGuess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [strWord, setStrWord] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [guessCount, setGuessCount] = useState<number>(6);
  const [players, setPlayers] = useState<Set<string>>(new Set(Object.keys(soccerPlayers)))
  const [hint, setHint] = useState<string>("");
  const [ruleDisplay, setRuleDisplay] = useState<boolean>(false);
  const [ruleDisplayClass, setRuleDisplayClass] = useState<string>("animate__animated animate__fadeIn")

  interface CountInfo {
    count: number;
    index: number[];
    matches: number;
  }


  useEffect(() => {

    console.log("use effect called")
    newWord()

  }, []);

  const newWord = async () => {
    if (players.size < 1) setPlayers(new Set(Object.keys(soccerPlayers)))

    let idx = Math.floor(Math.random() * players.size)
    const newWord: string = Object.keys(soccerPlayers)[idx];
    setHint(soccerPlayers[newWord])
    setStrWord(newWord);
  }

  const handleReset = () => {
    setGuessCount(6);
    setGuesses([]);
    setGameWon(false);
    setError("");
    newWord();
  };

  async function fetchWordDefinition(guess: string) {

    return players.has(guess.toLowerCase())
  }

  const handleGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 5 || !alphaOnly(value) && value !== "") return;
    setGuess(value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validWord = await fetchWordDefinition(guess);

    if (!validWord) {
      setError("Not a player")
      return
    };

    if (guess.length < 5) {
      setError("Make sure you have a 5 letter guess");
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

    const checkCount = {} as { [key: string]: CountInfo }

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

  const alphaOnly = (string: string) => {
    var pattern = new RegExp(/^[a-zA-Z]+$/);
    return pattern.test(string);
  };

  const handleRuleDisplay = () => {
    if (ruleDisplay) {
      setRuleDisplayClass("animate__animated animate__fadeOutDown")
      
      setTimeout(() => {
        setRuleDisplay(!ruleDisplay)
      }, 1000)

    } else{
      setRuleDisplayClass("animate__animated animate__fadeInUp")
      setRuleDisplay(!ruleDisplay)

    }
  }


  return (
    <>
      <h1>Euro Wordle</h1>
      <h4>Guess the European Championship Player from 2000 - 2020</h4>
      <button onClick={handleRuleDisplay}>Rules</button>
      <p>{gameWon ? "Congratulations" : ""}</p>
      <p>{guessCount < 3 ? `Hint: ${hint}` : ""}</p>
      <p>{guessCount > 0 ? `Guess Left: ${guessCount}` : `Game Over! The player was ${strWord}`}</p>
      <input
        style={{ margin: "0 0 8px 0", minWidth: "300px", minHeight: "40px", fontSize: "30px", textAlign: "center" }}
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
              
              console.log(guessObj)
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
                  className={`animate__animated animate__flipInX`}
                >
                  <p style={{ color: letter === "r" ? "white" : "black", fontSize: "30px", padding: 0, margin: 0 }}>
                    {l.toLowerCase()}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button style={{ display: gameWon || guessCount === 0 ? "block" : "none", margin: "auto"}} className="animate__animated animate__fadeInUp" onClick={handleReset} type="button">Reset</button>

      <div onClick={handleRuleDisplay} className={ruleDisplayClass} style={{cursor: "pointer", background: "black", position: "absolute", display: ruleDisplay ? "flex" : "none", alignContent: "center", justifyContent: "center", verticalAlign: "middle", flexDirection: "column", border: "1px solid white", top: "20%", left:"0", right: "0", marginLeft: "auto", marginRight: "auto", padding: "2%", maxWidth: "430px", width:"90%", minWidth: "420px" }}>
        <h3 style={{ padding: 0, margin: 0 }}>Rules</h3>
        <div style={{ justifyContent: "left", alignItems: "center", display: "flex", maxWidth: "500px", marginLeft: "17%" }}>
          <div style={{ height: "20px", width: "20px", background: "#242424", display: "inline-block", color: "white" }}>e</div><span style={{ verticalAlign: "middle", marginLeft: "2px" }}> The letter is not in the word</span>
        </div>
        <div style={{ justifyContent: "left", alignItems: "center", display: "flex", maxWidth: "500px", marginLeft: "17%" }}>
          <div style={{ height: "20px", width: "20px", background: "yellow", display: "inline-block", color: "black" }}>e</div><span style={{ verticalAlign: "middle", marginLeft: "2px" }}> The letter is somewhere in the word</span>
        </div>
        <div style={{ justifyContent: "left", alignItems: "center", display: "flex", maxWidth: "500px", marginLeft: "17%" }}>
          <div style={{ height: "20px", width: "20px", background: "green", display: "inline-block", color: "black" }}>e</div><span style={{ verticalAlign: "middle", marginLeft: "2px" }}> The letter is in the correct position</span>
        </div>

      </div>

    </>
  );
}

export default App;
