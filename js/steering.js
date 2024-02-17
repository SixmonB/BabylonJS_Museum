
function v0(){return BABYLON.Vector3.Zero();}

class SteeringBehaviors {

	constructor(nom, config, acteur){
		this.nom    = nom;
		this.acteur = acteur;
		this.monde  = acteur.monde;
		this.cible  = null;
		this.vd     = v0();
		this.force  = v0();
		
		this.onSeek = false;
		this.onArrive = false;
		
		this.forceSeek = v0();
		this.forceArrive = v0();
		
	}
	

	seekOn(cible){
		this.cible = cible;
		this.onSeek = true;
	}
	seekOff(){
		this.onSeek = false;
	}
	
	arriveOn(cible){
		this.cible = cible;
		this.onArrive = true;
	}
	
	arriveOff(){
		this.onArrive = false;
	}
		
	
	eval(){
		this.force.setAll(0);
		this.forceSeek.setAll(0);
		this.forceArrive.setAll(0);
		
		if(this.onSeek) this.seek(this.cible.objet3d.position, this.forceSeek);
		if(this.onArrive) this.arrive(this.cible.objet3d.position, 5,this.forceArrive);
		
		this.force.addInPlace(this.forceSeek);
		this.force.addInPlace(this.forceArrive);
		
		this.acteur.appForce(1, this.force);
	}

	seek(posCible, force){
		console.log("SEEK");
		posCible.subtractToRef(this.acteur.objet3d.position, this.vd);
		this.vd.normalize();
		this.vd.scaleInPlace(this.acteur.vMax);
		this.vd.subtractToRef(this.acteur.vitesse,force);
	}
	
	arrive(posCible, deceleration, force){
		posCible.subtractToRef(this.acteur.objet3d.position, this.vd);
		const dist = this.vd.length();
		if(dist > 0.0001){
			const tweaker = 0.3;
			let speed = dist/(deceleration*tweaker);
			speed = Math.min(speed, this.acteur.vMax);
			this.vd.scaleInPlace(speed/dist);
			this.vd.subtractToRef(this.acteur.vitesse,force);
		}
	}

} 

export {SteeringBehaviors};
