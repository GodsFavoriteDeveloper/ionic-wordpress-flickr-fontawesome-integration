angular.module('wordpress.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('PostsCtrl', function($scope, $http, $ionicLoading, wpConfig) {
  $scope.posts = [];
  $ionicLoading.show({
    template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner>'
  })
  function getPosts(){
    $http.get(wpConfig.apiEndPoint + "get_posts/?&count=50").then(function(data){
      $scope.posts = data.data.posts;
      $ionicLoading.hide();
    }, function(err){

    })
  }
  getPosts();
})

.controller('PostCtrl', function($scope, $http, $stateParams, $sce, wpConfig) {
  $http.get(wpConfig.apiEndPoint + 'get_post/?&id='+ $stateParams.eventId).then(function(data){
      console.log(data)
      $scope.post_title = $sce.trustAsHtml(data.data.post.title);
      $scope.post_content = $sce.trustAsHtml(data.data.post.content);
  }, function(err){
  })
})

.controller('FlickrCtrl', function($scope, $http) {
  $http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?id=27190914@N05&format=json').then(function(data){
  })
  jsonFlickrFeed = function(data){
	$scope.images = data.items;
 }, function(err) {
 }

})
