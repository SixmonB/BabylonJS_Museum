

class Mouveur {

	constructor(nom, data, monde){
		this.nom     = nom;
		this.monde   = monde;
		this.objet3d = data.objet3d;
		this.masse   = data.masse || 1.0;
		this.vMax    = data.vMax  || 4.0;
		this.fMax    = data.fMax  || 1.0; 

		this.vitesse  = BABYLON.Vector3.Zero();
		this.force    = BABYLON.Vector3.Zero();

		this.direction = new BABYLON.Vector3(1,0,0) ; 
		this.cible     = BABYLON.Vector3.Zero();

        	this.controleurs = []; // Les éléments implémentent une méthode evalForce(x:Mouveur)
	}
	
	ajouterControleur(ctl){
		this.controleurs.push(ctl);
	}
	
	
	appForce(force){
		this.force.addInPlace(force);
	}
	
	evalForces(){
		const that = this;
		this.controleurs.forEach((c) => {c.eval(that);});
	}





	act(dt){
		
		this.objet3d.position.addInPlace(this.vitesse.scale(dt));
		
		this.vitesse.addInPlace(this.force.scale(dt/this.masse));
		
		this.force.set(0,0,0);
		
		if(this.vitesse.length() > 0.0001){
			this.direction.copyFrom(this.vitesse);
		} 
			
		
		this.cible.copyFrom(this.objet3d.position);
		this.cible.addInPlace(this.direction);
		//this.objet3d.position.copyFrom(this.position);
		this.objet3d.lookAt(this.cible);

		//console.log(this.vitesse.length());
		
	}
}

export {Mouveur};  


