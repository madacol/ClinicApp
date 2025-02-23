// src/pages/ExportarWord.js
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export const exportToWord = async (datosInforme, templateFile = "InformeMedico.docx") => {
  try {
    const response = await fetch(`/templates/${templateFile}`);
    const arrayBuffer = await response.arrayBuffer();
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    // Renderiza la plantilla con los datos recibidos.
    doc.render(datosInforme);
    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    // Asigna el nombre de salida según la plantilla utilizada.
    let outputFileName = "";
    if (templateFile === "RecipeMedico.docx") {
      outputFileName = "RecipeMedico.docx";
    } else if (templateFile === "InformeMedico.docx") {
      outputFileName = "InformeMedico.docx";
    } else {
      outputFileName = templateFile;
    }
    saveAs(out, outputFileName);
    } catch (error) {
    console.error("Error al exportar a Word:", error);
    window.alert("Error al exportar a Word. Verifique que los marcadores en la plantilla sean correctos.");
    }
    };
