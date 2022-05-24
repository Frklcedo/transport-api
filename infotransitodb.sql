CREATE DATABASE infotransitodb;
USE infotransitodb;

CREATE TABLE tb_motorista(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(64) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    rg CHAR(10) UNIQUE NOT NULL,
    rg_uf CHAR(2) NOT NULL,
    rg_org_emissor VARCHAR(64) NOT NULL,

    cnh VARCHAR(20) NOT NULL,
    situacao_carteira VARCHAR(20) NOT NULL,
    data_nascimento DATE NOT NULL,
    validade_cnh DATE NOT NULL,
    primeira_habilitacao DATE NOT NULL,
    categoria_cnh VARCHAR(5) NOT NULL,
    nome_pai VARCHAR(64) NOT NULL,
    nome_mae VARCHAR(64) NOT NULL,
    num_registro VARCHAR(20) NOT NULL
);

CREATE TABLE tb_veiculo(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    placa CHAR(7) UNIQUE NOT NULL,
    renavam VARCHAR(20) NOT NULL,
    chassi VARCHAR(20) NOT NULL,
    fabricante VARCHAR(20) NOT NULL,
    uf CHAR(2) NOT NULL,
    cidade VARCHAR(64) NOT NULL, 
    ano INT(4) NOT NULL,
    modelo VARCHAR(64) NOT NULL,
    ano_modelo INT(4) NOT NULL,
    ano_exercicio INT(4) NOT NULL,
    cor VARCHAR(32),
    status_ipva BOOLEAN NOT NULL,
    venda_ativa BOOLEAN NOT NULL,
    placa_novo_padrao BOOLEAN NOT NULL,

    id_motorista INT NOT NULL,

    FOREIGN KEY(id_motorista) REFERENCES tb_motorista(id)
);

CREATE TABLE tb_combustivel(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    combustivel VARCHAR(32) NOT NULL,
    id_veiculo INT NOT NULL,

    FOREIGN KEY (id_veiculo) REFERENCES tb_veiculo(id)
);

CREATE TABLE tb_multas_renainf(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titulo_multa VARCHAR(32) NOT NULL,
    data_expedida DATE NOT NULL,
    data_vencimento DATE NOT NULL,
    valor_multa FLOAT NOT NULL,
    status_multa VARCHAR(64) NOT NULL,
    id_motorista INT NOT NULL,
    id_veiculo INT NOT NULL,

    FOREIGN KEY (id_motorista) REFERENCES tb_motorista(id),
    FOREIGN KEY (id_veiculo) REFERENCES tb_veiculo(id)
);

CREATE TABLE tb_ocorrencias(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titulo_ocorrencia VARCHAR(32) NOT NULL,
    data_ocorrencia DATE NOT NULL,
    status_ocorrencia VARCHAR(64) NOT NULL,
    id_motorista INT NOT NULL,
    id_veiculo INT NOT NULL,

    FOREIGN KEY (id_motorista) REFERENCES tb_motorista(id),
    FOREIGN KEY (id_veiculo) REFERENCES tb_veiculo(id)

);

CREATE TABLE tb_restricoes_renavam(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tipo_restricao VARCHAR(64) NOT NULL,
    titulo_restricao VARCHAR(64) NOT NULL,
    status_restricao VARCHAR(64) NOT NULL,
    data_efetuacao DATE,
    is_renajud VARCHAR(64),

    id_motorista INT NOT NULL,
    id_veiculo INT NOT NULL,

    FOREIGN KEY (id_motorista) REFERENCES tb_motorista(id),
    FOREIGN KEY (id_veiculo) REFERENCES tb_veiculo(id)


);


/*
ALTER TABLE tb_ocorrencias
    ADD COLUMN status_ocorrencia VARCHAR(64) NOT NULL;
UPDATE tb_ocorrencias SET status_ocorrencia = 'ativa' WHERE id = 1;

ALTER TABLE tb_multas_renainf
    ADD COLUMN status_multa VARCHAR(64) NOT NULL;
UPDATE tb_multas_renainf SET status_multa = 'ativa' WHERE id = 1;
                                                                                    
ALTER TABLE tb_motorista
    ADD COLUMN cpf CHAR(11) NOT NULL;
UPDATE tb_motorista SET cpf = '81898801532' WHERE id = 1;

ALTER TABLE tb_restricoes_renavam
    ADD COLUMN titulo_restricao VARCHAR(64) NOT NULL;
ALTER TABLE tb_restricoes_renavam MODIFY COLUMN titulo_restricao VARCHAR(64) AFTER tipo_restricao;
*/

INSERT INTO tb_motorista VALUES(default,'teste tester', '18818818818' , '1234567891', 'ba', 'ssp', '98776544321', 'legal', '1999-12-27', '2022-12-31', '2018-01-01', 'ab', 'clovis de barros', 'josefina de jesus', '48932472819471289');

INSERT INTO tb_motorista VALUES(default,'saljollanipe', '19833312344', '1212565699', 'ba', 'ssp', '112213432342', 'vencida', '1998-04-12', '2025-12-31', '2021-01-01', 'a', 'luffy da silva', 'nami de oliveira', '12344312443271892'); 


INSERT INTO tb_veiculo VALUES(default,'ANN2F42', '144003058', '9BG116GW04C400001', 'Ford', 'ba', 'Salvador', '2018','Fiesta','2012', '2022', 'Cinza', true, false, true, 1);

INSERT INTO tb_veiculo VALUES(default,'AUJ0B38', '132013044', '9CG126GD04A403123', 'Fiat', 'ba', 'Salvador', '2022','uno','2015', '2022', 'Branco', false, true, false, 1);


INSERT INTO tb_combustivel VALUES(default, 'flex', 1);

INSERT INTO tb_combustivel VALUES(default, 'gas', 1);


INSERT INTO tb_restricoes_renavam VALUES(default, 'financeira', 'bco bahia', 'ativa','2021-11-19',default,'1','1');

INSERT INTO tb_restricoes_renavam VALUES(default, 'judiciaria', 'bloq renajud', 'ativa','2021-11-19', 'transferencia', '1', '1');



INSERT INTO tb_multas_renainf VALUES(default, 'Velocidade limite excedida', '2022-02-21', '2022-06-22','290.00', 'ativa', '1','1');
INSERT INTO tb_multas_renainf VALUES(default, 'Dirigir alcoolizado', '2022-05-11', '2022-08-22','540.49', 'ativa', '1','1');


INSERT INTO tb_ocorrencias VALUES(default, 'Velocidade máxima ultrapassada', '2022-02-21', 'ativa', '1', '1');



SET FOREIGN_KEY_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 1;