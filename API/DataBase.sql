/*
SQLyog Enterprise
MySQL - 10.4.17-MariaDB : Database - amigo_secreto
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`amigo_secreto` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `amigo_secreto`;

/*Table structure for table `participantes` */

DROP TABLE IF EXISTS `participantes`;

CREATE TABLE `participantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) COLLATE utf8_bin NOT NULL,
  `telefone` varchar(11) COLLATE utf8_bin NOT NULL,
  `familia` varchar(15) COLLATE utf8_bin NOT NULL,
  `login` varchar(20) COLLATE utf8_bin NOT NULL,
  `password` varchar(20) COLLATE utf8_bin NOT NULL,
  `num_calcado` int(11) DEFAULT NULL,
  `tam_blusa` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `tam_calca` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `sugestoes` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
