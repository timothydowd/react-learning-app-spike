import React, { Component } from "react";
import AnswerOutcome from "./AnswerOutcome";
import { createQAndAs, insertQuestionBackIntoStack } from "../utils/utils";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";

class QuestionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // questionIndex: 0,
      // answerOutcome:false,
      // end: false,
      // score: 0,
      // lastOptionChosen: false,
      // lastCorrectAnswer: '',
      // lastWord: '',
      // firstQuestion: true,
      // toggleAnswerOutcome: false,
    };
  }

  // handleOptionClick (option) {

  //     const correctAnswer = this.state.qAndAs[this.state.questionIndex].correctAnswer
  //     const word = this.state.qAndAs[this.state.questionIndex].word
  //     const currentScore = this.state.score
  //     const toggledAnswerOutcome = this.toggleAnswerOutcome()
  //     const newScore = this.handleScore(option, correctAnswer, currentScore)

  //         this.setState({

  //             lastCorrectAnswer: correctAnswer,
  //             lastOptionChosen: option,
  //             lastWord: word,
  //             firstQuestion: false,
  //             toggleAnswerOutcome: toggledAnswerOutcome,
  //             score: newScore
  //         })

  // }

  handleOptionClick(option) {
    const correctAnswer = this.props.qAndAs[this.props.questionIndex]
      .correctAnswer;
    const word = this.props.qAndAs[this.props.questionIndex].word;
    const currentScore = this.props.score;
    const toggledAnswerOutcome = this.toggleAnswerOutcome();
    const newScore = this.handleScore(option, correctAnswer, currentScore);

    this.props.onOptionClicked(
      correctAnswer,
      word,
      currentScore,
      option,
      toggledAnswerOutcome,
      newScore
    );
  }

  handleScore(option, correctAnswer, currentScore) {
    let newScore = currentScore;
    if (correctAnswer === option) {
      newScore++;
    }

    return newScore;
  }

  // toggleAnswerOutcome(){
  //     const toggledAnswerOutcome = !this.state.toggleAnswerOutcome
  //     return toggledAnswerOutcome
  // }

  toggleAnswerOutcome() {
    const toggledAnswerOutcome = !this.props.toggleAnswerOutcome;
    return toggledAnswerOutcome;
  }

  // nextQuestion = (wasCorrectAnswer, option) => {

  //     const plusOne = this.state.questionIndex + 1
  //     const correctAnswer = this.state.qAndAs[this.state.questionIndex].correctAnswer
  //     const word = this.state.qAndAs[this.state.questionIndex].word
  //     const currentScore = this.state.score
  //     const updatedQAndAs = insertQuestionBackIntoStack(this.state.qAndAs, this.state.questionIndex)
  //     const newScore = this.handleScore(option, correctAnswer, currentScore)
  //     const toggledAnswerOutcome = this.toggleAnswerOutcome()

  //     if(!wasCorrectAnswer){
  //         this.setState({
  //             questionIndex: plusOne,
  //             toggleAnswerOutcome: toggledAnswerOutcome,
  //             qAndAs: updatedQAndAs
  //         })
  //     } else {
  //         if(this.state.questionIndex === this.state.qAndAs.length - 1){
  //             this.setState({
  //                 end: true,
  //                 lastCorrectAnswer: correctAnswer,
  //                 lastOptionChosen: option,
  //                 lastWord: word,
  //                 score: newScore,
  //                 toggleAnswerOutcome: toggledAnswerOutcome
  //             })
  //         } else {
  //             this.setState({
  //                 questionIndex: plusOne,
  //                 toggleAnswerOutcome: toggledAnswerOutcome
  //             })
  //         }
  //     }
  // }

  nextQuestion = (wasCorrectAnswer, option) => {
    const plusOne = this.props.questionIndex + 1;
    const correctAnswer = this.props.qAndAs[this.props.questionIndex]
      .correctAnswer;
    const word = this.props.qAndAs[this.props.questionIndex].word;
    const currentScore = this.props.score;
    const updatedQAndAs = insertQuestionBackIntoStack(
      this.props.qAndAs,
      this.props.questionIndex
    );
    const newScore = this.handleScore(option, correctAnswer, currentScore);
    const toggledAnswerOutcome = this.toggleAnswerOutcome();

    this.props.onNextQuestion(
      wasCorrectAnswer,
      option,
      plusOne,
      correctAnswer,
      word,
      currentScore,
      updatedQAndAs,
      newScore,
      toggledAnswerOutcome
    );
  };

  // startNewStudySession(){

  //     const newQAndAs = createQAndAs(this.props.data, this.props.synOrAnt)

  //     this.setState({
  //         questionIndex: 0,
  //         answerOutcome:false,
  //         end: false,
  //         score: 0,
  //         lastOptionChosen: false,
  //         lastCorrectAnswer: '',
  //         lastWord: '',
  //         firstQuestion: true,
  //         toggleAnswerOutcome: false,
  //         qAndAs: newQAndAs
  //     })
  // }

  startNewStudySession() {
    const newQAndAs = createQAndAs(this.props.data, this.props.synOrAnt);

    this.props.onNewStudySession(newQAndAs);
  }

//   componentDidMount(prevProps, prevState) {
//     this.setState({
//       qAndAs: createQAndAs(this.props.data, this.props.synOrAnt)
//     });
//   }

componentDidMount() {
    console.log('component did mount')
    const newQAndAs = createQAndAs(this.props.data, this.props.synOrAnt)
    this.props.onMount(createQAndAs(newQAndAs))
  }



  //     render() {

  //         const qandAs = this.state.qAndAs

  //         if(!qandAs){
  //             return <h1>Loading...</h1>
  //         } else {
  //             return (
  //                 <div className='questionStudyContainer' >

  //                     {!this.state.toggleAnswerOutcome ?
  //                         <div>
  //                             {this.state.end ?
  //                                 <div>
  //                                     <p>Session over!</p> <button onClick={() => this.startNewStudySession()}>Study again?</button>
  //                                 </div>
  //                                  :
  //                                 <div>
  //                                     What is the {this.props.synOrAnt.slice(0, -1)} of: {qandAs[this.state.questionIndex].word}
  //                                     <div>
  //                                         {qandAs[this.state.questionIndex].options.map(option => {
  //                                             return <button key={option} onClick={() => this.handleOptionClick(option) }>{option}</button>
  //                                         })}
  //                                     </div>
  //                                 </div>
  //                             }
  //                         </div> :
  //                         <AnswerOutcome synOrAnt={this.props.synOrAnt} handleIncorrectAnswer={this.handleIncorrectAnswer} firstQuestion={this.state.firstQuestion} nextQuestion={this.nextQuestion} lastWord={this.state.lastWord} lastOptionChosen={this.state.lastOptionChosen} lastCorrectAnswer={this.state.lastCorrectAnswer} questionIndex={this.state.questionIndex}/>
  //                     }
  //                 </div>
  //             )
  //         }

  //     }
  // }

  render() {
    const qandAs = this.props.qAndAs;
    console.log(this.props.qAndAs)
    console.log(this.props.questionIndex)
    // if (!qandAs) {
    //   return <h1>Loading...</h1>;
    // } else {
      return (
        <div className="questionStudyContainer">
          {!this.props.toggleAnswerOutcome ? (
            <div>
              {this.props.end ? (
                <div>
                  <p>Session over!</p>{" "}
                  <button onClick={() => this.startNewStudySession()}>
                    Study again?
                  </button>
                </div>
              ) : (
                <div>
                  What is the {this.props.synOrAnt.slice(0, -1)} of:{" "}
                  {qandAs[this.props.questionIndex].word}
                  <div>
                    {qandAs[this.props.questionIndex].options.map(option => {
                      return (
                        <button
                          key={option}
                          onClick={() => this.handleOptionClick(option)}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <AnswerOutcome
              synOrAnt={this.props.synOrAnt}
              handleIncorrectAnswer={this.handleIncorrectAnswer}
              firstQuestion={this.props.firstQuestion}
              nextQuestion={this.nextQuestion}
              lastWord={this.props.lastWord}
              lastOptionChosen={this.props.lastOptionChosen}
              lastCorrectAnswer={this.props.lastCorrectAnswer}
              questionIndex={this.props.questionIndex}
            />
          )}
        </div>
      );
    // }
  }
}


const mapStateToProps = state => {
  return {
    data: state.data,

    questionIndex: state.questionIndex,
    answerOutcome: state.answerOutcome,
    end: state.end,
    score: state.score,
    lastOptionChosen: state.lastOptionChosen,
    lastCorrectAnswer: state.lastCorrectAnswer,
    lastWord: state.lastWord,
    firstQuestion: state.firstQuestion,
    toggleAnswerOutcome: state.toggleAnswerOutcome,
    qAndAs: state.qAndAs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOptionClicked: (
      correctAnswer,
      word,
      currentScore,
      option,
      toggledAnswerOutcome,
      newScore
    ) =>
      dispatch({
        type: actionTypes.HANDLE_OPTION_CLICK,
        correctAnswer,
        word,
        currentScore,
        option,
        toggledAnswerOutcome,
        newScore
      }),
    onNextQuestion: (
      wasCorrectAnswer,
      option,
      plusOne,
      correctAnswer,
      word,
      currentScore,
      updatedQAndAs,
      newScore,
      toggledAnswerOutcome
    ) =>
      dispatch({
        type: actionTypes.NEXT_QUESTION,
        wasCorrectAnswer,
        option,
        plusOne,
        correctAnswer,
        word,
        currentScore,
        updatedQAndAs,
        newScore,
        toggledAnswerOutcome
      }),
    onNewStudySession: newQAndAs =>
      dispatch({ type: actionTypes.START_NEW_STUDY_SESSION, newQAndAs }),
    onMount: QAndAs => dispatch({type: actionTypes.GENERATE_Q_AND_AS, QAndAs})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionMenu);
