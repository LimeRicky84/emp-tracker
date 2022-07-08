INSERT INTO department (department_name)
VALUES ('Management'),
       ('Sales'),
       ('Human Resources'),
       ('Accounting'),
       ('Production'),
       ('Maintenance'),

INSERT INTO role (title, salary, department_id)
VALUES ('Space Lord', 550000, 1001),
       ('Sales Rep', 75000, 3001),
       ('HR Officer', 45000, 4001),
       ('Accountant', 85000, 2001),
       ('Laborer', 500000, 6001),
       ('Technician', 500000, 5001),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Rick', 'Moss', 001, null),
       ('Amy', 'Morgan', 004, null),
       ('Todd', 'Larsen', 002, null),
       ('Wanda', 'Wayment', 005, null),
       ('Henry', 'Rourke', 003, null),
       ('Adam', 'Reynolds', 006, null),