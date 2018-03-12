// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       alert("done");
//     } else {
//         alert("nooooo");
//     }
//   });

// function login()
// {
//     var name = document.getElementById("usr").value;
//     var password = document.getElementById("pwd").value;

//     firebase.auth().signInWithEmailAndPassword(name, password).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;

//         window.alert("Error:" + errorMessage)
//         // ...
//       });

  
// }

// var rootRef = firebase.database().ref().child('loginTbl');

// $('#create').click(function(){
//     var newId = 
//     alert("start");
//     rootRef.set({

//         1: {
//             name:$("#usr").val(),
//             password:$("#pwd").val()
//         }     
       
       

//     });
// });

// angular.module('MyApp', ['ngAria','ngMaterial'])
// .controller('AppCtrl', function($scope) {})
//   .directive('chooseFile', function() {
//     return {
//       link: function (scope, elem, attrs) {
//         var button = elem.find('button');
//         var input = angular.element(elem[0].querySelector('input#fileInput'));
//         button.bind('click', function() {
//           input[0].click();
//         });
//         input.bind('change', function(e) {
//           scope.$apply(function() {
//             var files = e.target.files;
//             if (files[0]) {
//               scope.fileName = files[0].name;
//             } else {
//               scope.fileName = null;
//             }
//           });
//         });
//       }
//     };
//   });