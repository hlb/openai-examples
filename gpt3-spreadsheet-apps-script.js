/* source: https://docs.google.com/spreadsheets/d/17y_oAaDq2ycCh_1LomxrK2_1QgATckZAKC_bAv002xc/edit?usp=sharing */

const OPENAI_API_KEY = "";; // <- PASTE YOUR SECRET KEY HERE
const OPENAI_API_URL = "https://api.openai.com/v1/completions";

/**
 * Submits a prompt to GPT-3 and returns the completion
 *
 * @param {string} prompt Prompt to submit to GPT-3
 * @param {float} temperature Model temperature (0-1)
 * @param {string} model Model name (e.g. text-davinci-002)
 * @param {int} maxTokens Max Tokens (< 4000)
 * @return Completion from GPT-3
 * @customfunction
 */
function GPT3(
  prompt,
  temperature = 0.6,
  model = "text-davinci-003",
  maxTokens = 256
) {
  var data = {
    prompt: prompt,
    temperature: temperature,
    model: model,
    max_tokens: maxTokens,
  };
  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(data),
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
  };
  var response = UrlFetchApp.fetch(
    OPENAI_API_URL,
    options
  );

  return JSON.parse(response.getContentText()).choices[0].text.trim();
}

/**
 * Submits examples to GPT-3 and returns the completion
 *
 * @param {Array<Array<string>>} input Range of cells with input examples
 * @param {Array<Array<string>>} input Range of cells with output examples
 * @param {string} Cell to pass as input for completion
 * @param {float} temperature Model temperature (0-1)
 * @param {string} model Model name (e.g. text-davinci-002)
 * @param {int} maxTokens Max Tokens (< 4000)
 * @return Completion from GPT-3
 * @customfunction
 */
function GPT3_RANGE(
  examples_input,
  examples_output,
  input,
  temperature = 0.6,
  model = "text-davinci-003",
  maxTokens = 256
) {
  prompt = `I am an input/output bot. Given example inputs, I identify the pattern and produce the associated outputs.`;

  for (let i = 0; i < examples_input.length; i++) {
    example_input = examples_input[i];
    example_output = examples_output[i];

    prompt += `

Input: ${example_input}
Output: ${example_output}`;
  }

  prompt += `

Input: ${input}
Output:`;

  console.log(prompt);

  return GPT3(prompt, temperature, model, maxTokens);
}