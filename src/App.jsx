import { useState, useMemo, useCallback, useId, useRef } from "react";
import "./App.css";
import { FormInput } from "./components/FormInput";

const initialFormValues = {
  username: "",
  email: "",
  dateOfBirth: "",
  resume: "",
  password: "",
  confirmPassword: "",
};

const App = () => {
  const formId = useId();
  const [values, setValues] = useState({ ...initialFormValues });
  const [touched, setTouched] = useState({});
  const btnRef = useRef();

  const markTouched = useCallback(
    (key) => setTouched((o) => ({ ...o, [key]: true })),
    []
  );
  const onChange = useCallback(
    (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value })),
    []
  );

  const handleResumeUpload = (e) => {
    const selectedFile = e.target.files[0];
    setValues((v) => ({ ...v, resume: e.target.value }));
    console.log(selectedFile);
  };

  const inputs = useMemo(
    () => [
      {
        label: "Username",
        errorMessage:
          "Username should be 3-16 characters and shouldn't include any special character",
        type: "text",
        placeholder: "Username",
        name: "username",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
      },
      {
        label: "Email",
        errorMessage: "Invalid email address",
        type: "email",
        placeholder: "Email",
        name: "email",
        required: true,
      },
      {
        label: "Birthday",
        type: "date",
        placeholder: "Birthday",
        name: "dateOfBirth",
      },
      {
        label: "Upload Resume",
        errorMessage:
          "Supported format are pdf, doc and docx. Size should be less than 10MB",
        type: "file",
        placeholder: "Upload Resume",
        name: "resume",
        required: true,
      },
      {
        label: "Password",
        errorMessage:
          "Password should be 8-20 characters and include atlease 1 letter, 1 number and 1 special character",
        type: "password",
        placeholder: "Password",
        name: "password",
        pattern: "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,20}).*$",
        required: true,
      },
      {
        label: "Confirm Password",
        errorMessage: "Passwords don't match",
        type: "password",
        placeholder: "Confirm Password",
        name: "confirmPassword",
        pattern: values.password,
        required: true,
        isLastField: true,
      },
    ],
    [values.password]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    btnRef.current.focus();
    alert(JSON.stringify(values, null, 2));
    setValues({ ...initialFormValues });
    setTouched({});
    btnRef.current.blur();
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit} autoComplete="off">
        <h2>Register</h2>
        {inputs.map((input) => (
          <FormInput
            key={input.name}
            {...input}
            formId={formId}
            value={values[input.name]}
            onChange={input.name === "resume" ? handleResumeUpload : onChange}
            touched={touched[input.name] || false}
            markTouched={() => markTouched(input.name)}
          />
        ))}
        <button type="submit" ref={btnRef}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
