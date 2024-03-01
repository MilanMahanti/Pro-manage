import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function ShowHidePassword({
  name,
  placeholder,
  register,
  required = true,
  error,
}) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = (e) => {
    e.preventDefault();
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className="form-row">
      <input
        type={passwordShown ? "text" : "password"}
        id={name}
        name={name}
        placeholder={placeholder}
        className="form-input"
        defaultValue={""}
        style={{ width: "100%" }}
        {...register(name, {
          required: required ? `${placeholder} can not be empty` : required,
        })}
      />
      <button className="svg" onClick={(e) => togglePasswordVisiblity(e)}>
        {passwordShown ? (
          <IoEyeOffOutline size={20} color="#828282" />
        ) : (
          <IoEyeOutline size={20} color="#828282" />
        )}
      </button>
      <CiLock strokeWidth={0.5} />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

export default ShowHidePassword;
