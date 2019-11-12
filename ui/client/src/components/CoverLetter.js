import React, { Fragment } from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';
 
export default function CoverLetter({text}) {
   const [editorState, setEditorState] = React.useState(
     EditorState.createWithContent(ContentState.createFromText(text ? text : 'Not Available'))
   );
  
   const editor = React.useRef(null);
  
   function focusEditor() {
     editor.current.focus();
   }
  
   React.useEffect(() => {
     focusEditor()
   }, []);
  
   return (
      <Fragment>
         <h4>Suggested Cover Letter:</h4>
         <div style={{height: '25em', margin: '10px', border: '1px solid gray', overflow: 'auto'}} onClick={focusEditor}>
            <Editor
               ref={editor}
               editorState={editorState}
               onChange={editorState => setEditorState(editorState)}
            />
         </div>
      </Fragment>
   );
 }
