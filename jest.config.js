export default {
    testEnvironment: "jsdom", // Теперь Jest будет тестировать DOM
    transform: {
        "^.+\\.js$": "babel-jest", // Поддержка ESM
    },
};
