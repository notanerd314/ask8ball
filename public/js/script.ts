import {
    getRandomArrayElement,
    toggleModal,
    applyFunctionToModalClose,
    applyFunctionToCopyButtons
} from "./reuse.js";

var shakingSound = new Audio('/public/media/shaking.wav');
var ballShaking = false;
const eightBallNormal = `<defs>
            <radialGradient id="SVGID_1_" cx="65.0846" cy="90.9897" r="146.5501" gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(5.8593058586120605,0,0,5.439137935638428,149.6584014892578,-166.16000366210938)">
                <stop offset="0" stop-color="#262626" />
                <stop offset="1" stop-color="#000000" />
            </radialGradient>
        </defs>
        <g>
            <title>Layer 1</title>
            <g id="svg_355" stroke="null">
                <circle class="st0" cx="568.1999" cy="453.19996" r="218.79997" fill="url(#SVGID_1_)" id="svg_1"
                    stroke="null" />
                <g id="svg_16" stroke="null">
                    <g id="svg_17" stroke="null">
                        <path class="st15"
                            d="m375.34833,370.03237c-0.73984,0 -1.23307,-0.2383 -1.97291,-0.47661c-2.21952,-0.95321 -3.20597,-3.57454 -1.97291,-5.71926c19.23583,-38.12841 49.56927,-70.06095 87.3011,-91.98478c2.21952,-1.19151 4.93227,-0.47661 6.16533,1.42982c1.23307,2.14472 0.49323,4.76605 -1.47968,5.95756c-36.25215,20.97062 -65.35252,51.71165 -83.84851,88.41025c-0.98645,1.66812 -2.71275,2.38303 -4.19243,2.38303l0.00001,-0.00001z"
                            fill="#686868" id="svg_18" stroke="null" />
                    </g>
                    <g id="svg_19" stroke="null">
                        <path class="st15"
                            d="m482.13187,268.99209c-1.72629,0 -3.20597,-0.95321 -3.94581,-2.38303c-0.98645,-2.14472 0,-4.76605 2.21952,-5.71926c20.4689,-9.0555 41.92426,-15.25136 64.36606,-18.11099c2.46613,-0.2383 4.68565,1.42982 4.93227,3.57454c0.24661,2.38303 -1.47968,4.52775 -3.6992,4.76605c-21.45535,2.85963 -42.17087,8.57889 -61.89993,17.39609c-0.49323,0.47661 -1.23307,0.47661 -1.97291,0.47661l0,-0.00001z"
                            fill="#686868" id="svg_20" stroke="null" />
                    </g>
                </g>
            </g>
            <path class="st16"
                d="m682.38184,454.38533c1.72629,-61.16448 -50.55572,-111.42367 -114.18194,-109.76417c-63.62622,-1.6595 -115.90824,48.59968 -114.18194,109.76417c-1.72629,61.16448 50.55572,111.42367 114.18194,109.76417c63.62622,1.89657 115.90824,-48.59968 114.18194,-109.76417z"
                fill="#141919" id="svg_22" stroke="null" />
            <path class="st17"
                d="m677.94281,454.38533c1.47968,-58.55669 -48.82943,-106.91931 -109.7429,-105.49688c-60.91348,-1.42243 -111.22258,46.94018 -109.7429,105.49688c-1.47968,58.55669 48.82943,106.91931 109.7429,105.49688c60.91348,1.42243 111.22258,-46.70311 109.7429,-105.49688z"
                fill="#ffffff" stroke-miterlimit="10" id="svg_23" stroke="#141919" />
            <path class="st18"
                d="m568.1999,331.81929c-71.27123,-3.319 -130.95165,54.05233 -127.49906,122.56603c-3.45259,68.5137 56.22783,125.88504 127.49906,122.56603c71.27123,3.319 130.95165,-54.05233 127.49906,-122.56603c3.45259,-68.5137 -56.22783,-125.88504 -127.49906,-122.56603zm0,237.78285c-66.8322,2.13364 -122.07357,-50.9704 -119.60743,-114.97974c-2.21952,-64.24641 53.02185,-117.35046 119.60743,-114.97974c66.8322,-2.13364 122.07357,50.9704 119.60743,114.97974c2.46613,64.00934 -52.77524,117.11339 -119.60743,114.97974z"
                fill="#262D2D" id="svg_24" stroke="null" />
            <ellipse stroke="#141919" ry="34.5" rx="36" id="svg_3" cy="420.35711" cx="569.99996" stroke-width="15"
                fill="#ffffff" />
            <ellipse stroke="#141919" ry="34.5" rx="36" id="svg_6" cy="489.35711" cx="569.99996" stroke-width="15"
                fill="#ffffff" />
        </g>`;
const eightBallResult = `<defs>
        <radialGradient
            gradientTransform="matrix(5.8593058586120605,0,0,5.439137935638428,149.6584014892578,-166.16000366210938)"
            gradientUnits="userSpaceOnUse" r="146.5501" cy="90.9897" cx="65.0846" id="SVGID_1_">
            <stop stop-color="#262626" offset="0" />
            <stop stop-color="#000000" offset="1" />
        </radialGradient>
    </defs>
    <g>
        <title>Layer 1</title>
        <g stroke="null" id="svg_356">
            <g stroke="null" id="svg_355">
                <circle stroke="null" id="svg_1" fill="url(#SVGID_1_)" r="218.79997" cy="453.19996" cx="568.1999" />
                <g stroke="null" id="svg_16">
                    <g stroke="null" id="svg_17">
                        <path stroke="null" id="svg_18" fill="#686868"
                            d="m375.34833,370.03237c-0.73984,0 -1.23307,-0.2383 -1.97291,-0.47661c-2.21952,-0.95321 -3.20597,-3.57454 -1.97291,-5.71926c19.23583,-38.12841 49.56927,-70.06095 87.3011,-91.98478c2.21952,-1.19151 4.93227,-0.47661 6.16533,1.42982c1.23307,2.14472 0.49323,4.76605 -1.47968,5.95756c-36.25215,20.97062 -65.35252,51.71165 -83.84851,88.41025c-0.98645,1.66812 -2.71275,2.38303 -4.19243,2.38303z" />
                    </g>
                    <g stroke="null" id="svg_19">
                        <path stroke="null" id="svg_20" fill="#686868"
                            d="m482.13187,268.99209c-1.72629,0 -3.20597,-0.95321 -3.94581,-2.38303c-0.98645,-2.14472 0,-4.76605 2.21952,-5.71926c20.4689,-9.0555 41.92426,-15.25136 64.36606,-18.11099c2.46613,-0.2383 4.68565,1.42982 4.93227,3.57454c0.24661,2.38303 -1.47968,4.52775 -3.6992,4.76605c-21.45535,2.85963 -42.17087,8.57889 -61.89993,17.39609c-0.49323,0.47661 -1.23307,0.47661 -1.97291,0.47661z" />
                    </g>
                </g>
            </g>
            <path stroke="null" id="svg_22" fill="#141919"
                d="m682.38184,454.38533c1.72629,-61.16448 -50.55572,-111.42367 -114.18194,-109.76417c-63.62622,-1.6595 -115.90824,48.59968 -114.18194,109.76417c-1.72629,61.16448 50.55572,111.42367 114.18194,109.76417c63.62622,1.89657 115.90824,-48.59968 114.18194,-109.76417z" />
            <path stroke="#141919" id="svg_23" stroke-miterlimit="10" fill="none"
                d="m677.94281,454.38533c1.47968,-58.55669 -48.82943,-106.91931 -109.7429,-105.49688c-60.91348,-1.42243 -111.22258,46.94018 -109.7429,105.49688c-1.47968,58.55669 48.82943,106.91931 109.7429,105.49688c60.91348,1.42243 111.22258,-46.70311 109.7429,-105.49688z" />
            <path stroke="null" id="svg_24" fill="#262D2D"
                d="m568.1999,331.81929c-71.27123,-3.319 -130.95165,54.05233 -127.49906,122.56603c-3.45259,68.5137 56.22783,125.88504 127.49906,122.56603c71.27123,3.319 130.95165,-54.05233 127.49906,-122.56603c3.45259,-68.5137 -56.22783,-125.88504 -127.49906,-122.56603zm0,237.78285c-66.8322,2.13364 -122.07357,-50.9704 -119.60743,-114.97974c-2.21952,-64.24641 53.02185,-117.35046 119.60743,-114.97974c66.8322,-2.13364 122.07357,50.9704 119.60743,114.97974c2.46613,64.00934 -52.77524,117.11339 -119.60743,114.97974z" />
            <path stroke="null" id="svg_25" fill="#303084"
                d="m485.09123,402.70371c-3.20597,-5.68972 0.24661,-10.43115 8.13824,-10.66822c50.55572,-1.6595 107.52338,-1.6595 157.33926,0.23707c7.64501,0.23707 11.0976,5.21558 7.89162,10.66822c-23.67487,41.48754 -52.28201,89.61308 -79.9027,131.10061c-3.6992,5.68972 -9.61792,5.68972 -13.31712,0c-27.12746,-41.25046 -56.22783,-89.61308 -80.14931,-131.33768z" />
        </g>
    </g>`;
const eightBallElement = document.getElementById("eight-ball");
const eightBallText = document.getElementById("eight-ball-text");
const eightBallWrapper = document.getElementById("eight-ball-wrapper");
const eightBallResponsesArea = document.getElementById("options-textarea") as HTMLTextAreaElement;
const eightBallTitle = document.getElementById("title-textarea") as HTMLInputElement;

const optionsButton = document.getElementById("options-button");
const shareButton = document.getElementById("share-button")
const shareText = document.getElementById("share") as HTMLTextAreaElement;
const embedShareText = document.getElementById("embed-textarea") as HTMLTextAreaElement;

const urlParams = new URLSearchParams(window.location.search);
const responsesParam = urlParams.get('responses');
const deafultResponses = `It is certain
It is decidedly so
Without a doubt
Yes definitely
You may rely on it
As I see it yes
Most likely
Outlook good
Yes
Signs point to yes
Reply hazy try again
Ask again later
Better not tell you now
Cannot predict now
Concentrate and ask again
Don’t count on it
My reply is no
My sources say no
Outlook not so good
Very doubtful
`;

eightBallResponsesArea.value = responsesParam ?? deafultResponses

eightBallElement?.addEventListener("click", () => {
    if (!ballShaking) {
        ballShaking = true;
        const eightBallResponses = eightBallResponsesArea.value
            .split('\n')
            .map(line => line.trim())
            .filter(line => line);

        eightBallElement.innerHTML = eightBallNormal; // Reset to normal look
        shakingSound.play();
        eightBallWrapper!.classList.add('shake')

        eightBallText!.innerHTML = "";
        eightBallText!.style.opacity = "0";

        setTimeout(() => {
            eightBallText!.innerHTML = getRandomArrayElement(eightBallResponses);
            eightBallElement.innerHTML = eightBallResult; // Show result
            const eightBallDice = document.getElementById("svg_25");
            eightBallDice!.style.opacity = "0";
            eightBallWrapper!.classList.remove('shake');
            setTimeout(() => {
                eightBallText!.style.opacity = "1";
                eightBallDice!.style.opacity = "1";
            }, 750)
            ballShaking = false;
        }, 2000);
    }
});

optionsButton?.addEventListener("click", () => {
    toggleModal("options-modal");
});

shareButton?.addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (eightBallResponsesArea.value !== deafultResponses && eightBallResponsesArea.value) {
        urlParams.set("responses", eightBallResponsesArea.value);
    }

    if (eightBallTitle.value !== "Magic 8 Ball" && eightBallTitle.value) {
        urlParams.set("title", eightBallTitle.value);
    }

    shareText!.value = `${window.location.origin}/8ball?${urlParams.toString()}`;
    embedShareText!.value = `<iframe src="${window.location.origin}/8ball/embed?${urlParams.toString()}" width="400" height="400" />`;

    toggleModal("share-modal");
});

applyFunctionToModalClose();
applyFunctionToCopyButtons();
