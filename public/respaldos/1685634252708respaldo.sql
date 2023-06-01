-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: base_buses
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asiento`
--

DROP TABLE IF EXISTS `asiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(100) DEFAULT NULL,
  `estado_asiento_id_fk` int(11) DEFAULT NULL,
  `usuario_id_fk` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id_fk` (`usuario_id_fk`),
  KEY `estado_asiento_id_fk` (`estado_asiento_id_fk`),
  CONSTRAINT `asiento_ibfk_1` FOREIGN KEY (`usuario_id_fk`) REFERENCES `usuario` (`id`),
  CONSTRAINT `asiento_ibfk_2` FOREIGN KEY (`estado_asiento_id_fk`) REFERENCES `estadoasiento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asiento`
--

LOCK TABLES `asiento` WRITE;
/*!40000 ALTER TABLE `asiento` DISABLE KEYS */;
INSERT INTO `asiento` VALUES (1,'A1',1,3),(2,'A2',1,3),(3,'B1',1,3),(4,'B2',1,3);
/*!40000 ALTER TABLE `asiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadoasiento`
--

DROP TABLE IF EXISTS `estadoasiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadoasiento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadoasiento`
--

LOCK TABLES `estadoasiento` WRITE;
/*!40000 ALTER TABLE `estadoasiento` DISABLE KEYS */;
INSERT INTO `estadoasiento` VALUES (1,'habilitada'),(2,'deshabilitada'),(3,'habilitada'),(4,'deshabilitada');
/*!40000 ALTER TABLE `estadoasiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadotipousuario`
--

DROP TABLE IF EXISTS `estadotipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadotipousuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadotipousuario`
--

LOCK TABLES `estadotipousuario` WRITE;
/*!40000 ALTER TABLE `estadotipousuario` DISABLE KEYS */;
INSERT INTO `estadotipousuario` VALUES (1,'habilitada'),(2,'deshabilitada'),(3,'habilitada'),(4,'deshabilitada');
/*!40000 ALTER TABLE `estadotipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadousuario`
--

DROP TABLE IF EXISTS `estadousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadousuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadousuario`
--

LOCK TABLES `estadousuario` WRITE;
/*!40000 ALTER TABLE `estadousuario` DISABLE KEYS */;
INSERT INTO `estadousuario` VALUES (1,'habilitada'),(2,'deshabilitada'),(3,'habilitada'),(4,'deshabilitada');
/*!40000 ALTER TABLE `estadousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipousuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `estado_tipoUsuario_id_fk` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `estado_tipoUsuario_id_fk` (`estado_tipoUsuario_id_fk`),
  CONSTRAINT `tipousuario_ibfk_1` FOREIGN KEY (`estado_tipoUsuario_id_fk`) REFERENCES `estadotipousuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuario`
--

LOCK TABLES `tipousuario` WRITE;
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
INSERT INTO `tipousuario` VALUES (1,'super admin',1),(2,'admin',1),(3,'cliente',1);
/*!40000 ALTER TABLE `tipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `estado_usuario_id_fk` int(11) DEFAULT NULL,
  `tipo_usuario_id_fk` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipo_usuario_id_fk` (`tipo_usuario_id_fk`),
  KEY `estado_usuario_id_fk` (`estado_usuario_id_fk`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`tipo_usuario_id_fk`) REFERENCES `tipousuario` (`id`),
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`estado_usuario_id_fk`) REFERENCES `estadousuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Matias','matias@gmail.com','123',1,1),(2,'Gaston','gaston@gmail.com','123',1,2),(3,'Esteban','esteban@gmail.com','123',1,3),(4,'ASDASD','ASDASD@SDSDSD','123',1,3),(5,'qweqwe','qweqwe@eqweqwe','123',1,3);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-01 11:44:12
