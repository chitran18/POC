Feature: Employee lifecycle

  @e2e @smoke @regression
  Scenario: Admin manages an employee from creation to deletion
    Given the admin is logged in
    When the admin creates a new employee
    Then the employee profile shows the created data
    When the admin updates the employee last name
    Then the employee can be found in the employee list
    And the employee exists through the API
    When the admin deletes the employee
    Then the employee is deleted through the API
