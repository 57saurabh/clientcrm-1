const createCsvWriter = require('csv-writer').createObjectCsvStringifier;

exports.createCSV = async (data) => {
  const csvWriter = createCsvWriter({
    header: [
      { id: 'clientId', title: 'Client ID' },
      { id: 'name', title: 'Name' },
      { id: 'email', title: 'Email' },
      { id: 'phone', title: 'Phone' },
      { id: 'subject', title: 'Subject' },
      { id: 'message', title: 'Message' },
      { id: 'resolved', title: 'Resolved' }
    ]
  });
  return csvWriter.stringifyRecords(data);
};
