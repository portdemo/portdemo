/**
 * Created by monisha.jayachandran on 5/26/2016.
 */
'use strict';

var app = angular.module('portalApp');


app.controller('memberCardCtrl', function ($scope , $state, $localStorage, memberCardService,$rootScope) {
 var memberId=1;
  if($localStorage.username || $localStorage.username !== ""){
    $rootScope.login = $localStorage.username;
    $rootScope.first_name = $localStorage.fName;
    $rootScope.mId = $localStorage.mId;
    memberId =$localStorage.mId;
    /*
    $state.go('home',{reload:true});*/
  }
  // $state.go('home',{reload:true});
  else
  {
    $rootScope.login = $localStorage.username;
  }
console.log('root data'+memberId);
  $scope.active = true;
  $scope.active1 = true;
  $scope.MemberId= parseInt(memberId);
  $scope.showFlip = false;
  $scope.showFlip2 = false;

  $scope.changeSelectAll = function(index,data,$scope){
    var nav1="memberIdOne"+index;
    var nav2="memberIdTwo"+index;
     var checkVal="checkSelect"+index;
    var dataOne=document.getElementById(checkVal).checked;
    if(dataOne==true)
    {
      document.getElementById(nav1).checked=true;
      document.getElementById(nav2).checked=true;

    }
    else{
      document.getElementById(nav1).checked=false;
      document.getElementById(nav2).checked=false;

    }


  }

  $scope.showFlipImage =function(val,index){
    if(val=="flip1") {
      var imageBack = "show1Flipback" + index;
      var imageFirst = "show1Flip" + index;
    }
    else if(val=="flip2") {
      var imageBack = "show2Flipback" + index;
      var imageFirst = "show2Flip" + index;

    }

    var ImageSource = document.getElementById(imageBack).style.display ;
    if(ImageSource=="none") {
      document.getElementById(imageFirst).style.display = "none";
      document.getElementById(imageBack).style.display = "block";
    }
    else {
      document.getElementById(imageFirst).style.display = "block";
      document.getElementById(imageBack).style.display = "none";
    }

   /* if(val="flip1") {
      if ($scope.showFlip) {
        $scope.showFlip = false;
      }
      else {
        $scope.showFlip = true;
      }
    }
     else {
      if ($scope.showFlip2) {
        $scope.showFlip2 = false;
      }
      else {
        $scope.showFlip2 = true;
      }
    }*/
  }
  memberCardService.getMemberCardDetails(angular.toJson($scope.MemberId)).then(function(data) {
    console.log('memberId'+$scope.MemberId);
    console.log('data'+data);
    $scope.MemberCardDetails = data;
  });
});



app.factory('memberCardService', memberCardFactory);

function memberCardFactory($http) {
  this.$inject = ['$http'];
  return {
    getMemberCardDetails: getMemberCardDetails
  };

  function getMemberCardDetails(data) {
    console.log('servicedata'+data);
    return $http
      .post('http://10.236.91.188:8080/ClaimsPortal/memberIdcard',data)
      .then(complete)
      .catch(failed);
  }

  function complete(response) {
    return response.data;
  }

  function failed(error) {
    return error.statusText;
  }
}





