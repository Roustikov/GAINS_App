import * as React from "react";
import {
    DiagramComponent,
    Inject,
    DataBinding,
    MindMap,
    NodeConstraints,
} from "@syncfusion/ej2-react-diagrams";

import {
    DataManager
} from '@syncfusion/ej2-data';

//Initializes data source
class MindMapContainer extends React.Component {
    constructor(props) {
        super(props);
        if(props.tasks.length) {
            this.root_id = props.tasks[0].id;
        } else {
            this.root_id = 0;
        }
    }
  render() {
      return(
        <DiagramComponent id = "diagram"
        width = '100%'
        height = '100%'
        scrollSettings = {{scrollLimit:"Infinity"}}
        //Uses layout to auto-arrange nodes on the diagram page
        layout = {
            {
                //Sets layout type
                type: 'MindMap'
            }
        }
        //Configures data source for diagram
        dataSourceSettings = {
            {
                id: 'id',
                parentId: 'parent_id',
                dataSource: new DataManager(this.props.tasks),
                root: this.root_id
            }
        }
        //Sets the default properties for nodes and connectors
        getNodeDefaults = {
            (obj) => {
                obj.shape = {
                    type: 'Text',
                    content: obj.data.name,
                };
                obj.style = {
                    fill: '#6BA5D7',
                    strokeColor: 'none',
                    strokeWidth: 2
                };
                obj.borderColor = 'white';
                obj.backgroundColor = '#6BA5D7';
                obj.constraints = NodeConstraints.Default & ~NodeConstraints.Rotate & ~NodeConstraints.Resize;
                obj.borderWidth = 1;
                obj.shape.margin = {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20
                };
                return obj;
            }
        }
        getConnectorDefaults = {
            (connector, diagram) => {
                connector.style = {
                    strokeColor: '#6BA5D7',
                    strokeWidth: 2
                };
                connector.targetDecorator.shape = "None"
                connector.targetDecorator.style.strokeColor = '#6BA5D7';
                connector.type = 'Bezier';
                
                return connector;
            }
        }
        textEdit={(event) => {
            event.element.data.name = event.newValue;
            this.props.editCallback({data: event.element.data, action: "save"});
        }}
        collectionChange={(event) => {
            if(event.name === "collectionChange" && event.type === "Removal" && event.cause === 2) {
                if(event.element.data) { // Trigger Delete only for block, not the connector line
                    this.props.deleteCallback({data: [event.element.data], action: "delete"});
                }
            }
        }}
        ><Inject services = {[DataBinding, MindMap]}/>
        </DiagramComponent>
      )
  }
}

export default MindMapContainer;
