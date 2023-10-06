import AuthorizationElement from "./AuthorizationElement";
import Header from "./Header";

export default function Register() {
  return (
    <>
      <Header register/>
      <div className="authorization">
        <AuthorizationElement title='Регистрация' btnText='Зарегистрироваться' register={true}/>
      </div>
    </>
  )
}
