const { userData } = require("../db/data/test-data");
const {
  formatDate,
  formattedArticleData,
  createReferenceObject,
  formattedcommentData,
} = require("../db/utils/data-manipulation");

describe("formatDate", () => {
  it("returns JavaScript date when passed the unix date", () => {
    let jsDate = `1970-01-01T00:00:00.002Z`;
    expect(formatDate(2)).toEqual(new Date(2));
  });
});

describe("formattedArticleData", () => {
  it("returns object with value stored on created_at key converted to JavaScript Date", () => {
    const userData = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
      },
    ];
    const copyUserData = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
      },
    ];
    // const jsDate = new Date(1471522072389);
    let jsData = formattedArticleData(userData);
    expect(jsData[0].created_at).toEqual(new Date(1471522072389));
    expect(userData).toEqual(copyUserData);
  });
});
describe("createReferenceObject", () => {
  it("returns object with article_id key with its value as the title", () => {
    const userData = [
      {
        article_id: 18,
        title:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        topic: "football",
        author: "grumpy19",
        body:
          "With each click and drag of a mouse, young soccer fanatics are creating the building blocks of the advanced stats that are changing how the sport is played, watched and analyzed. Opta and Prozone are among the companies that have taken soccer stats far beyond goals and saves, into the realm of pass completion percentage, defensive touches, percentage of aerial balls won, tackle percentage and goals scored above expectation. Cameras alone can’t process all these stats. So companies employ people — mostly young, mostly male, most logging matches in their spare time as a second job — to watch matches and document every event. Their work has helped develop stats that capture the value of players who don’t score many goals, but who set them up with pinpoint passing and hustle. Teams use advanced stats to decide which players to buy and put on the pitch. And fans, whether they like it or not, read and hear more numbers than ever before about this sport that for so long bucked the sports-analytics trend.",
        created_at: 1522206238717,
      },
    ];
    // const jsDate = new Date(1471522072389);
    let obj = createReferenceObject(userData);
    expect(obj).toEqual({
      "The People Tracking Every Touch, Pass And Tackle in the World Cup": 18,
    });
  });
});
describe("formattedcommentsData", () => {
  it("returns object with value stored on created_at key converted to JavaScript Date, and also changes belongs_to key to article_id", () => {
    const userData = [
      {
        article_id: 18,
        title:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        topic: "football",
        author: "grumpy19",
        body:
          "With each click and drag of a mouse, young soccer fanatics are creating the building blocks of the advanced stats that are changing how the sport is played, watched and analyzed. Opta and Prozone are among the companies that have taken soccer stats far beyond goals and saves, into the realm of pass completion percentage, defensive touches, percentage of aerial balls won, tackle percentage and goals scored above expectation. Cameras alone can’t process all these stats. So companies employ people — mostly young, mostly male, most logging matches in their spare time as a second job — to watch matches and document every event. Their work has helped develop stats that capture the value of players who don’t score many goals, but who set them up with pinpoint passing and hustle. Teams use advanced stats to decide which players to buy and put on the pitch. And fans, whether they like it or not, read and hear more numbers than ever before about this sport that for so long bucked the sports-analytics trend.",
        created_at: 1522206238717,
      },
    ];
    const copyUserData = [
      {
        article_id: 18,
        title:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        topic: "football",
        author: "grumpy19",
        body:
          "With each click and drag of a mouse, young soccer fanatics are creating the building blocks of the advanced stats that are changing how the sport is played, watched and analyzed. Opta and Prozone are among the companies that have taken soccer stats far beyond goals and saves, into the realm of pass completion percentage, defensive touches, percentage of aerial balls won, tackle percentage and goals scored above expectation. Cameras alone can’t process all these stats. So companies employ people — mostly young, mostly male, most logging matches in their spare time as a second job — to watch matches and document every event. Their work has helped develop stats that capture the value of players who don’t score many goals, but who set them up with pinpoint passing and hustle. Teams use advanced stats to decide which players to buy and put on the pitch. And fans, whether they like it or not, read and hear more numbers than ever before about this sport that for so long bucked the sports-analytics trend.",
        created_at: 1522206238717,
      },
    ];
    let referenceObj = createReferenceObject(userData);
    let formattedcommentArr = formattedcommentData(
      [
        {
          comment_id: 1,
          body:
            "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
          belongs_to:
            "The People Tracking Every Touch, Pass And Tackle in the World Cup",
          created_by: "tickle122",
          votes: -1,
          created_at: 1468087638932,
        },
      ],
      referenceObj
    );
    expect(formattedcommentArr).toEqual([
      {
        comment_id: 1,
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        article_id: 18,
        author: "tickle122",
        votes: -1,
        created_at: new Date(1468087638932),
      },
    ]);

    // // const jsDate = new Date(1471522072389);
    // let jsData = formattedArticleData(userData);
    // expect(jsData[0].created_at).toEqual(new Date(1471522072389));
    expect(userData).toEqual(copyUserData);
  });
});
