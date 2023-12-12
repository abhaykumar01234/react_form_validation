import s from "./formInput.module.css";

export const FormInput = ({
  formId,
  label,
  errorMessage,
  isLastField,
  type,
  touched,
  markTouched,
  ...inputProps
}) => {
  const id = `${formId}-${inputProps.name}`;

  return (
    <div className={s.field}>
      <input
        {...inputProps}
        id={id}
        type={type}
        onFocus={() => isLastField && markTouched()}
        onBlur={() => type !== "file" && markTouched()}
        data-touched={touched.toString()}
      />
      <label htmlFor={id}>{label}</label>
      <p className={s.error}>
        <span>{errorMessage}</span>&nbsp;
      </p>
    </div>
  );
};
