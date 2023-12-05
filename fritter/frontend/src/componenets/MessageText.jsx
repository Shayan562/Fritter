export const MessageText = (props) =>{
    // const dateTime=toString(props.time).split("T");
    // console.log(props.sent_date);
    return (
        <div className={props.style}>
            <h4>{props.sender_id}</h4>
            <p>{props.content}</p>
            {props.sent_date}
        </div>
    );
}