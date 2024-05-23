import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ContentWrapper from "../../../components/common/wrappers/content-wrapper/contentWrapper";
import { GoogleLogo } from "@phosphor-icons/react";
import { FacebookLogo } from "@phosphor-icons/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Eye } from "@phosphor-icons/react";
import { EyeSlash } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../context/reducers/userSlice";

const SigninX = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state : any) => state.userSlice.isLogin);

  console.log(isLogin)
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("*Invalid email").required("*Email is required"),
    password: Yup.string().required("*Password is required"),
  });

  const handleLogin = async (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<any>
  ) => {
    try {
      dispatch(setLogin(true));
    } catch (err: any) {
      setError({ message: err.message });
      console.log(err);
    } finally {
      setSubmitting(false);
      navigate("/home")
    }
  };

  return (
    <ContentWrapper>
      <div className="Signin">
        <div className="container">
          <div className="wrapper">
            <div className="opacity-layer" />
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="Form">
                  <h1>Login to Elysian</h1>
                  <div className="buttons">
                    <button className="btn">
                      <GoogleLogo weight="fill" />
                      Signin with Google
                    </button>
                    <button className="btn">
                      {" "}
                      <FacebookLogo />
                      Signin with Facebook
                    </button>
                  </div>
                  <div className="partition">
                    <div className="line1"></div>
                    <p>or, Login with email</p>
                    <div className="line2"></div>
                  </div>
                  <div className="Grid">
                    <div className="input-wrapper">
                      <Field type="email" placeholder="Email" name="email" />
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
                    </div>
                  </div>

                  <div className="loginBtn">
                    <button type="submit" disabled={isSubmitting}>
                      {" "}
                      {isSubmitting ? "Logging in..." : "Login now"}{" "}
                    </button>
                    <ArrowRight />
                  </div>
                  <div className="line" />
                  <div className="already">
                    <p>
                      Don't have an account? <a href="/register">Sign Up</a>
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

export default SigninX;
