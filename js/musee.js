

import {Fabrique} from './fabrique.js' ; 
import {createPointerLock} from './pointerLock.js' ; 


window.addEventListener("DOMContentLoaded", ()=> {
        const monde = new Monde();
        const fabrique = new Fabrique(monde) ; 
        fabrique.fabriquer() ; 
        monde.go() ; 
  }
) ; 



function Monde(){

    this.canvas = document.getElementById("renderCanvas") ; 
    this.engine = new BABYLON.Engine(this.canvas, true) ; 
    this.clock  = 0.0 ; 

    this.actors = [];

    this.scene  = new BABYLON.Scene() ; 
    this.scene.useRightHandedSystem=true;
    this.scene.gravity = new BABYLON.Vector3(0,-0.9,0) ;
    this.scene.collisionsEnabled = true; 
    createPointerLock(this.scene) ;


    /*
    this.camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(2,1.7,2), this.scene) ; 
    this.camera.attachControl(this.canvas, true) ; 
    this.camera.setTarget(BABYLON.Vector3.Zero()) ; 
    */

    const that = this ;


    window.addEventListener("resize", ()=>{that.engine.resize();})
}

Monde.prototype.addActor = function(actor){
    this.actors.push(actor);
}

Monde.prototype.go = function(){
    const that = this ; 
    this.engine.runRenderLoop(function(){
        const dt = that.engine.getDeltaTime()/1000.0 ; 
        that.clock += dt ;

        //console.log(that.camera.position);
        
        if(that.actors[0]){
            if (that.camera_obj.intersectsMesh(that.actors[0].objet3d, false)) {
                that.actors[0].appForce(1,new BABYLON.Vector3(0,-1,0));
                that.actors[0].objet3d.material.diffuseColor.set(0,1,0);
            }
            else {
                that.actors[0].objet3d.material.diffuseColor.set(1,0,0);
            } ; 
				
        that.actors[0].appForce(-0.9,that.actors[0].vitesse);
        
        that.actors[0].act(dt);
        }
        that.scene.render() ; 
    });
}

/*

Monde.prototype.createEntity = function(name){
	const entity = new Entity(name) ; 
	entite.monde = this ; 
	this.entites.push(entity) ; 
	this.annuaire[nom] = entity ; 
	return entity ;  
}


// ============================================================================================

function Entity(nom){
	this.name        = nom ; 
	this.object3d    = null ; 
	this.components = [] ; 
	this.mass      = 1.0 ;
	this.position = new BABYLON.Vector3(0.0, 0.0, 0.0) ; 
	this.velocity  = new BABYLON.Vector3(0.0, 0.0, 0.0) ; 
	this.force    = new BABYLON.Vector3(0.0, 0.0, 0.0) ;  
}

Entity.prototype.embodiedBy = function(mesh){
	this.object3d = mesh ; 
}

Entity.prototype.attachedTo = function(anEntity){}

Entity.prototype.placedAt = function(x,y,z){
	if(this.objet3d){
		this.position.x = x ; 
		this.position.y = y ;
		this.position.z = z ;
		this.object3d.position.x = x ;
		this.object3d.position.y = y ; 
		this.object3d.position.z = z ; 
	}
}

Entity.prototype.orientedBy = function(rx,ry,rz){
	if(this.object3d){
		this.object3d.rotation.x = rx ;
		this.object3d.rotation.y = ry ; 
		this.object3d.rotation.z = rz ; 
	}	
}

Entity.prototype.subitForce = function(f){}

Entity.prototype.modifySpeed = function(vx,vy,vz){
	this.velocity.x = vx ;
	this.velocity.y = vy ; 
	this.velocity.z = vz ;
} 
	

Entity.prototype.act = function(dt){
	this.position.addInPlace(this.velocity.scale(dt)) ; 
	
	if(this.objet3d){
		this.object3d.position.copyFrom(this.position) ; 
	}
}

Entity.prototype.addComponent = function(componentType, oPars){
	const component = new componentType(this, oPars) ; 
	this.components.push(component) ; 
	return this ; 
}

Entity.prototype.deleteComponent = function(component){}

Entity.prototype.searchComponent = function(componentType){}

*/