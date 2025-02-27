CREATE DATABASE ProyectoDWES_08;

USE ProyectoDWES_08;

--TABLA DE USUARIO
CREATE TABLE USER(
    ID_USER INT AUTO_INCREMENT PRIMARY KEY,
    EMAIL VARCHAR (255),
    NAME VARCHAR(100) NOT NULL,
    LASTNAME VARCHAR (255) NOT NULL,
    PHONE VARCHAR(20) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--TABLA DE COCHE
CREATE TABLE CAR(
    ID_CAR VARCHAR(8) PRIMARY KEY NOT NULL,
    BRAND VARCHAR(255) NOT NULL,
    MODEL VARCHAR(255) NOT NULL,
    RELEASE_YEAR INT NOT NULL,
    DAY_PRICE DECIMAL( 10,2) NOT NULL,
    AVAILABLE BOOLEAN DEFAULT TRUE
);

--TABLA DE RESERVA
CREATE TABLE BOOKING(
    ID_BOOKING INT AUTO_INCREMENT PRIMARY KEY,
    ID_USER INT NOT NULL,
    ID_CAR VARCHAR(8) NOT NULL,
    DATE_START DATE NOT NULL,
    DATE_FINISH DATE NOT NULL,
    TOTAL DECIMAL (10,2) NOT NULL,
    FOREIGN KEY (ID_USER) REFERENCES USER (ID_USER),
    FOREIGN KEY (ID_CAR) REFERENCES CAR (ID_CAR)
);

--TABLA DE PAGO
CREATE TABLE PAYMENT(
    ID_PAYMENT INT AUTO_INCREMENT PRIMARY KEY,
    ID_BOOKING INT NOT NULL,
    AMOUNT DECIMAL(10,2) NOT NULL,
    PAYMENT_DATE DATE NOT NULL,
    FOREIGN KEY (ID_BOOKING) REFERENCES BOOKING (ID_BOOKING)
);

CREATE USER tudoredu IDENTIFIED BY "tudoredu";

GRANT ALL PRIVILEGES ON ProyectoDWES_08.* TO tudoredu;

-- Insert de coches 
INSERT INTO CAR (ID_CAR, BRAND, MODEL, RELEASE_YEAR, DAY_PRICE, AVAILABLE) VALUES
('CAR001', 'Seat', 'Ibiza', 2021, 30.00, TRUE),
('CAR002', 'BMW', 'Serie 3', 2018, 55.00, TRUE),
('CAR003', 'Audi', 'A4', 2018, 45.00, TRUE),
('CAR004', 'Mercedes', 'Clase C', 2017, 50.00, TRUE),
('CAR005', 'Ford', 'Raptor', 2024, 100.00, TRUE);
