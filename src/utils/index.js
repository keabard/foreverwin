import { createObjectCsvWriter } from 'csv-writer';

export const writeCSV = (path, records) => {
  const csvWriter = createObjectCsvWriter({
      path,
      header: [
          {id: 'xebian', title: 'Xebian'},
          {id: 'weekStartDate', title: 'Date de debut de feuille'},
          {id: 'validationStep', title: 'Statut de validation'}
      ]
  });

  const orderedRecords = sortObjectByKeys(records);
  const newRecords = [];
  for (const xebian in orderedRecords) {
    orderedRecords[xebian].map(
      ({weekStartDate, validationStep}) => {
        newRecords.push({xebian, weekStartDate, validationStep})
      }
    );
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