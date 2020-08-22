(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"3aSD":function(e,t,i){"use strict";i.r(t),i.d(t,"GamesModule",(function(){return v}));var a=i("ofXK"),s=i("3Pt+"),r=i("tyNb"),n=i("BhFI"),m=i("ZLyn"),c=i("fXoL"),o=i("AytR"),d=i("tk/3");let g=(()=>{class e{constructor(e){this.http=e}getGames(){return this.http.get(o.a.API_URL+"/games")}getUserGames(e,t){return this.http.get(o.a.API_URL+"/games/"+e+"/"+t)}getGame(e){return this.http.get(o.a.API_URL+"/games/"+e)}deleteGame(e){return this.http.delete(o.a.API_URL+"/games/"+e)}saveGame(e){return this.http.post(o.a.API_URL+"/games/",e)}updateGame(e,t){return this.http.put(o.a.API_URL+"/games/"+e,t)}}return e.\u0275fac=function(t){return new(t||e)(c.Qb(d.a))},e.\u0275prov=c.Fb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})(),l=(()=>{class e{constructor(e,t,i,a){this.gamesServices=e,this.activatedRouted=t,this.router=i,this.formBuilder=a,this.alerts=new m.a,this.game={},this.user={},this.user=JSON.parse(localStorage.getItem("userLogged"))}ngOnInit(){const e=this.activatedRouted.snapshot.params;e.id&&this.gamesServices.getGame(Number(e.id)).subscribe(e=>{this.game=e,this.gameForm.setValue(this.game),this.edit=!0},()=>this.alerts.showAlert("Error","Game not found!","error").then(e=>{(e.value||e.dismiss)&&this.router.navigate(["games"])})),this.createGameForm()}updateGame(){delete this.game.created_at,this.gamesServices.updateGame(this.game.id,this.gameForm.value).subscribe(()=>{this.alerts.showAlert("Yeah!","The game was updated successfully!","success").then(e=>{(e.value||e.dismiss)&&this.router.navigate(["games"])})})}saveNewGame(){delete this.game.id,delete this.game.created_at;const e=Object.assign(Object.assign({},this.game),this.gameForm.value);e.id_user=this.user.id,this.gamesServices.saveGame(e).subscribe(()=>{this.alerts.showAlert("Yeah!","The game was added successfully!","success").then(e=>{(e.value||e.dismiss)&&this.router.navigate(["games"])})})}createGameForm(){this.gameForm=this.formBuilder.group({id:new s.d(this.game.id,[]),title:new s.d(this.game.title,[s.n.minLength(4),s.n.maxLength(15)]),description:new s.d(this.game.description,[s.n.minLength(4),s.n.maxLength(50)]),image:new s.d(this.game.image,[s.n.minLength(4),s.n.maxLength(200)]),created_at:new s.d(this.game.created_at,[]),id_user:new s.d(this.game.id_user,[])})}}return e.\u0275fac=function(t){return new(t||e)(c.Jb(g),c.Jb(r.a),c.Jb(r.b),c.Jb(s.c))},e.\u0275cmp=c.Db({type:e,selectors:[["app-game-form"]],decls:27,vars:27,consts:[[1,"col-md-4","mx-auto","right-effect",3,"formGroup"],[1,"text-center"],[1,"form-group"],["for","title"],["type","text","id","title","name","title","formControlName","title",1,"form-control"],[1,"invalid-feedback"],["for","description"],["type","text","id","description","name","description","formControlName","description",1,"form-control"],["for","image"],["type","url","id","image","name","image","formControlName","image",1,"form-control"],[1,"btn","btn-success","btn-block",3,"disabled","click"],["type","hidden","id","idHidden",3,"value"],["type","hidden","id","dateHidden",3,"value"]],template:function(e,t){1&e&&(c.Mb(0,"form",0),c.Mb(1,"h3",1),c.hc(2),c.Lb(),c.Kb(3,"hr"),c.Mb(4,"div",2),c.Mb(5,"label",3),c.hc(6,"Title"),c.Lb(),c.Kb(7,"input",4),c.Mb(8,"div",5),c.hc(9),c.Lb(),c.Lb(),c.Mb(10,"div",2),c.Mb(11,"label",6),c.hc(12,"Description"),c.Lb(),c.Kb(13,"input",7),c.Mb(14,"div",5),c.hc(15),c.Lb(),c.Lb(),c.Mb(16,"div",2),c.Mb(17,"label",8),c.hc(18,"Image"),c.Lb(),c.Kb(19,"input",9),c.Mb(20,"div",5),c.hc(21),c.Lb(),c.Lb(),c.Mb(22,"button",10),c.Tb("click",(function(){return t.edit?t.updateGame():t.saveNewGame()})),c.Kb(23,"i"),c.hc(24),c.Lb(),c.Kb(25,"input",11),c.Kb(26,"input",12),c.Lb()),2&e&&(c.Zb("formGroup",t.gameForm),c.xb(2),c.ic(t.edit?"Edit game":"New game"),c.xb(5),c.Bb("is-invalid",t.gameForm.get("title").invalid)("is-valid",t.gameForm.get("title").valid&&t.gameForm.get("title").value),c.xb(2),c.kc(" ",t.gameForm.get("title").hasError("minlength")?"The title too short":""," ",t.gameForm.get("title").hasError("maxlength")?"The maximum length is 15 characters":""," "),c.xb(4),c.Bb("is-invalid",t.gameForm.get("description").invalid)("is-valid",t.gameForm.get("description").valid&&t.gameForm.get("description").value),c.xb(2),c.kc(" ",t.gameForm.get("description").hasError("minlength")?"The description too short":""," ",t.gameForm.get("description").hasError("maxlength")?"The maximum length is 50 characters":""," "),c.xb(4),c.Bb("is-invalid",t.gameForm.get("image").invalid)("is-valid",t.gameForm.get("image").valid&&t.gameForm.get("image").value),c.xb(2),c.kc(" ",t.gameForm.get("image").hasError("minlength")?"The image too short":""," ",t.gameForm.get("image").hasError("maxlength")?"The maximum length is 50 characters":""," "),c.xb(1),c.Zb("disabled",t.gameForm.invalid||!t.gameForm.get("title").value||!t.gameForm.get("description").value||!t.gameForm.get("image").value),c.xb(1),c.Ab(" ",t.edit?"zmdi zmdi-refresh zmdi-hc-lg":"zmdi zmdi-save zmdi-hc-lg"," "),c.xb(1),c.jc(" ",t.edit?" Update ":" Save "," "),c.xb(1),c.ac("value",t.gameForm.get("id").value),c.xb(1),c.ac("value",t.gameForm.get("created_at").value))},directives:[s.p,s.j,s.f,s.b,s.i,s.e],styles:[""]}),e})();function h(e,t){if(1&e){const e=c.Nb();c.Mb(0,"div",2),c.hc(1," L\xedst empty "),c.Mb(2,"a",3),c.Tb("click",(function(){return c.cc(e),c.Wb().navigate()})),c.hc(3," add a game"),c.Lb(),c.hc(4," to the list!\n"),c.Lb()}}function b(e,t){if(1&e){const e=c.Nb();c.Mb(0,"div",4),c.Mb(1,"div",5),c.Mb(2,"div",6),c.Mb(3,"a"),c.hc(4),c.Lb(),c.Mb(5,"button",7),c.Tb("click",(function(){c.cc(e);const i=t.$implicit;return c.Wb().deleteGame(i.id)})),c.Kb(6,"i",8),c.hc(7," Delete "),c.Lb(),c.Lb(),c.Mb(8,"div",9),c.Kb(9,"img",10),c.Mb(10,"h6",11),c.hc(11),c.Lb(),c.Mb(12,"h5",12),c.hc(13),c.Xb(14,"date"),c.Lb(),c.Lb(),c.Mb(15,"div",13),c.Mb(16,"button",14),c.Tb("click",(function(){c.cc(e);const i=t.$implicit;return c.Wb().editGame(i.id)})),c.Kb(17,"i",15),c.hc(18," Edit "),c.Lb(),c.Lb(),c.Kb(19,"input",16),c.Kb(20,"input",17),c.Lb(),c.Lb()}if(2&e){const e=t.$implicit;c.xb(4),c.ic(e.title),c.xb(5),c.Zb("src",e.image,c.dc),c.xb(2),c.ic(e.description),c.xb(2),c.jc(" ",c.Yb(14,6,e.created_at,"dd-MM-yyyy hh:mm")," "),c.xb(6),c.ac("value",e.id),c.xb(1),c.ac("value",e.created_at)}}const u=[{path:"",component:(()=>{class e{constructor(e,t){this.gamesService=e,this.router=t,this.classes="row",this.games=[],this.user={},this.alerts=new m.a,this.user=JSON.parse(localStorage.getItem("userLogged"))}ngOnInit(){this.getUserGames()}getUserGames(){this.gamesService.getUserGames(this.user.username,this.user.id).subscribe(e=>{this.games=e})}deleteGame(e){this.alerts.showAlertConfirm("Are you sure?","Once deleted, you will not be able to recover this game!","warning").then(t=>{t.value&&(this.gamesService.deleteGame(e).subscribe(()=>{this.getUserGames()}),this.alerts.showAlert("Yeah!","Game was deleted!","success").then())})}editGame(e){this.router.navigateByUrl("games/edit/"+e)}navigate(){this.router.navigate(["games/add"])}}return e.\u0275fac=function(t){return new(t||e)(c.Jb(g),c.Jb(r.b))},e.\u0275cmp=c.Db({type:e,selectors:[["app-game-list"]],hostVars:2,hostBindings:function(e,t){2&e&&c.zb(t.classes)},decls:2,vars:2,consts:[["class","alert alert-info text-center col-md-12","role","alert",4,"ngIf"],["class","col-md-4",4,"ngFor","ngForOf"],["role","alert",1,"alert","alert-info","text-center","col-md-12"],[1,"alert-link",2,"cursor","pointer",3,"click"],[1,"col-md-4"],[1,"card"],[1,"card-header","bg-dark","text-white","d-flex","justify-content-between","align-items-center"],[1,"btn","btn-danger","btn-sm",3,"click"],[1,"zmdi","zmdi-delete","zmdi-hc-lg"],[1,"card-body"],["height","400px",1,"card-img-top",3,"src"],["id","description",2,"margin-top","15px"],["id","created_at"],[1,"card-footer"],[1,"btn","btn-info","btn-block",3,"click"],[1,"zmdi","zmdi-edit","zmdi-hc-lg"],["type","hidden","id","idHidden",3,"value"],["type","hidden","id","dateHidden",3,"value"]],template:function(e,t){1&e&&(c.gc(0,h,5,0,"div",0),c.gc(1,b,21,9,"div",1)),2&e&&(c.Zb("ngIf",t.games.length<1),c.xb(1),c.Zb("ngForOf",t.games))},directives:[a.j,a.i],pipes:[a.d],styles:[""]}),e})(),canActivate:[n.a]},{path:"add",component:l,canActivate:[n.a]},{path:"edit/:id",component:l,canActivate:[n.a]}];let p=(()=>{class e{}return e.\u0275mod=c.Hb({type:e}),e.\u0275inj=c.Gb({factory:function(t){return new(t||e)},imports:[[r.f.forChild(u)],r.f]}),e})(),v=(()=>{class e{}return e.\u0275mod=c.Hb({type:e}),e.\u0275inj=c.Gb({factory:function(t){return new(t||e)},imports:[[a.b,p,s.g,s.m]]}),e})()}}]);