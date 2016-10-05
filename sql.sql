CREATE TABLE jobs (
	id SERIAL PRIMARY KEY UNIQUE NOT NULL,
	company VARCHAR(30),
	duedate DATE,
	pieces INT,
	complete BOOLEAN,
	harddate BOOLEAN,
	notes VARCHAR(200)
	);




  	INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/4/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/4/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/5/16', 76, true, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/5/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/6/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/6/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/7/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/7/16', 76, false, true, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/8/16', 76, true, false, 'Dont forget...');
		INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES ('MEOW', '10/8/16', 76, false, true, 'Dont forget...');
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
