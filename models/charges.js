const chargesTable = `create table charge
    (
        charge_id int primary key not null,
        charge_type enum("efectivo", "credito", "transferencia") not null, 
        charge_date datetime not null, 
        description varchar(104) not null, 
        charge_receipt varchar(2048), 
        email varchar(100) not null,
        foreign key (email) references user(email)
    );`

module.exports = chargesTable