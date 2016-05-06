var module = angular.module('Checkbook.Model');

module.factory('Entry', [ '$resource', function($resource) {
	var _Entry = $resource(
		'/entries/:id',
		{ id: '@id' },
		{ 
			// Query to the /months/:monthid/categories/:category/entries endpoint to get all entries
			// for a specific month and category.
			querySpecific: {
				method: 'GET',
				url: '/months/:monthid/categories/:category/entries',
				isArray: true				
			}
		});

	// Wrap the constructor created by the $resource factory function in one of our own to allow adding
	// some virtual properties to the constructed object. 
	// To achieve this, we call through to the original constructor, copy over static methods from the
	// original to the new construtctor and set the wrapped prototype to be the same as the original one.
	function Entry() {
		var self = this;

		// Call through to constructor created by $resource
		_Entry.apply(self, arguments);

		// At any rate, category HAS to be a virtual settable property in order to fire events on change (allow the model tree to update itself)
		var _category = self.category; // category field may have already been set by _Entry constructor
		Object.defineProperty(self, 'category', {
				enumerable: true,				
				get: function() { return _category; },
				set: function(category) {
					_category = category;
				}
		});

		var _datetime = self.datetime; // datetime field may have already been set by _Entry constructor
		Object.defineProperty(self, 'datetime', {
				enumerable: true,
				get: function() { return _datetime; },
				set: function(datetime) { 
					_datetime = datetime;
				}		
		});
	}

	// Copy over static methods
	angular.merge(Entry, _Entry);
	// Preserve prototype as generated by $resource
	Entry.prototype = _Entry.prototype;

	Entry.prototype.getMonthId = function() {
		var self = this;

		var month = self.datetime.getMonth();
		var year = self.datetime.getFullYear();
		return (year - 1970) * 12 + month;
	}

	/**
	 * Will return true if other is an Entry with identical
	 * caption, value, category, details and datetime.
	 */
	Entry.prototype.equals = function(other) {
		var self = this;
		return (other instanceof Entry) &&
			self.caption === other.caption &&
			self.value === other.value &&
			self.category === other.category &&
			self.datetime.getTime() === other.datetime.getTime() &&
			self.details === other.details;
	}

	return Entry;
}]);