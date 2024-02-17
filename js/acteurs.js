function v0(){return BABYLON.Vector3.Zero();}

class Acteur {

	constructor(nom, config, monde){
		this.nom       = nom;
		this.monde     = monde;
		this.masse     = config.masse || 1.0;
		this.objet3d   = config.objet3d;
		this.position  = config.position || BABYLON.Vector3.Zero();
		this.direction = config.direction || new BABYLON.Vector3(1,0,0);
		this.vMax      = config.vMax || 1.0;
		this.fMax      = config.fMax || 1.0;
		this.focus   = v0();
		this.vitesse = v0();
		this.force   = v0();
		
		this.objet3d.position = this.position;
		
		this.generateursForce = [];
		
	}
	
	ajouterGenerateur(f){
		this.generateursForce.push(f);
	}


	orienterVers(p){
		this.objet3d.lookAt(p);
	}
	
	regarderDevant(){
		if(this.vitesse.length()>0.0001){
			this.direction.copyFrom(this.vitesse);
			this.direction.normalize();
		};
		this.focus.copyFrom(this.objet3d.position);
		this.focus.addInPlace(this.direction);
		this.orienterVers(this.focus);
	}
	
	appForce(k,f){
		f.scaleAndAddToRef(k,this.force);
	}
	
	act(dt){
		this.vitesse.scaleAndAddToRef(dt,this.objet3d.position);
		this.force.scaleAndAddToRef(dt/this.masse,this.vitesse);
		this.force.setAll(0);	
		this.regarderDevant();
	}
}

const ACTEURS = {
	acteur : Acteur
}

export {ACTEURS};
