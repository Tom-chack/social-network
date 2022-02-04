import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import login from "../services/login";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, users } = useSelector((state) => state.userDuck);
  const defaultInputValues = { username: "", password: "" };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: defaultInputValues });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  const [formMessage, setformMessage] = useState("");

  useEffect(() => {
    if (isSubmitSuccessful) {
      if (user.loggedIn) {
        setformMessage("Login Succeed...");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 500);
      } else {
        setformMessage("Login Failed!");
      }
    }
  }, [isSubmitSuccessful, user, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>Login</h5>
      <hr />
      <div style={{ fontWeight: "bold", textAlign: "center" }}>{formMessage}</div>
      <div className='form-group'>
        <input
          type='text'
          {...register("username", {
            required: "This field is required.",
            maxLength: 100,
          })}
          placeholder='Username'
          className={"form-control " + (errors.username ? "is-invalid" : "")}
        />
        <div className='invalid-feedback'>{errors.username?.message}</div>
      </div>
      <div className='form-group'>
        <input
          type='password'
          {...register("password", {
            required: "This field is required.",
            min: {
              value: 3,
              message: "Password minimum length must be at least 3 characters",
            },
          })}
          placeholder='Password'
          className={"form-control " + (errors.password ? "is-invalid" : "")}
        />
        <div className='invalid-feedback'>{errors.password?.message}</div>
      </div>
      <div className='form-group form-bottom'>
        <input type='submit' name='Login' value='Login' className='btn btn-primary' />
      </div>
    </form>
  );
}

export default Login;
