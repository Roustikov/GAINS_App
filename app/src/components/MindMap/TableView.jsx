import { TreeGridComponent, ColumnsDirective, ColumnDirective, Edit, Inject } from '@syncfusion/ej2-react-treegrid'
import * as React from "react";

export default class TableView extends React.Component {
    constructor(props) {
        super(props);
        this.editSettings = {
            allowEditing: true,
            allowDeleting: true,
            mode: 'Cell'
        };
    }

    actionComplete(event) {
        if(event.name === "actionComplete") {
            if(event.type === "save") {
                this.props.editCallback({data:event.data, action: "save"});
            }
            if(event.requestType === "delete") {
                this.props.deleteCallback({data:event.data, action: "delete"});
            }
        }
    }

    render() {
        return (
            <TreeGridComponent
                dataSource={this.props.tasks}
                editSettings={this.editSettings}
                actionComplete={this.actionComplete.bind(this)}
                treeColumnIndex={1}
                parentIdMapping='parent_id'
                idMapping='id'
                height='100%'
                width='100%'
                style={{ overflowX: "scroll" }}>
                <ColumnsDirective>
                    <ColumnDirective field='id' headerText='ID' textAlign='Right' width='30px' isPrimaryKey={true}></ColumnDirective>
                    <ColumnDirective field='name' headerText='Task Name' width='200px'></ColumnDirective>
                    <ColumnDirective field='start_date' headerText='Start Date' width='70px' max-width='70px' textAlign='Right' editType='datepickeredit' validationRules={{ date: true }} />
                    <ColumnDirective field='end_date' headerText='End Date' width='70px' max-width='70px' textAlign='Right' editType='datepickeredit' validationRules={{ date: true }} />
                    <ColumnDirective field='duration' headerText='Duration' width='70px' max-width='70px' textAlign='Right' validationRules={{ number: true }} />
                    <ColumnDirective field='progress' headerText='Progress' width='50px' max-width='70px' textAlign='Right' validationRules={{ number: true }} />
                </ColumnsDirective>
                <Inject services={[Edit]} />
            </TreeGridComponent>
        )
    }
}
