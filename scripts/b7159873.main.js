"use strict";window.Solidarity=_.extend(window.Solidarity,{Models:{},Collections:{},Views:{},Routers:{},init:function(){console.log("Stories of Solidarity"),new Solidarity.Routers.Pages({}),new Solidarity.Routers.Stories({}),Backbone.history.start()},urlParam:function(a){var b=window.location.href.match(/^[^#]+#([^?]*)\??(.*)/),c=(b[1],b[2]),d=c.split(a+"=")[1];return void 0!==d?decodeURIComponent(d.split("&")[0]):null}}),$(document).ready(function(){Solidarity.init()}),this.JST=this.JST||{},this.JST["app/scripts/templates/about.ejs"]=function(){{var a="";_.escape}return a+='<h1>About</h1>\n\n<section class="jumbotron">\n    <h2>Stories of Solidarity</h2>\n    <p>A social media platform that encourages workers in the low-wage, precarious workforce to build new forms of solidarity.</p>\n</section>\n\n<section>\n    <iframe src="//player.vimeo.com/video/75254033?title=0&amp;byline=0" width="800" height="450" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>\n</section>'},this.JST["app/scripts/templates/copyright.ejs"]=function(){{var a="";_.escape}return a+="<h1>Copyright Policy</h1>\n\n<p>copyright page content here</p>\n"},this.JST["app/scripts/templates/index.ejs"]=function(){{var a="";_.escape}return a+='<div id="intro"></div>\n\n<div id="map"></div>\n'},this.JST["app/scripts/templates/intro.ejs"]=function(){{var a="";_.escape}return a+='<div class="modal fade" id="introModal">\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n                <h4 class="modal-title">Work in Progress</h4>\n            </div>\n            <div class="modal-body">\n                <p>Stories of Solidarity is a work in progress.</p>\n                <p>Please feel free to browse and leave us feedback at: </p>\n                <p><a href="mailto:storiesofsolidarity@gmail.com">storiesofsolidarity@gmail.com</a></p>\n                <p>Thank you!</p>\n            </div>\n            <div class="modal-footer">\n                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n            </div>\n        </div>\n    </div>\n</div>'},this.JST["app/scripts/templates/list.ejs"]=function(){{var a="";_.escape}return a+="<p>Your content here.</p>\n\n"},this.JST["app/scripts/templates/login.ejs"]=function(){{var a="";_.escape}return a+="<p>Your content here.</p>\n\n"},this.JST["app/scripts/templates/privacy.ejs"]=function(){{var a="";_.escape}return a+="<h1>Privacy Policy</h1>\n\n<p>privacy page content here</p>\n"},this.JST["app/scripts/templates/story.ejs"]=function(a){{var b,c="",d=_.escape;Array.prototype.join}return c+='<div class="storyRead">\n    <h2>',a.title,c+='</h2>\n\n    <div class="body">\n        '+d(a.content)+"\n    </div>\n    <h3>"+(null==(b=new Date(a.updated_at).toDateString())?"":b)+"<br>\n        by ",c+=a.author_user?'\n            <a href="#read/author/'+d(a.author_user.id)+'">'+d(a.author_user.first_name)+" "+d(a.author_user.last_name)+"</a>\n        ":"\n            Anonymous\n        ",c+='\n        </h3>\n    <a href="#read?story='+d(a.id)+'">&larr; Back</a>\n</div>'},this.JST["app/scripts/templates/storyList.ejs"]=function(){{var a="";_.escape}return a+='<div class="storyList">\n    <!-- story items added here -->\n    \n    <div class="item more" style="display:none;">\n        <h2><a class="loadMore" href="#read">+ More</a></h2>\n    </div>\n</div>\n'},this.JST["app/scripts/templates/storyListItem.ejs"]=function(a){{var b,c="",d=_.escape;Array.prototype.join}return c+='<div class="item story" id="story-'+(null==(b=a.id)?"":b)+'">\n    <h2>'+(null==(b=a.title)?"":b)+'</h2>\n    <div class="body">\n        ',c+=a.content.length>160?"\n            "+d(a.content.slice(0,160))+"...\n        ":"\n            "+d(a.content)+"\n        ",c+='\n        <span class="readMore">\n            <a class="readMore" href="#read/story/'+(null==(b=a.id)?"":b)+'">+ read more</a>\n        </span>\n    </div>\n    <h3>'+(null==(b=new Date(a.updated_at).toDateString())?"":b)+"<br>\n        by ",c+=a.author_user?'\n            <a href="#read/author/'+d(a.author_user.id)+'">'+d(a.author_user.first_name)+" "+d(a.author_user.last_name)+"</a>\n        ":"\n            Anonymous\n        ",c+="\n        </h3>\n</div>"},this.JST["app/scripts/templates/storyMap.ejs"]=function(){{var a="";_.escape}return a+='<div id="map" class="storyMap"></div>'},this.JST["app/scripts/templates/storyPost.ejs"]=function(a){{var b,c="";_.escape}return c+='<div class="storyPost container-fluid">\n<h2>Share Your Story</h2>\n\n<form action="'+(null==(b=a.apiRoot)?"":b)+'story" method="POST">\n    <fieldset>\n        <div class="row">\n            <label for="title" class="col-sm-1">Title:</label>\n            <input id="title" class="col-xs-12 col-sm-6" name="title" value="" type="text" autocomplete="on" placeholder="">\n        </div>\n\n        <div class="row">\n            <label for="content" class="col-sm-1">Story:</label>\n            <textarea id="content" class="col-xs-12 col-sm-10" rows="6" name="content" value="" required="required"></textarea>\n        </div>\n\n        <div class="row">\n            <label for="location" class="col-sm-1">Location:</label>\n            <input id="location" class="col-xs-12 col-sm-6" name="location" value="" type="text" autocomplete="on" placeholder="">\n        </div>\n\n        <div class="row">\n            <label for="photo" class="col-sm-1">Photo:</label>\n            <input type="file" name="photo">\n        </div>\n\n        <div class="row">\n            <input type="submit" class="btn btn-primary" value="Post!" />    \n        </div>\n    </fieldset>\n</form>\n\n</div>'},Solidarity.Models=Solidarity.Models||{},function(){Solidarity.Models.BaseModel=Backbone.Model.extend({url:function(){var a=this.get("links"),b=a&&a.self;return b||(b=Backbone.Model.prototype.url.call(this)),b}})}(),Solidarity.Models=Solidarity.Models||{},function(){Solidarity.Models.Story=Solidarity.Models.BaseModel.extend({urlRoot:Solidarity.apiRoot+"story",initialize:function(){},defaults:{},validate:function(){},parse:function(a){return a}})}(),Solidarity.Models=Solidarity.Models||{},function(){Solidarity.Models.Author=Solidarity.Models.BaseModel.extend({url:Solidarity.apiRoot+"author",idAttributemodel:"username",initialize:function(){},defaults:{},validate:function(){},parse:function(a){return a}})}(),Solidarity.Collections=Solidarity.Collections||{},function(){Solidarity.Collections.BaseCollection=Backbone.PageableCollection.extend({resultsField:"results",totalRecordsField:"count",nextField:"next",previousField:"previous",queryParams:{totalPages:null,totalRecords:null,pageSize:null},state:{pageSize:25},parseRecords:function(a){return a&&_.has(a,this.resultsField)&&_.isArray(a[this.resultsField])?a[this.resultsField]:void Backbone.PageableCollection.prototype.parseRecords.apply(this,arguments)},parseState:function(a){return{totalRecords:a[this.totalRecordsField]}},parseLinks:function(a){return{prev:a[this.previousField],next:a[this.nextField],first:null}}})}(),Solidarity.Collections=Solidarity.Collections||{},function(){Solidarity.Collections.Stories=Solidarity.Collections.BaseCollection.extend({model:Solidarity.Models.Story,url:Solidarity.apiRoot+"story"})}(),Solidarity.Collections=Solidarity.Collections||{},function(){Solidarity.Collections.Authors=Backbone.Collection.extend({model:Solidarity.Models.Author})}(),Solidarity.Views=Solidarity.Views||{},function(){Solidarity.Views.BaseView=Backbone.View.extend({assign:function(a,b){a.setElement(this.$(b)).render()}})}(),Solidarity.Views=Solidarity.Views||{},function(){Solidarity.Views.Story=Backbone.View.extend({template:JST["app/scripts/templates/story.ejs"],el:"#content",events:{},initialize:function(){var a=this;this.listenTo(this.model,"add",this.render),this.model.fetch({success:$.proxy(a.render,a)})},render:function(){this.model&&this.model.attributes&&this.$el.html(this.template(this.model.toJSON()))}})}(),Solidarity.Views=Solidarity.Views||{},function(){Solidarity.Views.StoryList=Backbone.View.extend({template:JST["app/scripts/templates/storyList.ejs"],templateItem:JST["app/scripts/templates/storyListItem.ejs"],el:"#content",events:{"click a.loadMore":"loadMore"},initialize:function(){var a=this;this.render(),this.collection=new Solidarity.Collections.Stories({mode:"infinite"}),this.listenTo(this.collection,"add",this.addStory),this.collection.getFirstPage({success:function(){$(".item.more").show(),window.location.href.indexOf("?story=")>0&&a.scrollTo(Solidarity.urlParam("story"))}})},addStory:function(a){$(this.templateItem(a.attributes)).insertBefore(".storyList .item.more"),this.collection.hasNextPage()||$(".item.more").hide()},render:function(){this.$el.html(this.template())},loadMore:function(){this.collection.getNextPage()},scrollTo:function(a){var b=$("#story-"+a);b.length>0&&$("html, body").scrollTop(b.offset().top)}})}(),Solidarity.Views=Solidarity.Views||{},function(){Solidarity.Views.StoryMap=Backbone.View.extend({template:JST["app/scripts/templates/storyMap.ejs"],collection:Solidarity.Collections.Stories,events:{},initialize:function(){this.render()},drawMap:function(){function a(a){if(g.node()===this)return b();g.classed("active",!1),g=d3.select(this).classed("active",!0);var c=.9;"25"===a.id&&(c=.75),"36"===a.id&&(c=.6),"09"===a.id&&(c=.5),"44"===a.id&&(c=.3),"11"===a.id&&(c=.2);var d=j.bounds(a),h=d[1][0]-d[0][0],l=d[1][1]-d[0][1],m=(d[0][0]+d[1][0])/2,n=(d[0][1]+d[1][1])/2,o=c/Math.max(h/e,l/f),p=[e/2-o*m,f/2-o*n];k.svg.transition().duration(750).call(i.translate(p).scale(o).event)}function b(){g.classed("active",!1),g=d3.select(null),k.svg.transition().duration(750).call(i.translate([0,0]).scale(1).event)}function c(){k.map.style("stroke-width",1.5/d3.event.scale+"px"),k.map.attr("transform","translate("+d3.event.translate+")scale("+d3.event.scale+")")}function d(){d3.event.defaultPrevented&&d3.event.stopPropagation()}var e=960,f=500,g=d3.select(null),h=d3.geo.albersUsa().scale(1e3).translate([e/2,f/2]),i=d3.behavior.zoom().translate([0,0]).scale(1).scaleExtent([1,8]).on("zoom",c),j=d3.geo.path().projection(h);this.svg=d3.select("#map").append("svg").attr("width",e).attr("height",f).on("click",d,!0),this.svg.append("rect").attr("class","background").attr("width",e).attr("height",f).on("click",b),this.map=this.svg.append("g");var k=this;this.svg.call(i).call(i.event),d3.json(Solidarity.siteRoot+"scripts/map/us.json",function(b,c){k.map.selectAll("path").data(topojson.feature(c,c.objects.states).features).enter().append("path").attr("d",j).attr("class","feature").on("click",a),k.map.append("path").datum(topojson.mesh(c,c.objects.states,function(a,b){return a!==b})).attr("class","mesh").attr("d",j)})},render:function(){this.$el.html(this.template()),this.drawMap()}})}(),Solidarity.Views=Solidarity.Views||{},function(){Solidarity.Views.StoryPost=Backbone.View.extend({template:JST["app/scripts/templates/storyPost.ejs"],el:"#content",initialize:function(){this.render()},render:function(){return this.$el.html(this.template({apiRoot:Solidarity.apiRoot})),this}})}(),Solidarity.Views=Solidarity.Views||{},function(){Solidarity.Views.Login=Backbone.View.extend({template:JST["app/scripts/templates/authorLogin.ejs"],tagName:"div",id:"",className:"",events:{},initialize:function(){this.listenTo(this.model,"change",this.render)},render:function(){return this.$el.html(this.template()),this}})}(),Solidarity.Views=Solidarity.Views||{},function(){Solidarity.Views.Page=Backbone.View.extend({el:"#content",initialize:function(a){this.template=JST[a],this.render()},render:function(){return this.$el.html(this.template()),this}})}(),Solidarity.Views=Solidarity.Views||{},function(){Solidarity.Views.Intro=Backbone.View.extend({template:JST["app/scripts/templates/intro.ejs"],events:{},initialize:function(){this.render(),$("#introModal").modal("true"===$.cookie("hideModal")?"hide":"show"),$("#introModal").on("hidden.bs.modal",function(){$.cookie("hideModal","true")})},render:function(){return this.$el.html(this.template()),this}})}(),Solidarity.Views=Solidarity.Views||{},function(){Solidarity.Views.Index=Solidarity.Views.BaseView.extend({template:JST["app/scripts/templates/index.ejs"],el:"#content",events:{},initialize:function(){this.render(),this.introView=new Solidarity.Views.Intro({el:"#intro"})},render:function(){this.$el.html(this.template())}})}(),Solidarity.Routers=Solidarity.Routers||{},function(){Solidarity.Routers.Pages=Backbone.Router.extend({routes:{"":"index",about:"about",privacy:"privacy",copyright:"copyright"},index:function(){new Solidarity.Views.Index({})},about:function(){new Solidarity.Views.Page("app/scripts/templates/about.ejs")},privacy:function(){new Solidarity.Views.Page("app/scripts/templates/privacy.ejs")},copyright:function(){new Solidarity.Views.Page("app/scripts/templates/copyright.ejs")}})}(),Solidarity.Routers=Solidarity.Routers||{},function(){Solidarity.Routers.Stories=Backbone.Router.extend({routes:{map:"storyMap",read:"storyList","read/story/:id":"storyView",share:"storyPost"},storyMap:function(){new Solidarity.Views.StoryMap({el:"#content"})},storyList:function(){new Solidarity.Views.StoryList({el:"#content"})},storyView:function(a){new Solidarity.Views.Story({model:new Solidarity.Models.Story({id:a})})},storyPost:function(){new Solidarity.Views.StoryPost({el:"#content"})}})}();