import { TreeGridComponent, ColumnsDirective, ColumnDirective, Edit, Inject } from '@syncfusion/ej2-react-treegrid'

import { Component } from 'react'

export default class TableView extends Component {
    constructor(props){
      super(props);
      this.editSettings = { 
        allowEditing: true, 
        mode: 'Cell' };
    }
    render(){
      return (
            <TreeGridComponent 
            dataSource={this.props.tasks}
            editSettings={this.editSettings}
            actionComplete={this.props.actionComplete}
            treeColumnIndex={1} 
            childMapping='subtasks'
            height='100%'
            width="100%"
            style={{overflowX: "scroll"}}>
              <ColumnsDirective>
                <ColumnDirective field='id' headerText='ID' textAlign='Right' width='30px'></ColumnDirective>
                <ColumnDirective field='TaskName' headerText='Task Name' width='200px'></ColumnDirective>
                <ColumnDirective field='StartDate' headerText='Start Date' width='70px' max-width='70px' format='yMd' textAlign='Right' editType='datepickeredit' validationRules={{date:true}}/>
                <ColumnDirective field='EndDate' headerText='End Date' width='70px' max-width='70px' format='yMd' textAlign='Right' editType='datepickeredit' validationRules={{date:true}}/>
                <ColumnDirective field='Duration' headerText='Duration' width='70px' max-width='70px' textAlign='Right' validationRules={{number:true}}/>
                <ColumnDirective field='Progress' headerText='Progress' width='50px' max-width='70px' textAlign='Right' validationRules={{number:true}}/>
              </ColumnsDirective>
              <Inject services={[Edit]}/>
            </TreeGridComponent>
      )
    }
}