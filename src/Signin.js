import { Formik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { AuthContext } from "./Helper/Context";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("wrong email")
    .required("email is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(6, "Password must be at least 6 characters"),
});

const Signin = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          const login = async () => {
            try {
              const user = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );
              console.log(user);
              navigate("/");
            } catch (error) {
              console.log(error.message);
            }
          };
          console.log(values.email);
          login();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login flex  justify-center h-96 items-center ">
            {/* Passing handleSubmit parameter tohtml form onSubmit property */}
            <form noValidate onSubmit={handleSubmit}>
              <div className="text-6xl m-10 ml-32">Admin</div>
              {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}

              <div className="  p-10 shadow-md">
                <div className="mb-5">
                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter email"
                    className="border-2 border-gray-400 bg-gray-100 rounded p-2 focus:outline-none focus:border-2 focus:border-blue-400"
                    id="email"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-sm italic text-red-500 px-10">
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="border-2 bg-gray-100 border-gray-400 rounded p-2 focus:outline-none focus:border-2 focus:border-blue-400"
                />
                {/* If validation is not passed show errors */}
                <p className="text-sm italic text-red-500 px-10">
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Click on submit button to submit the form */}
                <div className="justify-center flex">
                  <button
                    type="submit"
                    className=" py-2 px-10 mt-10 bg-blue-900 text-white border-2 rounded-md  hover:bg-blue-400 transition ease-out duration-500"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="p-4">
              <h1>email: admin01@gmail.com</h1>
              <h1>password: admin01</h1>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
