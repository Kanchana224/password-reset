import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage or cookies
        localStorage.setItem('token', data.token);
        setLoginMessage('Login successful ✔️');
        setIsLoginSuccessful(true);
      } else {
        setLoginMessage(`User not found ❌: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginMessage('Error during login. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-dark fs-5">Login Page</h5>
              {isLoginSuccessful ? (
                <h4> 🎇🎉Successfully login to Backend ✔✔ </h4>
              ) : (
                <form onSubmit={handleLogin}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Enter Your Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="d-grid">
                    <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
                      Login
                    </button>
                  </div>
                </form>
              )}
              {loginMessage && (
                <div
                  className={`alert ${isLoginSuccessful ? 'alert-success' : 'alert-danger'} mt-3`}
                  role="alert"
                >
                  {loginMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
