const { uniqueNamesGenerator, adjectives, colors, NumberDictionary } = require('unique-names-generator');

export default function createRandomUsername() {
    const numberDictionary = NumberDictionary.generate({ min:100, max:999 });

    const randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, numberDictionary],
        length: 3,
        separator: '',
        style: 'capital'
    });

    return randomName;
};