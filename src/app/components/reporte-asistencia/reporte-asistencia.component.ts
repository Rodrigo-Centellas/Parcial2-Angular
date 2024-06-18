import { Component } from '@angular/core';
import { ReporteAsistenciaService } from 'app/services/reporte-asistencia.service';

@Component({
  selector: 'app-reporte-asistencia',
  templateUrl: './reporte-asistencia.component.html',
  styleUrls: ['./reporte-asistencia.component.css']
})
export class ReporteAsistenciaComponent {

  constructor(private reporteAsistenciaService: ReporteAsistenciaService) { }

  downloadpdf(): void {
    this.reporteAsistenciaService.exportPdf().subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'asistenciaReporte.pdf';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  downloadexcel(): void {
    this.reporteAsistenciaService.exportXls().subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'ReporteAsistencia.xls';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
