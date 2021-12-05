import React from "react";
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import TextField from '@material-ui/core/TextField'


const Form = withTheme(MuiTheme);
const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false}
    }
};

const MyCustomWidget = props => {
    return (
        <TextField
            type="text"
            label="Name1"
            value={props.value}
            onChange={event => props.onChange(event.target.value)}
            margin="normal"
        />
    )
}

const widgets = {
    TextWidget: MyCustomWidget,
}

function App() {
    return (
        <Form schema={schema} widgets={widgets}/>
    );
}

export default App;
