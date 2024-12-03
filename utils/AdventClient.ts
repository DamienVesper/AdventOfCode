import axios from 'axios';

import qs from 'qs';
import config from '../.config/config';

/**
 * Advent of Code Interfacing Client
 * @author DamienVesper
 */
class AdventClient {
    /**
     * Get the input of the day specified in the configuration.
     */
    getInput = async (): Promise<any> => {
        const res = await axios.get(`https://adventofcode.com/${config.year}/day/${config.day}/input`, { headers: { Cookie: `session=${config.sessionSecret}` } }).catch(() => console.error(`That day is not available yet!`));
        if (res?.data !== undefined) return res.data.slice(0, res.data.length - 1);
    };

    /**
     * Submit the answer for the day and level specified in the configuration.
     * @param {number | string} answer The answer to submit.
     */
    submitAnswer = (answer: number): void => {
        const body = {
            level: String(config.level),
            answer: String(answer)
        };

        void axios({
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

export default AdventClient;
