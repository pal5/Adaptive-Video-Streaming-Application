var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");
require("firebase/firestore");
function writeUserData(user_name,search_query)
{
  var userData = firebase.database().ref("UserData/");
  var userRef=userData.child(user_name);
  var queryRef=userRef.child("query");
  queryRef.once('value', function(snapshot) {
    if(!snapshot.hasChild(search_query))
    {
      var queryObj=queryRef.child(search_query);
      queryObj.set({count:1,time:(new Date()).toLocaleString()})
    }
    else
    {
      var inc=queryRef.child(search_query);
      inc.child('count').transaction(function(c) {
        return c+1;
      });
      inc.update({time:(new Date()).toLocaleString()});
    }
  });
}
module.exports=writeUserData;