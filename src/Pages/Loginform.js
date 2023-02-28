import { useEffect, useState } from "react";
import axios from 'axios';
 function Loginform() {
   
 const [Emailaddress, setEmailaddress] = useState("");
 const [Password, setPassword] = useState("");
 const [ConfirmPassword, setConfirmPassword] = useState("");
 const [token, settoken] = useState(""); 
 const [loginStatus, setloginStatus] = useState("null");  
  /*procesing, success, error */
 
    


    const emailAddressChangeHandler = (e) => {
        
        console.log("input values: ", e.target.value);
        setEmailaddress(e.target.value)
      };

      const passwordChangeHandler = (e) => {
        
        console.log("input values: ", e.target.value);
        setPassword(e.target.value)
      };

      const confirmpasswordChangeHandler = (e) => {
        
        console.log("input values: ", e.target.value);
        setConfirmPassword(e.target.value)
      };
    
       
      
      const loginClickHandler = () => {

        setloginStatus ("process");
        const data = {
            email: Emailaddress,
            Password: Password,         
        };

        console.log("request data:", data);

      axios
      .post("https://reqres.in/api/register", data)
      .then((res) => {
      
      console.log("this is successfull", res.data)
        const response = res.data;
        settoken(res.data.token);

        setloginStatus ("success");


       if (response) {
        const token = response.token;
        console.log("token:", token)
       }


      })
      .catch((err) => {
        console.log("there is an error", err)
      })
    };

    useEffect (() =>{
    
    }, [])



let hasValues = Emailaddress && Password && ConfirmPassword;

let ispasswordMatch =
Password && ConfirmPassword && Password === ConfirmPassword;

let isValid = hasValues && ispasswordMatch; 


return (
    <div id={"Loginform"}>



        {loginStatus === "success"? (
        
        <div>
            <h3>login successfull</h3>
            
            {token}
            </div>
        
        ) : (
            <>
            <form className={"form"}>
            <h1>form</h1>
            {!hasValues ? (
                <div className={'Invalid'}>All fields are required</div>
              ) : ( 
                ""
            )}
    
              {!ispasswordMatch ? (
              <div className={'Invalid'}>Invalid Password</div>
              ) : ( 
                ""
              )}
    
    
            <div className={"form-group"}>
              <label>
                <strong>
                <h3>"Email Address":</h3>
                </strong>
                </label>
              <input
                name={"emailAddress"}
                value={Emailaddress}
                onChange={emailAddressChangeHandler} />
            </div>
    
            <div className={"form-group"}>
              <label>
                <strong>
                <h3>"Password":</h3>
                </strong>
                </label>
              <input 
              name={"Password"} 
              type={'password'}
              value={Password} 
              onChange ={passwordChangeHandler} />
            
            </div>
    
            <div className={"form-group"}>
              <label>
                <strong><h3>"Confirm Password":</h3>
                </strong>
                </label>
              <input name={"Confirm_Password"} 
              type={'password'} 
              value={ConfirmPassword} 
              onChange ={confirmpasswordChangeHandler} />
            </div>
            
            <br />
    
    
          { loginStatus === "procesing"? (
          
           <div>procesing</div>
            ) : (
                
            <button 
            disabled={!isValid} 
            type={'button'}
            onClick={loginClickHandler}
            >
            Register
           </button>
            )}
    
    
            </form>
         </>
        )}
            
        </div>

    )
}
export default Loginform;