import { postSchoolNewsMessage } from "./utils";

postSchoolNewsMessage();
setInterval(postSchoolNewsMessage, 1e3 * 60 * 10); // 每 10 分鐘檢查一次
