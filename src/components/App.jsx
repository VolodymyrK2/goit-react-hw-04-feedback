import {useState } from "react";
import Section from "./Section/Section";
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Statistics from "./Statistics/Statistics";
import Notification from "./Notification/Notification";
const INITIAL_STATE = {
  good: 0,
  neutral: 0,
  bad: 0
}
const App = () => {
  const [options, setOptions] = useState(INITIAL_STATE)
  const onLeaveFeedback = (e) => {
    const option = e.target.id;
    setOptions((prev) => (
      { ...options, [option]: prev[option] + 1 })
    )
  }
  const countTotalFeedback = () => {
  return  Object.values(options).reduce((prev, number) => {
      return prev + number;
    }, 0)
  }
  const countPositiveFeedbackPercentage = () => {
    if (countTotalFeedback() === 0) {
      return 0;
    }
    return (options.good / countTotalFeedback() * 100).toFixed();
  }
  const { good, bad, neutral } = options;
return (<div>
    <Section title="Please leave feedback">
      <FeedbackOptions
        options={options}
        onLeaveFeedback={onLeaveFeedback}
      />
    </Section>
    <Section title="Statistics">
      {countTotalFeedback() > 0 ? <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={countTotalFeedback()}
        positivePercentage={countPositiveFeedbackPercentage()}
      /> : <Notification message="There is no feedback" />}
    </Section>
  </div>);
}

export default App;