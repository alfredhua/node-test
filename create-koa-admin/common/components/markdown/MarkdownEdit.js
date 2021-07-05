import React from 'react';
// 引入编辑器样式
import { Input } from 'antd';
import Markdown from 'markdown-to-jsx';
const hljs = require("highlight.js/lib/highlight.js");
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
hljs.registerLanguage('haml', require('highlight.js/lib/languages/haml'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
const TextArea=Input.TextArea;

 const MyParagraph = ({ children, ...props }) => (
    <div dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(children).value }} />
);

export default class MarkdownEdit extends React.Component{
//    state={
//         context:"",
//    }
//   componentDidMount () {
//       const {text} =this.props;
//       this.setState({context:text})
//   }

  change(value){
      let {onChange} =this.props;
      onChange(value);
  }

  render(){
      const {text} =this.props;
    return(
        <div>
            <div style={{width:'50%',float:'left'}} >
                <TextArea rows={50}  value={text} onChange={(e)=>{this.change(e.target.value)}}> </TextArea>
            </div>
            <div style={{paddingLeft: "52%"}}>
              <Markdown   options={{
               overrides: {
                code: {
                    component: MyParagraph,
                    props: {
                        className: 'foo',
                    },
                },
               },
             }}>{text}</Markdown>
            </div>
            <div style={{clear:'both'}}></div>
        </div>
    );
  }

}