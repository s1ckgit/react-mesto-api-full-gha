import AuthorizationElement from "./AuthorizationElement";
import Header from "./Header";

export default function Register({ authorization }) {
  return (
    <>
      <Header register/>
      <div className="authorization">
        <AuthorizationElement authorization={authorization} title='Регистрация' btnText='Зарегистрироваться'/>
      </div>
    </>
  );
}
