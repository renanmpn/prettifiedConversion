angular.module("renanMPNCrossover").directive("uiRawnumber",function($filter){
	return{
		require: "ngModel",
		link: function(scope, element, attrs,ctrl){
			var _formatNumber = function(numberRaw){
                
				numberRaw = numberRaw.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                			
				return numberRaw;
			}
			
			
			element.bind("keyup",function(){
				
				ctrl.$setViewValue(_formatNumber(ctrl.$viewValue))
				ctrl.$render();
			});					
			
		}
	};
});