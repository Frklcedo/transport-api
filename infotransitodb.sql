CREATE DATABASE infotransitodb;
USE infotransitodb;

CREATE TABLE tb_motorista(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(64) NOT NULL,
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

ALTER TABLE tb_motorista
    RENAME COLUMN situcao_carteira TO  situacao_carteira;

CREATE TABLE tb_veiculo(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    placa CHAR(7) UNIQUE NOT NULL,
    renavam VARCHAR(20) NOT NULL,
    chassi VARCHAR(20) NOT NULL,
    fabricante VARCHAR(20) NOT NULL,
    uf CHAR(2) NOT NULL,
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
    id_motorista INT NOT NULL,
    id_veiculo INT NOT NULL,

    FOREIGN KEY (id_motorista) REFERENCES tb_motorista(id),
    FOREIGN KEY (id_veiculo) REFERENCES tb_veiculo(id)
);

CREATE TABLE tb_ocorrencias(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titulo_ocorrencia VARCHAR(32) NOT NULL,
    data_ocorrencia DATE NOT NULL,
    id_motorista INT NOT NULL,
    id_veiculo INT NOT NULL,

    FOREIGN KEY (id_motorista) REFERENCES tb_motorista(id),
    FOREIGN KEY (id_veiculo) REFERENCES tb_veiculo(id)

);

CREATE TABLE tb_restricoes_renavam(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tipo_restricao VARCHAR(64) NOT NULL,
    status_restricao VARCHAR(64) NOT NULL,
    data_efetuacao DATE,
    is_renajud VARCHAR(64),

    id_motorista INT NOT NULL,
    id_veiculo INT NOT NULL,

    FOREIGN KEY (id_motorista) REFERENCES tb_motorista(id),
    FOREIGN KEY (id_veiculo) REFERENCES tb_veiculo(id)


);

INSERT INTO tb_motorista VALUES(default,'teste tester', '1234567891', 'ba', 'ssp', '98776544321', 'legal', '1999-12-27', '2022-12-31', '2018-01-01', 'ab', 'clovis de barros', 'josefina de jesus', '48932472819471289');
