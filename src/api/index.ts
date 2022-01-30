
const http = async (request: string): Promise<any> => {
  const response = await fetch('http://localhost:5000' + request);
  const body = await response.json();
  return body;
};

export const getFurnitureItems = () => {
  return http('/api/furniture');
};

export const getSlidesItems = () => {
  return http('/api/slides');
};

export const getNavMenuSublists = () => {
  const data = http('/api/headerNavMenuSublists').then(data => data)
  console.log('data', data);
  return data;
};

export const getMobMenuItems = () => {
  return http('/api/mobMenu');
};


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