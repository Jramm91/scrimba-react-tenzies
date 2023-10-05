export default function RollBtn(props) {
    
    return (
        <button className="roll-btn" onClick={props.tenzies ? props.newGame : props.roll}>{!props.tenzies ? "Roll" : "New Game"}</button>
    )
}