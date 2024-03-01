import { useForm } from "react-hook-form";
import FormInput from "../FormInput";
import { HiOutlineEnvelope } from "react-icons/hi2";
import ShowHidePassword from "../ShowHidePassword";
import { Link } from "react-router-dom";
import { useLogin } from "../../queries/useLogin";
import SpinnerMini from "../SpinnerMini";

function Login() {
  const { isLoading, login } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    login(data);
  };
  return (
    <div className="registerform">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder="Email"
          type="email"
          name="email"
          register={register}
          Icon={<HiOutlineEnvelope />}
          error={errors.email?.message}
        />
        <ShowHidePassword
          name="password"
          placeholder="Password"
          register={register}
          error={errors.password?.message}
        />

        <button type="submit" className="btn primary" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Login"}
        </button>
      </form>
      <div>
        <p>Dont have an account yet?</p>
        <Link to="/register" className="btn secondary" disabled={isLoading}>
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
