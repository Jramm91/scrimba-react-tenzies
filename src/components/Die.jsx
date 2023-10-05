export default function Die(props) {
  const { value } = props;
  return (
    <div className="die">
      <h2 className="die-num">{value}</h2>
    </div>
  );
}
