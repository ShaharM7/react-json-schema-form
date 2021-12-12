import React from "react";
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';


const Form = withTheme(MuiTheme);

const jsonSchema = {

    "type": "object",
    "title": "Number fields & widgets",
    "properties": {
        "numberKey": {
            "title": "Number",
            "type": "number"
        },
        "integerKey": {
            "title": "Integer element",
            "type": "integer"
        },
        "stringKey": {
            "title": "String element",
            "type": "string"
        },
        "booleanKey": {
            "type": "boolean",
            "title": "Boolean element",
            "default": false
        },
        "enum": {
            "type": "number",
            "title": "Enum number element",
            "enum": [
                1,
                2,
                3
            ]
        },
        "listOfStrings": {
            "type": "array",
            "items": {
                "type": "string",
                "default": "bazinga"
            }
        },
    }
}

const uiSchema = {
    "integer": {
        "ui:widget": "updown"
    }
}


function App() {
    return (
        <Form schema={jsonSchema}
              uiSchema={uiSchema}/>
    );
}

export default App;
