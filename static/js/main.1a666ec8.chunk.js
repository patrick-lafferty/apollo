(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(t,e,n){t.exports=n(21)},,,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var a=n(0),i=n(2),r=n(4),o=n(3),l=n(6),s=n(5),u=n(1),c=n.n(u),h=n(9),d=n.n(h),f=(n(16),function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(r.a)(this,Object(o.a)(e).call(this,t))).state={activeTab:t.children[0].props.label},n.handleTabClicked=function(t){return n.setState({activeTab:t})},n}return Object(s.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){var t=this,e=this.props.children.map(function(e){var n=e.props.label===t.state.activeTab?"tab tab--active":"tab";return c.a.createElement("p",{key:e.props.label,className:n,onClick:function(){return t.handleTabClicked(e.props.label)}},e.props.label)}),n=this.props.children.find(function(e){return e.props.label===t.state.activeTab});return c.a.createElement("div",{className:"expand"},c.a.createElement("div",{className:"tabList"},e),n)}}]),e}(c.a.Component)),m=(n(17),function(){return c.a.createElement("p",{className:"docViewer"},"This is a live demo of Apollo UI layouts for the ",c.a.createElement("a",{href:"https://saturn-os.org",target:"blank"},"Saturn OS"),c.a.createElement("br",null),c.a.createElement("br",null),"You can edit the layout in the editor below, which will be parsed and rendered in the canvas to the right.")}),v={grid:"A Grid is a container that lays out its children in rows and columns.\n\nRow/columns can be proportionally sized or given a fixed size.\n        ",margins:"Margins are the empty space between some UI element and its parent container. You can give horizontal or vertical margins",rows:"A list of row definitions for a grid. Valid values:\n\n        (proportional-height <integer>) or \n        (fixed-height <integer>)","proportional-height":"Proportional heights allow you to specify how rows heights relate to eachother. It takes the grid's height minus any fixed-height rows, and then divides by the total proportional values to get a unit height. Then each proportional row gets an integer multiple of that height.","fixed-height":"Specifies that a row should be exactly X pixels high","proportional-width":"Proportional widths allow you to specify how columns widths relate to eachother. It takes the grid's width minus any fixed-width columns, and then divides by the total proportional values to get a unit width. Then each proportional column gets an integer multiple of that width.","fixed-width":"Specifies that a column should be exactly X pixels wide",columns:"A list of column definitions for a grid. Valid values:\n\n        (proportional-width <integer>) or\n        (fixed-width <integer>)","row-gap":"Empty space to keep between grid rows","column-gap":"Empty space to keep between grid columns",items:"A list of child elements. Can be any type including containers",label:'A non-interactive text display. You can configure a label\'s:\n\n        (caption "some string constant")\n        (padding (vertical <integer>) (horizontal <integer>))\n        (font-colour (rgb <integer> <integer> <integer>))\n        (background (rgb <integer> <integer> <integer>))',caption:'A string literal that gets rendered in a label. Eg:\n    \n        (caption "This is a caption")',padding:"Padding is the empty space between an element's main content and its border. This space will show the background colour of the element.","font-colour":"TODO: Font colours aren't supported yet",background:"The main colour of an element",rgb:"A triplet of integers (0-255) representing red green and blue channels. Example:\n\n        (rgb 38 66 251)",meta:"Config data that the element's parent container can use to lay that element out differently. Meta can have one value: a list that starts with a container name and then properties. Eg: \n\n        (meta (grid (column 1) (row 2))",column:"A meta property that says this element should be in this column",row:"A meta property that says this element should be in this row","row-span":"A meta property that says how many rows this element should be layed out in","column-span":"A meta property that says how many columns this element should be layed out in"},b=function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(r.a)(this,Object(o.a)(e).call(this,t))).state={help:""},n}return Object(s.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){return c.a.createElement("p",{className:"docViewer"},this.state.help)}}],[{key:"getDerivedStateFromProps",value:function(t,e){return e.candidate!==t.candidate?{help:v[t.candidate]||"Press F1 when the text cursor is over some word in the Layout tab below to view its documentation"}:null}}]),e}(c.a.Component),p=function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(r.a)(this,Object(o.a)(e).call(this,t))).state={candidate:t.candidate},n}return Object(s.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){return c.a.createElement("section",{className:"documentation"},c.a.createElement(f,null,c.a.createElement(m,{label:"Info"}),c.a.createElement(b,{label:"Documentation",candidate:this.state.candidate})))}}],[{key:"getDerivedStateFromProps",value:function(t,e){return e.candidate!==t.candidate?{candidate:t.candidate}:null}}]),e}(c.a.Component),g=(n(18),function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(r.a)(this,Object(o.a)(e).call(this,t))).handleChange=n.handleChange.bind(Object(l.a)(n)),n.handleKeyPress=n.handleKeyPress.bind(Object(l.a)(n)),n}return Object(s.a)(e,t),Object(i.a)(e,[{key:"handleChange",value:function(t){this.props.onLayoutChanged(t.target.value)}},{key:"handleKeyPress",value:function(t){if("F1"===t.key){var e=t.target.selectionStart;if(" "!==t.target.value[e]){for(var n=e,a=e,i=t.target.value;n>0&&/[^\s(]/.test(i[n]);n--);for(;a<i.length&&/[^\s(]/.test(i[a]);a++);var r=i.slice(n+1,a);r.length>0&&(console.log(r),this.props.showDocumentation(r))}}}},{key:"render",value:function(){return c.a.createElement("textarea",{className:"expand",onChange:this.handleChange,onKeyDown:this.handleKeyPress,value:this.props.initialLayout})}}]),e}(c.a.Component)),y=function(){return c.a.createElement("p",null,"Code",c.a.createElement("br",null),"TODO")},w=function(t){function e(){return Object(a.a)(this,e),Object(r.a)(this,Object(o.a)(e).apply(this,arguments))}return Object(s.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){return c.a.createElement("section",{className:"editor"},c.a.createElement(f,null,c.a.createElement(g,{label:"Layout",onLayoutChanged:this.props.handleLayoutChanged,showDocumentation:this.props.showDocumentation,initialLayout:this.props.initialLayout}),c.a.createElement(y,{label:"Code"})))}}]),e}(c.a.Component),S=(n(19),function(){function t(e){Object(a.a)(this,t),this._value="undefined"===typeof e?null:e}return Object(i.a)(t,[{key:"bind",value:function(t){return null==this._value?this:t(this._value)}},{key:"isSome",value:function(){return null!==this._value}},{key:"value",value:function(){return this._value}}],[{key:"Some",value:function(e){return new t(e)}},{key:"None",value:function(){return new t}}]),t}());var O=function(){function t(e){Object(a.a)(this,t),this.items="undefined"!==typeof e?[e]:[],this.type=G.List}return Object(i.a)(t,[{key:"add",value:function(t){this.items.push(t)}}]),t}(),j=function t(e){Object(a.a)(this,t),this.value=e,this.type=G.BoolLiteral},k=function t(e){Object(a.a)(this,t),this.value=e,this.type=G.IntLiteral},C=function t(e){Object(a.a)(this,t),this.value=e,this.type=G.StringLiteral},x=function t(e){Object(a.a)(this,t),this.value=e,this.type=G.Symbol},L=function t(e,n,i){Object(a.a)(this,t),this.message=e,this.line=n,this.column=i},N=function(){function t(e,n,i){Object(a.a)(this,t),this.name=e,this.values=n,this.length=i}return Object(i.a)(t,[{key:"startsWith",value:function(t){return this.name.value===t}},{key:"get",value:function(t,e){return this.values.items[t].type===e?S.Some(this.values.items[t]):S.None()}}]),t}(),E=Object.freeze({Grid:Symbol("Grid"),ListView:Symbol("ListView")}),W=Object.freeze({Label:Symbol("Label")}),z=Object.freeze({Container:Symbol("Container"),Element:Symbol("Element")});function I(t){return t.startsWith("grid")?S.Some([z.Container,E.Grid]):t.startsWith("list-view")?S.Some([z.Container,E.ListView]):t.startsWith("label")?S.Some([z.Element,W.Label]):S.None()}function P(t){return t.type!==G.List?S.None():0===t.items.length?S.None():t.items[0].type!==G.Symbol?S.None():S.Some(new N(t.items[0],t,t.items.length))}function T(t){switch(t){case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return!0;default:return!1}}var D=Object.freeze({None:Symbol("none"),Int:Symbol("int"),Float:Symbol("float"),String:Symbol("string")}),G=Object.freeze({Symbol:Symbol("Symbol"),IntLiteral:Symbol("IntLiteral"),FloatLiteral:Symbol("FloatLiteral"),StringLiteral:Symbol("StringLiteral"),BoolLiteral:Symbol("BoolLiteral"),List:Symbol("List")});var A=n(7),F=function t(){Object(a.a)(this,t),this.meta=null,this.backgroundColour="",this.fontColour="",this.margins={vertical:0,horizontal:0},this.padding={vertical:0,horizontal:0},this.horizontalAlignment=R.Start,this.verticalAlignment=R.Start,this.fontSize=14},R=Object.freeze({Start:Symbol("Start"),Center:Symbol("Center"),End:Symbol("End")});var M=function(){function t(e){Object(a.a)(this,t),this.parent=null,this.backgroundColour=e.backgroundColour,this.fontColour=e.fontColour,this.horizontalAlignment=e.horizontalAlignment,this.verticalAlignment=e.verticalAlignment,e.margins.vertical<0||e.margins.horizontal<0||(this.margins=e.margins),e.padding.vertical<0||e.padding.horizontal<0||(this.padding=e.padding)}return Object(i.a)(t,[{key:"getParent",value:function(){return this.parent}},{key:"setParent",value:function(t){this.parent=t}},{key:"getBounds",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;null==t&&(t=this.parent.getChildBounds(this));var e=2*this.margins.horizontal;t.width>e&&(t.width-=e,t.x+=this.margins.horizontal);var n=2*this.margins.vertical;return t.height>n&&(t.height-=n,t.y+=this.margins.vertical),t}}]),t}(),B=function(t){function e(){var t;return Object(a.a)(this,e),(t=Object(r.a)(this,Object(o.a)(e).call(this))).caption="",t}return Object(s.a)(e,t),e}(F),V=function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(r.a)(this,Object(o.a)(e).call(this,t))).caption=t.caption,n}return Object(s.a)(e,t),Object(i.a)(e,[{key:"render",value:function(t,e,n){var a=this.caption.value;e=this.getBounds(e),t.drawRectangle(this.backgroundColour,e,n),null!==a&&t.drawText(a,e,n,this.backgroundColour)}}],[{key:"Create",value:function(t){return new e(t)}}]),e}(M);var q=Object.freeze({Grid:Symbol("GridNamespace")}),K=function t(e,n,i){Object(a.a)(this,t),this.containerNamespace=e,this.metaId=n,this.value=i};function U(t,e){var n=t.values.items.length;if(n<2)return S.None();for(var a=1;a<n;a++){if(!P(t.values.items[a]).bind(function(t){return t.startsWith("row")&&2===t.length?t.get(1,G.IntLiteral).bind(function(t){return e.push(new K(q.Grid,et.Row,t.value)),S.Some(1)}):t.startsWith("column")&&2===t.length?t.get(1,G.IntLiteral).bind(function(t){return e.push(new K(q.Grid,et.Column,t.value)),S.Some(1)}):t.startsWith("row-span")&&2===t.length?t.get(1,G.IntLiteral).bind(function(t){return e.push(new K(q.Grid,et.RowSpan,t.value)),S.Some(1)}):t.startsWith("column-span")&&2===t.length?t.get(1,G.IntLiteral).bind(function(t){return e.push(new K(q.Grid,et.ColumnSpan,t.value)),S.Some(1)}):S.None()}).isSome())return S.None()}return S.Some(t)}function _(t){if(t.items.length<2)return S.None();for(var e=[],n=1;n<t.items.length;n++){if(!P(t.items[n]).bind(function(t){return t.startsWith("grid")?U(t,e):S.Some(1)}).isSome())return S.None()}return S.Some(e)}var H=function(t){function e(){return Object(a.a)(this,e),Object(r.a)(this,Object(o.a)(e).apply(this,arguments))}return Object(s.a)(e,t),Object(i.a)(e,[{key:"requestTextLayout",value:function(t){null!=this.parent&&this.parent.requestTextLayout(t)}},{key:"requestRender",value:function(t){null!=this.parent&&this.parent.requestRender(t)}}]),e}(M),Y=function t(e,n){Object(a.a)(this,t),this.element=e,this.bounds=n};function J(t,e){if(1===t.items.length)return null;for(var n=1;n<t.items.length;n++){var a=!0,i=P(t.items[n]);if(i.isSome()){if(2!==(i=i.value()).length)return!1;var r=i.get(1,G.IntLiteral);r.isSome()&&(i.startsWith("vertical")?(e.vertical=r.value().value,a=!1):i.startsWith("horizontal")&&(e.horizontal=r.value().value,a=!1))}if(a)return!1}return!0}function X(t){return"start"===t?R.Start:"center"===t?R.Center:"end"===t?R.End:null}function Q(t){return 2!==t.length?S.None():function(t){return t.get(1,G.List).bind(function(t){return P(t)}).bind(function(t){return t.startsWith("rgb")?4!==t.length?S.None():t.get(1,G.IntLiteral).bind(function(e){return t.get(2,G.IntLiteral).bind(function(n){return t.get(3,G.IntLiteral).bind(function(t){return S.Some("rgb("+e.value+","+n.value+","+t.value+")")})})}):(t.startsWith("bind")&&console.log("TODO: colour binding not supported"),S.None())})}(t)}function Z(t,e){var n=P(t);if(n.isSome())if((n=n.value()).startsWith("background")){var a=Q(n);if(!a.isSome())return!1;e.backgroundColour=a.value()}else if(n.startsWith("font-colour")){var i=Q(n);if(!i.isSome())return!1;e.fontColour=i.value()}else{if(n.startsWith("margins"))return J(n.values,e.margins);if(n.startsWith("padding"))return J(n.values,e.padding);if(n.startsWith("alignment"))return function(t,e){if(1===t.items.length)return null;for(var n=1;n<t.items.length;n++){var a=!0,i=P(t.items[n]);if(i.isSome()){if(2!==(i=i.value()).length)return!1;var r=i.get(1,G.Symbol);if(r.isSome())if(i.startsWith("vertical")){var o=X(r.value().value);null!==o&&(e.verticalAlignment=o,a=!1)}else if(i.startsWith("horizontal")){var l=X(r.value().value);null!==l&&(e.horizontalAlignment=l,a=!1)}}if(a)return!1}return!0}(n.values,e);if(n.startsWith("font-size")){if(2!==n.length)return!1;var r=n.get(1,G.IntLiteral);if(!r.isSome())return!1;e.fontSize=r.value()}}return!0}function $(t,e,n){switch(e){case W.Label:return function(t){if(t.type!==G.List)return S.None();var e=new B,n=!0,a=!0,i=!1,r=void 0;try{for(var o,l=function(){var t=o.value;return n?(n=!1,t.type!==G.Symbol||"label"!==t.value?{v:S.None()}:"continue"):P(t).bind(function(n){if(n.startsWith("caption")){if(2!==n.length)return S.None();n.get(1,G.StringLiteral).bind(function(t){return e.caption=t})}else if(n.startsWith("meta"))e.meta=n.values;else if(!Z(t,e))return S.None();return S.Some(n)}).isSome()?void 0:{v:S.None()}},s=t.items[Symbol.iterator]();!(a=(o=s.next()).done);a=!0){var u=l();switch(u){case"continue":continue;default:if("object"===typeof u)return u.v}}}catch(c){i=!0,r=c}finally{try{a||null==s.return||s.return()}finally{if(i)throw r}}return S.Some(e)}(n.values).bind(function(t){return S.Some([t,V.Create(t)])}).bind(function(e){var n=Object(A.a)(e,2),a=n[0],i=n[1];if(null!=a.meta){var r=_(a.meta);r.isSome()?t.addChild(i,r.value()):t.addChild(i)}else t.addChild(i);return S.Some(i)});default:return S.None()}}var tt=function t(e,n,i,r){Object(a.a)(this,t),this.x=e,this.y=n,this.width=i,this.height=r},et=Object.freeze({Row:1,Column:2,RowSpan:3,ColumnSpan:4}),nt=function(t){function e(){var t;return Object(a.a)(this,e),(t=Object(r.a)(this,Object(o.a)(e).call(this))).row=0,t.column=0,t.rowSpan=0,t.columnSpan=0,t}return Object(s.a)(e,t),e}(Y);function at(t,e){return new tt(e.startingPosition,t.startingPosition,e.actualSpace,t.actualSpace)}function it(t,e,n){var a=new tt(e[n.column].startingPosition,t[n.row].startingPosition,e[n.column].actualSpace,t[n.row].actualSpace);if(n.rowSpan>0){var i=t[n.row+n.rowSpan-1];a.height=i.startingPosition+i.actualSpace-a.y}if(n.columnSpan>0){var r=e[n.column+n.columnSpan-1];a.width=r.startingPosition+r.actualSpace-a.x}return a}var rt=function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(r.a)(this,Object(o.a)(e).call(this,t))).children=[],n.rows=t.rows,n.columns=t.columns,n.rowGap=t.rowGap,n.columnGap=t.columnGap,n.itemSource=null,n.itemTemplate=null,n}return Object(s.a)(e,t),Object(i.a)(e,[{key:"addChild",value:function(t,e){var n=new nt;n.element=t,"undefined"!==typeof e&&this.applyMetaData(n,e),n.bounds=at(this.rows[n.row],this.columns[n.column]),this.children.push(n),t.setParent(this)}},{key:"applyMetaData",value:function(t,e){var n=!0,a=!1,i=void 0;try{for(var r,o=e[Symbol.iterator]();!(n=(r=o.next()).done);n=!0){var l=r.value;if(l.containerNamespace===q.Grid)switch(l.metaId){case et.Row:t.row=Math.max(0,Math.min(l.value,this.rows.length-1));break;case et.Column:t.column=Math.max(0,Math.min(l.value,this.columns.length-1));break;case et.RowSpan:t.rowSpan=l.value;break;case et.ColumnSpan:t.columnSpan=l.value}}}catch(s){a=!0,i=s}finally{try{n||null==o.return||o.return()}finally{if(a)throw i}}t.rowSpan>0&&((t.row=t.rowSpan)>this.rows.length&&(t.rowSpan=this.rows.length-t.row));t.columnSpan>0&&(t.column+t.columnSpan>this.columns.length&&(t.columnSpan=this.columns.length-t.column))}},{key:"allocateDefinitionSpace",value:function(t,e,n,a){var i=0;a.value>0&&(e-=a.value*(t.length-1));var r=!0,o=!1,l=void 0;try{for(var s,u=t[Symbol.iterator]();!(r=(s=u.next()).done);r=!0){var c=s.value;if(c.unit===lt.Fixed){if(!(e>0))break;var h=Math.min(e,c.desiredSpace);c.actualSpace=h,e-=h}else i+=c.desiredSpace}}catch(C){o=!0,l=C}finally{try{r||null==u.return||u.return()}finally{if(o)throw l}}if(i>0&&e>0){var d=e/i,f=!0,m=!1,v=void 0;try{for(var b,p=t[Symbol.iterator]();!(f=(b=p.next()).done);f=!0){var g=b.value;g.unit===lt.Proportional&&(g.actualSpace=d*g.desiredSpace)}}catch(C){m=!0,v=C}finally{try{f||null==p.return||p.return()}finally{if(m)throw v}}}var y=!0,w=!1,S=void 0;try{for(var O,j=t[Symbol.iterator]();!(y=(O=j.next()).done);y=!0){var k=O.value;k.startingPosition=n,n+=k.actualSpace+a.value}}catch(C){w=!0,S=C}finally{try{y||null==j.return||j.return()}finally{if(w)throw S}}}},{key:"calculateGridDimensions",value:function(){var t=this.getBounds();this.allocateDefinitionSpace(this.rows,t.height,t.y,this.rowGap),this.allocateDefinitionSpace(this.columns,t.width,t.x,this.columnGap)}},{key:"layoutChildren",value:function(){if(0!==this.children.length){this.calculateGridDimensions();var t=!0,e=!1,n=void 0;try{for(var a,i=this.children[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var r=a.value;r.rowSpan>0||r.columnSpan>0?r.bounds=it(this.rows,this.columns,r):r.bounds=at(this.rows[r.row],this.columns[r.column]),r.element instanceof H&&r.element.layoutChildren()}}catch(o){e=!0,n=o}finally{try{t||null==i.return||i.return()}finally{if(e)throw n}}}}},{key:"getChildBounds",value:function(t){var e=!0,n=!1,a=void 0;try{for(var i,r=this.children[Symbol.iterator]();!(e=(i=r.next()).done);e=!0){var o=i.value;if(o.element===t)return o.bounds}}catch(l){n=!0,a=l}finally{try{e||null==r.return||r.return()}finally{if(n)throw a}}return new tt}},{key:"render",value:function(t,e,n){var a=!0,i=!1,r=void 0;try{for(var o,l=this.children[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var s=o.value;s.element.render(t,s.bounds,e)}}catch(u){i=!0,r=u}finally{try{a||null==l.return||l.return()}finally{if(i)throw r}}}}]),e}(H),ot=function(t){function e(){var t;return Object(a.a)(this,e),(t=Object(r.a)(this,Object(o.a)(e).call(this))).rows=[],t.columns=[],t.items=null,t.rowGap=0,t.columnGap=0,t.itemSource=null,t.itemTemplate=null,t}return Object(s.a)(e,t),e}(F),lt=Object.freeze({Proportional:Symbol("Proportional"),Fixed:Symbol("Fixed")}),st=function t(e,n){Object(a.a)(this,t),this.unit=e,this.desiredSpace=n,this.actualSpace=0,this.startingPosition=0};function ut(t,e,n,a){if(1===t.items.length)return!1;for(var i=1;i<t.items.length;i++){if(!P(t.items[i]).bind(function(t){return t.get(1,G.IntLiteral).bind(function(i){if(t.startsWith(n))e.push(new st(lt.Proportional,i.value));else{if(!t.startsWith(a))return S.None();e.push(new st(lt.Fixed,i.value))}return S.Some(1)})}).isSome())return!1}return!0}function ct(t){return new rt(t)}function ht(t,e){return null===e||e.type!==G.List?S.None():P(e).bind(function(e){return function(t,e){var n=!0,a=!0,i=!1,r=void 0;try{for(var o,l=t.values.items[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var s=o.value;if(n){if(s.type!==G.Symbol||"items"!==s.value)return S.None();n=!1}else if(!P(s).bind(function(t){return I(t).bind(function(e){return S.Some([t,e])})}).bind(function(t){var n=Object(A.a)(t,2),a=n[0],i=n[1];return i[0]===z.Container?dt(e,i[1],a):$(e,i[1],a)}).isSome())return S.None()}}catch(u){i=!0,r=u}finally{try{a||null==l.return||l.return()}finally{if(i)throw r}}return S.Some(e)}(e,t)})}function dt(t,e,n){switch(e){case E.Grid:return function(t){if(t.type!==G.List)return S.None();var e=new ot,n=!0,a=!0,i=!1,r=void 0;try{for(var o,l=function(){var t=o.value;return n?(n=!1,t.type!==G.Symbol||"grid"!==t.value?{v:S.None()}:"continue"):P(t).bind(function(n){if(n.startsWith("rows")){if(!ut(n.values,e.rows,"proportional-height","fixed-height"))return S.None()}else if(n.startsWith("columns")){if(!ut(n.values,e.columns,"proportional-width","fixed-width"))return S.None()}else if(n.startsWith("items"))e.items=n.values;else if(n.startsWith("item-source")){var a=n.get(1,G.List);a.isSome()&&(e.itemSource=a.value())}else if(n.startsWith("item-template")){var i=n.get(1,G.List);i.isSome()&&(e.itemTemplate=i.value())}else if(n.startsWith("meta"))e.meta=n.values;else if(n.startsWith("row-gap")){if(2!==n.length)return S.None();var r=n.get(1,G.IntLiteral);if(!r.isSome())return S.None();e.rowGap=r.value()}else if(n.startsWith("column-gap")){if(2!==n.length)return S.None();var o=n.get(1,G.IntLiteral);if(!o.isSome())return S.None();e.columnGap=o.value()}else if(!Z(t,e))return S.None();return S.Some(n)}).isSome()?void 0:{v:S.None()}},s=t.items[Symbol.iterator]();!(a=(o=s.next()).done);a=!0){var u=l();switch(u){case"continue":continue;default:if("object"===typeof u)return u.v}}}catch(c){i=!0,r=c}finally{try{a||null==s.return||s.return()}finally{if(i)throw r}}return S.Some(e)}(n.values).bind(function(t){return S.Some([t,ct(t)])}).bind(function(t){var e=Object(A.a)(t,2),n=e[0],a=e[1];return S.Some([n,ht(a,n.items)])}).bind(function(e){var n=Object(A.a)(e,2),a=n[0];return function(t,e,n){if(!t.isSome())return S.None();if(t=t.value(),null!==n){var a=_(n);a.isSome()?e.addChild(t,a.value()):e.addChild(t)}else e.addChild(t);return S.Some(t)}(n[1],t,a.meta)});case E.ListView:break;default:return S.None()}return S.None()}var ft=function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(r.a)(this,Object(o.a)(e).call(this,new F))).child=null,n.canvas=t,n.renderer=null,n}return Object(s.a)(e,t),Object(i.a)(e,[{key:"addChild",value:function(t){this.child=t,this.child.setParent(this)}},{key:"setRenderer",value:function(t){this.renderer=t}},{key:"layoutChildren",value:function(){null!=this.child&&this.child.layoutChildren()}},{key:"getChildBounds",value:function(t){return new tt(0,0,this.canvas.clientWidth,this.canvas.clientHeight)}},{key:"render",value:function(){if(null!=this.child){var t=this.getChildBounds(null);this.child.render(this.renderer,t,t)}}}]),e}(H),mt=function(){function t(e){Object(a.a)(this,t),this.canvas=e,this.context=this.canvas.getContext("2d")}return Object(i.a)(t,[{key:"clear",value:function(){this.context.fillStyle="rgba(255,255,255,1)",this.context.fillRect(0,0,this.canvas.width,this.canvas.height)}},{key:"drawRectangle",value:function(t,e,n){var a=this.canvas.clientWidth,i=this.canvas.clientHeight;if(!(e.x>=a||e.y>=i)){var r=e.x,o=e.y,l=e.width,s=e.height;e.x<n.x&&(r=n.x,l-=n.x-e.x),e.y<n.y&&(o=n.y,s-=n.y-e.y),r+l>=n.x+n.width&&(l=n.x+n.width-r),o+s>=n.y+n.height&&(s=n.y+n.height-o),l<0||s<0||(this.context.fillStyle=t,this.context.fillRect(r,o,l,s))}}},{key:"drawText",value:function(t,e,n,a){this.context.fillStyle="rgb(0,0,0)",this.context.fillText(t,e.x,e.y)}}]),t}(),vt=function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(r.a)(this,Object(o.a)(e).call(this,t))).canvas=null,n.context=null,n.display=c.a.createElement("section",{className:"display"},c.a.createElement("canvas",{id:"framebuffer",className:"fullsize",ref:function(t){n.canvas=t}})),n}return Object(s.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){var t=this.canvas.parentElement.clientWidth,e=this.canvas.parentElement.clientHeight;this.canvas.height=e,this.canvas.width=this.canvas.height*(t/e),this.renderer=new mt(this.canvas),this.window=new ft(this.canvas),this.window.setRenderer(this.renderer)}},{key:"componentDidUpdate",value:function(){var t=function(t){for(var e,n,a=[],i=[],r=0,o=0,l=new O,s=0;s<t.length;s++){var u=t[s];switch(o++,u){case"(":case"[":case"{":a.push(u),i.push(new O);break;case")":case"]":case"}":if(0===a.length||0===i.length)return new L("Unexpected closing bracket",r,o);if(e=a[a.length-1],n=u,!("("===e?")"===n:"["===e?"]"===n:"{"===e?"}"===n:void 0))return new L("Mismatched bracket",r,o);var c=i.pop();if(0===i.length)l.add(c);else{var h=i[i.length-1];if(!(h instanceof O))return new L("Expected list",r,o);h.add(c)}break;case"\n":r++,o=0;break;case" ":case"\t":continue;default:var d=i[i.length-1];if(!(d instanceof O))return new L("Expected list",r,o);var f=D.None;if(T(u))f=D.Int;else if('"'===u)f=D.String;else{if("true"===t.slice(s,4)&&" )]}".includes(t[s+4])){d.add(new j(!0)),s+=4;continue}if("false"===t.slice(s,5)&&" )]}".includes(t[s+5])){d.add(new j(!1)),s+=5;continue}}for(var m=!1,v=s;v<t.length;v++){switch(u=t[v],f){case D.Int:if("."===u)f=D.Float;else if(!T(u)){m=!0;break}break;case D.Float:if("."===u)return new L("Unexpected second '.' in float literal",r,o);if(!T(u)){m=!0;break}break;case D.String:'"'===u&&v>s&&(v++,m=!0);break;case D.None:"("!==u&&")"!==u&&"\n"!==u&&" "!==u&&"\t"!==u||(m=!0);break;default:return new L("This isn't possible",r,o)}if(m)break}var b=t.slice(s,v);switch(f){case D.Int:d.add(new k(Number.parseInt(b)));break;case D.Float:return new L("Float parsing not implemented",r,o);case D.String:d.add(new C(t.slice(s+1,v-1)));break;case D.None:d.add(new x(b));break;default:return new L("This isn't possible",r,o)}s+=v-s-1}}return l}(this.props.layout);if(null!==this.renderer&&this.renderer.clear(),null!==t)try{null!=function(t,e){var n=P(t).bind(function(t){return I(t).bind(function(e){return S.Some([t,e])})}).bind(function(t){var n=Object(A.a)(t,2),a=n[0],i=n[1];return i[0]===z.Container?dt(e,i[1],a):S.None()});return n.isSome()?n.value():null}(t.items[0],this.window)&&(this.window.layoutChildren(),this.window.render())}catch(e){console.log(e)}}},{key:"render",value:function(){return this.display}}]),e}(c.a.Component),bt=(n(20),'(grid\n    (margins (vertical 20) (horizontal 20))\n\n    (rows \n        (proportional-height 1)\n        (fixed-height 50)\n        (proportional-height 2))\n\n    (columns \n        (proportional-width 1)\n        (proportional-width 1))\n\n    (row-gap 20)\n    (column-gap 10)\n\n    (items \n        (label (caption "Padded Label")\n            (padding (vertical 50) (horizontal 100))\n            (font-colour (rgb 122 22 23))\n            (background (rgb 38 66 251)))\n        (label (caption "Second")\n            (background (rgb 24 205 4))\n            (font-colour (rgb 0 0 0))\n            (meta (grid (column 1))))\n\n        (label (caption "cant bind yet")\n            (background (rgb 69 69 69))\n            (meta (grid (row 1))))\n        (label (caption "<- that one was typed")\n            (background (rgb 37 13 37))\n            (meta (grid (row 1) (column 1))))\n\n        (label (caption "Margined Label")\n            (background (rgb 248 121 82))\n            (font-colour (rgb 169 5 40))\n            (margins (vertical 50) (horizontal 90))\n            (meta (grid (row 2))))\n\n        (grid\n\n            (rows \n                (proportional-height 2)\n                (proportional-height 1))\n\n            (columns \n                (proportional-width 1)\n                (proportional-width 1)\n                (proportional-width 1))\n\n            (row-gap 10)\n            (column-gap 10)\n\n            (items \n                (label (caption "a")\n                    (font-colour (rgb 10 10 10))\n                    (background (rgb 33 146 195)))\n                (label (caption "b")\n                    (background (rgb 62 16 140))\n                    (meta (grid (column 1))))\n                (label (caption "3")\n                    (font-colour (rgb 100 0 0))\n                    (background (rgb 241 220 69))\n                    (meta (grid (column 2))))\n\n                (label (caption "spans 3 columns")\n                    (background (rgb 12 87 117))\n                    (meta (grid (row 1) (column-span 3)))))\n\n            (meta (grid (row 2) (column 1))))))'),pt=function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(r.a)(this,Object(o.a)(e).call(this,t))).handleLayoutChanged=n.handleLayoutChanged.bind(Object(l.a)(n)),n.showDocumentation=n.showDocumentation.bind(Object(l.a)(n)),n.state={layout:"",candidate:""},setTimeout(function(){return n.handleLayoutChanged(bt)},300),n}return Object(s.a)(e,t),Object(i.a)(e,[{key:"handleLayoutChanged",value:function(t){this.setState({layout:t})}},{key:"showDocumentation",value:function(t){this.setState({candidate:t})}},{key:"render",value:function(){return c.a.createElement("main",{className:"app"},c.a.createElement(p,{candidate:this.state.candidate}),c.a.createElement(w,{handleLayoutChanged:this.handleLayoutChanged,showDocumentation:this.showDocumentation,initialLayout:this.state.layout}),c.a.createElement(vt,{layout:this.state.layout}))}}]),e}(c.a.Component);d.a.render(c.a.createElement(pt,null),document.querySelector("#root"))}],[[10,1,2]]]);
//# sourceMappingURL=main.1a666ec8.chunk.js.map