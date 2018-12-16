import { createObjectCsvWriter } from 'csv-writer';

export const writeCSV = (path, records) => {
  const csvWriter = createObjectCsvWriter({
      path,
      header: [
          {id: 'xebian', title: 'Xebian'}
      ]
  });

  const orderedRecords = sortObjectByKeys(records);
  const newRecords = [];
  for (const xebian in orderedRecords) {
    newRecords.push({xebian})
  }
  return csvWriter.writeRecords(newRecords);
}

const sortObjectByKeys = unordered => {
  const ordered = {};
  Object.keys(unordered).sort().forEach(function(key) {
    ordered[key] = unordered[key];
  });
  return ordered;
}