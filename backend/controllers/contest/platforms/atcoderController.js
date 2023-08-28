const https = require("https");

async function atcoderContests() {
  const url = "https://kontests.net/api/v1/at_coder";

  const promise = new Promise((resolve, reject) => {
    https.get(url, function (response) {
      if (response.statusCode === 200) {
        resolve(response);
      } else {
        reject(new Error("Error getting AtCoder contests"));
      }
    });
  });

  const filteredContestsPromise = promise.then(function (response) {
    let list = "";
    response.on("data", function (data) {
      list += data;
    });

    return new Promise((resolve) => {
      response.on("end", function () {
        try {
          const contestList = JSON.parse(list.toString());
          const filteredContests = contestList.filter(
            (contest) => new Date(contest.start_time) > new Date()
          );
          var t=1;
          const contestsWithHost = filteredContests.map((contest) => ({
            host: "AtCoder",
            name: contest.name,
            vanity: t++,
            url: contest.url,
            startTimeUnix: new Date(contest.start_time).getTime() / 1000,
            duration: Math.floor(contest.duration / 60)
          }));
          console.log(contestsWithHost);
          resolve(contestsWithHost);
        } catch (error) {
          console.log("Error parsing JSON:", error);
          resolve([]);
        }
      });
    });
  });

  return filteredContestsPromise;
}

module.exports = {
  atcoderContests,
};
