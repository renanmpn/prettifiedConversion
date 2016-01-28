 angular.module("renanMPNCrossover").controller("renanMPNCrossoverCtrl", function ($scope, $http, $sce,config) {
            
    $scope.app = "RenanMPN - Crossover"; 
    
    $scope.rawNumber = "";
    $scope.prettifiedNumber = "";
    
    $scope.error = false;
    $scope.errorText = "";

    
    $scope.convertRawNumber = function(rawNumber){
        if(rawNumber){
            $http.post(config.baseUrl + "/convertNumber",{"rawNumber":rawNumber}).success(function(data,status){
                    if(data.error){
                        $scope.error = true;
                        $scope.errorText = data.error;
                        $scope.renderHtml();
                        $scope.prettifiedNumber = "";
                    }else{
                        $scope.error = false;
                        $scope.errorText = "";
                        $scope.prettifiedNumber = data.prettifiedNumber;
                    }
                }).error(function(data,status){
                    $scope.error = true;                
                    $scope.prettifiedNumber = "";
                    $scope.errorText = data.error;
                    $scope.renderHtml();
        });
      }
    }
    
    $scope.renderHtml = function(){
        
        var str = '<div class="alert alert-danger fade in"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Error!</strong>'.concat($scope.errorText).concat('</div>');
        console.log(str);
        if($scope.error){            
            return $sce.trustAsHtml(str);
        }else{
            return $sce.trustAsHtml("");
        }
    }
    

});