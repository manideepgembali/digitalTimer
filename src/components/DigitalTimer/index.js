// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isStart: false,
    timerLimit: 25,
    currentRunningSeconds: 0,
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  onClickResetTimer = () => {
    this.setState({
      isStart: false,
      timerLimit: 25,
      currentRunningSeconds: 0,
    })
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  decreaseTimerLimit = () => {
    const {timerLimit} = this.state
    if (timerLimit > 1) {
      this.setState(prevState => ({timerLimit: prevState.timerLimit - 1}))
    }
  }

  incrementTimerLimit = () => {
    this.setState(prevState => ({timerLimit: prevState.timerLimit + 1}))
  }

  startTimerCountDown = () => {
    const {timerLimit, currentRunningSeconds} = this.state
    const isCompleted = currentRunningSeconds === timerLimit * 60
    if (isCompleted) {
      this.setState({isStart: false, currentRunningSeconds: 0})
      this.clearTimer()
    } else {
      this.setState(prevState => ({
        currentRunningSeconds: prevState.currentRunningSeconds + 1,
      }))
    }
  }

  TimeFormat = () => {
    const {timerLimit, currentRunningSeconds} = this.state
    const timeInSeconds = timerLimit * 60 - currentRunningSeconds
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    const minutesInStringFormat = minutes > 9 ? minutes : `0${minutes}`
    const secondsInStringFormat = seconds > 9 ? seconds : `0${seconds}`
    return `${minutesInStringFormat}:${secondsInStringFormat}`
  }

  startStopTimer = () => {
    const {isStart, timerLimit, currentRunningSeconds} = this.state
    this.setState(prevState => ({isStart: !prevState.isStart}))
    const isCompleted = currentRunningSeconds === timerLimit * 60
    if (isCompleted) {
      this.setState({isStart: false})
      this.clearTimer()
    }
    if (isStart) {
      this.clearTimer()
      this.setState({isStart: false})
    } else {
      this.intervalId = setInterval(() => {
        this.startTimerCountDown()
      }, 1000)
    }
  }

  render() {
    const {isStart, timerLimit, currentRunningSeconds} = this.state
    const isButtonDisabled = currentRunningSeconds > 0
    return (
      <div className="bg">
        <div className="card">
          <h1>Digital Timer</h1>
          <div className="timers">
            <div className="timer">
              <div className="timer-bg">
                <h1>{this.TimeFormat()}</h1>
                {isStart ? <p>Running</p> : <p>Paused</p>}
              </div>
            </div>
            <div>
              <div className="timer-cont">
                {isStart ? (
                  <div className="start-button">
                    <button
                      type="button"
                      className="buttin"
                      onClick={this.startStopTimer}
                    >
                      <div className="start-button">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                          alt="pause icon"
                          className="img"
                        />
                        Pause
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="start-button">
                    <button
                      type="button"
                      className="buttin"
                      onClick={this.startStopTimer}
                    >
                      <div className="start-button">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                          alt="play icon"
                          className="img"
                        />
                        Start
                      </div>
                    </button>
                  </div>
                )}
                <div className="start-button">
                  <button
                    type="button"
                    onClick={this.onClickResetTimer}
                    className="buttin"
                  >
                    <div className="start-button">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                        alt="reset icon"
                        className="img"
                      />
                      Reset
                    </div>
                  </button>
                </div>
              </div>
              <p className="para">Set Timer Limit</p>
              <div className="timer-container">
                <button
                  type="button"
                  className="buttin"
                  onClick={this.decreaseTimerLimit}
                  disabled={isButtonDisabled}
                >
                  -
                </button>
                <div>
                  <p className="time">{timerLimit} </p>
                </div>
                <button
                  type="button"
                  className="buttin"
                  onClick={this.incrementTimerLimit}
                  disabled={isButtonDisabled}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
