export default function FormLogin(props) {
  const { showResgisterForm } = props;
  return (
    <div>
      <h1>login</h1>
      <button onClick={showResgisterForm}>registro</button>
    </div>
  );
}
