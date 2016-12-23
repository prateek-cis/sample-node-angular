angular.module('themeService', [])
    // each function returns a promise object 
    .factory('Theme', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('/api/themes');
            },
            create: function(themeData) {
                return $http.post('/api/themes', themeData);
            },
            delete: function(id) {
                return $http.delete('/api/themes/' + id);
            }
        }
    }]);
