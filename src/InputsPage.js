import React, { Component } from 'react';
import { GithubPicker } from 'react-color';
import COLORS from './COLORS.js';
import { Link } from 'react-router-dom'

class InputsPage extends Component {

  state = {
    openColorPicker: null,
  }

  constructor() {
    super();
  }

  render() {
    const { openColorPicker } = this.state;
    const { eightThings, scores, colors, allValid, globalSetState, user, database } = this.props;
    return (
      <div className="step-one">
        <p className="App-title" >What eight things do you want to focus on in your life?</p>
        <ul className='category-inputs'>
        {
          eightThings.map((thing, i) => {
            const inputStyle = {
              outlineColor: colors[i],
            }
            const buttonStyle= {
              backgroundColor: colors[i],
              borderColor: colors[i],
              outlineColor: colors[i],
            }
            return (
              <li className='category-input' key={i}>
                <input style={inputStyle} onFocus={()=>globalSetState({openColorPicker:null})} value={thing} placeholder={i + 1} onChange={(e) => {
                  globalSetState({
                    eightThings: [...eightThings.slice(0, i), e.target.value, ...eightThings.slice(i + 1)]
                  })}}/>
                <button style={buttonStyle} className='color-button' onClick={() => {
                  globalSetState({openColorPicker: i === openColorPicker ? null : i })}
                }>
                </button>
                {i === openColorPicker && (
                  <span className='color-picker-container'>
                    <GithubPicker width={188} triangle={'top-right'} onChangeComplete={(color)=> {
                      globalSetState({
                        colors: [...colors.slice(0, i), color.hex, ...colors.slice(i + 1)],
                        openColorPicker: null,
                      })
                    }} colors={COLORS} />
                  </span>
                )}
              </li>
            )
          })
        }
        </ul>
        <Link onClick={() => {
          database.collection('categories').add({
            user: user.uid,
            things: eightThings,
          }).then(ref => {
            console.log(ref)
          }).catch(error => {
            console.log('error: ', error)
          })
        }} className={`button${allValid ? '' : ' button--inactive'}`} to='/track'>Start Tracking <span>🙌</span></Link>
      </div>
    )
  }
}

export default InputsPage;
