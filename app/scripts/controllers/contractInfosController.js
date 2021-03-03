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
var abi = `[{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"supply_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]`
angular.module('ethExplorer')
    .controller('contractInfosCtrl', function ($rootScope, $scope, $location, $routeParams, $q) {
            $scope.contractName = "tasdf"
        $scope.init = function () {
            $scope.contractAddress = $routeParams.contractAddress;
            var contractAddress = $routeParams.contractAddress;

            if (!(!$scope.contractAddress)) {
                var contractInfo = JSON.parse(abi);

                var MyContract = web3.eth.contract(contractInfo);
              //  new web3.eth.Contract(abiArray, contract_address, {from: address})

                var myContractInstance = MyContract.at($scope.contractAddress);
                var result = myContractInstance.name.call(function(err, result){
                    alert(JSON.stringify(err))
                    alert(JSON.stringify(result))
                });
                var result2 = myContractInstance.name();
                                    alert(JSON.stringify(result))
                                    alert(JSON.stringify(result2))

               // alert(result)


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
                web3.eth.getCode($scope.contractAddress, function (error, result) {
                    if (!error) {
                       // deferred.resolve(result);
                        deffered.resolve("TCC")
                        alert("hi")

                    }
                    else {
                        alert(error)
                        deferred.reject(error);
                    }
                });
                return deferred.promise;
            }

            // TODO: not working yet:
            function getTransactions() {
                var deferred = $q.defer();

                /*

                // See https://github.com/ethereum/go-ethereum/issues/1897#issuecomment-166351797
                // plus the following posts
                // Giving up for now. Invested another 3 hours without results. Grrrr..

                // var options="address:"+$scope.contractAddress;
                // var options = {"address": "0xf2cc0eeaaaed313542cb262b0b8c3972425143f0"}; // $scope.contractAddress}; // , "topics": [null]
                // var options = 'pending'
                // console.log(options);

                var options = {fromBlock: 0, toBlock: 'latest', address: "0xf2cc0eeaaaed313542cb262b0b8c3972425143f0"};

                var myfilter = web3.eth.filter(options);

                // var myfilter= web3.eth.filter(options);
                console.log(myfilter);


                myfilter.get(function (error, log) {
                	  console.log("get error:", error);
                	  console.log("get log:", log);
                	});

                web3.eth.filter(options,
                		function(error, result){
                			if(!error){
                				console.log("no error");
                				deferred.resolve(result);
                				}
                			else{
                				console.log("error");
                				deferred.reject(error);
                				}
                			});

                */
                return deferred.promise;
            }
        };
        $scope.init();

        function hex2a(hexx) {
            var hex = hexx.toString();//force conversion
            var str = '';
            for (var i = 0; i < hex.length; i += 2)
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            return str;
        }
    });
