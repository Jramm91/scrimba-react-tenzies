import { useState, useEffect } from 'react';
import Die from './components/Die';
import RollBtn from './components/RollBtn';
import { nanoid } from 'nanoid';

function App() {
  const [dice, setDice] = useState(allNewDice());

  // creates array of randome dice numbers 1-6
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: true,
        id: nanoid()
      });
    }
    return newDice;
  }

  const diceEls = dice.map((die) => {
    return <Die key={die.id} value={die.value} />;
  });

  function roll() {
    setDice(allNewDice());
  }
  return (
    <main>
      <div className="dice-grid">{diceEls}</div>
      <RollBtn roll={roll} />
    </main>
  );
}

export default App;
