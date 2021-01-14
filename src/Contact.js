import { Button } from "react-bootstrap";
import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Contact(props) {
    function remove(elementCount) {
        //this.prop.removeQuestion(elementCount);
        if (elementCount !== "copy_1") {
            var obj = document.getElementById(elementCount).parentElement;
            obj.remove();
            alert("Question Successully Removed!!");
        }
    }

    return (
        <Fragment>
            {console.log(props.arrFormQuestion)}
            <div id={"copy_" + props.copyCount} className={"copy_" + props.copyCount}>
                <input typp="text" className="form-control" name="que_1" value={props.arrFormQuestion[props.copyCount-1].que} placeholder={"Question " + props.copyCount} />
                  {/* onChange={(e)=>props.controlQuestionHandler(props.copyCount-1,e)} */}

                <input type="radio" name="ques_1" id="setting_1" value="Setting 1" /> <label for="setting_1">Setting 1</label><br />
                <input type="radio" name="ques_1" id="setting_2" value="Setting 2" /> <label for="setting_2">Setting 2</label><br />
                <input type="radio" name="ques_1" id="setting_3" value="Setting 3" /> <label for="setting_3">Setting 3</label><br />
                <Button variant="dark btn btn-sm" onClick={() => props.event()}>Duplicate</Button>{" "}
                <Button variant="dark btn btn-sm" onClick={() => remove("copy_" + props.copyCount)}>Remove</Button>{" "}
                <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                </label>{" "}
                <Button variant="dark btn btn-sm">Required</Button>{" "}
            </div>
        </Fragment>
    );
}

export default Contact;