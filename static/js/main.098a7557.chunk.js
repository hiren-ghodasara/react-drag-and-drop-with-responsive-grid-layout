(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{42:function(e,a,t){e.exports=t(87)},47:function(e,a,t){},48:function(e,a,t){},87:function(e,a,t){"use strict";t.r(a);var r=t(0),i=t.n(r),n=t(11),o=t.n(n),d=(t(47),t(32)),l=t(33),c=t(40),m=t(34),s=t(41),p=t(39),g=t(4),u=(t(48),{list1:[{id:Math.random(),imgUrl:"https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG"},{id:Math.random(),imgUrl:"https://upload.wikimedia.org/wikipedia/commons/7/71/Weaved_truncated_square_tiling.png"},{id:Math.random(),imgUrl:"http://5.imimg.com/data5/FC/KN/MY-537032/square-hole-perforated-sheet-250x250.jpg"},{id:Math.random(),imgUrl:"https://pbs.twimg.com/profile_images/846659478120366082/K-kZVvT8.jpg"},{id:Math.random(),imgUrl:"https://upload.wikimedia.org/wikipedia/commons/c/c6/Sierpinski_square.jpg"},{id:Math.random(),imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Square-white.svg/2000px-Square-white.svg.png"},{id:Math.random(),imgUrl:"https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/6c/31/82/6c3182cd-f718-d550-181f-051f4148a2e4/mzl.qmwzcqcf.png/1200x630bb.jpg"},{id:Math.random(),imgUrl:"http://www.pricolproperty.com/wp-content/uploads/2015/10/Caledon-Square-Dusky-view5626086ccd4d9-1024x905.jpg"},{id:Math.random(),imgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQDVW5GsNRdqdEI7liVuh9JLsyKOMgBKZwRcd96A5S_6iFIBc8Tw"},{id:Math.random(),imgUrl:"http://www.bhaktigroup.in/upload/image/project/18/safal_square.jpg"},{id:Math.random(),imgUrl:"https://www.makemytrip.com/travel-guide/media/dg_image/singapore/Parkview-Square-Singapore.jpg"},{id:Math.random(),imgUrl:"http://jmdgroup.in/wp-content/uploads/2016/07/IMG_20160822_180726-515x400.jpg"},{id:Math.random(),imgUrl:"http://e4336fa0c208189c0eee-e6761b7f2db36d2d2df00f6c169a70d2.r66.cf1.rackcdn.com/lps/assets/u/who1299ex-178939-W-Union-Square---Exterior.jpg"},{id:Math.random(),imgUrl:"https://static.wixstatic.com/media/871b06_91f267016e8b4422b10fa7aedf205529.jpg"},{id:Math.random(),imgUrl:"https://i.pinimg.com/originals/75/be/a9/75bea96bc04e2493167be9810ef3bc8c.jpg"}],list2:[]}),b=function(e){return{background:e?"#563d7b26":"#fff",padding:8}},h=function(e,a,t,r){var i=Array.from(e),n=Array.from(a),o=i.splice(t.index,1),d=Object(p.a)(o,1)[0];n.splice(r.index,0,d);var l={};return l[t.droppableId]=i,l[r.droppableId]=n,l},f=function(e){function a(){var e,t;Object(d.a)(this,a);for(var r=arguments.length,i=new Array(r),n=0;n<r;n++)i[n]=arguments[n];return(t=Object(c.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(i)))).state={itemsCol1:u.list1,itemsCol2:u.list2},t.id2List={droppable1:"itemsCol1",droppable2:"itemsCol2"},t.getList=function(e){return t.state[t.id2List[e]]},t.onDragEnd=function(e){var a=e.source,r=e.destination;if(r&&a.droppableId!==r.droppableId){var i=h(t.getList(a.droppableId),t.getList(r.droppableId),a,r);t.setState({itemsCol1:i.droppable1,itemsCol2:i.droppable2})}},t}return Object(s.a)(a,e),Object(l.a)(a,[{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"App"},i.a.createElement("nav",{className:"navbar navbar-dark bg-dark text-center"},i.a.createElement("span",{className:"navbar-brand mb-0 h1 mx-auto"},"React Drag And Drop With Responsive Grid Layout (React Beautiful DND)")),i.a.createElement("div",{className:"container-fluid"},i.a.createElement(g.a,{onDragEnd:this.onDragEnd},i.a.createElement("div",{className:"row my-3"},i.a.createElement(g.c,{droppableId:"droppable1"},function(a,t){return i.a.createElement("div",{className:"col-lg-6 col-xs-12 pr-2",ref:a.innerRef},i.a.createElement("div",{className:"grid-list-container",style:b(t.isDraggingOver)},i.a.createElement("ul",{className:"actul-img-left"},e.state.itemsCol1.map(function(e,a){return i.a.createElement(g.b,{key:e.id,draggableId:e.id,index:a},function(a,t){return i.a.createElement("li",Object.assign({ref:a.innerRef},a.draggableProps,a.dragHandleProps),i.a.createElement("img",{alt:"img-alr",className:"image-item img-zom",src:e.imgUrl}))})}),a.placeholder)))}),i.a.createElement(g.c,{droppableId:"droppable2"},function(a,t){return i.a.createElement("div",{className:"col-lg-6 col-xs-12 pl-2",ref:a.innerRef},i.a.createElement("div",{className:"grid-list-container",style:b(t.isDraggingOver)},i.a.createElement("ul",{className:"row resize-image no-gutters"},e.state.itemsCol2.map(function(e,a){return i.a.createElement(g.b,{key:e.id,draggableId:e.id,index:a},function(a,t){return i.a.createElement("li",Object.assign({ref:a.innerRef},a.draggableProps,a.dragHandleProps,{className:"col-6 col-md-5 col-lg-4"}),i.a.createElement("img",{alt:"img-alr",className:"image-item",src:e.imgUrl}))})}),a.placeholder)))})))))}}]),a}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[42,1,2]]]);
//# sourceMappingURL=main.098a7557.chunk.js.map