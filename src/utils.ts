import axios from "axios";
import { Window } from "happy-dom";
import { getSchoolLatestNew, PmaiSchoolNewData } from "./getSchoolLatestNews";

export const getDom = async (url: string) => {
  const window = new Window();
  const document = window.document;

  const { data } = await axios.get(url);

  const noscriptEl = document.createElement("noscript");
  noscriptEl.innerHTML = data;
  document.appendChild(noscriptEl);

  return window;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendToDiscord = <D = any>(data: D) => {
  return axios
    .post(
      `https://discordapp.com/api/channels/${process.env.CHANNEL_ID}/messages`,
      data,
      { headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` } }
    )
    .catch();
};

export const sendSchoolNewsMessage = async (news: PmaiSchoolNewData[]) => {
  if (news.length < 1) return;

  for (let i = 0; i < news.length; i += 3) {
    await sendToDiscord({
      content: "學校發送了最新的公告",
      embeds: news
        .slice(i, i + 2)
        .map(({ title, summary: description, href: url, timestamp }) => ({
          title,
          description,
          url,
          timestamp,
        })),
    });
  }
};

export const postSchoolNewsMessage = async () => {
  return sendSchoolNewsMessage(await getSchoolLatestNew());
};
