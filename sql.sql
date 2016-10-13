CREATE TABLE employees (
	empid SERIAL PRIMARY KEY UNIQUE NOT NULL,
	name VARCHAR(40),
	archived BOOLEAN
	);


CREATE TABLE jobs (
	id SERIAL PRIMARY KEY UNIQUE NOT NULL,
	company VARCHAR(30),
	duedate DATE,
	pieces INT,
	complete BOOLEAN,
	harddate BOOLEAN,
	notes VARCHAR(200),
	employeeid INT REFERENCES employees (empid)
	);


	INSERT INTO employees (name, archived) VALUES ('Cindy', false);
	INSERT INTO employees (name, archived) VALUES ('Marsha', false);
	INSERT INTO employees (name, archived) VALUES ('Matt', false);
	INSERT INTO employees (name, archived) VALUES ('Tyler', false);
	INSERT INTO employees (name, archived) VALUES ('Lora', false);
	INSERT INTO employees (name, archived) VALUES ('Carrie', false);
	INSERT INTO employees (name, archived) VALUES ('Teresa', false);
	INSERT INTO employees (name, archived) VALUES ('Will', false);

 INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Valley Christian', '10/17/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Ebay', '10/17/16', 24, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Paypal', '10/18/16', 145, true, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Adobe', '10/18/16', 45, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Kingsway Chruch', '10/18/16', 15, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Wells Fargo', '10/19/16', 90, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Verizon', '10/19/16', 73, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Apple', '10/19/16', 213, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('AIG', '10/20/16', 4, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Sysco', '10/20/16', 90, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Caterpillar', '10/10/16', 134, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Deere', '10/10/16', 55, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Exelon', '10/11/16', 77, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('DuPont', '10/11/16', 88, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Macys', '10/12/16', 14, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Nike', '10/12/16', 67, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Travelers Cos', '10/13/16', 56, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Xerox', '10/13/16', 22, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Lear', '10/14/16', 34, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Fluor', '10/14/16', 43, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Tenet Healthcare', '10/4/16', 145, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Kraft', '10/5/16', 90, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Gap', '10/6/16', 56, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('Health Net', '10/7/16', 89, false, true, 'Dont forget...');

SELECT * FROM jobs LEFT JOIN employees ON jobs.employeeid=employees.empid
