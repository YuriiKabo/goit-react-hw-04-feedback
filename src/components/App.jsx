import { Component } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  addFeedback = ({ target }) => {
    const targetName = target.name.toLowerCase();
    this.setState(prevState => ({
      [targetName]: prevState[targetName] + 1,
    }));
  };

  countTotalFeedback = ({ good, neutral, bad } = this.state) => {
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    if (!this.countTotalFeedback()) {
      return '0 %';
    }
    return (
      Math.round((this.state.good / this.countTotalFeedback()) * 100) + '%'
    );
  };

  render() {
    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.addFeedback}
          ></FeedbackOptions>
        </Section>
        <Section title="Statistics">
          <Statistics
            good={this.state.good}
            neutral={this.state.neutral}
            bad={this.state.bad}
            total={this.countTotalFeedback()}
            positivePercentage={this.countPositiveFeedbackPercentage()}
          ></Statistics>
        </Section>
      </>
    );
  }
}
