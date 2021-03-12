const userTable = `create table user
    (
        email varchar(100) primary key not null, 
        document_number varchar(32) not null, 
        name varchar(100) not null, 
        last_name varchar(100) not null, 
        phone varchar(100) not null, 
        role enum('admin', 'normal') not null,
        password varchar(100) not null,
        charge_fulfilled boolean not null default False
    );`

module.exports = userTable