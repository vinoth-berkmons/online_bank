function bankService($localStorage){

    var service = {

        setBankInfo: setBankInfo,
        getBankInfo: getBankInfo,
        pushBankInfo: pushBankInfo

    };
    return service;

    function setBankInfo(){
        if(angular.isUndefined($localStorage.bankInfo)){
            $localStorage.bankInfo = [];
        }
    }


    function getBankInfo(){

         return  $localStorage.bankInfo;

    }


    function pushBankInfo(bankData){

        $localStorage.bankInfo.push(bankData);
        console.log($localStorage.bankInfo);
    }


}


angular
    .module('myApp')
    .service('bankService', bankService);