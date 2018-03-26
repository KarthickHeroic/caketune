 var app = angular.module('caketune', ['ngMaterial', 'ngMessages']);


//Signup 


app.controller('signupCtrl', function($scope) {
    var success = document.getElementById("success");
success.style.display = "none";
var signupcontent = document.getElementById("signupcontent");
signupcontent.style.display = "flex";
  
    $scope.formValid=false;
    $scope.signupFunc = function() {        
        if(!$scope.formValid){
                          return;
        }
        firebase.auth().createUserWithEmailAndPassword($scope.txtemail, $scope.vmPassword.confirm_password).then(function(user) {
            var user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function() {
                var name, email, password, mobile, uidd;
                if (user != null) {
                    name = $scope.txtname;
                    email = $scope.email;
                    password = $scope.password;
                    uidd = user.uid;
                    var logindetails = firebase.database().ref("Users/" + uidd);
                    logindetails.update({
                        Name: name,
                        mobile: {
                            number: '',
                            status: 'no'
                        }
                    });
                    var pagelogin = document.getElementById("login");
                    pagelogin.classList.add("loginbackground");
                    signupcontent.style.display = "none";
                    success.style.display = "block";
                }
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("Email Verification" + errorMessage);
            });
        }, function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("SignUp:" + errorMessage);
        });
    }
});    
       


//login 
app.controller('loginCtrl', function($scope) {
            $scope.loginFunc = function() {
                        if(!$scope.formValid){
                          return;
        }
                var fbemail = $scope.txtemail;
                var fbpassword = $scope.txtpassword;
                var mobileverify;
                var usersdb = firebase.database().ref("/Users/");
                firebase.auth().signInWithEmailAndPassword(fbemail, fbpassword).then(function(data) {
                    var user = firebase.auth().currentUser;
                    var uid = user.uid;
                    sessionStorage.setItem('uid', uid);
                    sessionStorage.setItem('eml', fbemail);
                    sessionStorage.setItem('pwd', fbpassword);

                    var emailVerified = user.emailVerified;
                    firebase.database().ref('Users/').once('value').then(function(snapshot) {
                        mobileverify = snapshot.child(uid + "/mobile/status").val();
                        if (emailVerified == true) {
                            if (mobileverify == 'no') {
                                sessionStorage.setItem('eml', fbemail);
                                sessionStorage.setItem('pwd', fbpassword);
                                window.location.href = "phverify.html";
                            } else {
                                window.location.href = "dashboard.html";
                            }
                        } else {
                            alert("Your mail not verified. Please verify your account email address")
                        }
                    });
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                });
            }
        });

//Phone Verify


 app.controller('phoneverifyCtrl', function($scope) {
      var phverify = document.getElementById("phoneverify");
 var cdverify = document.getElementById("codeverify");
 var logo = document.getElementById("logo");
 var success = document.getElementById("success");
 var fbPhoneNumber; success.style.display = "none";
 cdverify.style.display = "none";
 logo.style.display = "block";
     $scope.changeCount = function(obj) {
         fbPhoneNumber = obj;         
         fbPhoneNumber = fbPhoneNumber;  
     };
     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
     recaptchaVerifier.render().then(function(widgetId) {
         window.recaptchaWidgetId = widgetId;
     });
     $scope.VerifyFunc = function() {
                 if(!$scope.formValid){
                          return;
        }
           fbPhoneNumber = fbPhoneNumber + $scope.phonenumber;
         firebase.auth().signInWithPhoneNumber(fbPhoneNumber, window.recaptchaVerifier)
             .then(function(confirmationResult) {
                 window.confirmationResult = confirmationResult;
                 phverify.style.display = "none";
                 cdverify.style.display = "block";
             });
     }
     $scope.RegisterFunc = function() {
                 if(!$scope.formValid){
                          return;
        }
         window.confirmationResult.confirm($scope.verificationcode)
             .then(function(result) {
             console.log("entry");
                   var uidd = sessionStorage.getItem('uid');             
                   var fbemail = sessionStorage.getItem('eml');               
                   var fbpassword = sessionStorage.getItem('pwd'); 
                    console.log(fbemail + fbpassword);
                   var mobileverfyupdate = firebase.database().ref("Users/" + uidd);
                  mobileverfyupdate.update({
                      mobile:{
                          number:fbPhoneNumber,
                          status:'verified'
                      }
                  });
             
                 var pagelogin = document.getElementById("login");
                 pagelogin.classList.add("loginbackground");
                 phverify.style.display = "none";
                 cdverify.style.display = "none";
                 logo.style.display = "none";
                 success.style.display = "block";
             }, function(error) {
                  var errorCode = error.code;
              var errorMessage = error.message;
             alert("Phone Verify Message:" + errorMessage);
             });

     }
 });

//Reset Password

 app.controller('resetpasswordCtrl', function($scope) {
     
 var success = document.getElementById("success");
                 var maincontainer = document.getElementById("maincontainer");
                success.style.display = "none";
        var pagelogin = document.getElementById("login");
   $scope.myFunc = function() {
               if(!$scope.formValid){
                          return;
        }
     var fbemail = $scope.email;
     var usersdb = firebase.database().ref("/Users/");
     firebase.auth().sendPasswordResetEmail(fbemail).then(function() {
          pagelogin.classList.add("loginbackground");
        maincontainer.style.display = "none"; 
                success.style.display = "block"; 
         
}).catch(function(error) {
  // An error happened.
          var errorCode = error.code;
              var errorMessage = error.message;
             alert(errorMessage);
     
          });
   }
 });

