
CREATE TABLE employees (
	id SERIAL PRIMARY KEY UNIQUE NOT NULL,
	name VARCHAR(40)
	);


CREATE TABLE jobs (
	id SERIAL PRIMARY KEY UNIQUE NOT NULL,
	company VARCHAR(30),
	duedate DATE,
	pieces INT,
	complete BOOLEAN,
	harddate BOOLEAN,
	notes VARCHAR(200),
	employeeid INT REFERENCES employees (id)
	);


	INSERT INTO employees (name) VALUES ('Cindy');
	INSERT INTO employees (name) VALUES ('Marsha');
	INSERT INTO employees (name) VALUES ('Matt');
	INSERT INTO employees (name) VALUES ('Tyler');
	INSERT INTO employees (name) VALUES ('Lora');
	INSERT INTO employees (name) VALUES ('Carrie');
	INSERT INTO employees (name) VALUES ('Teresa');
	INSERT INTO employees (name) VALUES ('Will');

 INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/17/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/17/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/18/16', 76, true, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/18/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/18/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/19/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/19/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/19/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/20/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/20/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/10/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/10/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/11/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/11/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/12/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/12/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/13/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/13/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/14/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/14/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/4/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/5/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/6/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/7/16', 76, false, true, 'Dont forget...');

SELECT * FROM jobs LEFT JOIN employees ON jobs.employeeid=employees.id;
