// ==UserScript==
// @name         AoC Copy Codeblock
// @namespace    https://tampermonkey.net
// @version      1.0.0
// @description  Copy any codeblock on AoC for easier use.
// @author       DamienVesper
// @match        https://adventofcode.com/*
// @grant        none
// ==/UserScript==

const style = document.createElement(`style`);
style.innerHTML = `code:copied:before { background: #30304f; }`;

document.head.appendChild(style);

Array.from(document.querySelectorAll(`code`)).forEach(element => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    element.addEventListener(`click`, async () => {
        if (window.getSelection()?.type === `Range`) return;

        await navigator.clipboard.writeText(element?.textContent ?? ``);
        element.classList.add(`copied`);

        await new Promise(resolve => setTimeout(resolve, 500));
        element.classList.remove(`copied`);
    });
});
