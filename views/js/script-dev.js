const toggleLogin = () => {
  let slider = document.getElementById("slider");
  let loginForm = document.getElementById("login-form");
  loginForm.classList.toggle("login-form-teachers");
  slider.classList.toggle("slider-teachers");
  let loginText = loginForm.children[0].innerHTML;
  if (loginText === "Student Register") {
    loginForm.children[0].innerHTML = "Teacher Register";
    slider.children[0].innerHTML = "<h2>Not a Teacher?</h2>";
    slider.children[1].innerHTML = "Student Register";
    document.getElementById("checkbox").checked = false
  } else {
    loginForm.children[0].innerHTML = "Student Register";
    slider.children[0].innerHTML = "<h2>Not a Student?</h2>";
    slider.children[1].innerHTML = "Teacher Register";
    document.getElementById("checkbox").checked = true
  }
};
// const forgotPass = () => {
//   let forgotPass = `<div class="login-form login-forgot-pass" id="login-form">
//                       <h2>Reset Password</h2>
//                       <h6>If you do not know your current password, you can change it.</h6>
//                       <label>
//                         <span>Email</span>
//                         <input type="email" id="email"/>
//                       </label>
//                       <button type="button" class="submit btn btn-lg rounded-pill mt-3" onclick="resetPass()">Submit</button>
//                     </div>`;
//   let loginContainer = document.getElementById("login-container");
//   loginContainer.innerHTML = forgotPass;
// };

// const resetPass = () => {
//   let resetPass = `<div class="login-form" id="login-form">
//                     <h2>Student Login</h2>
//                     <label>
//                       <span>Email</span>
//                       <input type="email" id="email"/>
//                     </label>
//                     <label>
//                       <span>Password</span>
//                       <input type="password" id="password"/>
//                     </label>
//                     <div class="forgot-pass">
//                       <a onclick="forgotPass()" class="forgot-pass">Forgot password?</a>
//                     </div>
//                       <button type="button" class="submit btn btn-lg rounded-pill mt-3">Sign In</button>
//                   </div>
//                   <div class="slider" id="slider">
//                     <div style="margin: 25px; color: white;">
//                       <h2>Not a Student?</h2>
//                     </div>
//                     <button onclick="toggleLogin()" >Teacher Login</button>
//                   </div>`;
//   let loginContainer = document.getElementById("login-container");
//   loginContainer.innerHTML = resetPass;
// };

const form = document.getElementById('reg-form')
form.addEventListener('submit', registerUser)

async function registerUser(event) {
  event.preventDefault()
  const username = document.getElementById('username')
  const password = document.getElementById('password')


  await fetch ('/api/register', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      username, 
      password
    })
  }).then((res) => res.JSON)

  console.log(result)
}