import { useState, useEffect } from 'react';
import Die from './components/Die';
import RollBtn from './components/RollBtn';
import { nanoid } from 'nanoid';
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollRecord, setRollRecord] = useState(0);
  const [rollCounter, setRollCounter] = useState(0);
  const [gameCounter, setGameCounter] = useState(0);
  
  useEffect(() => {
    const allDiceHeld = dice.every(die => die.isHeld)
    const firstDiceValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstDiceValue)
    if(allDiceHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice]);


  // creates array of randome dice numbers 1-6
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }
  function newGame() {
    setTenzies(false)
    const isNewRecord = rollCounter < rollRecord
    if (rollRecord === 0) {
      setRollRecord(rollCounter)
    }
    else if(isNewRecord){
      setRollRecord(rollCounter)
    }
    setRollCounter(0)    
    setGameCounter(prevCount => prevCount +1)
    setDice(allNewDice())
  }
  
 
  const diceEls = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDie={() => holdDie(die.id)}
      />
    );
  });

  function holdDie(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  function roll() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld
          ? die
          : {
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid(),
            };
      })
    );
    setRollCounter(prevCount => prevCount + 1)
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-grid">{diceEls}</div>
      <RollBtn roll={roll} tenzies={tenzies} newGame={newGame}/>
      <div className='counters'>
        <span className='record-counter'>
          <h3>Roll Record</h3>
          <p>{rollRecord}</p>
        </span>
        <span className='roll-counter'>
          <h3>Roll Counter</h3>
          <p>{rollCounter}</p>
        </span>
        <span className='game-counter'>
          <h3>Game Counter</h3>
          <p>{gameCounter}</p>
        </span>
      </div>
    </main>
  );
}

export default App;
