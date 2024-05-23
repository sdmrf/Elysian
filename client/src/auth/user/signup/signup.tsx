import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ContentWrapper from "../../../components/common/wrappers/content-wrapper/contentWrapper";
import { GoogleLogo } from "@phosphor-icons/react";
import { FacebookLogo } from "@phosphor-icons/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Eye } from "@phosphor-icons/react";
import { EyeSlash } from "@phosphor-icons/react";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";

const SignupX = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("*First Name is required"),
    lastName: Yup.string().required("*Last Name is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required")
      .matches(
        /^[a-z][a-z0-9.]*@gmail\.com$/,
        "*Email must be a valid Gmail address"
      ),
    password: Yup.string()
      .required("*Password is required")
      .matches(
        /^(?=.*[A-Z])[a-zA-Z\d@#.$%^&*!_]{6,}$/,
        "*Password must be at least 6 characters with at least one capital letter and 2 or more integers"
      ),
  });

  const getPasswordStrength = (value: string) => {
    if (value.length >= 6) {
      if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d)/.test(value)) {
        return "Strong";
      } else if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return "Moderate";
      } else {
        return "Weak";
      }
    } else {
      return "";
    }
  };

  // Handle form submission
  const handleSubmit = async (
    values: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
    { setSubmitting }: FormikHelpers<any>
  ) => {
    const { firstName, lastName, email, password } = values;
    const body = {
      username: `${firstName} ${lastName}`,
      email,
      password,
    };
    try {
      navigate("/login");
    } catch (err: any) {
      setError({ message: err.message });
      console.error(err);
    } finally {
      setSubmitting(false);
      navigate("/login");
    }
  };

  return (
    <ContentWrapper>
      <div className="Signup">
        <div className="container">
          <div className="wrapper">
            <div className="opacity-layer" />
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, errors, touched }) => (
                <Form className="Form">
                  <h1>Create An Account</h1>
                  <div className="buttons">
                    <button className="btn">
                      <GoogleLogo weight="fill" />
                      Signup with Google
                    </button>
                    <button className="btn">
                      {" "}
                      <FacebookLogo weight="fill" />
                      Signup with Facebook
                    </button>
                  </div>
                  <div className="partition">
                    <div className="line1"></div>
                    <p>or, Register with email</p>
                    <div className="line2"></div>
                  </div>
                  <div className="Grid">
                    <div className="input-wrapper">
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                      />
                      {errors.firstName && touched.firstName && (
                        <ErrorMessage
                          name="firstName"
                          render={(msg) => <div className="error">{msg}</div>}
                        />
                      )}
                    </div>
                    <div className="input-wrapper">
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                      />
                      {errors.lastName && touched.lastName && (
                        <ErrorMessage
                          name="lastName"
                          render={(msg) => <div className="error">{msg}</div>}
                        />
                      )}
                    </div>
                    <div className="input-wrapper">
                      <Field type="email" name="email" placeholder="Email" />
                      {errors.email && touched.email && (
                        <ErrorMessage
                          name="email"
                          render={(msg) => <div className="error">{msg}</div>}
                        />
                      )}
                    </div>
                    <div className="input-wrapper">
                      <div className="input">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                        />
                        <span
                          className="eye-icon"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeSlash weight="fill" />
                          ) : (
                            <Eye weight="fill" />
                          )}
                        </span>
                      </div>
                      {errors.password && touched.password && (
                        <ErrorMessage
                          name="password"
                          render={(msg) => <div className="error">{msg}</div>}
                        />
                      )}
                      {values.password && (
                        <div
                          className={`password-strength ${getPasswordStrength(
                            values.password
                          )}`}
                        >
                          {getPasswordStrength(values.password)}
                          <div
                            className={`line ${getPasswordStrength(
                              values.password
                            )}`}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="createBtn">
                    <button
                      className="btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                    </button>
                    <ArrowRight />
                  </div>
                  <div className="line" />
                  <div className="already">
                    <p>
                      Already have an account? <a href="/login">Sign In</a>
                    </p>
                  </div>
                  {error && <div className="error">{error.message}</div>}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default SignupX;
