import * as React from "react";
import {
    DiagramComponent,
    Inject,
    DataBinding,
    MindMap,
    NodeConstraints,
    Keys,
    KeyModifiers
} from "@syncfusion/ej2-react-diagrams";

import {
    DataManager
} from '@syncfusion/ej2-data';

let diagramInstance;
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

    getTaskTemplate(current) {
        let date = new Date();
        return {
            id: "newNode"+ + date, // int conversion -> Date in milliseconds
            data:{
                assignee: 1,
                description: "",
                duration: 303,
                id: 0,
                name: "New Node",
                parent_id: current.data.id,
                predecessor: "",
                progress: "50.00",
                project_id: 1,
                start_date: date.toLocaleDateString('en-CA'),
                end_date: date.toLocaleDateString('en-CA'),
                state: "ToDo"
                }
            };
    }

    //Custom command for Diagraming elements.
    getCommandManagerSettings() {
        let commandManager = {
            commands: [
                {
                    name: "createChild",
                    canExecute: () => {
                        return true;
                    },
                    execute: (() => {
                        let current = diagramInstance.selectedItems.nodes[0];
                        let newNode = this.getTaskTemplate(current);
                        
                        let connector = {
                            type: 'Bezier',
                            sourceID: current.id ,
                            targetID: newNode.id,
                        };
                        
                        diagramInstance.add(newNode);
                        diagramInstance.add(connector);
                        diagramInstance.doLayout();
                        let node = diagramInstance.getObject(newNode.id);
                        diagramInstance.clearSelection();
                        diagramInstance.select([node]);
                        diagramInstance.startTextEdit();
                    }).bind(this),
                    gesture: { key: Keys.Tab }
                },
                {
                    name: "createSibling",
                    canExecute: () => {
                        return true;
                    },
                    execute: (() => {
                        let current = diagramInstance.selectedItems.nodes[0];
                        let newNode = this.getTaskTemplate(current);
                        let parentConnector = diagramInstance.getObject(current.inEdges[0]);
                        
                        let connector = {
                            type: 'Bezier',
                            sourceID: parentConnector.sourceID,
                            targetID: newNode.id,
                        };
                        
                        diagramInstance.add(newNode);
                        diagramInstance.add(connector);
                        diagramInstance.doLayout();
                    }).bind(this),
                    gesture: { key: Keys.Enter }
                },
                {
                    name: "navigationDown",
                    canExecute: () => {
                        return true;
                    },
                    execute: () => {
                        this.navigateToChild();
                    },
                    gesture: { key: Keys.Down }
                },
                {
                    name: "navigationUp",
                    canExecute: () => {
                        return true;
                    },
                    execute: () => {
                        this.navigateToParent();
                    },
                    gesture: { key: Keys.Up }
                },
                {
                    name: "navigationLeft",
                    canExecute: () => {
                        return true;
                    },
                    execute: () => {
                        this.navigateToRighttSibling();
                    },
                    gesture: { key: Keys.Right }
                },
                {
                    name: "navigationRight",
                    canExecute: () => {
                        return true;
                    },
                    execute: () => {
                        this.navigateToLeftSibling();
                    },
                    gesture: { key: Keys.Left }
                }
            ]
        };
        return commandManager;
    }

    //Navigation for Child Node
    navigateToChild() {
        let parent = diagramInstance.selectedItems.nodes[0];
        let connectorId = parent.outEdges[0];
        let child = this.getChildNode(connectorId);
        if (child) {
            diagramInstance.clearSelection();
            diagramInstance.select(child);
        }
    }
    //Navigation for parent Node
    navigateToParent() {
        let child = diagramInstance.selectedItems.nodes[0];
        if (child.inEdges && child.inEdges.length > 0) {
            let connectorId = child.inEdges[0];
            let parent = this.getParentNode(connectorId);
            if (parent) {
                diagramInstance.clearSelection();
                diagramInstance.select(parent);
            }
        }
    }
    //Navigation for RightSibling Node
    navigateToRighttSibling() {
        let child = diagramInstance.selectedItems.nodes[0];
        let connectorId = child.inEdges[0];
        let nextConnectorId;
        let parent = this.getParentNode(connectorId);
        for (let i = 0; i < parent[0].outEdges.length; i++) {
            if (parent[0].outEdges[i] === connectorId) {
                nextConnectorId = parent[0].outEdges[i + 1];
            }
        }
        let rightSibling = this.getChildNode(nextConnectorId);
        if (rightSibling) {
            diagramInstance.clearSelection();
            diagramInstance.select(rightSibling);
        }
    }
    //Navigation for LeftSibling Node
    navigateToLeftSibling() {
        let child = diagramInstance.selectedItems.nodes[0];
        let connectorId = child.inEdges[0];
        let prevConnectorId;
        let parent = this.getParentNode(connectorId);
        for (let i = 0; i < parent[0].outEdges.length; i++) {
            if (parent[0].outEdges[i] === connectorId) {
                prevConnectorId = parent[0].outEdges[i - 1];
            }
        }
        let rightSibling = this.getChildNode(prevConnectorId);
        if (rightSibling) {
            diagramInstance.clearSelection();
            diagramInstance.select(rightSibling);
        }
    }
    //Get child node elements
    getChildNode(name) {
        let childNode = [];
        let connector = diagramInstance.getObject(name);
        if (connector) {
            childNode.push(diagramInstance.getObject(connector.targetID));
        }
        return childNode;
    }
    //Get parent node elements
    getParentNode(name) {
        let parentNode = [];
        let connector = diagramInstance.getObject(name);
        if (connector) {
            parentNode.push(diagramInstance.getObject(connector.sourceID));
        }
        return parentNode;
    }

  render() {
      return(
        <DiagramComponent id = "diagram"
        width = '100%'
        height = '100%'
        scrollSettings = {{scrollLimit:"Infinity"}}
        commandManager={this.getCommandManagerSettings()}
        ref={diagram => (diagramInstance = diagram)}
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
            if(event.name === "collectionChange" && event.type === "Addition" && event.cause === 2) {
                if(event.element.data) {
                    this.props.createCallback({data: [event.element.data], action: "create"});
                }
            }
        }}
        ><Inject services = {[DataBinding, MindMap]}/>
        </DiagramComponent>
      )
  }
}

export default MindMapContainer;
