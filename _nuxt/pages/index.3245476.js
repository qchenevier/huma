(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{169:function(t,e,n){var content=n(313);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(36).default)("512a75a2",content,!0,{sourceMap:!1})},305:function(t,e,n){"use strict";n.r(e);var r={props:["posts"],components:{HumaPostCard:n(166).default}},o=(n(312),n(17)),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"columns is-multiline is-gapless"},this._l(this.posts,(function(t){return e("div",{key:t.date,staticClass:"column is-4"},[e("huma-post-card",{attrs:{post:t}})],1)})),0)}),[],!1,null,"22b06526",null);e.default=component.exports;installComponents(component,{HumaPostCard:n(166).default})},312:function(t,e,n){"use strict";var r=n(169);n.n(r).a},313:function(t,e,n){(e=n(35)(!1)).push([t.i,".columns[data-v-22b06526]{margin:10px}",""]),t.exports=e},329:function(t,e,n){"use strict";n.r(e);n(48),n(49),n(67),n(21);var r=n(2),o={components:{HumaPostList:n(305).default},watchQuery:["tags"],asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,c,l,f,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l=function(t,e){return t.filter((function(t,n,r){return r.map((function(t){return t[e]})).indexOf(t[e])===n}))},n=t.$content,r=t.query,e.next=4,n("blog").where({extension:".md"}).sortBy("date","desc").fetch();case 4:return o=e.sent,e.next=7,n("blog").where({extension:".md"}).only(["tags"]).fetch();case 7:return c=e.sent,f=l(c.filter((function(t){return null!=t.tags})).map((function(t){return t.tags})).flat(),"tag"),d=r.tags?f.filter((function(option){return r.tags.includes(option.tag.replace(/\s+/g,"-").toLowerCase())})):[],e.abrupt("return",{posts:o,availableTags:f,filteredTags:f,selectedTags:d});case 11:case"end":return e.stop()}}),e)})))()},methods:{filterTags:function(text){this.filteredTags=this.availableTags.filter((function(option){return option.tag.toLowerCase().indexOf(text.toLowerCase())>=0}))},updatePosts:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$content("blog").where({extension:".md","tags.tag":{$contains:t.selectedTags.map((function(t){return t.tag}))}}).sortBy("date","desc").fetch();case 2:t.posts=e.sent;case 3:case"end":return e.stop()}}),e)})))()},updateQuery:function(){this.$router.push({path:this.$route.path,query:{tags:this.selectedTags.map((function(t){return t.tag.replace(/\s+/g,"-").toLowerCase()}))}})}},watch:{selectedTags:{handler:function(){this.updatePosts(),this.updateQuery()},immediate:!0},"$route.query":"updatePosts"}},c=n(17),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"hero"},[n("div",{staticClass:"hero-body"},[n("div",{staticClass:"container"},[n("b-field",[n("b-taginput",{attrs:{data:t.filteredTags,autocomplete:"",field:"tag",attached:"","open-on-focus":!0,placeholder:"Select topic"},on:{typing:t.filterTags},scopedSlots:t._u([{key:"default",fn:function(e){return[n("b-icon",{attrs:{size:"is-small",icon:e.option.icon}}),t._v("\n                "+t._s(e.option.tag)+"\n            ")]}}]),model:{value:t.selectedTags,callback:function(e){t.selectedTags=e},expression:"selectedTags"}},[t._v(" "),n("template",{slot:"empty"},[t._v("No suggestion")])],2)],1)],1)])]),t._v(" "),n("huma-post-list",{attrs:{posts:t.posts}})],1)}),[],!1,null,"1f9edaba",null);e.default=component.exports;installComponents(component,{HumaPostList:n(305).default})}}]);