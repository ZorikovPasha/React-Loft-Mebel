export const fetchItems = (keyName: string, useStateFunc: React.Dispatch<React.SetStateAction<any>>): void => {
  try {
    fetch("http://localhost:3000/db.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        useStateFunc(data[keyName]);
      });
  } catch (error) {
  }
};

export const fetchItemsThunk = (keyName: string, dispatchFunc: any, ActionCreator: (arr: []) => void) => {
  try {
    fetch("http://localhost:3000/db.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatchFunc(ActionCreator(data[keyName]));
      });
  } catch (error) {
  }
};
