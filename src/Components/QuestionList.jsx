import { useState } from 'react';
import questions from '../tests.json';
import Question from './Question';

const algo = Object.values(questions[0]["CIENCIAS JURIDICAS"][0])[0];

const testFromServer = [...Object.values(algo[0])].pop();

const QuestionLists = () => {
    const [test, setTest] = useState(testFromServer);
    console.log(test);
    return (
        test.map((question, index) => <Question key={question.rightanswer + index} question={{ id: index, ...question }} />)
    )
}

export default QuestionLists;