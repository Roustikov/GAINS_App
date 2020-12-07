import * as React from "react";
import {
    Diagram,
    DiagramComponent,
    Inject,
    ConnectorModel,
    Node,
    DataBinding,
    LayoutType,
    Rect,
    HorizontalAlignment,
    VerticalAlignment,
    NodeModel,
    TextModel,
    MindMap,
    NodeConstraints,
    ConnectorShape,
    Decorator
} from "@syncfusion/ej2-react-diagrams";
import {
    DataManager,
    Query
} from '@syncfusion/ej2-data';

//Initializes data source
class MindMapContainer extends React.Component {
  state: {items:DataManager};
  constructor(props: any) {
    super(props);
    this.state = {items:new DataManager(props.mindMap as JSON[])};
}

  render() {
      return(
        <DiagramComponent id = "diagram"
        width = {
            '100%'
        }
        height = {
            '550px'
        }
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
                parentId: 'parentId',
                dataManager: this.state.items,
                root: "1"
            }
        }
        //Sets the default properties for nodes and connectors
        getNodeDefaults = {
            (obj: Node) => {
                obj.shape = {
                    type: 'Text',
                    content: (obj.data as {
                        Label: 'string'
                    }).Label,
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
                (obj.shape as TextModel).margin = {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20
                };
                return obj;
            }
        }
        getConnectorDefaults = {
            (connector: ConnectorModel, diagram: Diagram) => {
                connector.style = {
                    strokeColor: '#6BA5D7',
                    strokeWidth: 2
                };
                connector.targetDecorator!.shape = "None"
                connector.targetDecorator!.style!.strokeColor = '#6BA5D7';
                connector.type = 'Bezier';
                
                return connector;
            }
        }
        ><Inject services = {[DataBinding, MindMap]}/>
        </DiagramComponent>
      )
  }
}

export default MindMapContainer;
