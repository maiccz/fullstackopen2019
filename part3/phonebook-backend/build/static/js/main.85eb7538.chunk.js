(this["webpackJsonpnew-app"]=this["webpackJsonpnew-app"]||[]).push([[0],{16:function(e,n,t){e.exports=t(39)},38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(13),r=t.n(a),u=t(0),c=t.n(u),o=t(15),i=t(14),l=t(2),m=t(3),s=t.n(m),f="/api/persons",d=function(){return s.a.get(f).then((function(e){return e.data}))},p=function(e){return s.a.post(f,e).then((function(e){return e.data}))},h=function(e,n){return s.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},b=function(e){return s.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var n=e.value,t=e.onChange;return c.a.createElement("div",null,"filter shown with: ",c.a.createElement("input",{value:n,onChange:t}))},E=function(e){var n=e.names,t=e.values,a=e.onChanges,r=e.onSubmit;return c.a.createElement("form",{onSubmit:r},n.map((function(e,n){return c.a.createElement("div",{key:e},e,": ",c.a.createElement("input",{value:t[n],onChange:a[n]}))})),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"add")))},g=function(e){var n=e.persons,t=e.deletePerson;return c.a.createElement(c.a.Fragment,null,n.map((function(e){return c.a.createElement("li",{key:e.id},e.name," ",e.number," ",c.a.createElement("button",{onClick:function(){return t(e.id)}},"delete"))})))},w=function(e){var n=e.message;return null===n?null:c.a.createElement("div",{className:n.type},n.content)},y=function(){var e=Object(u.useState)([]),n=Object(l.a)(e,2),t=n[0],a=n[1],r=Object(u.useState)(""),m=Object(l.a)(r,2),s=m[0],f=m[1],y=Object(u.useState)(""),j=Object(l.a)(y,2),O=j[0],C=j[1],k=Object(u.useState)(""),S=Object(l.a)(k,2),T=S[0],P=S[1],x=Object(u.useState)(null),J=Object(l.a)(x,2),L=J[0],M=J[1];Object(u.useEffect)((function(){d().then((function(e){return a(e)}))}),[]);var N=function(e,n){var r={name:e,number:n,id:Math.max.apply(Math,Object(i.a)(t.map((function(e){return e.id}))))+1};p(r).then((function(e){a(t.concat(e)),M({content:"Added '".concat(e.name,"'"),type:"success"}),setTimeout((function(){M(null)}),5e3)})),f(""),C("")},A=function(e,n){var r=t.find((function(n){return n.name===e})),u=Object(o.a)({},r,{number:n});h(u.id,u).then((function(n){a(t.map((function(t){return t.name!==e?t:n}))),M({content:"".concat(n.name," number updated"),type:"success"}),setTimeout((function(){M(null)}),5e3)})).catch((function(n){console.log(n),M({content:"the person '".concat(r.name,"' was already deleted from server"),type:"error"}),setTimeout((function(){M(null)}),5e3),a(t.filter((function(n){return n.name!==e})))})),f(""),C("")},B=T.length>0?t.filter((function(e){return e.name.toLowerCase().includes(T.toLowerCase())})):t;return c.a.createElement("div",null,c.a.createElement("h2",null,"Phonebook"),c.a.createElement(w,{message:L}),c.a.createElement(v,{value:T,onChange:function(e){P(e.target.value)}}),c.a.createElement("h2",null,"add new"),c.a.createElement(E,{onSubmit:function(e){e.preventDefault(),t.some((function(e){return e.name===s&&e.number===O}))?alert("".concat(s," is already added to phonebook")):t.some((function(e){return e.name===s}))?window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))?A(s,O):console.log(!1):N(s,O)},names:["name","number"],values:[s,O],onChanges:[function(e){f(e.target.value)},function(e){C(e.target.value)}]}),c.a.createElement("h2",null,"Numbers"),c.a.createElement(g,{persons:B,deletePerson:function(e){b(e).then((function(n){a(t.filter((function(n){return n.id!==e})))})).catch((function(n){M({content:"the person '".concat(t.find((function(n){return n.id===e})).name,"' was already deleted from server"),type:"error"}),setTimeout((function(){M(null)}),5e3),a(t.filter((function(n){return n.id!==e})))})),f(""),C("")}}))};t(38);r.a.render(c.a.createElement(y,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.85eb7538.chunk.js.map