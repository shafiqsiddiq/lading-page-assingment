

export const updateCurrentRecordState = (record, key, newRecord) => {
  const currentData = record;
  for (let i = 0; i < currentData.length; i += 1) {
    if (currentData[i][key] === newRecord[key]) {
      currentData[i] = newRecord;
      break;
    }
  }
  return currentData;
};

export const deleteRecordFromCurrentState = (record, key, id) => {
  const filteredData = record.filter((item) => item[key] !== id);
  return filteredData;
};
