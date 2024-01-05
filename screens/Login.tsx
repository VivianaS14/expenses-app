import AuthContent from "../components/Auth/AuthContent";

export default function Login() {
  return (
    <AuthContent
      onAuthenticate={({ email, password }) => console.log({ email, password })}
      isLogin
    />
  );
}
