export const DBConfig = {
  name: "questions_answers",
  version: 1,
  objectStoresMeta: [
    {
      store: "courseData",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "questions", keypath: "questions", options: { unique: false } },
        { name: "answers", keypath: "answers", options: { unique: false } },
      ],
    },
  ],
};
