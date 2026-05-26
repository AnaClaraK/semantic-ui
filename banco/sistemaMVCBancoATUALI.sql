-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           12.2.2-MariaDB - MariaDB Server
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.15.0.7171
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
CREATE DATABASE IF NOT EXISTS `exemplos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `exemplos`;

-- Copiando estrutura para tabela exemplos.agendamentos
CREATE TABLE IF NOT EXISTS `agendamentos` (
  `id_agendamento` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `servico` varchar(100) NOT NULL,
  `profissional` varchar(100) NOT NULL,
  `data_agendamento` date NOT NULL,
  `horario` time NOT NULL,
  PRIMARY KEY (`id_agendamento`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela exemplos.agendamentos: ~1 rows (aproximadamente)
DELETE FROM `agendamentos`;
INSERT INTO `agendamentos` (`id_agendamento`, `nome_cliente`, `telefone`, `servico`, `profissional`, `data_agendamento`, `horario`) VALUES
	(1, 'Maria Oliveira', '(11) 98888-7777', 'Corte de cabelo', 'Fernanda', '2026-05-30', '14:30:00');

-- Copiando estrutura para tabela exemplos.clientes
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela exemplos.funcionarios: ~1 rows (aproximadamente)
DELETE FROM `funcionarios`;
INSERT INTO `funcionarios` (`id_funcionario`, `nome`, `cargo`, `telefone`, `especialidade`, `comissao_percentual`, `data_admissao`, `status_ativo`) VALUES
	(1, 'João Silva', 'Gerente', '(11) 99999-9999', 'Administrativo', 10.50, '2026-05-26', 1);

-- Copiando estrutura para tabela exemplos.pessoa
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela exemplos.pessoa: ~0 rows (aproximadamente)
DELETE FROM `pessoa`;

-- Copiando estrutura para tabela exemplos.produtos
CREATE TABLE IF NOT EXISTS `produtos` (
  `id_produto` int(11) NOT NULL AUTO_INCREMENT,
  `nomeProduto` varchar(50) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `preco` varchar(50) DEFAULT NULL,
  `estoque` int(11) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_produto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela exemplos.produtos: ~3 rows (aproximadamente)
DELETE FROM `produtos`;
INSERT INTO `produtos` (`id_produto`, `nomeProduto`, `descricao`, `preco`, `estoque`, `categoria`, `status`) VALUES
	(1, 'Shampoo Pantene', 'Shampoo para hidratação', '29.9', 10, 'Shampoo', 'Disponível'),
	(2, 'Shampoo Wella', 'Shampoo da marca wella de 1L', '143.00', 32, 'Shampoo', 'Disponível'),
	(3, 'Shampoo Widi Care Juba', 'Shampoo para hidratação', '89', 10, 'Cachos', 'Disponível');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
