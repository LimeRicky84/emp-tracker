INSERT INTO department (department_name)
VALUES ('Management'),
       ('Sales'),
       ('Human Resources'),
       ('Accounting'),
       ('Production'),
       ('Maintenance');

INSERT INTO role (title, salary, department_id)
VALUES ('Space Lord', 550000, ),
       ('Sales Rep', 75000, ),
       ('HR Officer', 45000, ),
       ('Accountant', 85000, ),
       ('Laborer', 500000, ),
       ('Technician', 500000, );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Rick', 'Moss', 001, null),
       ('Amy', 'Morgan', 004, 001),
       ('Todd', 'Larsen', 002, 001),
       ('Wanda', 'Wayment', 005, 001),
       ('Henry', 'Rourke', 003, 001),
       ('Adam', 'Reynolds', 006, 001);