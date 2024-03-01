import { BsPerson } from "react-icons/bs";
import FormInput from "../components/FormInput";
import ShowHidePassword from "../components/ShowHidePassword";
import { useForm } from "react-hook-form";
import styles from "./SettingsPage.module.css";
import { useUpdateUser } from "../queries/useUpdateUser";
function SettingsPage() {
  const { handleSubmit, register, reset } = useForm();
  const { updateUser, isUpdating } = useUpdateUser();
  const onSubmit = (data) => {
    updateUser(data, {
      onSettled: () => {
        reset();
      },
    });
  };
  return (
    <div className={styles.container}>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder="Name"
          name="name"
          type="text"
          Icon={<BsPerson strokeWidth={0.1} />}
          register={register}
          required={false}
        />
        <ShowHidePassword
          name="oldPassword"
          placeholder="Old Password"
          required={false}
          register={register}
        />
        <ShowHidePassword
          name="newPassword"
          placeholder="New Password"
          required={false}
          register={register}
        />
        <button type="submit" className="btn primary" disabled={isUpdating}>
          Update
        </button>
      </form>
    </div>
  );
}

export default SettingsPage;
