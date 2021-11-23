// Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDUSqr6HWl9PE4aIX5PvfW7oc533ZG1KBg",
   authDomain: "longevity-website-final.firebaseapp.com",
   projectId: "longevity-website-final",
   storageBucket: "longevity-website-final.appspot.com",
   messagingSenderId: "176275468074",
   appId: "1:176275468074:web:d695e51ff27140ed96b853"
};
        
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Set up register function
function register () {
    // Get all input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    favorite_food = document.getElementById('favorite_food').value
    morning_person = document.getElementById('morning_person').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Incorrect!')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false || validate_field(favorite_food) == false || validate_field(morning_person) == false) {
      alert('One or More Extra Fields is Out of Line!!')
      return
    }
   
    // Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declared user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        favorite_food : favorite_food,
        morning_person : morning_person,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      alert('User Created!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up login function
  function login () {
    // Get all input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      alert('User Logged In!!')
  
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }