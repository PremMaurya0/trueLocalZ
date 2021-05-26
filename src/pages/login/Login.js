import React,{useState} from 'react'
import { useHistory } from "react-router-dom";
import './Login.css'
import * as GlobalProvider from '../../providers/globals/globals';
import * as ApisService from "../../providers/apis/api";



function Login() {

  let history = useHistory();
  
  const [logindata,setLogindata] = useState({email:'',password:''});

let name,value;

const handleInput = (e)=>{

  name = e.target.name;
  value = e.target.value;
  setLogindata({...logindata,[name]:value});

}

const clearState = () => {
  setLogindata({email:'',password:''});
};

const loginUser= async (e)=>{
  e.preventDefault();

  ApisService.login(logindata)
  .then(response => {
    console.log(response,"==");
if(response.error==false) {
  // store user information
  GlobalProvider.setUser(response.message);
  
  history.push("/dashboard");

} else {
  clearState();
  GlobalProvider.errorMessage(response.message);

}

    
   
  }).catch(error => {
    GlobalProvider.errorMessage(error);
  
  });




}


  return (
    <>
    <div class="text-center bodydiv">
    <form method="Post" class="form-signin">
      <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      {/* <input type="email" id="inputEmail" class="form-control" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)} required autofocus /> */}
     
      <input type="email" id="inputEmail" name="email" class="form-control" placeholder="Email address" value={logindata.email} onChange={handleInput} required autofocus />
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" value={logindata.password} onChange={handleInput} required />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={loginUser} disabled={!logindata.email || !logindata.password}>Sigin</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2021-2022</p>
    </form>
</div>





    </>
  );
}

export default Login;
