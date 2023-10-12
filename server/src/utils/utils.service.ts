import { Injectable } from '@nestjs/common';

export type DReturnType = {
  status: boolean;
  deserializedDimensions: {
    width: number;
    length: number;
    height: number;
  }[];
};

@Injectable()
export class UtilsService {
  replaceSpacesWithUnderscores = (str: string): string => {
    let formattedString = '';
    str.split('').forEach((char) => {
      if (char === ' ') {
        formattedString += '_';
      } else {
        formattedString += char;
      }
    });

    return formattedString;
  };

  deserializeDimensionsFromString = (str: string): DReturnType => {
    const stringDimensions = str?.split(';') ?? [];

    if (!stringDimensions.length) {
      return { status: false, deserializedDimensions: [] };
    }

    const deserializedDimensions = stringDimensions.map((str) => {
      const strings = str.split(',');

      return {
        width: parseInt(strings[0]),
        length: parseInt(strings[1]),
        height: parseInt(strings[2]),
      };
    });

    const isSerializedCorrectly = deserializedDimensions.every(
      ({ width, length, height }) => {
        return (
          !Number.isNaN(width) && !Number.isNaN(length) && !Number.isNaN(height)
        );
      },
    );

    return { status: isSerializedCorrectly, deserializedDimensions };
  };
}
