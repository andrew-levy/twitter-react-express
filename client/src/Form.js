import React from 'react';

const Form = (props) => {
    return (
        <form onSubmit={props.handlers.handleSubmit}>
            <p >What do you want to tell the world?</p>
            <textarea 
                className="Input-box-tweet" 
                rows="4" 
                cols="50" 
                placeholder="When the zombie apocalypse happens, you’ll be glad you bought a flamethrower. Works against hordes of the undead or your money back!"
                value={props.values.post} 
                onChange={props.handlers.handleChangeTextTweet}
                onInput={props.handlers.handleInputTextTweet}>
            </textarea>

            <p >Name or Initials (optional)</p>
            <input
                className="Input-box-sender"
                type="text"
                value={props.values.sender}
                onChange={props.handlers.handleChangeTextSender}
                onInput={props.handlers.handleInputTextSender}
                placeholder="Elon Musk"
            /> 
            <input type="file" onChange={props.handlers.fileChangedHandler}/>
            <p style = {{color: props.styles.countColor}} className="count"> 
                Count: {props.values.charCountText + props.values.charCountSender}
            </p>
            <button 
                disabled = {props.values.charCountText <= 0 ? true:false} 
                className= "Tweet-btn" type="submit" 
                style = {{opacity: props.styles.opac}}>
                Tweet it!
            </button>
        </form>
    );
}
export default Form;
