'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global',
  function($scope, $http, Global) {
    $scope.global = Global;

      $scope.reg = {
          'name' : '',
          'number' : '',
          'phone' : '',
          'email' : ''
      };

      $scope.register = function(){
          if(confirm('确定注册？')){
              $http.post('reg/reg',{'data':$scope.reg})
                  .success(function(data){
                    alert(data.msg);
                  }).error(function(err){
                    alert(err.msg);
                  });
          }
      };
  }
]);
