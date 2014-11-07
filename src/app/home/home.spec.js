describe('tripsketchApp.home module', function() {
    beforeEach(module('tripsketchApp.home'));

    describe('Home controller', function(){
        var $httpBackend, $scope, homeCtrl, $state;

        beforeEach(inject(function($injector) {
            $scope = $injector.get('$rootScope').$new();
            $state = $injector.get('$state');
            var $controller = $injector.get('$controller');

            homeCtrl = $controller('HomeCtrl', {'$scope' : $scope, '$state': $state});
        }));

        it('should be defined', inject(function($controller) {
            expect(homeCtrl).toBeDefined();
        }));

    });
});