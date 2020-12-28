export default function RegisterForm(props) {
  const { showLoginForm } = props;
  return (
    <div>
      <h1>registro</h1>
      <button onClick={showLoginForm}>login</button>
    </div>
  );
}
