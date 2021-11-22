// import { ThunkAction } from "redux-thunk";
// import { ActionsTypes } from "./types";

export const fetchItems = (keyName: string, useStateFunc: React.Dispatch<React.SetStateAction<any>>): void => {
  fetch("http://localhost:3000/db.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      useStateFunc(data[keyName]);
    });
};

export const fetchItemsThunk = (keyName: string, dispatchFunc: any, ActionCreator: (arr: []) => void) => {
  fetch("http://localhost:3000/db.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatchFunc(ActionCreator(data[keyName]));
    });
};
