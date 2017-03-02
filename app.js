(function () {
"use strict";

angular.module('app',[])
  .controller('NarrowItDownController', controller)
  .service('MenuSerachService', service)
  .directive('foundItems', directive);

function directive() {
  var ddo = {
    templateUrl: 'foundlist.html',
    scope: {
      list: '<',
      onRemove: '&'
    }
    // controller: DirectiveController,
    // controllerAs: "list",
    // bindToController: true
  };
  return ddo;
}

controller.$inject=['MenuSerachService'];

function controller(service) {
  var ctrl = this;
  ctrl.found = [];
  ctrl.input = '';

//Search function

  ctrl.search = function () {

    ctrl.showerror = false;
    // console.log('you clicked');
    service
      .searchItem(ctrl.input)
      .then(function () {
        var temp = service.getMatchedMenuItems();

        // console.log(temp.length);

        if ( temp.length == 0 ) {
          ctrl.showerror = true;
          ctrl.show = false;
        } else {
          // console.log(temp.length);
          ctrl.found = temp;
          ctrl.show = true;
        };
        // console.log(items);
      });

    };



// REmoving function

  ctrl.remove =function (index) {
    // console.log('Removed index', index);
    ctrl.found.splice(index,1);

  };

};

service.$inject=['$http'];
  function service($http){
    var service=this;
    var foundItems = [];

    service.searchItem = function (searchItem) {
      foundItems = [];
      var response = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      })
      .then(function (result) {
        // console.log(found)
        // console.log(result.data, searchItem);
        var items = result.data.menu_items;
        for (var i = 0 ; i < items.length; i++){
          if (items[i].description.indexOf(searchItem) !== -1 ) {foundItems.push(items[i])}
        }

      });

      return response;
    };

    service.getMatchedMenuItems = function () {
      return foundItems;
    }

  };




})()
