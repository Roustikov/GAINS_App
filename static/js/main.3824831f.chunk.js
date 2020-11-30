(this.webpackJsonpgains=this.webpackJsonpgains||[]).push([[0],{27:function(e,t,s){},28:function(e,t,s){},46:function(e,t,s){"use strict";s.r(t);var a=s(0),n=s(1),i=s.n(n),c=s(16),r=s.n(c),d=(s(27),s(17)),o=s(6),j=s(2),l=s(3),h=s(7),u=s(8),b=(s(28),s(4)),p=s(14),O=function(e){Object(h.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(j.a)(this,s),(a=t.call(this,e)).addTask=function(e){a.props.addTaskCallback(a.state),a.setState({id:"",name:"",description:"",assignee:"",progress:"",start:"",end:"",state:"ToDo"}),e.preventDefault()},a.state={id:"Task6",name:"Task6",description:"Test",assignee:"User",progress:"80",start:"2020-11-23",end:"2021-11-23",state:"ToDo"},a.handleInputChange=a.handleInputChange.bind(Object(p.a)(a)),a}return Object(l.a)(s,[{key:"handleInputChange",value:function(e){var t=e.target,s="checkbox"===t.type?t.checked:t.value,a=t.name;this.setState(Object(b.a)({},a,s))}},{key:"render",value:function(){return Object(a.jsx)("form",{onSubmit:this.addTask,className:"container",children:Object(a.jsxs)("div",{children:[Object(a.jsx)("label",{children:"Create new task"}),Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{children:"Title:"}),Object(a.jsx)("input",{name:"name",type:"input",value:this.state.name,onChange:this.handleInputChange})]}),Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{children:"Description:"}),Object(a.jsx)("input",{name:"description",type:"text",value:this.state.description,onChange:this.handleInputChange})]}),Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{children:"Assignee:"}),Object(a.jsx)("input",{name:"assignee",type:"text",value:this.state.assignee,onChange:this.handleInputChange})]}),Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{children:"Progress:"}),Object(a.jsx)("input",{name:"progress",type:"text",value:this.state.progress,onChange:this.handleInputChange})]}),Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{children:"Start date:"}),Object(a.jsx)("input",{name:"start",type:"text",value:this.state.start,onChange:this.handleInputChange})]}),Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{children:"End date:"}),Object(a.jsx)("input",{name:"end",type:"text",value:this.state.end,onChange:this.handleInputChange})]}),Object(a.jsx)("input",{className:"add-task-button",type:"submit",value:"Add task"})]})})}}]),s}(s(1).Component),k=function(e){Object(h.a)(s,e);var t=Object(u.a)(s);function s(){return Object(j.a)(this,s),t.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){return Object(a.jsxs)("div",{children:["Id:",this.props.task.id," Name:",this.props.task.name," State: ",this.props.task.state," Start:",this.props.task.start," End:",this.props.task.end]})}}]),s}(s(1).Component),x=function(e){Object(h.a)(s,e);var t=Object(u.a)(s);function s(){return Object(j.a)(this,s),t.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){var e=this.props.tasks.map((function(e){return Object(a.jsx)(k,{task:e},e.id)}));return Object(a.jsxs)("div",{className:"container wide",children:[Object(a.jsx)("label",{children:"Task List"}),e]})}}]),s}(s(1).Component),g=s(20),m=s.n(g),v=s(5),f=(s(39),s(21)),T=s.n(f),C=(s(44),function(e){Object(h.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(j.a)(this,s),(a=t.call(this,e)).addTask=function(e){a.state.tasks.push(e),a.setState(a.state)},a.state={viewMode:"Month",tasks:[{id:"Task1",name:"Test1",state:"Done",start:"2020-11-20",end:"2021-02-24",progress:"100",dependencies:""},{id:"Task2",name:"Test2",state:"ToDo",start:"2020-11-21",end:"2021-04-24",progress:"10",dependencies:""},{id:"Task3",name:"Test3",state:"ToDo",start:"2020-11-23",end:"2021-04-26",progress:"30",dependencies:"Task1,Task2"},{id:"Task4",name:"Test4",state:"ToDo",start:"2020-11-23",end:"2021-06-26",progress:"10",dependencies:"Task3"}],board:{columns:{}}},Object.defineProperty(a.state,"board",{get:function(){}}),a}return Object(l.a)(s,[{key:"taskDragEnd",value:function(e,t,s,a){var n=this,i=Object(o.a)(this.state.tasks),c=this.state.tasks.findIndex((function(e){return e.id==t.id}));i[c]=Object(d.a)(Object(d.a)({},i[c]),{},{state:1==a.toColumnId?"ToDo":"Done"}),this.setState({tasks:i},(function(){console.log(n.state)}))}},{key:"getBoard",value:function(){var e=[{id:1,title:"ToDo:",cards:[]},{id:2,title:"Done:",cards:[]}];return e[0].cards=this.state.tasks.filter((function(e){return e.title=e.name,"ToDo"===e.state})),e[1].cards=this.state.tasks.filter((function(e){return e.title=e.name,"Done"===e.state})),{columns:e}}},{key:"getTasks",value:function(){return this.state.tasks}},{key:"render",value:function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsxs)(v.d,{children:[Object(a.jsxs)(v.b,{children:[Object(a.jsx)(v.a,{children:"Edit Tasks"}),Object(a.jsx)(v.a,{children:"Kanban Board"}),Object(a.jsx)(v.a,{children:"Mind Map"}),Object(a.jsx)(v.a,{children:"Gantt Diagram"})]}),Object(a.jsx)(v.c,{children:Object(a.jsxs)("div",{className:"wrapper",children:[Object(a.jsx)(O,{addTaskCallback:this.addTask}),Object(a.jsx)(x,{tasks:this.state.tasks})]})}),Object(a.jsx)(v.c,{children:Object(a.jsx)("div",{children:Object(a.jsx)(T.a,{initialBoard:this.getBoard(),onCardDragEnd:this.taskDragEnd.bind(this)})})}),Object(a.jsx)(v.c,{}),Object(a.jsx)(v.c,{children:Object(a.jsx)("div",{children:Object(a.jsx)(m.a,{tasks:this.getTasks(),viewMode:this.state.viewMode})})})]})})}}]),s}(s(1).Component));r.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(C,{})}),document.getElementById("root"))}},[[46,1,2]]]);
//# sourceMappingURL=main.3824831f.chunk.js.map