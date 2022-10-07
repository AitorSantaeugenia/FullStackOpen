const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div>
      {console.log(message)}
      {message.startsWith("Add") || message.startsWith("Up") ?       
      <div className="errorRight">
          {message}
      </div>:      
      
      <div className="errorWrong">
          {message}
      </div>}
    </div>
    )
  }

  export default Notification;