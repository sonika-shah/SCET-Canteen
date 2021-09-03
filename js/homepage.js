
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBlutfYepy5NYaTXhyPHBGRi1R_FpMsH_w",
  authDomain: "canteen-f6242.firebaseapp.com",
  databaseURL: "https://canteen-f6242.firebaseio.com",
  projectId: "canteen-f6242",
  storageBucket: "canteen-f6242.appspot.com",
  messagingSenderId: "200647121396",
  appId: "1:200647121396:web:b2d25fcaf1c1cec14441a1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
var orderStatus = 0;
function signUp() {
  var email = document.getElementById("email_field");
  var password = document.getElementById("password_field");

  const promise = auth.createUserWithEmailAndPassword(email_field.value, password_field.value);
  promise.catch(e => alert(e.message + " .Please try again"));
  const user = firebase.auth().currentUser;
  $('#signupModal').modal('hide');

}

function login() {
  var email = document.getElementById("login_email");
  var password = document.getElementById("login_password");
  if (login_email.value == "admin@scet.in" && login_password.value == "adminscet") {
    window.location.href = "http://localhost/NewDE/admin/dist/admin.html";
  }
  firebase.auth().signInWithEmailAndPassword(login_email.value, login_password.value).then((userCredential) => {
    var user = userCredential.user;
    $('#loginModal').modal('hide');
    document.getElementById("signup_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("user_div").style.display = "block";
    alert("Login Succesful!");
    orderStatus = 1;
    document.getElementById("user_para").innerHTML = login_email.value;
  })
    .catch((error) => {
      var errorCode = error.code;
      var errrorMessage = error.message;
      alert(error.message);
      $('#loginModal').modal('hide');
    });
  /** 
   * 
      const promise=auth.signInWithEmailAndPassword(login_email.value,login_password.value);
      promise.catch(e=>alert(e.message));
      
      $('#loginModal').modal('hide');
      
      var user = firebase.auth().currentUser;
      if(user!=null)
      {
        if ( firebase.auth().currentUser.uid === "YjdHmuFdaENx8mMAsnslykIzqfp2") 
          {
            window.location="http://localhost/NewAdmin/index.html";
            
          }
        else
        {
          //Login Successful code
          orderStatus=1;
        document.getElementById("signup_div").style.display = "none";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("user_div").style.display = "block";
        alert("Login Succesful!");
        document.getElementById("user_para").innerHTML = login_email.value;
        }
        
        
      }
    }
    
      **/
}
function order() {
  var user = firebase.auth().currentUser;


  //alert(" Order successful");
  if (orderStatus === 1) {
    window.location.href = "http://localhost/NewDE/payment.html";
    $('#cart').modal('hide');

  }
  else {
    alert(" Login to continue with order");
    $('#cart').modal('hide');
  }




}
function signOut() {
  auth.signOut();
  var user = firebase.auth().currentUser;
  if (user != null) {
    alert("Logout Succesful!");
    document.getElementById("signup_div").style.display = "block";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("user_div").style.display = "none";
  }

}
function toggleFunction() {
  var x = document.getElementById("noPlastic");
  var y = document.getElementById("plastic");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
}
//fetching data from database
firebase.database().ref().child("/Item1").orderByKey().once("value", function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var item_name = childSnapshot.val().name;
    var item_price = childSnapshot.val().price;
    console.log(childSnapshot.val().name);

  });
});
var item_name;
var item_price;
var query = firebase.database().ref().child("Item1").orderByKey();
query.once("value").then(function (snapshot) {
  item_name = snapshot.val().name;
  item_price = snapshot.val().price;
  item_image = snapshot.val().image;
  console.log(item_name);
  console.log(item_price);
  console.log(item_image);
  document.getElementById('item1-name').innerHTML = item_name;
  document.getElementById('item1-price').innerHTML = item_price;
  document.getElementById('item1-image').src = item_image;
});


