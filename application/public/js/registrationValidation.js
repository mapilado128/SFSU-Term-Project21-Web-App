const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
   let messages = []
   if (username.value === '' || username.value == null) {
       messages.push('! - Username cannot be blank')
       setError(username);
   }
   else if(!isUNumValid(username.value)){
       messages.push('! - Username must have at least 3 alphanumeric values')
       setError(username);
   }
   else if(!isUCharValid(username.value)){
       messages.push('! - Username must begin with a letter')
       setError(username);
   }
   if(!isEmValid(email.value)){
       messages.push('! - Invalid Email')
       setError(email);
   }
   if(!isPNumValid(password.value)){
       messages.push('! - Password must contain 8 or more characters')
       setError(password);
   }
   if(!isPCapValid(password.value)){
       messages.push('! - Password must have at least 1 upper case letter')
       setError(password);
   }
   if(!isPNumEValid(password.value)){
       messages.push('! - Password must have at least 1 number')
       setError(password);
   }
   if(!isPSymValid(password.value)){
       messages.push('! - Password must have at least 1 of the following: / * - + ! @ # $ ^ &')
       setError(password);
   }
   if(password.value !== cpassword.value){
       messages.push('! - Passwords don\'t match!')
       setError(cpassword);
   }
   if (messages.length > 0) {
       e.preventDefault()
       errorElement.innerText = messages.join('\n')
   }
})
function isUCharValid(username){
   return  /^[a-zA-Z][a-zA-Z0-9]/.test(username);
}
function isUNumValid(username){
   return username.length >= 3;
}
function isPNumValid(password){
   return password.length >= 8;
}
function isPCapValid(password){
   return /(?=.*[A-Z])/.test(password);
}
function isPNumEValid(password){
   return /(?=.*[0-9])/.test(password)
}
function isPSymValid(password){
   return /(?=.*[-!@#$^&*+/])/.test(password);
}
function isEmValid(email){
   return /(?=.*[@.])/.test(email);
}
function setError(input){
   const formControl = input.parentElement;
   formControl.className = 'form-control error';
}