import React from "react";

export default function Grade(props) {
    return (
        <div className="grade--container">
            <h5 className="grade--text">You scored {props.grade}/5 correct answers!</h5>
        </div>
    )
}