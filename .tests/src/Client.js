import axios from 'axios';

import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import qs from 'qs';

import config from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class Client {
    getInput = () => {
        axios.get(`https://adventofcode.com/${config.year}/day/${config.day}/input`, { headers: { Cookie: `session=${config.sessionSecret}` }}).then(res => {
            if (!fs.existsSync(path.resolve(__dirname, `../staging`))) {
                const jsStarter = fs.readFileSync(path.resolve(__dirname, `./sample.cjs`), `utf-8`);

                fs.mkdirSync(path.resolve(__dirname, `../staging`));
                fs.writeFileSync(path.resolve(__dirname, `../staging/P1.cjs`), jsStarter,  `utf-8`);
                fs.writeFileSync(path.resolve(__dirname, `../staging/P2.cjs`), jsStarter,  `utf-8`);
                fs.writeFileSync(path.resolve(__dirname, `../staging/output.txt`), ``);
            }

            fs.writeFileSync(path.resolve(__dirname, `../staging/input.txt`), res.data, `utf-8`);
        });
    };

    submitAnswer = (answer) => {
        const body = {
            level: String(config.level),
            answer: String(answer)
        };

        axios({
            method: `post`,
            url: `https://adventofcode.com/${config.year}/day/${config.day}/answer`,
            data: qs.stringify(body),
            headers: {
                Cookie: `session=${config.sessionSecret}`,
                [`Content-Type`]: `application/x-www-form-urlencoded`
            }
        }).then(res => {
            console.log(res.data.includes(`That's the right answer!`)
                ? `200 OK | Correct Answer Submitted`
                : `200 OK | Incorrect Answer Submitted`
            );
        });
    };
}

export default Client;
