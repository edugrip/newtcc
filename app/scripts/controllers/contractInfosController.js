// preliminary code! TDD - still needs refactoring & optimization
//
//
// chainInfoController.js
//
// contains 1 controller:
//    addressInfosCtrl
//
// by AltSheets
//    September 2015
//
angular.module('ethExplorer')
    .controller('contractInfosCtrl', function ($rootScope, $scope, $location, $routeParams, $q) {

        $scope.init = function () {
            $scope.contractAddress = $routeParams.contractAddress;
            $scope.abi = abi;

            if (!(!$scope.contractAddress)) {
                getAddressBalance()
                    .then(function (result) {
                        $scope.balance = web3.fromWei(result).toNumber();
                    });
                getAddressTransactionCount()
                    .then(function (result) {
                        $scope.txCount = result;
                    });
                getCode()
                    .then(function (result) {
                        $scope.code = result;
                    });
                getTransactions()
                    .then(function (result) {
                        console.log("getTransactions is executed!")
                        $scope.transactions = result;
                    });
                    getContractName().then(function (result){
                        $scope.contractName = JSON.stringify(result);
                        
                    });
                    
                getETHUSD();
            } else {
                $location.path("/");
            }

            function getAddressBalance() {
                var deferred = $q.defer();
                web3.eth.getBalance($scope.contractAddress, function (error, result) {
                    if (!error) {
                        deferred.resolve(result);
                    }
                    else {
                        deferred.reject(error);
                    }
                });
                return deferred.promise;
            }

            function getETHUSD() {
                $.getJSON("https://api.coinmarketcap.com/v1/ticker/ethereum/", function (json) {
                    var price = Number(json[0].price_usd);
                    var ethusd = price.toFixed(2);
                    var balanceusd = "$" + ethusd * $scope.balance;
                    $scope.balanceusd = balanceusd;
                    //console.log("Balance in USD " + $scope.balanceusd);
                });
            }

            function getAddressTransactionCount() {
                // var success=$.getScript('../../config.js');
                var deferred = $q.defer();
                web3.eth.getTransactionCount($scope.contractAddress, function (error, result) {
                    if (!error) {
                        deferred.resolve(result);
                    }
                    else {
                        deferred.reject(error);
                    }
                });
                return deferred.promise;
            }

            function getCode() {
                var deferred = $q.defer();
                web3.eth.getCode($scope.contractAddress, function (error, result) {
                    if (!error) {
                        deferred.resolve(result);
                    }
                    else {
                        deferred.reject(error);
                    }
                });
                return deferred.promise;
            }

            function getContractName() {
                var deferred = $q.defer();
                var abi = $scope.abi;
                var contract = web3.eth.contract(abi);
                // web3.eth.getCode($scope.contractAddress, function (error, result) {
                contract.at($scope.contractAddress).getName(function (error, result) {
                    if (!error) {
                        deferred.resolve(result);
                    }
                    else {
                        deferred.reject(error);
                    }
                });
                return deferred.promise;
            }

        $scope.init();

        function hex2a(hexx) {
            var hex = hexx.toString();//force conversion
            var str = '';
            for (var i = 0; i < hex.length; i += 2)
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            return str;
        }
    }
});
