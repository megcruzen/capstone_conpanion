import React, { Component } from 'react';
// import { convertFromRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { Button } from 'reactstrap';
// import AppManager from '../../modules/AppManager';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

export default class ConventionToDoList extends Component {
    // constructor(props) {
    //     super(props);
    //     const contentState = convertFromRaw(content);
    //     this.state = {
    //         contentState,
    //     }
    // }

    // onContentStateChange = (contentState) => {
    //     this.setState({
    //         contentState,
    //     });
    // };

  saveToDoList = () => {

    if (this.props.getUserCon !== undefined) {
        console.log(this.props.getUserCon.todolist)
    }

    const userConId = this.props.getUserCon.id;

    const userConvention = {
        conventionId: this.props.getUserCon.conventionId,
        userId: this.props.getUserCon.userId,
        todolist: this.state.contentState
    }

    // console.log("todolist", todolist)

    // AppManager.saveToDoList(todolist);
  }

  render() {

    // console.log(this.props.convention.userConventionId)
    // console.log(this.props.userConventions)

    //  console.log(this.props.getUserCon)

    // const { contentState } = this.state;
    return (

        <div className="App">
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ editor => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ editor => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>

        // <div>
        // <Editor
        //     wrapperClassName="demo-wrapper"
        //     editorClassName="demo-editor"
        //     onContentStateChange={this.onContentStateChange}
        // />
        // <textarea
        //     disabled
        //     value={JSON.stringify(contentState, null, 4)}
        // />
        // <Button onClick={() => this.saveToDoList()}>Save</Button>
        // </div>
    );
  }
}