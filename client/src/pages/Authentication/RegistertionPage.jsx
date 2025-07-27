import React from 'react'

function RegistertionPage() {
  return (
    <>
                {/* <!-- Authentication Pages --> */}
                <div className="page " id="authPage">
            <div className="auth-container">
                <div className="auth-tabs">
                    <button className="auth-tab active" data-tab="login">Login</button>
                    <button className="auth-tab" data-tab="register">Register</button>
                </div>

                {/* <!-- Register Form --> */}
                <div className="auth-form " id="registerForm">
                    <h2>Create Account</h2>
                    <form id="registerFormEl">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="registerName" required/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" id="registerEmail" required/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input type="tel" className="form-control" id="registerPhone" required/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Location</label>
                            <select className="form-control" id="registerLocation" required>
                                <option value="">Select Location</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" id="registerPassword" required/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="registerConfirmPassword" required/>
                        </div>
                        <button type="submit" className="btn-primary btn-full-width">Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default RegistertionPage