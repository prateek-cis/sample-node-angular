angular.module('themeController', ['wijmo'])

// inject the Theme service factory into our controller
.controller('mainController', ['$scope', '$http', 'Theme', function($scope, $http, Theme) {
    $scope.formData = {};
    $scope.loading = true;
    
    // GET =====================================================================
    // when landing on the page, get all Theme and show them
    // use the service to get all the Theme
    Theme.get()
        .success(function(data) {
            $scope.Theme = data;
            $scope.loading = false;
        });

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createTheme = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if ($scope.formData.themeName != undefined) {
            $scope.loading = true;

            // call the create function from our service (returns a promise object)
            Theme.create($scope.formData)

            // if successful creation, call our get function to get all the new Themes
            .success(function(data) {
                $scope.loading = false;
                $scope.formData.themeName = ""; // clear the form so our user is ready to enter another
                $scope.Theme = data; // assign our new list of Theme
            });
        }
    };
    //handle change event for theme activation
    $scope.activeTheme = function() {
            var result = $scope.Theme.filter(function(obj) {
                return obj._id == $scope.selectedTheme;
            });
            
            $scope.formData.font = $scope.fonts[$.map($scope.fonts, function(obj, index) {
                if (obj.face == result[0].font) {
                    return index;
                }
            })[0]];
            
            $scope.formData.fontNo = $scope.fontSize[$.map($scope.fontSize, function(obj, index) {
                if (obj.size == result[0].fontNo) {
                    return index;
                }
            })[0]];
        }
        // Manage Data List ==================================================================
    $scope.list = [
        new columnData({
            Country: "US",
            Date: "12/31/2013",
            Amount: 593.38,
            Active: true
        }),
        new columnData({
            Country: "Germany",
            Date: "2/1/2014",
            Amount: 6484.31,
            Active: false
        }),
        new columnData({
            Country: "UK",
            Date: "3/2/2014",
            Amount: 1997.65,
            Active: false
        }),
        new columnData({
            Country: "Japan",
            Date: "4/3/2014",
            Amount: 970.52,
            Active: true
        })
    ];
    //columnData class
    function columnData(data) {
        this.Country = data.Country;
        this.Date = data.Date;
        this.Amount = data.Amount;
        this.Active = data.Active;
    };
    //font list
    $scope.fonts = [{
        face: "sans-serif"
    }, {
        face: "Arial"
    }, {
        face: "Tahoma"
    }, {
        face: "Trebuchet MS"
    }, {
        face: "Verdana"
    }, {
        face: "serif"
    }, {
        face: "Times"
    }, {
        face: "Georgia"
    }, {
        face: "monospace"
    }, {
        face: "Courier"
    }];
    $scope.fontSize = [{
        size: "5"
    }, {
        size: "8"
    }, {
        size: "10"
    }, {
        size: "12"
    }, {
        size: "14"
    }, {
        size: "16"
    }, {
        size: "18"
    }, {
        size: "20"
    }];


    //default set value
    $scope.formData.font = $scope.fonts[0];
    $scope.formData.fontNo = $scope.fontSize[4];
}]);
