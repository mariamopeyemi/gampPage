import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import Logo from '../Assets/logo.png';
import ArtBoard from '../Assets/gamp-artboard.png';
// import Protection from "./protection";

const LogIn = () => {
        // let navigate = useNavigate();
        const userInfo = (values) => {
          fetch(`https://gamp-server-staging.herokuapp.com/v1/auth/login`, {
            method:"POST",
            }, values)
          .then((response) =>{
            localStorage.setItem("token", response.data.accessToken)
            console.log(response);
            // navigate('/protection');
          })
        }
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
            .required('Please Enter your login password!'),
            
          }),
            onSubmit: values => {
            const data = {
              email: values.email,
              password: values.password
            }
            userInfo(data)
        },
    });

    // const validate = (values) => {
    //     let errors = {};
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //     if (!values.email) {
    //       errors.email = "Email is required";
    //     } else if (!regex.test(values.email)) {
    //       errors.email = "Invalid Email";
    //     }
    //     if (!values.password) {
    //       errors.password = "Password is required";
    //     } else if (values.password.length < 4) {
    //       errors.password = "Password too short";
    //     }
    //     return errors;
    //   };

    return (
        <div className={styles.mainSection}>
            <div className = {styles.firstSection}>
               <div> 
               <form className = {styles.firstSectionBoard} onSubmit={formik.handleSubmit}>
                    <img className={styles.logoImg} src={Logo} alt="logo"/>
                    <input 
                        className ={styles.inputStyle}
                        type="text"
                        placeholder="Enter Address or Phone Number"
                        onChange={formik.handleChange}
                        // value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
                    <input 
                        className ={styles.inputStyle}
                        type="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        // value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
         <div>{formik.errors.password}</div>
       ) : null}
                    <button 
                        type="submit"
                        className ={styles.submit}>
                            Sign In
                    </button>
                    <h5>Forgot Password?</h5>
                </form>
               </div>
               <p> &copy;GAMP</p>
            </div>
            
            <div className = {styles.secondSection}>
                <img className={styles.artBoard} src={ArtBoard} alt="Art Board"/>
            </div>
            
        </div>
    )
}

export default LogIn
