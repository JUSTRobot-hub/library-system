import * as fs from 'fs';
import * as XLSX from 'xlsx';

export const exportData = (data: any[], fileName: string) => {
  let resultFilePath = '';

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const wbout = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  resultFilePath = `${process.cwd()}/logs/${fileName}.xlsx`;
  fs.writeFileSync(resultFilePath, wbout);

  return resultFilePath;
};
