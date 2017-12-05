
function config($stateProvider) {
    $stateProvider
        .state('index.bank', {
            url: "/bank",
            templateUrl: "views/bank/bank.html",
            data: {pageTitle: 'Bank Account'}
        })
}

function bankAccountCtrl($scope, bankService, $filter, $window){


    //assign personal details
    $scope.personal = {
        title: '',
        firstname: '',
        middlename: '',
        lastname: '',
        homephone: '',
        mobile: '',
        email: '',
        address: '',
        securitynum: ''
    };



    //Employee scope Data
    $scope.employement = {
        empName: '',
        empAddress: '',
        empMobile: '',
        empJob: ''
    };

    //Account scope data
    $scope.accountInfo = {
        accountType: '',
        purpose: '',
        moneyCome: '',
        hearAbout: ''
    };


    //file upload scope
    $scope.utilityBill = '';
    $scope.securityBill = '';

    var userDatas;
    var userAccountNumber;



    //Terms and condition
    $scope.termscondition = true;

    //All Scopes
    $scope.searchAccount = '';
    $scope.customerEntry = true;
    $scope.selectedMenu = 'PERSONAL';
    $scope.applicationNumber = '';
    $scope.showRegisterForm = false;
    $scope.showRegisteredData = false;
    $scope.showAccepted = false;
    $scope.showSearchData = false;
    $scope.showRejected = false;
    $scope.loginFailed = false;


    //Create Account
    $scope.createAccount = function(){

        $scope.customerEntry = false;
        $scope.showRegisterForm = true;
        $scope.selectedMenu = 'PERSONAL';
        $scope.showRegisteredData = false;
        $scope.showAccepted = false;
        $scope.showRejected = false;



        //generate Application number
        var bankAppnum = $scope.randomNumber();
        $scope.applicationNumber = bankAppnum;
    };


    //back to home
    $scope.backToHome = function(){
        $window.location.reload();
    };

    //back to search
    $scope.backToSearch = function() {
        $scope.searchAccount = '';
        $scope.customerEntry = true;
        $scope.showRegisterForm = false;
        $scope.showRegisteredData = false;
        $scope.showAccepted = false;
        $scope.showSearchData = false;
    };


    //selected Navigation
    $scope.selectMenu = function(nav){
        $scope.selectedMenu = nav;
    };

    //Final call submit
    $scope.submitAccountInfo = function(){
        var storeX = 0;
        $scope.showRegisterForm = false;
        $scope.showRegisteredData = false;




        //assing application number
        var checkAppnum = $scope.applicationNumber + '';


        for(var i = 0; i < checkAppnum.length - 1; i++ ){


            if(checkAppnum[i] == checkAppnum[i+1]){

                storeX = 0;

                $scope.getLocalBranchNumber();
                $scope.showRejected = true;

                return true;

            }
            else{
                storeX = 1;

            }

        }
        if(storeX == 1){
            $scope.showAccepted = true;


        }

        //Generate Account number
        $scope.accountnNumber = $scope.randomNumber();


        if($scope.accountnNumber != null){
            var userInfo = {

                accountNumber: $scope.accountnNumber,
                personalInfo: personalObj,
                employerInfo: employerObj,
                accountInfo: accountObj,
                documentInfo:  documentObj
            };



            bankService.pushBankInfo(userInfo);

            userDatas = bankService.getBankInfo();



        }



    };


    //assign values for all credentials
    var savePersonalData = {};
    var saveEmployerData = {};
    var saveAccountInfo = {};
    var saveDocumentInfo = {};
    var personalObj;
    var employerObj;
    var accountObj;
    var documentObj;


    //store personal data
    $scope.savePersonal = function(){
        savePersonalData = {
            "title":  $scope.personal.title,
            "firstname":  $scope.personal.firstname,
           "middlename":  $scope.personal.middlename,
            "lastname":  $scope.personal.lastname,
            "homephone":  $scope.personal.homephone,
            "mobile":  $scope.personal.mobile,
            "email":  $scope.personal.email,
            "address":  $scope.personal.address,
            "securitynum":  $scope.personal.securitynum
        };

        personalObj = angular.copy(savePersonalData);


        return personalObj;

    };

    //store employer data
    $scope.saveEmployer = function(){
      saveEmployerData = {
          "empName": $scope.employement.empName,
          "empAddress": $scope.employement.empAddress,
          "empMobile": $scope.employement.empMobile,
          "empJob": $scope.employement.empJob
      };
         employerObj = angular.copy(saveEmployerData);


        return employerObj;
    };

    //Store account data
    $scope.saveAccountInfo = function(){
         saveAccountInfo = {
            "accountType": $scope.accountInfo.accountType,
            "purpose": $scope.accountInfo.purpose,
            "moneyCome": $scope.accountInfo.moneyCome,
            "hearAbout": $scope.accountInfo.hearAbout
        };
         accountObj = angular.copy(saveAccountInfo);

        return accountObj;
    };

    //Store document data
    $scope.saveDocument = function(){
         saveDocumentInfo = {
            "utility": $scope.utilityBill.name ,
            "socialNumber": $scope.securityBill.name
        };
        documentObj = angular.copy(saveDocumentInfo);


        return documentObj;
    };

    //getting all user datas
    $scope.getAllDatas = function() {
        $scope.showRegisterForm = false;
        $scope.showRegisteredData = true;
    };

    //back to edit user
    $scope.goBackEditUser = function(){
        $scope.showRegisterForm = true;
        $scope.showRegisteredData = false;
        $scope.selectedMenu = 'PERSONAL';
    };

    //ngInit if needed
    $scope.bankAccount = function(){

    };

    //Generate Random Number
    $scope.randomNumber = function(){
        var num = Math.floor(Math.random() * 900000) + 100000;
        return num
    };

    //Random contact number for approved users
    $scope.bankLocalNumber = [
        {

        value: "+668-1234-5678"
    },
     {
         value: "+618-1234-5784"
     },
      {

            value: "+678-7574-5678"
      },
      {
            value: "+678-5784-7854"
      },
        {

            value: "+668-4857-5738"
        },
        {
            value: "+6824-1234-5784"
        },
        {

            value: "+6852-127-5678"
        },
        {
            value: "+678-4876-1845"
        },
    ];

    //cal local branch number
    $scope.getLocalBranchNumber = function () {
        $scope.setLocalBranchNumber = $scope.bankLocalNumber[Math.floor(Math.random() * $scope.bankLocalNumber.length)];

    };

    //setting files upload
    $scope.setFiles = function(element) {
        $scope.$apply(function($scope) {
            $scope.utilityBill = element.files[0];
        });
    };

    $scope.setFile = function(element) {
        $scope.$apply(function($scope) {
            $scope.securityBill = element.files[0];
        });
    };

    //Login search by account number
    $scope.searchAccountNumber = function(accnum){

        var searchObj = $filter('filter')(bankService.getBankInfo(), {"accountNumber":accnum}, true);



        if(angular.isUndefined(searchObj) || searchObj.length == 0){

            $scope.loginFailed = true;
        }

        else{
            //display account details
            $scope.getUser =  searchObj[0];
            $scope.showSearchData = true;
            $scope.customerEntry = false;
            $scope.showRegisterForm = false;
            $scope.showRegisteredData = false;
            $scope.showAccepted = false;
            $scope.loginFailed = false;
        }



    };


}

angular
    .module('myApp')
    .config(config)
    .controller('bankAccountCtrl', bankAccountCtrl);


