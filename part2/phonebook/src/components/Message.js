import css from './Message.module.css'

const Message = ({message, isErrorMessage}) => {

    if(message === null) return null

    return(
        <div className={isErrorMessage?css.errorMsg:css.msg}>
            <p>{message}</p>
        </div>
    )
}

export default Message