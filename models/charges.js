const chargesTable = `create table charge
    (
        charge_id int primary key not null AUTO_INCREMENT,
        charge_type enum("efectivo", "credito", "transferencia") not null, 
        charge_date datetime default CURRENT_TIMESTAMP, 
        description varchar(104) not null, 
        charge_receipt varchar(2048), 
        email varchar(100) not null,
        foreign key (email) references user(email)
    );`

module.exports = chargesTable