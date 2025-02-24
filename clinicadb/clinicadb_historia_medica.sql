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
  `Tratamiento` text,
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
  `RecomendacionesMedicas` text,
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
  `LejosODEsfera` varchar(10) DEFAULT NULL,
  `LejosOIEsfera` varchar(10) DEFAULT NULL,
  `LejosODCilindro` varchar(10) DEFAULT NULL,
  `LejosOICilindro` varchar(10) DEFAULT NULL,
  `LejosODEje` varchar(10) DEFAULT NULL,
  `LejosOIEje` varchar(10) DEFAULT NULL,
  `LejosODAv` varchar(10) DEFAULT NULL,
  `LejosOIAv` varchar(10) DEFAULT NULL,
  `CercaODADD` varchar(10) DEFAULT NULL,
  `CercaOIADD` varchar(10) DEFAULT NULL,
  `CercaODAVCC` varchar(10) DEFAULT NULL,
  `CercaOIAVCC` varchar(10) DEFAULT NULL,
  `TipoLente` varchar(50) DEFAULT NULL,
  `AlturaLente` varchar(10) DEFAULT NULL,
  `DIP` varchar(10) DEFAULT NULL,
  `Filtro` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pacienteID` (`pacienteID`),
  CONSTRAINT `historia_medica_ibfk_1` FOREIGN KEY (`pacienteID`) REFERENCES `pacientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historia_medica`
--

LOCK TABLES `historia_medica` WRITE;
/*!40000 ALTER TABLE `historia_medica` DISABLE KEYS */;
INSERT INTO `historia_medica` VALUES (1,4,'2025-02-22','Dolor en el ojo izquierdo','Estrés','Relajar la pelvis','ninguno','mal de ojo','blabla','no','original nuevo de paquete jamas usado','20/20 papa','1000 psi que revienta','ni idea','te lo debo','con cariño','felicidad en ampollas','haga bien sin mirar a quien','2025-03-01','ño','no','fino fino','fino fino','1','que buen paciente','2025-02-22 20:58:59',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,4,'2025-02-23','dolor','','','','','','','','','','','','','','','2025-02-26','','','','','','','2025-02-23 21:58:20',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,4,'2025-02-23','11111','1','','','','','','','','','','','','','','2025-02-26','','','','','','','2025-02-23 22:14:51','','','','','','111','','11','','','','','','','','','','','','',''),(19,4,'2025-02-23','ttttttt','','','','','','','','','','','','','','','2025-02-26','','','','','','-Medicamento: ttttt; Concentración: tttt; Vía: Gotas; Frecuencia: Cada 8 horas; Duración: 1 horas\n\n-Medicamento: rtrtrtrtr; Concentración: rtrtrt; Vía: Gotas; Frecuencia: Cada 8 horas; Duración: 1 semanas','2025-02-23 22:30:22','','','','','','','','','','','','','','','','','','','','',''),(20,4,'2025-02-23','Ojo seco','Alergia','ni idea','','','','no','cataratas','','','','','','','','2025-03-02','','','','','','-Medicamento: systane; Concentración: 10%; Vía: 1 Gota; Frecuencia: Cada 8 horas; Duración: 1 semanas\n\n-Medicamento: Limon lloron; Concentración: chorros; Vía: ampollas; Frecuencia: Cada 24 horas; Duración: 1 mes','2025-02-23 23:59:27','','','','','','12','12','12','12','12','12','12','12','12','12','12','12','Visión sencilla','33','33','Antireflejo');
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

-- Dump completed on 2025-02-23 20:13:43
