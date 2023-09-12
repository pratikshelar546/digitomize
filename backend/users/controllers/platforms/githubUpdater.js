const https = require('https');
const axios = require('axios');
const { url } = require('inspector');

async function github_u(handle) {
    if (!handle) {
        return null;
    }
    const apiurl = `https://api.github.com/users/${handle}`;
    //  url1:`https://api.github.com/users/${handle}/followers`,
    //  url2:`https://api.github.com/users/${handle}/following`,
    //  url3:`https://api.github.com/users/${handle}/repos`,
    //  url4:`https://api.github.com/users/${handle}/starred`,
    //  url5:`https://api.github.com/repos/${handle}/${repo.name}/stargazers`,
    //  url6:`https://api.github.com/search/commits?q=author:${handle}`,


    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            headers: {
                'User-Agent': 'Github-User-App',
                'Content-Type': 'application/json',
            },
        };
        const request = https.request(apiurl, options, (response) => {
            let data = '';
            // Collecting data
            response.on('data', (chunk) => {
                data += chunk;
            });

            // parsing the data
            response.on('end', () => {
                try {

                    const userInfo = JSON.parse(data);
                    console.log(userInfo);
                    console.log("OKKKKKKKKK");
                    // return userInfo;
                    // Create an object to store user information
                    const userObject = {
                        username: userInfo.login,
                        totalRepos: userInfo.public_repos,
                        totalStars: userInfo.public_gists,
                        followers: userInfo.followers,
                        following: userInfo.following,

                        // Add more properties as needed
                    };
                    resolve(userObject);

                } catch (error) {
                    console.log('Error parsing JSON:', error);
                    resolve({});
                }
            });
        });

        request.on('error', (error) => {
            console.log('Error getting user info:', error);
            reject(error);
        });

        // request.write(JSON.stringify(query));
        request.end();
    });
}
module.exports = {
    github_u,
};

