import axios from 'axios';
import { config } from '../config/index.js';

export const getAlertsMessage = (alerts) => {
  const description = alerts.map(
    (alert) => `${alert.alertCode} - ${alert.alertDescription}`,
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

export const getDiagnosis = (alerts) => {
  const description = getAlertsMessage(alerts);
  const content = `Summarize the following errors for a non technical user, ${description} in a brief way`;
  return fetchChatGPT(content);
};
