import React,{useState} from 'react'
import axios from 'axios';

function FormLogin(props) {

  const {change} = props;

  async function submitData(data) {
    try {
      const response = await axios.post('http://localhost:3000/api/login/', data);
      
      if(response.data.success){
        console.log(response.data.success)
        // window.location.href = '/allwork';
      }else{
        console.log(response.data.success)
        setStatusEmailPass("Invalid Email or Password");
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusEmailPass, setStatusEmailPass] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const loginData = {
      email,
      password,
    };

    submitData(loginData);

    // Optionally, clear form fields after submission

    setPassword('');
    setStatusEmailPass('');
  };
  return (
    <>
    <form className='login-form'>
      <div className='text-inlogin'>Login</div>
      <label htmlFor='email' className='text-email'>Email</label>
      <input type='email' id='email' name='email' className='input-email' value={email} onChange={handleChange}/>
      <label htmlFor='password'className='text-passlogin'>Password</label>
      <input type='password' id='password' name='password' className='input-passlogin' value={password} onChange={handleChange}/>
      <div className='invalidlogin'>{statusEmailPass}</div>
      <div className='bg-button-login'>
          <div className='button-goto-signup'>No account? &nbsp;<a onClick={change}>Sign Up!</a></div>
          <button className='button-login' onClick={handleSubmit}>Login</button>
      </div>
    </form>
    </>
  )
}

export default FormLogin