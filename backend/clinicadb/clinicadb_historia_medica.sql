CREATE DATABASE  IF NOT EXISTS `clinicadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `clinicadb`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: clinicadb
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `historia_medica`
--

DROP TABLE IF EXISTS `historia_medica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historia_medica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pacienteID` int NOT NULL,
  `FechaConsulta` date NOT NULL,
  `MotivoConsulta` varchar(255) NOT NULL,
  `Diagnostico` varchar(255) DEFAULT NULL,
  `RpAntiguo` varchar(255) DEFAULT NULL,
  `AntecedentesFamiliares` varchar(255) DEFAULT NULL,
  `EnfermedadesOcularesPrevias` varchar(255) DEFAULT NULL,
  `PrescripcionLentes` varchar(255) DEFAULT NULL,
  `UsoLentesContacto` varchar(255) DEFAULT NULL,
  `CirugiasOcularesPrevias` varchar(255) DEFAULT NULL,
  `ExamenVisual` varchar(255) DEFAULT NULL,
  `PresionOcular` varchar(50) DEFAULT NULL,
  `CampoVisual` varchar(255) DEFAULT NULL,
  `FondoDeOjo` varchar(255) DEFAULT NULL,
  `TratamientosPrevios` varchar(255) DEFAULT NULL,
  `MedicamentosRecetados` varchar(255) DEFAULT NULL,
  `Indicaciones` varchar(255) DEFAULT NULL,
  `ProximoControl` date DEFAULT NULL,
  `TomografiaRetina` varchar(255) DEFAULT NULL,
  `EcografiaOcular` varchar(255) DEFAULT NULL,
  `OjoDerechoEstado` varchar(255) DEFAULT NULL,
  `OjoIzquierdoEstado` varchar(255) DEFAULT NULL,
  `NivelDolor` varchar(50) DEFAULT NULL,
  `Observaciones` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `RpNombre` varchar(255) DEFAULT NULL,
  `RpConcentracion` varchar(255) DEFAULT NULL,
  `RpVia` varchar(255) DEFAULT NULL,
  `RpFrecuencia` varchar(255) DEFAULT NULL,
  `RpDuracion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pacienteID` (`pacienteID`),
  CONSTRAINT `historia_medica_ibfk_1` FOREIGN KEY (`pacienteID`) REFERENCES `pacientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historia_medica`
--

LOCK TABLES `historia_medica` WRITE;
/*!40000 ALTER TABLE `historia_medica` DISABLE KEYS */;
INSERT INTO `historia_medica` VALUES (1,4,'2025-02-22','Dolor en el ojo izquierdo','Estrés','Relajar la pelvis','ninguno','mal de ojo','blabla','no','original nuevo de paquete jamas usado','20/20 papa','1000 psi que revienta','ni idea','te lo debo','con cariño','felicidad en ampollas','haga bien sin mirar a quien','2025-03-01','ño','no','fino fino','fino fino','1','que buen paciente','2025-02-22 20:58:59',NULL,NULL,NULL,NULL,NULL),(2,4,'2025-02-22','qqqq','qqqqqq','qqqqq','qqq','qqqqq','qqqq','qqqq','qqqqqqqqq','qqqq','qqq','qqq','qqq','qqq','q','qqqq','2025-03-01','qq','q','q','q','q','qqqqqq','2025-02-22 21:03:36',NULL,NULL,NULL,NULL,NULL),(3,4,'2025-02-22','prueba','prueba','prueba','prueba','prueba','prueba','prueba','prueba','prueba','','','','','','','2025-02-21','','','','','','','2025-02-22 21:20:09',NULL,NULL,NULL,NULL,NULL),(4,4,'2025-02-22','psdfsdfsdfsdfsd','esf','sdfsd','sfs','','','','','','','','','','','','2025-03-08','sdfsdf','sdfsd','sdfs','','','sdfsdf','2025-02-22 21:25:25',NULL,NULL,NULL,NULL,NULL),(5,4,'2025-02-22','zxczxczcz','','','','','','','','','','','','','','','2025-03-05','','','','','','','2025-02-22 21:32:36',NULL,NULL,NULL,NULL,NULL),(6,4,'2025-02-22','fafasfasfasfa','afafasfasfafs','afasfasfaf','','','','','','','','','','','','','2025-05-29','','','','','','','2025-02-22 21:55:21',NULL,NULL,NULL,NULL,NULL),(7,5,'2025-02-22','le duele el corazon','pata chueca','palo seco por la cabeza','','','','','','','','','','','','','2025-03-22','','','','','','','2025-02-22 22:17:58',NULL,NULL,NULL,NULL,NULL),(8,4,'2025-02-22','aaaaaaaaaaaa','aaaaaaaaaa','','','','','','','','','','','','','','2025-04-10','','','','','','','2025-02-22 23:39:17',NULL,NULL,NULL,NULL,NULL),(9,6,'2025-02-22','dolor en el alma','mal de amor','sobaditas','rererer','ererer','','','','','','','','','','','2026-02-02','','','','','','','2025-02-22 23:45:07',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `historia_medica` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-22 21:49:46
