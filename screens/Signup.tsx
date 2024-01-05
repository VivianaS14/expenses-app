import AuthContent from "../components/Auth/AuthContent";

export default function SignUp() {
  return (
    <AuthContent
      onAuthenticate={({ email, password }) => console.log({ email, password })}
      isLogin={false}
    />
  );
}
