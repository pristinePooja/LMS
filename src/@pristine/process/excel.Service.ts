import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() {
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    // console.log('worksheet',worksheet);
    // const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    // this.saveAsExcelFile(excelBuffer, excelFileName);
    this.downloadFileInCsv(json, excelFileName);
  }

  downloadFileInCsv(data: any[], filename: string) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], {type: 'text/csv;charset=UTF-8'});
    FileSaver.saveAs(blob, filename + new Date().getTime() + ".csv");
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
//multiExcel
  public MultisheetWorkbook(sheet_data: any[], sheet_name: any[], excelFileName: string): void {
    let sheets : any = []
    for(let i=0; i<sheet_name.length; i++){
      sheets[sheet_name[i]] = XLSX.utils.json_to_sheet(sheet_data[i])
    }
    const workbook: XLSX.WorkBook = {
      Sheets: {...sheets},
      SheetNames: sheet_name
    };
    console.log(workbook)
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

}
