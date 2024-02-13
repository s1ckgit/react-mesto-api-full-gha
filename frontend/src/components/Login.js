import AuthorizationElement from "./AuthorizationElement";
import Header from "./Header";


export default function Login() {

  return (
    <>
      <Header login/>
      <div className="authorization">
        <AuthorizationElement title='Вход' btnText='Войти' login/>
      </div>
    </>
  );
}
