export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff"
  } 
  
  return (
    <div 
      className="die" 
      style={styles}
      onClick={props.holdDie}
    >
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
