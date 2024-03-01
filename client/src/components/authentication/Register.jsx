import FormInput from "../FormInput";
import ShowHidePassword from "../ShowHidePassword";
import { BsPerson } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSignup } from "../../queries/usesignup";
function Register() {
  const { signUp, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signUp(data);
  };
  return (
    <div className="registerform">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder="Name"
          name="name"
          type="text"
          Icon={<BsPerson strokeWidth={0.1} />}
          register={register}
          error={errors.name?.message}
        />
        <FormInput
          placeholder="Email"
          name="email"
          type="email"
          Icon={<HiOutlineEnvelope />}
          register={register}
          error={errors.email?.message}
        />
        <ShowHidePassword
          name="password"
          placeholder="Password"
          register={register}
          error={errors.password?.message}
        />
        <ShowHidePassword
          name="confirmPassword"
          placeholder="Confirm Password"
          register={register}
          error={errors.confirmPassword?.message}
        />
        <button type="submit" className="btn primary" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
      <div>
        <p style={{ color: "#828282", fontSize: "1.5rem" }}>Have an account?</p>
        <Link to="/login" className="btn secondary" disabled={isLoading}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
