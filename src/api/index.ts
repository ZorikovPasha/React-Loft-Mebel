
export const fetchWholeData = async (): Promise<any> => {
  try {
    const response = await fetch("http://localhost:3000/db.json");
    return response.json();
  } catch(error) {
  }  
};

export const getDataByName = async (name: string) => {
  const data = await fetchWholeData();
  return data[name];
}