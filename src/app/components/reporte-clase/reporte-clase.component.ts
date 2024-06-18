import { Component } from '@angular/core';
import { ReportService } from '../../services/reporte-clase.service';

@Component({
  selector: 'app-report',
  templateUrl: './reporte-clase.component.html',
  styleUrls: ['./reporte-clase.component.css']
})
export class ReportComponent {

  constructor(private reportService: ReportService) { }

  downloadPdf(): void {
    this.reportService.exportPdf().subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'claseReport.pdf';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  downloadXls(): void {
    this.reportService.exportXls().subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'ReporteClase.xls';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
