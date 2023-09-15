const axios = require('axios');

// Reusable Axios options
const axiosOptions = {
  headers: {
    'User-Agent': 'Github-User-App',
    'Content-Type': 'application/json',
  },
};

async function github_u(handle) {
  if (!handle) {
    return null;
  }

  const apiurl = `https://api.github.com/users/${handle}`;
  const totalCommitsUrl = `https://api.github.com/search/commits?q=author:${handle}`;
  const totalCommits2023 = `https://api.github.com/search/commits?q=author:${handle}+author-date:2023-01-01..2023-12-31`;
  const totalIssuesUrl = `https://api.github.com/search/issues?q=author:${handle}+is:issue`;
  const totalPRsUrl = `https://api.github.com/search/issues?q=author:${handle}+is:pr`;

  try {
    // Use Axios with reusable options
    const [
      userResponse,
      commitsAllResponse,
      commits2023Response,
      issuesResponse,
      prsResponse,
    ] = await Promise.all([
      axios.get(apiurl, axiosOptions),
      axios.get(totalCommitsUrl, axiosOptions),
      axios.get(totalCommits2023, axiosOptions),
      axios.get(totalIssuesUrl, axiosOptions),
      axios.get(totalPRsUrl, axiosOptions),
    ]);

    const userInfo = userResponse.data;
    const commitsData = commitsAllResponse.data;
    const commitsData2023 = commits2023Response.data;
    const issuesData = issuesResponse.data;
    const prsData = prsResponse.data;

    console.log(userInfo);

    // Create an object to store user information
    const userObject = {
      username: userInfo.login,
      totalRepos: userInfo.public_repos,
      totalStars: userInfo.public_gists,
      followers: userInfo.followers,
      following: userInfo.following,
      fetchTime: Date.now(),
      // Add more properties as needed
      totalCommits: commitsData.total_count,
      totalCommits2023: commitsData2023.total_count, // Corrected to match 2023 commits
      totalIssues: issuesData.total_count,
      totalPRs: prsData.total_count,
    };

    console.log("OKKKKKKKKK");

    return userObject;
  } catch (error) {
    console.log('Error:', error.response ? error.response.data : error.message);
    return {};
  }
}

module.exports = {
  github_u,
};
