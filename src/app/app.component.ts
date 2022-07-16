import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  csvDataColumns = [
    'Disbursement Amount',
    'Disbursement Date',
    'Customer Full Name',
  ];

  disbursements = [
    {
      disbursementAmount: 100,
      disbursementDate: '01/01/2017',
      customerFullName: 'John Doe',
    },
    {
      disbursementAmount: 200,
      disbursementDate: '02/02/2017',
      customerFullName: 'Ben Benson',
    },
    {
      disbursementAmount: 300,
      disbursementDate: '03/03/2017',
      customerFullName: 'Jane Doe',
    },
    {
      disbursementAmount: 400,
      disbursementDate: '04/04/2017',
      customerFullName: 'George Benson',
    },
    {
      disbursementAmount: 500,
      disbursementDate: '05/05/2017',
      customerFullName: 'Boyd Brown',
    },
  ];

  // Using Blob API
  // https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob#browser_compatibility

  generateCSV(filename) {
    // Generate CSV file
    let csvFile = '';

    // Create columns
    let columnHeader = '';
    this.csvDataColumns.forEach((column) => {
      columnHeader += `${column},`;
    });
    columnHeader = columnHeader.slice(0, -1);
    columnHeader += '\n';
    csvFile += columnHeader;

    this.disbursements.forEach((item) => {
      csvFile += `${item.disbursementAmount},${item.disbursementDate},${item.customerFullName}\n`;
    });

    // Download to user
    let blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });

    var link = document.createElement('a');
    if (link.download !== undefined) {
      let url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  onDownloadCSV(event?: MouseEvent) {
    this.generateCSV('output.csv');
  }
}
