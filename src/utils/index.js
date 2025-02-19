import axios from 'axios';
import { config } from '../config/index.js';
import { alertErrors } from '../config/errors.js';

export const getErrorMessage = (errors) => {
  console.log('ERRRORRSR', errors);
  const description = errors.map(
    (error) => `${error.severity} - ${error.code} - ${error.fault}`,
  );
  return description.join(', ');
};

// eslint-disable-next-line consistent-return
const fetchChatGPT = async (content) => {
  const data = {
    model: 'gpt-4o-mini',
    store: true,
    messages: [
      {
        role: 'user',
        content,
      },
    ],
  };

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.OPEN_IA_TOKEN,
        },
      },
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
};

export const getDiagnosis = (errors) => {
  const description = getErrorMessage(errors);
  const content = `Analyze the following errors of the motorcycle and the severity, give a general diagnosis in less than or 50 words: ${description}`;
  return fetchChatGPT(content);
};

export const generateRandomErrors = (n = 3) => {
  const copyArr = [...alertErrors];
  const result = [];
  const maxItems = Math.min(n, copyArr.length);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < maxItems; i++) {
    const randomIndex = Math.floor(Math.random() * copyArr.length);
    const selectedItem = copyArr.splice(randomIndex, 1)[0];
    result.push(selectedItem);
  }
  return result;
};
