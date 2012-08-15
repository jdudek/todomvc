var __t;__t=function(ns){var curr,index,part,parts,_i,_len;curr=null,parts=[].concat=ns.split(".");for(index=_i=0,_len=parts.length;_i<_len;index=++_i){part=parts[index];if(curr===null){curr=eval(part);continue}curr[part]==null?curr=curr[part]={}:curr=curr[part]}return curr};var CompleteTasksUseCase,LocalStorage,Task,WebGlue,WebGui,WebTodoApp,__bind=function(a,b){return function(){return a.apply(b,arguments)}},__hasProp={}.hasOwnProperty;LocalStorage=function(){function a(a){this.namespace=a,this.flush=__bind(this.flush,this),this.remove=__bind(this.remove,this),this.newTask=__bind(this.newTask,this),this.getTasks=__bind(this.getTasks,this),this.get=__bind(this.get,this),this.set=__bind(this.set,this)}return a.prototype.set=function(a,b){return console.log(b),$.jStorage.set(""+this.namespace+"/"+a,b)},a.prototype.get=function(a){return $.jStorage.get(""+this.namespace+"/"+a)},a.prototype.getTasks=function(){var a=this;return this.get("tasks").map(function(b){var c;return c=a.newTask(b.content,b.completed),c})},a.prototype.newTask=function(a,b){var c;return c=new Task(a),c.completed=b,c},a.prototype.remove=function(a){return $.jStorage.deleteKey(""+this.namespace+"/"+a)},a.prototype.flush=function(){var a,b,c,d,e;d=$.jStorage.index(),e=[];for(b=0,c=d.length;b<c;b++)a=d[b],a.match("^"+this.namespace)?e.push($.jStorage.deleteKey(a)):e.push(void 0);return e},a}(),_.defaults(this,{Before:function(a,b,c){return YouAreDaBomb(a,b).before(c)},BeforeAnyCallback:function(a,b,c){return YouAreDaBomb(a,b).beforeAnyCallback(c)},After:function(a,b,c){return YouAreDaBomb(a,b).after(c)},Around:function(a,b,c){return YouAreDaBomb(a,b).around(c)},AfterAll:function(a,b,c){var d,e,f,g;g=[];for(e=0,f=b.length;e<f;e++)d=b[e],g.push(After(a,d,c));return g},LogAll:function(a){var b,c,d;d=[];for(b in a){if(!__hasProp.call(a,b))continue;c=a[b],_.isFunction(c)?d.push(function(b){return Before(a,b,function(){return console.log("calling: "+b)})}(b)):d.push(void 0)}return d},AutoBind:function(a,b){var c,d,e;e=[];for(c in a)d=a[c],_.isFunction(d)?e.push(function(c){if(c.endsWith("Clicked")&&b[c.remove("Clicked")])return After(a,c,function(a){return b[c.remove("Clicked")](a)})}(c)):e.push(void 0);return e}}),CompleteTasksUseCase=function(){function a(){this.toggleTaskCompletion=__bind(this.toggleTaskCompletion,this),this.completeAllTasks=__bind(this.completeAllTasks,this),this.deleteTask=__bind(this.deleteTask,this),this.addNewTask=__bind(this.addNewTask,this),this.start=__bind(this.start,this),this.setInitialTasks=__bind(this.setInitialTasks,this),this.todoTasks=[]}return a.prototype.setInitialTasks=function(a){return this.todoTasks=a},a.prototype.start=function(){},a.prototype.addNewTask=function(a){return this.todoTasks.push(a)},a.prototype.deleteTask=function(a){return this.todoTasks.splice(this.todoTasks.indexOf(a),1)},a.prototype.completeAllTasks=function(){return this.todoTasks.map(function(a){return a.complete()})},a.prototype.toggleTaskCompletion=function(a){return a.completed?a.uncomplete():a.complete()},a}(),WebGui=function(){function a(){this.enterKeyPressed=__bind(this.enterKeyPressed,this),this.newTodoContent=__bind(this.newTodoContent,this),this.clearNewTodoTextBox=__bind(this.clearNewTodoTextBox,this),this.keyPressed=__bind(this.keyPressed,this),this.toggleTaskCompletionClicked=__bind(this.toggleTaskCompletionClicked,this),this.completeAllTasksClicked=__bind(this.completeAllTasksClicked,this),this.showAllTasks=__bind(this.showAllTasks,this),this.deleteTaskClicked=__bind(this.deleteTaskClicked,this),this.addNewTask=__bind(this.addNewTask,this);var a=this;$("#new-todo").keypress(function(b){return a.keyPressed(b)}),$("#toggle-all").click(function(){return a.completeAllTasksClicked()})}return a.prototype.addNewTask=function(a){var b,c,d,e,f,g=this;return e=$("#todo-template").html(),f=Handlebars.compile(e),b={content:a.content,completed:a.completed},d=f(b),c=$(d),$("#todo-list").append(c),c.find(".destroy-task-button").click(function(){return g.deleteTaskClicked(a,c)}),c.find(".complete-task-button").click(function(){return g.toggleTaskCompletionClicked(a)})},a.prototype.deleteTaskClicked=function(a,b){return b.remove()},a.prototype.showAllTasks=function(a){var b,c,d,e;e=[];for(c=0,d=a.length;c<d;c++)b=a[c],e.push(this.addNewTask(b));return e},a.prototype.completeAllTasksClicked=function(){},a.prototype.toggleTaskCompletionClicked=function(a){},a.prototype.keyPressed=function(a){var b;b=13;if(a.keyCode===b)return this.enterKeyPressed(this.newTodoContent()),this.clearNewTodoTextBox()},a.prototype.clearNewTodoTextBox=function(){return $("#new-todo").val("")},a.prototype.newTodoContent=function(){return $("#new-todo").val()},a.prototype.enterKeyPressed=function(a){},a}(),WebGlue=function(){function a(a,b,c){var d=this;this.useCase=a,this.gui=b,this.storage=c,AutoBind(this.gui,this.useCase),After(this.gui,"enterKeyPressed",function(a){return d.useCase.addNewTask(new Task(a))}),After(this.useCase,"addNewTask",this.gui.addNewTask),Before(this.useCase,"start",function(){return d.useCase.setInitialTasks(d.storage.getTasks())}),After(this.useCase,"start",function(){return d.gui.showAllTasks(d.useCase.todoTasks)}),AfterAll(this.useCase,["addNewTask","deleteTask","completeAllTasks","toggleTaskCompletion"],function(){return d.storage.set("tasks",d.useCase.todoTasks)}),LogAll(this.useCase),LogAll(this.gui),LogAll(this.storage)}return a}(),Task=function(){function a(a,b){this.content=a,this.completed=b!=null?b:!1,this.uncomplete=__bind(this.uncomplete,this),this.complete=__bind(this.complete,this)}return a.prototype.complete=function(){return this.completed=!0},a.prototype.uncomplete=function(){return this.completed=!1},a}(),WebTodoApp=function(){function a(){var a,b,c,d;d=new CompleteTasksUseCase,window.useCase=d,b=new WebGui,c=new LocalStorage("todo_app"),a=new WebGlue(d,b,c),d.start()}return a}(),new WebTodoApp