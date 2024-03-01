function FormInput({
  placeholder,
  name,
  Icon,
  type = "text",
  register,
  required = true,
  error,
}) {
  return (
    <div className="form-row">
      <input
        placeholder={placeholder}
        type={type}
        className="form-input"
        {...register(name, {
          required: required ? `${placeholder} can not be empty` : required,
        })}
      />
      {Icon}

      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

export default FormInput;
