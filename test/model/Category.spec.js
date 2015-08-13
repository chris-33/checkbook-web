describe('Category', function() {
	beforeEach(angular.mock.module('Checkbook'));	
	
	const CATEGORY = { id: 1, caption: 'caption' };

	var Category;
	var $httpBackend;

	beforeEach(inject(function($injector) {
		Category = $injector.get('Category');
		$httpBackend = $injector.get('$httpBackend');
	}));

	it('should use the provided data values when constructing a new instance', function() {
		var category = new Category(CATEGORY);

		for (var key in CATEGORY) 
			expect(category).to.have.property(key, CATEGORY[key]);
	});

	it('should update itself when calling .get', function() {
		const RESPONSE = { id: 1, caption: 'new caption' };

		$httpBackend
			.expectGET('/categories/1')
			.respond(200, RESPONSE);

		var category = new Category(CATEGORY);
		category = category.$get();

		// Check that promise is set correctly
		expect(category).to.have.property('$promise');
		expect(category.$promise).to.respondTo('then');

		// Check that the new values are present
		for (var key in RESPONSE) 
			expect(category).to.have.property(key, RESPONSE[key]);
	})
})