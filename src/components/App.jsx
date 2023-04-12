import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';

import { useState } from 'react';

export const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const addFeedback = ({ target }) => {
    const targetName = target.name.toLowerCase();
    setState(prevState => ({
      ...prevState,
      [targetName]: prevState[targetName] + 1,
    }));
  };

  const countTotalFeedback = ({ good, neutral, bad } = state) => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    if (!countTotalFeedback()) {
      return '0 %';
    }
    return Math.round((state.good / countTotalFeedback()) * 100) + '%';
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(state)}
          onLeaveFeedback={addFeedback}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        <Statistics
          good={state.good}
          neutral={state.neutral}
          bad={state.bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        ></Statistics>
      </Section>
    </>
  );
};
