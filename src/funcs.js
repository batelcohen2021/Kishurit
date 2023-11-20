import axios from "axios";
// import { Octokit } from "https://esm.sh/@octokit/rest";
// import { createOrUpdateTextFile } from "https://esm.sh/@octokit/plugin-create-or-update-text-file";

import { Octokit } from "@octokit/rest";
import { createOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file";

const MyOctokit = Octokit.plugin(createOrUpdateTextFile);
const octokit = new MyOctokit({
  auth: process.env.REACT_APP_GOOOGLE_TOKEN,
});

export const dbURL = process.env.REACT_APP_URL;

export default async function updateDB (info) {
  info.active = false;
  info = JSON.stringify({ obj: info }, null, 2);
  console.log(info);
  const { updated } = await octokit.createOrUpdateTextFile({
    owner: process.env.REACT_APP_USER,
    repo: process.env.REACT_APP_REPO,
    path: process.env.REACT_APP_FILE,
    content: info,
    message: "updated file",
  });

  if (updated) {
    console.log("The data was update");
  } else {
    console.log("The file doesn't not exist");
  }

};

export function divideArrayBySetsOfN(array, n = 3) {
  return !(array instanceof Array) ? [] : array?.reduce((arr, curr, i) => {
    if (i % n === 0) arr.push([]);
    arr[arr.length - 1].push(curr);
    return arr;
  }, [])
}


export const sendEmail = async (e, info) => {
  console.clear();
  e.preventDefault();
  let apiKey = process.env.REACT_APP_EMAIL_AUTH;
  let apiURL = "https://api.brevo.com/v3/smtp/email";
  //let apiURL = "https://api.sendinblue.com/v3/smtp/email";

  const tel =
    info?.phone && `tel: <a href=\"tel:${info.phone}\">${info.phone}</a> \n`;
  //info?.phone && 'tel: <a href="tel:' + info.phone + '">' + "</a> \n";

  let msg = {
    sender: { name: info.name, email: info?.email || "avoda@wall.com" },
    to: [{ email: "drushimgalil@gmail.com", name: "Avoda" }],
    subject: info?.title || "Messame",
    textContent: tel + info.comment,
  };

  try {
    await axios.post(apiURL, msg, {
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log("Can't send message");
  }
  console.log(msg);
};
