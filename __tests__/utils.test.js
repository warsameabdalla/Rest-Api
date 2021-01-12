const {
  formatDate,
  formattedUsersData,
} = require('../db/utils/data-manipulation');

describe.next('formatDate', () => {
  it('returns JavaScript date when passed the unix date', () => {
    let jsDate = `1970-01-01T00:00:00.002Z`;
    expect(formatDate(2)).toEqual(jsDate);
  });
});

describe('formattedUsersData', () => {
  it('returns object with value stored on created_at key converted to JavaScript Date', () => {
    const userData = {
      title: 'Running a Node App',
      topic: 'coding',
      author: 'jessjelly',
      body:
        'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
      created_at: 1471522072389,
    };
    expect(formattedUsersData(userData)).toEqual();
  });
});
