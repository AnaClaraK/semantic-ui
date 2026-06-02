-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           12.2.2-MariaDB - MariaDB Server
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para exemplos
DROP DATABASE IF EXISTS `exemplos`;
CREATE DATABASE IF NOT EXISTS `exemplos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `exemplos`;

-- Copiando estrutura para tabela exemplos.agendamentos
DROP TABLE IF EXISTS `agendamentos`;
CREATE TABLE IF NOT EXISTS `agendamentos` (
  `id_agendamento` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `servico` varchar(100) NOT NULL,
  `profissional` varchar(100) NOT NULL,
  `data_agendamento` date NOT NULL,
  `horario` time NOT NULL,
  PRIMARY KEY (`id_agendamento`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela exemplos.agendamentos: ~8 rows (aproximadamente)
DELETE FROM `agendamentos`;
INSERT INTO `agendamentos` (`id_agendamento`, `nome_cliente`, `telefone`, `servico`, `profissional`, `data_agendamento`, `horario`) VALUES
	(1, 'Maria Oliveira', '(11) 98888-7777', 'Corte de cabelo', 'Fernanda', '2026-05-30', '14:30:00'),
	(4, 'Ana Costa', '83988888888', 'Manicure', 'Carla Lima', '2026-06-01', '09:00:00'),
	(5, 'Maria Silva', '(14) 99999-9999', 'Corte Feminino', 'João Pereira', '2026-06-15', '14:30:00'),
	(6, 'Maria Silva', '(14) 99999-9999', 'Corte Feminino', 'João Pereira', '2026-06-15', '14:30:00'),
	(7, 'Maria Silva', '(14) 99999-9999', 'Corte Feminino', 'João Pereira', '2026-06-15', '14:30:00'),
	(8, 'Lauane', '(14) 99999-9999', 'Corte Feminino', 'Ana Clara', '2026-06-15', '14:30:00'),
	(9, 'Lauane', '(14) 99999-9999', 'Corte Feminino', 'Ana Clara', '2026-06-15', '14:30:00'),
	(10, 'Maria Silva', '(14) 99999-9999', 'Corte Feminino', 'João Pereira', '2026-06-15', '14:30:00');

-- Copiando estrutura para tabela exemplos.clientes
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(70) NOT NULL,
  `telefone` varchar(20) NOT NULL DEFAULT '',
  `horario` datetime NOT NULL,
  `servicofeito` varchar(150) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela exemplos.clientes: ~1 rows (aproximadamente)
DELETE FROM `clientes`;
INSERT INTO `clientes` (`id_cliente`, `nome`, `telefone`, `horario`, `servicofeito`, `preco`) VALUES
	(1, 'Maria Oliveira', '(11) 98888-7777', '2026-05-26 14:30:00', 'Corte de cabelo', 80.00);

-- Copiando estrutura para tabela exemplos.funcionarios
DROP TABLE IF EXISTS `funcionarios`;
CREATE TABLE IF NOT EXISTS `funcionarios` (
  `id_funcionario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `especialidade` varchar(100) DEFAULT NULL,
  `comissao_percentual` decimal(5,2) DEFAULT NULL,
  `data_admissao` date NOT NULL,
  `status_ativo` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela exemplos.funcionarios: ~3 rows (aproximadamente)
DELETE FROM `funcionarios`;
INSERT INTO `funcionarios` (`id_funcionario`, `nome`, `cargo`, `telefone`, `especialidade`, `comissao_percentual`, `data_admissao`, `status_ativo`) VALUES
	(1, 'João Silva', 'Gerente', '(11) 99999-9999', 'Administrativo', 10.50, '2026-05-26', 1),
	(2, 'João Pereira', 'Cabeleireiro', '(14) 98888-8888', 'Corte Masculino', 0.00, '2025-01-15', 1),
	(3, 'João Pereira', 'Cabeleireiro', '(14) 98888-8888', 'Corte Masculino', 0.00, '2025-01-15', 1);

-- Copiando estrutura para tabela exemplos.pessoa
DROP TABLE IF EXISTS `pessoa`;
CREATE TABLE IF NOT EXISTS `pessoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_razao_social` varchar(255) NOT NULL,
  `nome_social_fantasia` varchar(255) DEFAULT NULL,
  `cep` char(8) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` char(2) DEFAULT NULL,
  `pais` varchar(50) DEFAULT 'Brasil',
  `documento` varchar(14) NOT NULL,
  `tipo` enum('CPF','CNPJ') NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `documento` (`documento`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela exemplos.pessoa: ~0 rows (aproximadamente)
DELETE FROM `pessoa`;

-- Copiando estrutura para tabela exemplos.produtos
DROP TABLE IF EXISTS `produtos`;
CREATE TABLE IF NOT EXISTS `produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela exemplos.produtos: ~0 rows (aproximadamente)
DELETE FROM `produtos`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
