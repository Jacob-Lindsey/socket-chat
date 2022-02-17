const { uniqueNamesGenerator, countries, NumberDictionary } = require('unique-names-generator');

export default function createRandomRoomName() {
    const numberDictionary = NumberDictionary.generate({ min:10000, max:99999 });

    const randomName = uniqueNamesGenerator({
        dictionaries: [countries, numberDictionary],
        length: 2,
        separator: '-'
    });

    return randomName;
};