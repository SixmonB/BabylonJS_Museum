import {PRIMS}   from './prims.js';
import {ACTEURS} from './acteurs.js';

let isDoorRightOpen = false;
let isDoorLeftOpen = false;
let isSDoorLOpen = false;
let isSDoorCOpen = false;
let isSDoorROpen = false;
let colliderRight;
let door1InitialPosition;
let door2InitialPosition;

function Fabrique(world){
    this.world = world ;
}



Fabrique.prototype.fabriquer = function(){

    const scene = this.world.scene ;

    this.world.camera = this.creerCamera("camera",{},scene) ;   
	this.world.camera_obj = this.creerSphere("sph0", {diametre:3}, scene) ;
	this.world.camera_obj.parent = this.world.camera;
	this.world.camera_obj.alpha = 0.0;
	this.world.camera_obj.isPickable = false;

	scene.shadowsEnabled = true;
	

    const walls_material = this.creerMateriauStandard("wall_mat",{texture:"./assets/textures/murs/wood.jpg"},scene) ; 
    const steps_material = this.creerMateriauStandard("steps_mat",{texture:"./assets/textures/sol.png"},scene);
	const door_material = this.creerMateriauStandard("door_mat",{texture:"./assets/textures/inox.jpg"},scene);
	const steps_sides_material = this.creerMateriauStandard("steps_sidemat",{texture:"./assets/textures/sols_plafonds/brique.jpg"},scene);
	const roof_material = this.creerMateriauStandard("roof_mat",{texture:"./assets/textures/murs/wood.jpg"},scene);
	const floor_material = this.creerMateriauStandard("floor_mat",{texture:"./assets/textures/parquet_porte.jpg",uScale:100,vScale:100},scene);
	const frame_material = this.creerMateriauStandard("frame_mat",{texture:"./assets/textures/murs/wall5.jpg"}, scene);
	const glass_material = this.creerMateriauStandard("glass_mat",{texture:"./assets/textures/glassWindow.jpg"}, scene);

    const ciel = this.creerCiel("ciel",{},scene);

	const skybox = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), this.world.scene);
	skybox.diffuse = new BABYLON.Color3(1,0.98,0.95);
	skybox.specular = new BABYLON.Color3(0.5, 0.5,0.5);
	skybox.groundColor = new BABYLON.Color3(0.5, 0.5,0.5); 

	skybox.intensity = 0.7;

	//const light1 = new BABYLON.

    const sphere = this.creerSphere("sph1", {}, scene) ;
	sphere.position = new BABYLON.Vector3(20, 1, 10) ; 
	sphere.isVisible = false;

	// Trigger Zone
	let collider = BABYLON.MeshBuilder.CreateBox("collider", { width: 1, height: 1, depth: 6 }, scene);
    collider.parent = this.world.camera;
	collider.isPickable = false;
    collider.actionManager = new BABYLON.ActionManager(scene);	
    

	// Walls
    const mur1 = this.createWall("wall-1",{material:walls_material,height:10,width:15}, scene) ; 
	const mur2 = this.createWall("wall-2",{material:walls_material,height:10}, scene) ; 
	const mur3 = this.createWall("wall-3",{material:walls_material,width:15}, scene) ;
	const mur4 = this.createWall("wall-4",{material:walls_material,height:10}, scene) ; 
	const mur5 = this.createWall("wall-5",{material:walls_material,width:15}, scene) ; 
	const mur6 = this.createWall("wall-6",{material:walls_material,height:10}, scene) ; 
	const mur7 = this.createWall("wall-7",{material:walls_material,height:10,width:15}, scene) ; 
	const mur8 = this.createWall("wall-8",{material:walls_material,height:10,width:15}, scene) ;
	const mur9 = this.createWall("wall-9",{material:walls_material,height:10,width:30,doorHeight:5}, scene,true) ;  
	const mur10 = this.createWall("wall-10",{material:walls_material,height:10,width:15}, scene) ;
	const mur11 = this.createWall("wall-11", {material:walls_material,doorMaterial:door_material,height:4.5,doorWidth:3,doorHeight:3.75}, scene,true); 
	const mur12 = this.createWall("wall-12", {material:walls_material,doorMaterial:door_material,height:4.5,doorWidth:3,doorHeight:3.75}, scene,true); 
	const mur13 = this.createWall("wall-13", {material:walls_material,doorMaterial:door_material,height:4.5,doorWidth:3,doorHeight:3.75}, scene,true); 


    mur1.position = new BABYLON.Vector3(7.5,0,0) ; 

    mur2.rotation.y = Math.PI/2 ;
    mur2.position = new BABYLON.Vector3(0,0,5) ; 

	mur3.position = new BABYLON.Vector3(7.5,0,10.0) ; 
	
	mur4.rotation.y = Math.PI/2 ;
    mur4.position = new BABYLON.Vector3(0.0,0,15) ;
	
	mur5.position = new BABYLON.Vector3(7.5,0,20.0) ;

	mur6.rotation.y = Math.PI/2 ;
    mur6.position = new BABYLON.Vector3(0.0,0,25) ;

	mur7.position = new BABYLON.Vector3(7.5,0,30) ;

	mur8.position = new BABYLON.Vector3(22.5,0,30) ;

	mur9.rotation.y = Math.PI/2 ;
	mur9.position = new BABYLON.Vector3(30,0,15) ;		//Entree

	mur10.position = new BABYLON.Vector3(22.5,0,0) ;

	mur11.rotation.y = Math.PI/2 ;
    mur11.position = new BABYLON.Vector3(15,0,5) ; //right side

	mur12.rotation.y = Math.PI/2 ;
    mur12.position = new BABYLON.Vector3(15,0,15) ; //center side

	mur13.rotation.y = Math.PI/2 ;
    mur13.position = new BABYLON.Vector3(15,0,25) ; //left side

	//Roofs
	const roof1 = this.createWall("roof-1", {material:roof_material,height:30,width:15.5}, scene); //second floor
	const roof2 = this.createWall("roof-2", {material:roof_material,height:30,width:30}, scene); //main

	roof1.rotation.x= Math.PI/2;
	roof1.position = new BABYLON.Vector3(7.75,5,0);
	
	roof2.rotation.x= Math.PI/2;
	roof2.position = new BABYLON.Vector3(15,10,0);

	//Stairs
	const stairs1 = this.creerEscalier("stair-1",{material:steps_material, steps: 45}, scene);
	stairs1.position.x = 21.5;
	stairs1.position.z = 1;

	const stairs2 = this.creerEscalier("stair-1",{material:steps_material, steps: 45}, scene);
	stairs2.position.x = 21.5;
	stairs2.position.z = 30-1;	

	// Posters

    const poster = this.creerPoster("poster01",{tableau:"./assets/images/portrait/renoir/bouquet.jpg",frameTexture:frame_material,pieceName:"Vase de fleurs", 
									pieceLabel:	"Pierre-Auguste Renoir (1841-1919)\n"+
												"Vase de fleurs, 1900\nHuile sur toile\n"+
												"L'artiste y capture la beauté d'un bouquet de fleurs dans un vase. Renoir parvient à transmettre la fraîcheur et la luminosité des fleurs.",
									collider: collider},scene);
    poster.parent = mur2 ; 
    poster.position.y = 2 ; 
    poster.position.z = 0.5;
	poster.position.x = -3;
    poster.rotation.y = Math.PI ;
	const poster2 = this.creerPoster("poster02",{tableau:"./assets/images/portrait/renoir/femmes_au_Jardin.jpg",frameTexture:frame_material,pieceName:"Femmes au Jardin", 
									pieceLabel:	"Pierre-Auguste Renoir (1841-1919)\n"+
												"Femmes au jardin, 1900\nHuile sur toile\n"+
												"Tableau représente un groupe de femmes se promenant et se reposant dans un jardin, montrant la maîtrise de l'artiste dans la représentation de la lumière, de la couleur et de l'harmonie de la vie en plein air.",
									collider: collider},scene);
    poster2.parent = mur2 ; 
    poster2.position.y = 2 ; 
    poster2.position.z = 0.5; 
    poster2.rotation.y = Math.PI ;
	const poster3 = this.creerPoster("poster03",{tableau:"./assets/images/portrait/renoir/La_Balançoire.jpg",frameTexture:frame_material,pieceName:"La Balançoire", 
									pieceLabel:	"Pierre-Auguste Renoir (1841-1919)\n"+
												"La Balançoire, 1876\nHuile sur toile\n"+
												"œuvre représentant une scène champêtre où une jeune femme vêtue de blanc se balance sur une balançoire, capturant l'instant de légèreté et d'insouciance de la vie estivale.",
									collider: collider},scene);
    poster3.parent = mur2 ; 
    poster3.position.y = 2 ; 
    poster3.position.z = 0.5; 
	poster3.position.x = 3;
    poster3.rotation.y = Math.PI ;
	const poster4 = this.creerPoster("poster04",{tableau:"./assets/images/portrait/renoir/La_Loge.jpg",frameTexture:frame_material,pieceName:"La Loge", 
									pieceLabel:	"Pierre-Auguste Renoir (1841-1919)\n"+
												"La Loge, 1874\nHuile sur toile\n"+
												"Femme élégante vêtue de rose dans une loge de théâtre, capturant son regard vers le public et évoquant la vie sociale et la séduction dans le Paris de la Belle Époque.",
									collider: collider},scene);
    poster4.parent = mur1 ; 
    poster4.position.y = 2 ; 
    poster4.position.z = 0.5; 
	poster4.position.x = -4;
    poster4.rotation.y = Math.PI;
	const poster5 = this.creerPoster("poster05",{tableau:"./assets/images/portrait/renoir/Le_Moulin_de_la_Galette.jpg",frameTexture:frame_material,pieceName:"Le Moulin de la Galette", 
									pieceLabel:	"Pierre-Auguste Renoir (1841-1919)\n"+
												"Le Moulin de la Galette, 1876\nHuile sur toile\n"+
												"Scène animée au célèbre cabaret de Montmartre à Paris, capturant la joie et la vivacité de la vie sociale de l'époque",
									collider: collider},scene);
    poster5.parent = mur1 ; 
    poster5.position.y = 2 ; 
    poster5.position.z = 0.5;
    poster5.rotation.y = Math.PI ;
	const poster6 = this.creerPoster("poster06",{tableau:"./assets/images/portrait/renoir/Les_Deux_Sœurs.jpg",frameTexture:frame_material,pieceName:"Les Deux Sœurs", 
									pieceLabel:	"Pierre-Auguste Renoir (1841-1919)\n"+
												"Les Deux Sœurs, 1881\nHuile sur toile\n"+
												"Deux jeunes sœurs dans un jardin, capturant leur intimité et leur complicité dans une scène empreinte de douceur et d'affection fraternelle",
									collider: collider},scene);
    poster6.parent = mur1 ; 
    poster6.position.y = 2 ; 
    poster6.position.x = 4;
	poster6.position.z = 0.5;  
    poster6.rotation.y = Math.PI;

	const poster7 = this.creerPoster("poster07",{tableau:"./assets/images/portrait/renoir/Les_Parapluies.jpg",frameTexture:frame_material,pieceName:"Les Parapluies", 
									pieceLabel:	"Pierre-Auguste Renoir (1841-1919)\n"+
												"Les Parapluies, 1881-1886\nHuile sur toile\n"+
												"Scène urbaine où des figures féminines se déplacent sous la pluie avec des parapluies, capturant une atmosphère à la fois intimiste et nostalgique",
									collider: collider},scene);
	poster7.parent = mur3 ; 
    poster7.position.y = 2 ; 
    poster7.position.z = -0.5; 
	poster7.position.x = -4;
	const poster8 = this.creerPoster("poster08",{tableau:"./assets/images/portrait/renoir/Les-Grandes-Baigneuses.jpg",frameTexture:frame_material,pieceName:"Les Grandes Baigneuses", 
									pieceLabel:	"Pierre-Auguste Renoir (1841-1919)\n"+
												"Les Grandes Baigneuses, 1884-1887\nHuile sur toile\n"+
												"Femmes nues se baignant dans un paysage naturel, mettant en valeur la beauté du corps humain et la sensibilité du peintre.",
									collider: collider},scene);
    poster8.parent = mur3 ; 
    poster8.position.y = 2 ; 
    poster8.position.z = -0.5;
	const poster9 = this.creerPoster("poster09",{tableau:"./assets/images/portrait/renoir/Au_théâtre.jpg",frameTexture:frame_material,pieceName:"Au théâtre", 
									pieceLabel:	"Pierre-Auguste Renoir (1841-1919)\n"+
												"Au théâtre, 1876\nHuile sur toile\n"+
												"Couple élégant dans un théâtre, mettant en valeur la mode et la sophistication de l'époque.",
									collider: collider},scene);
    poster9.parent = mur3 ; 
    poster9.position.y = 2 ; 
    poster9.position.x = 4;
	poster9.position.z = -0.5;  

	const poster10 = this.creerPoster("poster10",{tableau:"./assets/images/portrait/monet/Impression_soleil_levant.jpg",frameTexture:frame_material,pieceName:"Impression, soleil levant", 
									pieceLabel:	"Claude Monet (1840-1926)\n"+
												"Impression, soleil levant, 1872\nHuile sur toile\n"+
												"Considérée comme l'œuvre qui a donné naissance au mouvement impressionniste, capturant l'instant fugace d'un lever de soleil sur le port du Havre.",
									collider: collider},scene);
	poster10.parent = mur3 ; 
    poster10.position.y = 2 ; 
    poster10.position.z = 0.5; 
	poster10.position.x = -4;
	poster10.rotation.y = Math.PI;
	const poster11 = this.creerPoster("poster11",{tableau:"./assets/images/portrait/monet/La_Cathédrale_de_Rouen.jpg",frameTexture:frame_material,pieceName:"La Cathédrale de Rouen", 
									pieceLabel:	"Claude Monet (1840-1926)\n"+
												"La Cathédrale de Rouen, 1892-1894\nHuile sur toile\n"+
												"Série d'œuvres de Monet réalisées entre 1892 et 1894, représentant la célèbre cathédrale de Rouen à différentes heures de la journée et dans différentes conditions atmosphériques.",
									collider: collider},scene);
    poster11.parent = mur3 ; 
    poster11.position.y = 2 ; 
    poster11.position.z = 0.5;
	poster11.rotation.y = Math.PI;
	const poster12 = this.creerPoster("poster12",{tableau:"./assets/images/portrait/monet/La_Promenade.jpg",frameTexture:frame_material,pieceName:"La Promenade", 
									pieceLabel:	"Claude Monet (1840-1926)\n"+
												"La Promenade, 1875\nHuile sur toile\n"+
												"Femme élégante et un homme en promenade dans un paysage bucolique, capturant la légèreté et la beauté de la vie quotidienne.",
									collider: collider},scene);
    poster12.parent = mur3 ; 
    poster12.position.y = 2 ; 
    poster12.position.x = 4;
	poster12.position.z = 0.5;
	poster12.rotation.y = Math.PI;
	
	const poster13 = this.creerPoster("poster13",{tableau:"./assets/images/portrait/monet/Le-pont-japonais.jpg",frameTexture:frame_material,pieceName:"Le Pont Japonais", 
									pieceLabel:	"Claude Monet (1840-1926)\n"+
												"Le Pont Japonais, 1899\nHuile sur toile\n"+
												"Célèbre pont japonais situé dans le jardin de sa propre résidence à Giverny, capturant la beauté de l'architecture.",
									collider: collider},scene);
	poster13.parent = mur4 ; 
    poster13.position.y = 2 ; 
    poster13.position.z = 0.5; 
	poster13.position.x = -3;
	poster13.rotation.y = Math.PI;
	const poster14 = this.creerPoster("poster14",{tableau:"./assets/images/portrait/monet/Les_Coquelicots.jpg",frameTexture:frame_material,pieceName:"Les Coquelicots", 
									pieceLabel:	"Claude Monet (1840-1926)\n"+
												"Les Coquelicots, 1873\nHuile sur toile\n"+
												"Champ éclatant de coquelicots dans un paysage naturel, capturant la beauté éphémère des fleurs sauvages dans un style impressionniste.",
									collider: collider},scene);
    poster14.parent = mur4 ; 
    poster14.position.y = 2 ; 
    poster14.position.z = 0.5;
	poster14.rotation.y = Math.PI;
	const poster15 = this.creerPoster("poster15",{tableau:"./assets/images/portrait/monet/Les_Meules.jpg",frameTexture:frame_material,pieceName:"Les Meules", 
									pieceLabel:	"Claude Monet (1840-1926)\n"+
												"Les Meules, 1890-1891\nHuile sur toile\n"+
												"Meules de foin dans différents jeux de lumière et de saison, explorant les variations de couleur, de texture et de lumière.",
									collider: collider},scene);
    poster15.parent = mur4 ; 
    poster15.position.y = 2 ; 
    poster15.position.x = 3;
	poster15.position.z = 0.5;
	poster15.rotation.y = Math.PI; 

	const poster16 = this.creerPoster("poster16",{tableau:"./assets/images/portrait/monet/Les_Nymphéas.jpg",frameTexture:frame_material,pieceName:"Les Nymphéas", 
									pieceLabel:	"Claude Monet (1840-1926)\n"+
												"Les Nymphéas, 1899-1926\nHuile sur toile\n"+
												"Étangs de nénuphars de son jardin à Giverny, explorant les jeux de lumière, les reflets et les variations de couleur pour créer une ambiance paisible et immersive.",
									collider: collider},scene);
	poster16.parent = mur5 ; 
    poster16.position.y = 2 ; 
    poster16.position.z = -0.5; 
	poster16.position.x = -4;
	const poster17 = this.creerPoster("poster17",{tableau:"./assets/images/portrait/monet/Monet_dejeunersurlherbe.jpg",frameTexture:frame_material,pieceName:"Déjeuner sur l'herbe", 
									pieceLabel:	"Claude Monet (1840-1926)\n"+
												"Déjeuner sur l'herbe, 1865-1876\nHuile sur toile\n"+
												"Pique-nique champêtre où des personnages habillés de façon contemporaine se trouvent dans un paysage naturel, créant une atmosphère détendue et marquant une transition vers le mouvement impressionniste.",
									collider: collider},scene);
    poster17.parent = mur5 ; 
    poster17.position.y = 2 ; 
    poster17.position.z = -0.5;
	const poster18 = this.creerPoster("poster18",{tableau:"./assets/images/portrait/monet/Nympheas_et_Agapanthes.jpg",frameTexture:frame_material,pieceName:"Nymphéas et Agapanthes", 
									pieceLabel:	"Claude Monet (1840-1926)\n"+
												"Nymphéas et Agapanthes, 1914-1917\nHuile sur toile\n"+
												"Des nymphéas et des agapanthes dans une explosion de couleurs et de formes abstraites, représentant l'évolution artistique de Monet.",
									collider: collider},scene);
    poster18.parent = mur5 ; 
    poster18.position.y = 2 ; 
    poster18.position.x = 4;
	poster18.position.z = -0.5;

	const poster19 = this.creerPoster("poster19",{tableau:"./assets/images/portrait/degas/cafe-concert.jpg",frameTexture:frame_material,pieceName:"Au Café-concert", 
									pieceLabel:	"Edgar Degas (1834-1917)\n"+
												"Au Café-concert, 1876-1877\nHuile sur toile\n"+
												"Café-concert parisien, mettant en scène des spectateurs, des musiciens et des danseuses, capturant l'atmosphère vivante.",
									collider: collider},scene);
	poster19.parent = mur5 ; 
    poster19.position.y = 2 ; 
    poster19.position.z = 0.5; 
	poster19.position.x = -4;
	poster19.rotation.y = Math.PI;
	const poster20 = this.creerPoster("poster20",{tableau:"./assets/images/portrait/degas/Danseuses_bleues.jpg",frameTexture:frame_material,pieceName:"Danseuses bleues", 
									pieceLabel:	"Edgar Degas (1834-1917)\n"+
												"Danseuses bleues, 1896\nHuile sur toile\n"+
												"Trois danseuses en tutus bleus, capturant leurs mouvements gracieux et leurs postures élégantes dans un studio de danse.",
									collider: collider},scene);
    poster20.parent = mur5 ; 
    poster20.position.y = 2 ; 
    poster20.position.z = 0.5;
	poster20.rotation.y = Math.PI;
	const poster21 = this.creerPoster("poster21",{tableau:"./assets/images/portrait/degas/degas-repasseuses.jpg",frameTexture:frame_material,pieceName:"Les Repasseuses", 
									pieceLabel:	"Edgar Degas (1834-1917)\n"+
												"Les Repasseuses, 1884-1886\nHuile sur toile\n"+
												"Deux femmes occupées à repasser du linge dans un intérieur domestique, capturant la tranquillité et la minutie du travail.",
									collider: collider},scene);
    poster21.parent = mur5 ; 
    poster21.position.y = 2 ; 
    poster21.position.x = 4;
	poster21.position.z = 0.5;
	poster21.rotation.y = Math.PI;
	
	const poster22 = this.creerPoster("poster22",{tableau:"./assets/images/portrait/degas/La_Classe_de_danse.jpg",frameTexture:frame_material,pieceName:"La Classe de danse", 
									pieceLabel:	"Edgar Degas (1834-1917)\n"+
												"La Classe de danse, 1873-1876\nHuile sur toile\n"+
												"Groupe de jeunes danseuses en répétition, capturant l'effort et la grâce de leurs mouvements, ainsi que l'atmosphère studieuse d'une salle de danse.",
									collider: collider},scene);
	poster22.parent = mur6 ; 
    poster22.position.y = 2 ; 
    poster22.position.z = 0.5; 
	poster22.position.x = -3;
	poster22.rotation.y = Math.PI;
	const poster23 = this.creerPoster("poster23",{tableau:"./assets/images/portrait/degas/Le_foyer_de_la_danse_ lOpra.jpg",frameTexture:frame_material,pieceName:"Le Foyer de la danse à l'Opéra de Paris", 
									pieceLabel:	"Edgar Degas (1834-1917)\n"+
												"Le Foyer de la danse à l'Opéra de Paris, 1872\nHuile sur toile\n"+
												"Groupe de danseuses se reposant dans les coulisses de l'Opéra, capturant l'intimité et l'effervescence de l'environnement des danseuses professionnelles.",
									collider: collider},scene);
    poster23.parent = mur6 ; 
    poster23.position.y = 2 ; 
    poster23.position.z = 0.5;
	poster23.rotation.y = Math.PI;
	const poster24 = this.creerPoster("poster24",{tableau:"./assets/images/portrait/degas/L'Etoile.jpg",frameTexture:frame_material,pieceName:"L'Étoile", 
									pieceLabel:	"Edgar Degas (1834-1917)\n"+
												"L'Étoile, 1876\nHuile sur toile\n"+
												"Une danseuse étoile sur scène, mettant en valeur sa grâce et son talent exceptionnels, capturant l'éclat et la magie du ballet.",
									collider: collider},scene);
    poster24.parent = mur6 ; 
    poster24.position.y = 2 ; 
    poster24.position.x = 3;
	poster24.position.z = 0.5;
	poster24.rotation.y = Math.PI; 

	const poster25 = this.creerPoster("poster25",{tableau:"./assets/images/portrait/degas/race-horses-at-longchamp.jpg",frameTexture:frame_material,pieceName:"Courses à Longchamp", 
									pieceLabel:	"Edgar Degas (1834-1917)\n"+
												"Courses à Longchamp, 1872\nHuile sur toile\n"+
												"Scène animée lors d'une course de chevaux à l'hippodrome de Longchamp, capturant le mouvement, l'excitation et l'élégance des chevaux.",
									collider: collider},scene);
	poster25.parent = mur7 ; 
    poster25.position.y = 2 ; 
    poster25.position.z = -0.5; 
	poster25.position.x = -4;
	const poster26 = this.creerPoster("poster26",{tableau:"./assets/images/portrait/degas/the-tub.jpg",frameTexture:frame_material,pieceName:"La Baignoire", 
									pieceLabel:	"Edgar Degas (1834-1917)\n"+
												"La Baignoire, 1886\nHuile sur toile\n"+
												"Femme nue assise dans une baignoire, capturant un moment intime et privé, explorant le thème de la féminité et de la beauté naturelle dans l'intimité d'une salle de bain.",
									collider: collider},scene);
    poster26.parent = mur7 ; 
    poster26.position.y = 2 ; 
    poster26.position.z = -0.5;
	const poster27 = this.creerPoster("poster27",{tableau:"./assets/images/portrait/degas/place-de-la-concorde-1875.jpg",frameTexture:frame_material,pieceName:"Place de la Concorde", 
									pieceLabel:	"Edgar Degas (1834-1917)\n"+
												"Place de la Concorde, 1875\nHuile sur toile\n"+
												"Célèbre place de Paris avec ses statues, son obélisque et son atmosphère animée, capturant les jeux de lumière et les mouvements de la vie urbaine à l'époque de la Belle Époque.",
									collider: collider},scene);
    poster27.parent = mur7 ; 
    poster27.position.y = 2 ; 
    poster27.position.x = 4;
	poster27.position.z = -0.5;

	//Salon Name
	const renoir = this.createPoster("renoir",{height:0.5,width:3,salonName:"Salon Pierre-Auguste Renoir"},scene);
	renoir.rotation.y = Math.PI/2;
	renoir.position = new BABYLON.Vector3(15.55,3.7,5);

	const monet = this.createPoster("monet",{height:0.5,width:3,salonName:"Salon Claude Monet"},scene);
	monet.rotation.y = Math.PI/2;
	monet.position = new BABYLON.Vector3(15.55,3.7,15);

	const degas = this.createPoster("degas",{height:0.5,width:3,salonName:"Salon Edgar Degas"},scene);
	degas.rotation.y = Math.PI/2;
	degas.position = new BABYLON.Vector3(15.55,3.7,25);

	
	// Floor
    const sol = this.creerSol("sol",{material:floor_material},scene);


	// Doors
	const door1 = this.createdDoubleDoor("door-1", {material: door_material, glass_material: glass_material, height:4}, scene); // wall-9
	door1.frame.position.x = 30;
	door1.frame.position.z = 15;
	door1.frame.rotation.y = Math.PI/2 ;

	const doorL = this.createDoor("door-L", {material: door_material, glass_material: glass_material, height:3.5,width:3}, scene); // wall-13
	doorL.frame.position = new BABYLON.Vector3(15,3.25/2,25) ; 	//left side
	doorL.frame.rotation.y = Math.PI/2 ;
	const doorC = this.createDoor("door-C", {material: door_material, glass_material: glass_material, height:3.5,width:3}, scene); // wall-12
	doorC.frame.position = new BABYLON.Vector3(15,3.25/2,15); 		//center side
	doorC.frame.rotation.y = Math.PI/2 ;
	const doorR = this.createDoor("door-R", {material: door_material, glass_material: glass_material, height:3.5,width:3}, scene); // wall-11
	doorR.frame.position = new BABYLON.Vector3(15,3.25/2,5) ; 	//right side
	doorR.frame.rotation.y = Math.PI/2 ;

	
	// Animation
	
	const doorAnimationDuration = 20; // Duration of the animation in milliseconds
	const doorAnimationOffset = 2.5; // Amount of movement for the doors

	// Create animation keyframes - Right Open
	const doorOpenKeyframes = [
		{	frame: 0,
			value: door1.frame_door_1.position.x,
		},
		{	frame: doorAnimationDuration,
			value: door1.frame_door_1.position.x - doorAnimationOffset,
		},];
	const doorCloseKeyframes = [
		{	frame: 0,
			value: door1.frame_door_1.position.x - doorAnimationOffset,
		},
		{	frame: doorAnimationDuration,
			value: door1.frame_door_1.position.x,
		},];
	// Create animation keyframes - Left Open
	const doorOpenKeyframesl = [
		{	frame: 0,
			value: door1.frame_door_2.position.x,
		},
		{	frame: doorAnimationDuration,
			value: door1.frame_door_2.position.x + doorAnimationOffset,
		},];
	const doorCloseKeyframesl = [
		{	frame: 0,
			value: door1.frame_door_2.position.x + doorAnimationOffset,
		},
		{	frame: doorAnimationDuration,
			value: door1.frame_door_2.position.x,
		},];

	// Create animation keyframes - Single Doors
	const doorOpenKeyframesSingleL = [
		{	frame: 0,
			value: doorL.frame_door.position.x,
		},
		{	frame: doorAnimationDuration,
			value: doorL.frame_door.position.x + doorAnimationOffset,
		},];
	const doorCloseKeyframesSingleL = [
		{	frame: 0,
			value: doorL.frame_door.position.x + doorAnimationOffset,
		},
		{	frame: doorAnimationDuration,
			value: doorL.frame_door.position.x,
		},];
	// Create animation keyframes - Single Doors
	const doorOpenKeyframesSingleC = [
		{	frame: 0,
			value: doorC.frame_door.position.x,
		},
		{	frame: doorAnimationDuration,
			value: doorC.frame_door.position.x + doorAnimationOffset,
		},];
	const doorCloseKeyframesSingleC = [
		{	frame: 0,
			value: doorC.frame_door.position.x + doorAnimationOffset,
		},
		{	frame: doorAnimationDuration,
			value: doorC.frame_door.position.x,
		},];
	// Create animation keyframes - Single Doors
	const doorOpenKeyframesSingleR = [
		{	frame: 0,
			value: doorR.frame_door.position.x,
		},
		{	frame: doorAnimationDuration,
			value: doorR.frame_door.position.x + doorAnimationOffset,
		},];
	const doorCloseKeyframesSingleR = [
		{	frame: 0,
			value: doorR.frame_door.position.x + doorAnimationOffset,
		},
		{	frame: doorAnimationDuration,
			value: doorR.frame_door.position.x,
		},];				

//##################################################################//

	// Create animation
	const doorAnimationRight = new BABYLON.Animation("doorAnimationRight","position.x",60,
												BABYLON.Animation.ANIMATIONTYPE_FLOAT,
												BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
	const doorAnimationLeft = new BABYLON.Animation("doorAnimationLeft","position.x",60,
												BABYLON.Animation.ANIMATIONTYPE_FLOAT,
												BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);	
	const doorAnimationSingle = new BABYLON.Animation("doorAnimationSingle","position.x",60,
												BABYLON.Animation.ANIMATIONTYPE_FLOAT,
												BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

	

    let actionOpen = new BABYLON.ExecuteCodeAction(
        {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
            parameter: { 
                mesh: door1.frame,
            }
        }, function () {
			if (!isDoorRightOpen) {
				isDoorRightOpen = true;
				// Open the doors
				doorAnimationRight.setKeys(doorOpenKeyframes); // Set initial keyframes
        		door1.frame_door_1.animations = [doorAnimationRight];

				doorAnimationLeft.setKeys(doorOpenKeyframesl);
				door1.frame_door_2.animations = [doorAnimationLeft];

        		let animationGroup = new BABYLON.AnimationGroup("animationGroup");
				animationGroup.addTargetedAnimation(doorAnimationRight, door1.frame_door_1);
				animationGroup.addTargetedAnimation(doorAnimationLeft, door1.frame_door_2);
				animationGroup.start(false, 1.0, 0, doorAnimationDuration); // Begin the animation group
			} 
        });

	let actionClose = new BABYLON.ExecuteCodeAction(
			{
				trigger: BABYLON.ActionManager.OnIntersectionExitTrigger, 
				parameter: { 
					mesh: door1.frame,
				}
		}, function () {
				if (isDoorRightOpen) {					
					isDoorRightOpen = false;
					// Close the doors
					doorAnimationRight.setKeys(doorCloseKeyframes); // Set initial keyframes
					door1.frame_door_1.animations = [doorAnimationRight];

					doorAnimationLeft.setKeys(doorCloseKeyframesl);
					door1.frame_door_2.animations = [doorAnimationLeft]

					let animationGroup = new BABYLON.AnimationGroup("animationGroup");
					animationGroup.addTargetedAnimation(doorAnimationRight, door1.frame_door_1);
					animationGroup.addTargetedAnimation(doorAnimationLeft, door1.frame_door_2);
					animationGroup.start(false, 1.0, 0, doorAnimationDuration); // Begin the animation group
				}
		});	
	
	let actionOpenL = new BABYLON.ExecuteCodeAction(
        {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
            parameter: { 
                mesh: doorL.frame,
            }
		}, function () {
			if (!isSDoorLOpen) {
				isSDoorLOpen = true;
				// Open the doors
				doorAnimationSingle.setKeys(doorOpenKeyframesSingleL); // Set initial keyframes
        		doorL.frame_door.animations = [doorAnimationSingle];
        		scene.beginAnimation(doorL.frame_door, 0, doorAnimationDuration, false);// Begin the animation group
			} 
        });
	let actionOpenC = new BABYLON.ExecuteCodeAction(
		{
			trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
			parameter: { 
				mesh: doorC.frame,
			}
		}, function () {
			if (!isSDoorCOpen) {
				isSDoorCOpen = true;
				// Open the doors
				doorAnimationSingle.setKeys(doorOpenKeyframesSingleC); // Set initial keyframes
				doorC.frame_door.animations = [doorAnimationSingle];
				scene.beginAnimation(doorC.frame_door, 0, doorAnimationDuration, false);// Begin the animation group
			} 
		});
	let actionOpenR = new BABYLON.ExecuteCodeAction(
		{
			trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
			parameter: { 
				mesh: doorR.frame,
			}
		}, function () {
			if (!isSDoorROpen) {
				isSDoorROpen = true;
				// Open the doors
				doorAnimationSingle.setKeys(doorOpenKeyframesSingleR); // Set initial keyframes
				doorR.frame_door.animations = [doorAnimationSingle];
				scene.beginAnimation(doorR.frame_door, 0, doorAnimationDuration, false);// Begin the animation group
			} 
		});	
	let actionCloseL = new BABYLON.ExecuteCodeAction(
		{
			trigger: BABYLON.ActionManager.OnIntersectionExitTrigger, 
			parameter: { 
				mesh: doorL.frame,
			}
		}, function () {
			if (isSDoorLOpen) {
				isSDoorLOpen = false;
				// Open the doors
				doorAnimationSingle.setKeys(doorCloseKeyframesSingleL); // Set initial keyframes
        		doorL.frame_door.animations = [doorAnimationSingle];
        		scene.beginAnimation(doorL.frame_door, 0, doorAnimationDuration, false);// Begin the animation group
			} 
        });
	let actionCloseC = new BABYLON.ExecuteCodeAction(
		{
			trigger: BABYLON.ActionManager.OnIntersectionExitTrigger, 
			parameter: { 
				mesh: doorC.frame,
			}
		}, function () {
			if (isSDoorCOpen) {
				isSDoorCOpen = false;
				// Open the doors
				doorAnimationSingle.setKeys(doorCloseKeyframesSingleC); // Set initial keyframes
				doorC.frame_door.animations = [doorAnimationSingle];
				scene.beginAnimation(doorC.frame_door, 0, doorAnimationDuration, false);// Begin the animation group
			} 
		});
	let actionCloseR = new BABYLON.ExecuteCodeAction(
		{
			trigger: BABYLON.ActionManager.OnIntersectionExitTrigger, 
			parameter: { 
				mesh: doorR.frame,
			}
		}, function () {
			if (isSDoorROpen) {
				isSDoorROpen = false;
				// Open the doors
				doorAnimationSingle.setKeys(doorCloseKeyframesSingleR); // Set initial keyframes
				doorR.frame_door.animations = [doorAnimationSingle];
				scene.beginAnimation(doorR.frame_door, 0, doorAnimationDuration, false);// Begin the animation group
			} 
		});
	

    collider.actionManager.registerAction(actionOpen);
	collider.actionManager.registerAction(actionOpenL);
	collider.actionManager.registerAction(actionOpenC);
	collider.actionManager.registerAction(actionOpenR);

	collider.actionManager.registerAction(actionClose);
	collider.actionManager.registerAction(actionCloseL);
	collider.actionManager.registerAction(actionCloseC);
	collider.actionManager.registerAction(actionCloseR);			

	// Actors
	const actor1 = new ACTEURS.acteur("actor1",{objet3d:sphere,position: sphere.position},this.world);
	this.world.addActor(actor1);

	//Railing
	
	const rail_up = this.createRailing("rail-up", {glassMaterial:glass_material,steelMaterial:frame_material,height:1,width:26,bars:20}, scene)
	rail_up.rotation.y = Math.PI/2;
	rail_up.rotation.z = Math.PI;
	rail_up.position = new BABYLON.Vector3(15, 6.5, 15);
	const rail_left = this.createRailing("rail-left", {glassMaterial:glass_material,steelMaterial:frame_material,height:1,width:13}, scene,true)
	rail_left.rotation.z = Math.PI - Math.PI/7.2;
	rail_left.position = new BABYLON.Vector3(21.5, 3.5, 2);
	const rail_right = this.createRailing("rail-right", {glassMaterial:glass_material,steelMaterial:frame_material,height:1,width:13}, scene,true)
	rail_right.rotation.z = Math.PI - Math.PI/7.2;
	rail_right.position = new BABYLON.Vector3(21.5, 3.5, 28);
// #############################################
// Teleportation

	//Spheres
	const teleport1 = this.creerSphere("teleport", {diametre:1}, scene);
	teleport1.position = new BABYLON.Vector3(28, 1, 15);
	const teleport2 = this.creerSphere("teleport", {diametre:1}, scene);
	teleport2.position = new BABYLON.Vector3(14, 6, 1);
	const teleport3 = this.creerSphere("teleport", {diametre:1}, scene);
	teleport3.position = new BABYLON.Vector3(14, 6, 29);
	const teleport4 = this.creerSphere("teleport", {diametre:1}, scene);
	teleport4.position = new BABYLON.Vector3(17, 1, 15);

	// Raycasting
	var enabled = 2;
	var flag = 0;
	scene.onBeforeRenderObservable.add( () => {
		
		flag = this.createPickingRay(scene);
		if(flag == 1){
			enabled = 1;
		}
		if(flag == 2 && enabled == 1){
			teleport1.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
			teleport2.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
			teleport3.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
			teleport4.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
			enabled = 0;
		}
	});


	// Statues
	BABYLON.SceneLoader.ImportMesh("", "./assets/obj/eiffelTower/", "eiffelTower.obj", scene, function (meshes) {
		const tower = meshes[0];
		// Adjust the position, rotation, and scaling of the object
		tower.position = new BABYLON.Vector3(23, -0.1, 15)	;
		//tower.rotation = new BABYLON.Vector3(0, 0, -Math.PI / 2);
		tower.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);
		scene.registerBeforeRender(function () {
			tower.rotation.y += 0.002; // Adjust the rotation speed as desired
		});
	});

	BABYLON.SceneLoader.ImportMesh("", "./assets/obj/bust/", "bust.obj", scene, function (meshes) {
		const bust = meshes[0];
		// Adjust the position, rotation, and scaling of the object
		bust.position = new BABYLON.Vector3(7, 5, 7)	;
		bust.scaling = new BABYLON.Vector3(5, 5,5);
		scene.registerBeforeRender(function () {
			bust.rotation.y += 0.002; // Adjust the rotation speed as desired
		});
	});

	BABYLON.SceneLoader.ImportMesh("", "./assets/obj/horse/", "horse.obj", scene, function (meshes) {
		const horse = meshes[0];
		// Adjust the position, rotation, and scaling of the object
		horse.position = new BABYLON.Vector3(7, 5.3, 23)	;
		horse.scaling = new BABYLON.Vector3(15,15,15);
		scene.registerBeforeRender(function () {
			horse.rotation.y += 0.002; // Adjust the rotation speed as desired
		});
	});
	
	// Lights and Sounds
	
	window.addEventListener("keydown", () => {
	if (event.key === "e" || event.key === "E") {
		// Check if the "E" key is pressed
	
		// Spawn the star

		var sound = new BABYLON.Sound("sound","./assets/sounds/voice2.wav",scene,function (){sound.play();},{spatialSound:true}) ;
		sound.setPosition(new BABYLON.Vector3(15, 5, 15))

		setTimeout(() => {
		this.createStar(scene).then((star) => {
		
			setTimeout(() => {
				star.position = new BABYLON.Vector3(17, 4, 25);
			}, 6000);
			setTimeout(() => {
				star.position = new BABYLON.Vector3(17, 4, 15);
			}, 7500); 
			setTimeout(() => {
				star.position = new BABYLON.Vector3(17, 4, 5);
			}, 9000); 
			setTimeout(() => {
				star.position = new BABYLON.Vector3(14, 7, 15);
			}, 11500);
			setTimeout(() => {
				star.dispose();
			}, 14500); 
		  }).catch((error) => {
			console.error("Failed to create star:", error);
		  });
		}, 12250);
	}
	});
	


}


Fabrique.prototype.creerCamera = function(name,data,scene){

    const speed = data.velocity || 1.2 ; 
    const inertia  = data.inertia  || 0.5; 
    const fov      = data.fov      || 1.2 ; 
    const gravity  = data.gravity  || true ; 

   
    const canvas = scene.getEngine().getRenderingCanvas() ;
	const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(35, 2.5, 15), scene) ;
	camera.setTarget(new BABYLON.Vector3(0, 0, 15)); 
    camera.attachControl(canvas, true) ;

	camera.keysUp.push(87); //WASD controls
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);

	camera.inertia= inertia;
    camera.speed= speed;
    camera.angularSensibility=500;
    camera.fov= fov;
	camera.minZ = 0;

    camera.applyGravity = gravity ; 
    camera.checkCollisions = true ;
	camera.ellipsoid = new BABYLON.Vector3(0.3, 1.2, 0.3);
    

    return camera ;    
}

Fabrique.prototype.creerSol = function(nom,options,scn){
	options = options || {} ; 
	const taille   = options.taille   || 500.0 ; 
	let material = options.material || null ;
	
	const sol = BABYLON.Mesh.CreateGround(name,220.0,220.0,2.0,scn) ;
	
	if(material){
		sol.material = material ; 
	} else {
		material = new BABYLON.StandardMaterial("material-defaut-" + name, scn) ; 
		material.diffuseColor = new BABYLON.Color3(1.0,0.0,0.0) ;   
		sol.material = material ; 
	}

    sol.checkCollisions = true ;
	sol.receiveShadows = true;
	return sol ; 
}

Fabrique.prototype.creerCiel = function(nom,options,scene){
    const skyMaterial = new BABYLON.StandardMaterial("mat_skybox", scene);
    skyMaterial.backFaceCulling = false ;
    skyMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/skybox/skybox", scene);
    skyMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyMaterial.diffuseColor = new BABYLON.Color3(0,0,0);
    skyMaterial.specularColor = new BABYLON.Color3(0,0,0);

    const skyBox = BABYLON.Mesh.CreateBox("skybox",100,scene);
    skyBox.material = skyMaterial ;

    return skyBox ;
}

Fabrique.prototype.creerMateriauStandard = function(nom, options,scn){
	let couleur = options.couleur || null ; 
	let texture = options.texture || null ; 
	let uScale  = options.uScale  || 1.0 ; 
	let vScale  = options.vScale  || 1.0 ; 

	let material = new BABYLON.StandardMaterial(nom,scn) ; 
	if(couleur != null) material.diffuseColor = couleur ; 
	if(texture!= null){
		material.diffuseTexture = new BABYLON.Texture(texture,scn) ; 
		material.diffuseTexture.uScale = uScale ; 
		material.diffuseTexture.vScale = vScale ; 
	}
	return material ; 
}

Fabrique.prototype.creerSphere = function(nom,opts,scn){

	let options  = opts || {} ; 
	let diametre = opts.diametre || 1.0 ; 
	let material = opts.material || null ; 
	
	if(material == null){
		material = new BABYLON.StandardMaterial("noir",scn) ;
		material.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0) ; 
	}

	let sph = BABYLON.Mesh.CreateSphere(nom,16,diametre,scn) ;
	sph.material              = material
	return sph;
}


Fabrique.prototype.creerPoster = function(nom, opts, scn) {
	let options = opts || {};
	let height = options["height"] || 1.5;
	let width = options["width"] || 1.5;
	let textureName = options["tableau"] || "";
	let collider = options["collider"] || "";
	let pieceName = options["pieceName"] || "";
	let pieceLabel = options["pieceLabel"] || "";
  
	var group = new BABYLON.TransformNode("group-" + nom);
  
	// Create the outer frame mesh
	var frameSize = 0.1; // Adjust the size of the frame as needed
	var frameWidth = width + frameSize * 2;
	var frameHeight = height + frameSize * 2;
	var frame = BABYLON.MeshBuilder.CreatePlane("frame-" + nom, { width: frameWidth, height: frameHeight }, scn);
	frame.parent = group;
  
	// Position the frame behind the painting
	frame.position.z = -0.02;
  
	var tableau1 = BABYLON.MeshBuilder.CreatePlane("tableau-" + nom, { width: width, height: height }, scn);
	var verso = BABYLON.MeshBuilder.CreatePlane("verso-" + nom, { width: width, height: height }, scn);
	tableau1.parent = frame; // Set the frame as the parent of the painting
	tableau1.position.z = -0.01;
	verso.parent = frame;
	verso.rotation.y = Math.PI;
  
	var mat = new BABYLON.StandardMaterial("frame-material", scn);
	mat.diffuseTexture = new BABYLON.Texture(textureName, scn);
	tableau1.material = mat;
  
	tableau1.checkCollisions = true;

	// Add frame texture to the frame mesh
	let frameTexture = options.frameTexture ||new BABYLON.StandardMaterial("frame-material", scn);
	if (frameTexture !== "") {
	  //frameTexture.diffuseTexture = new BABYLON.Texture(frameTexture, scn);
	  frame.material = frameTexture;
	}

	// Description
	// Create the name label above the painting
	var nameLabelTexture = new BABYLON.DynamicTexture("nameLabelTexture-" + nom, { width: 300, height: 80 }, scn);
	var nameLabelMaterial = new BABYLON.StandardMaterial("nameLabelMaterial-" + nom, scn);
	nameLabelMaterial.diffuseTexture = nameLabelTexture;
	nameLabelMaterial.useAlphaFromDiffuseTexture = true;
	nameLabelMaterial.emissiveColor = BABYLON.Color3.White();
	var nameLabel = BABYLON.MeshBuilder.CreatePlane("nameLabel-" + nom, { width: 1, height: 0.25,sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scn);
	nameLabel.parent = frame;
	nameLabel.position.z = 0.01;
	nameLabel.position.y = height / 2 + 0.15; // Adjust the position as needed
	nameLabel.rotation.y = Math.PI; // Rotate the label to face away from the camera
	nameLabel.material = nameLabelMaterial;
	nameLabel.isVisible = false;

	// Create the museum label under the painting
	var labelTexture = new BABYLON.DynamicTexture("labelTexture-" + nom, { width: 800, height: 512 }, scn,true);
	
	var labelMaterial = new BABYLON.StandardMaterial("labelMaterial-" + nom, scn);
	labelMaterial.diffuseTexture = labelTexture;
	labelMaterial.useAlphaFromDiffuseTexture = true;
	labelMaterial.emissiveColor = BABYLON.Color3.White();
	var label = BABYLON.MeshBuilder.CreatePlane("label-" + nom, { width: 1.5, height: 1,sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scn);
	label.parent = frame;
	label.position.z = -0.15;
	label.position.y = -height / 2 - 0.6; // Adjust the position as needed
	label.rotation.y = Math.PI; // Rotate the label to face away from the camera
	label.rotation.x = -Math.PI/8; // Rotate the label to face away from the camera
	label.material = labelMaterial;
	label.isVisible = false; 

	var lines = pieceLabel.split('\n');
	var lineSegments = [];
	lines.forEach(function(line, index) {
		if (line.length >= 50){
			var words = line.split(' ');
			var currentLine = '';
		
			words.forEach(function(word) {
				if (currentLine.length + word.length >= 45) {
					lineSegments.push(currentLine);
					currentLine = '';
				}
				currentLine += word + ' ';
			});
		}
		else{lineSegments.push(line);}
	});

	var startY = label.position.y ;
	
	var showLabelAction = new BABYLON.ExecuteCodeAction(
		{
			trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
			parameter: {
				mesh: tableau1,
				usePreciseIntersection: true,
			}
		}, function() {
			nameLabelTexture.drawText(pieceName, null, null, "bold 20px Arial", "white", "transparent", true,true);
			nameLabel.isVisible = true;
			var yPos = 0;

			setTimeout(function() {
				if (collider.intersectsMesh(tableau1, true)) {
					//Draw each line of text onto the texture
					lineSegments.forEach(function(line, index) {
						console.log(line);
						yPos = startY - index * 50 - 100;						
						labelTexture.drawText( line, 0, -yPos, "35px verdana", "white", "transparent","left",true,true);
					});
					labelTexture.height = yPos;				
					label.isVisible = true;
				}
			}, 3000); // Show the museum label after 3 seconds
		}
	);

	// Set up the action when the spectator moves away from the collider zone
	var hideLabelAction = new BABYLON.ExecuteCodeAction(
		{
			trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
			parameter: {
				mesh: tableau1,
				usePreciseIntersection: true,
			}
		}, function() {
			nameLabel.isVisible = false;
			label.isVisible = false;
			}
	);

	// Add the actions to the action manager
	collider.actionManager.registerAction(showLabelAction);
	collider.actionManager.registerAction(hideLabelAction);
  
	return group;
  }
  

Fabrique.prototype.createWall = function(nom,opts,scn, hasDoor,center){
	
	let options   = opts || {} ; 
	let height   = options.height || 5.0 ; 
	let width   = options.width || 10.0 ; 
	let epaisseur = options.epaisseur || 1 ;

	let material   = options.material || new BABYLON.StandardMaterial("material-pos"+nom,scn); 

    	let groupe = new BABYLON.TransformNode("groupe-"+nom) ; 

	let wall = BABYLON.MeshBuilder.CreateBox(nom,{width:width,height:height,depth:epaisseur},scn) ;
	wall.material = material ; 
	wall.parent = groupe ; 
	wall.position.y = height / 2.0 ;
	
	// Create the door if hasDoor is true
	if (hasDoor) {
		let doorWidth = options.doorWidth || 6.0; // width of the door
		let doorHeight = options.doorHeight || 3.0; // height of the door
		let doorDepth = options.doorDepth || epaisseur + 0.1; // depth of the door (slightly larger than the wall)
		let doorPosition = options.doorPosition || width / 2.0 - doorWidth / 2.0; // position of the door relative to the center of the wall
		let door = BABYLON.MeshBuilder.CreateBox("door", {width: doorWidth, height: doorHeight, depth: doorDepth}, scn);
		let doorMaterial = options.doorMaterial ||new BABYLON.StandardMaterial("door-material", scn);
		doorMaterial.alpha = 0.2; // Set alpha to 0.5 to make it semi-transparent		
		door.material = doorMaterial;
		if(center){
			
		}
		else{
			door.position.x = doorPosition - width / 2.0 + doorWidth / 2.0;; // Position the door relative to the center of the wall
			door.position.y = -height / 2.0 + 1.5;
		}
		
		door.parent = wall; // Set the wall as the parent of the door
	
		// Use CSG to subtract the door from the wall
		let wallCSG = BABYLON.CSG.FromMesh(wall);
		let doorCSG = BABYLON.CSG.FromMesh(door);
		let resultCSG = wallCSG.subtract(doorCSG);
		let resultMesh = resultCSG.toMesh(nom, material, scn);
		wall.dispose();
		//door.dispose();
		resultMesh.parent = groupe;
	
		// Set the position of the resulting mesh to the center of the original wall
		resultMesh.position.x = 0;
	
		// Enable collision detection for the resulting mesh
		resultMesh.checkCollisions = true;
	  } else {
		// Enable collision detection for the wall mesh
		wall.checkCollisions = true;
	  }
	  return groupe;
     
}

Fabrique.prototype.creerEscalier = function(nom, opts, scn) {
    let height = opts.height || 5.5;
    let width = opts.width || 12.0;
    let epaisseur = opts.epaisseur || 2;
    let material = opts.material || new BABYLON.StandardMaterial("material-pos" + nom, scn);

    let groupe = new BABYLON.TransformNode("groupe-" + nom);   

    let steps_number = opts.steps;

	let steps = [];
    for (let i = 0; i < steps_number; i++) {
        let stepHeight = height - (height / steps_number) * i;
        let step = BABYLON.MeshBuilder.CreateBox(nom, { width: width / steps_number, height: stepHeight, depth: epaisseur }, scn);
        step.position.y = -((height / steps_number) * i / 2);
        step.position.x = -(width/2 - (width / steps_number) * i - width / (steps_number*2));
		steps[i] = step;
	}
	let stairsMesh = BABYLON.Mesh.MergeMeshes(steps);
	stairsMesh.material = material;
    stairsMesh.parent = groupe;
    stairsMesh.position.y = height / 2.0;
    stairsMesh.checkCollisions = true;
	stairsMesh.alpha = 0.8;
    return groupe;
}

Fabrique.prototype.creuser = function(mesh0, mesh1){
    const csg0 = BABYLON.CSG.FromMesh(mesh0);
    const csg1 = BABYLON.CSG.FromMesh(mesh1) ; 
    csg0.subtractInPlace(csg1);
    const csgMesh = csg0.toMesh() ;
    mesh0.dispose() ; 
    mesh1.dispose() ; 
    return csgMesh ;  
}

Fabrique.prototype.createdDoubleDoor = function(nom, options, scn){
	let width = options.width || 6.0; // width of the door
	let height = options.height || 3.0; // height of the door
	let depth = options.depth || 1.0; // depth of the door (slightly larger than the wall)
	let material = options.material || new BABYLON.StandardMaterial("materiau-pos" + nom, scn);
	let glass_material = options.glass_material || null;
	material.alpha = 1;
	glass_material.alpha = 0.3;

	// Create metal frame
	let box = BABYLON.MeshBuilder.CreateBox(nom,{width:width,height:height,depth:depth},scn) ;
	let hole_height = height-0.5;
	let hole_width = width - 1; 
	let hole = BABYLON.MeshBuilder.CreateBox("hole",{width:hole_width,height:hole_height,depth:depth},scn) ;
	box.position.y = height/2.0;
	hole.position.y = hole_height / 2.0;
	const frame = this.creuser(box,hole);
	frame.material = material ;

	// Create doors with glass
	let door_width = hole_width/2.0;
	let door1 = BABYLON.MeshBuilder.CreateBox("door1", {width: door_width, height: hole_height, depth: depth/2.0}, scn);
	hole = BABYLON.MeshBuilder.CreateBox("hole1",{width:door_width-0.2,height:hole_height-0.2,depth:depth/2.0},scn) ;
	hole.parent = door1;
	const frame_door_1 = this.creuser(door1, hole);
	frame_door_1.parent = frame;
	frame_door_1.position.y -= (height-hole_height)/2.0;
	frame_door_1.position.x -= hole_width/4.0;
	frame_door_1.material = material;
	let glass_1 = BABYLON.MeshBuilder.CreateBox("glass1",{width:door_width-0.2,height:hole_height-0.2,depth:depth/2.0},scn) ;
	glass_1.parent = frame_door_1;
	glass_1.material = glass_material;

	let door2 = BABYLON.MeshBuilder.CreateBox("door2", {width: door_width, height: hole_height, depth: depth/2.0}, scn);
	hole = BABYLON.MeshBuilder.CreateBox("hole2",{width:door_width-0.2,height:hole_height-0.2,depth:depth/2.0},scn) ;
	hole.parent = door2;
	const frame_door_2 = this.creuser(door2, hole);
	frame_door_2.parent = frame;
	frame_door_2.position.y -= (height-hole_height)/2.0;
	frame_door_2.position.x += hole_width/4.0;
	frame_door_2.material = material;
	let glass_2 = BABYLON.MeshBuilder.CreateBox("glass2",{width:door_width-0.2,height:hole_height-0.2,depth:depth/2.0},scn) ;
	glass_2.parent = frame_door_2;
	glass_2.material = glass_material;

	door1InitialPosition = frame_door_1.position.clone();
	door2InitialPosition = frame_door_2.position.clone();

	return {frame, frame_door_1,frame_door_2};


}

Fabrique.prototype.createDoor = function(nom, options, scn){
	let width = options.width || 2.5; // width of the door
	let height = options.height || 3.25; // height of the door
	let depth = options.depth || 1.0; // depth of the door (slightly larger than the wall)
	let material = options.material || new BABYLON.StandardMaterial("materiau-pos" + nom, scn);
	let glass_material = options.glass_material || null;
	material.alpha = 1;
	glass_material.alpha = 0.3;

	// Create metal frame
	let box = BABYLON.MeshBuilder.CreateBox(nom,{width:width,height:height,depth:depth},scn) ;
	let hole_height = height - 0.25;
	let hole_width = width - 0.5; 
	let hole = BABYLON.MeshBuilder.CreateBox("hole",{width:hole_width,height:hole_height,depth:depth},scn) ;
	box.position.y = height/2;
	hole.position.y = hole_height / 2.0;
	const frame = this.creuser(box,hole);
	frame.material = material ;

	// Create doors with glass
	let door_width = hole_width;
	let door = BABYLON.MeshBuilder.CreateBox("door", {width: door_width, height: hole_height, depth: depth/2.0}, scn);
	hole = BABYLON.MeshBuilder.CreateBox("hole1",{width:door_width-0.2,height:hole_height-0.2,depth:depth/2.0},scn) ;
	hole.parent = door;
	const frame_door = this.creuser(door, hole);
	frame_door.parent = frame;
	frame_door.position.y -= (height-hole_height)/2.0;	
	frame_door.material = material;
	let glass = BABYLON.MeshBuilder.CreateBox("glass",{width:door_width-0.2,height:hole_height-0.2,depth:depth/2.0},scn) ;
	glass.parent = frame_door;
	glass.material = glass_material;

	return {frame, frame_door};
}

Fabrique.prototype.createRailing = function(nom, options, scn, stair) {
	let width = options.width || 2.5; // width of the railing frame
	let height = options.height || 3.25; // height of the railing frame
	let depth = options.depth || 0.1; // depth of the railing frame
	let material = options.glassMaterial || new BABYLON.StandardMaterial("materiau-pos" + nom, scn);
	let steel = options.steelMaterial || new BABYLON.StandardMaterial("materiau-steel" + nom, scn);
  
	// Create railing mesh
	let railingMesh = BABYLON.MeshBuilder.CreateBox("railing", { width: width, height: height, depth: depth }, scn);
  
	// Set up the railing's properties
	railingMesh.position = options.position || new BABYLON.Vector3(0, 0, 0);
	railingMesh.scaling = options.scaling || new BABYLON.Vector3(1, 1, 1);
  
	// Create the glass material for the railing
	material.alpha = 0.8; // Adjust the transparency as desired
	material.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8); // Adjust the color as desired
	material.specularColor = BABYLON.Color3.Black();
	railingMesh.material = material;
  
	// Add collision detection to the railing mesh
	railingMesh.checkCollisions = true;
  
	// Add the transverse steel bars to the railing
	const numBars = options.bars || 11; // Number of transverse steel bars
	const barHeight = height; // Height of the railing
	const barWidth = 0.2; // Width of each steel bar
	const barDepth = 0.2; // Width of each steel bar
  
	for (let i = 0; i < numBars; i++) {
	  const barPositionX = railingMesh.position.x - width/2.2 + i *(width/numBars);
	  const barPositionY = railingMesh.position.y + barHeight / 2;
	  const barPositionZ = railingMesh.position.z;
	  const steelBar = BABYLON.MeshBuilder.CreateBox(`steel_bar_${i}`, { width: barWidth, height: barHeight, depth: barDepth }, scn);
	  steelBar.position = new BABYLON.Vector3(barPositionX, barPositionY, barPositionZ);
	  if (stair){
		steelBar.rotation.z = Math.PI/7.2;
	  }
	  steelBar.material = steel;
	  steelBar.parent = railingMesh;
	}
  
	return railingMesh;
  };
  


Fabrique.prototype.vecToLocal = function(vector,mesh){
	var m = mesh.getWorldMatrix();
	var v = BABYLON.Vector3.TransformCoordinates(vector, m);
	return v;	
}

Fabrique.prototype.createPickingRay = function(scn){
	var origin = this.world.camera.position;
	var forward = new BABYLON.Vector3(0,0,-1);
	forward = this.vecToLocal(forward, this.world.camera);
	var direction = forward.subtract(origin);
	direction = BABYLON.Vector3.Normalize(direction);

	

	// now raycast
	var length = 100;
	var ray = new BABYLON.Ray(origin, direction, length);
	// let rayHelper = new BABYLON.RayHelper(ray);		
	// rayHelper.show(scn);
	var pickInfo = scn.pickWithRay(ray);
	var sphere = null;
	
	scn.onPointerDown = () => {
		if(sphere){
			this.world.camera.position.x = sphere.position.x;
			this.world.camera.position.y = sphere.position.y + 1.5;
			this.world.camera.position.z = sphere.position.z;
		}
	}
	
	// return 1 -> the meshes are red and we enable the flag for turning them back to white
	if (pickInfo.hit && pickInfo.pickedMesh.name == "teleport") {
		// Modify the material or color
		var sphere = pickInfo.pickedMesh;
		sphere.material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Set to red
		return 1;
	}
	// return 2 -> the ray is colliding with irrelevant objects, 2 is the flag not to do anything
	else{
		return 2;
	}
	
}

Fabrique.prototype.createStar = function(scene){
	return new Promise((resolve, reject) => {
		BABYLON.SceneLoader.ImportMesh("", "./assets/obj/star/", "star.obj", scene, function (meshes) {
		  const star = meshes[0];
		  // Adjust the position, rotation, and scaling of the object
		  star.rotation = new BABYLON.Vector3(0, 0, -Math.PI / 2);
		  star.scaling = new BABYLON.Vector3(1, 1, 1);
	
		  const material = new BABYLON.StandardMaterial("starMaterial", scene);
		  material.diffuseColor = new BABYLON.Color3(2, 1, 0);
		  star.material = material;
	
		  // Create a point light
		  var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 1, 0), scene);
		  light.diffuse = new BABYLON.Color3(1, 1, 0);
		  light.range = 5;
	
		  const parentNode = new BABYLON.TransformNode("parentNode", scene);
		  parentNode.position = new BABYLON.Vector3(23, 5, 15);
		  star.parent = parentNode;
		  light.parent = parentNode;
	
		  scene.registerBeforeRender(function () {
			parentNode.rotation.y += 0.03; // Adjust the rotation speed as desired
		  });
	
		  resolve(parentNode);
		});
	  });

	
}

Fabrique.prototype.createPoster = function(nom, opts, scn) {
	let options = opts || {};
	let height = options.height || 1.5;
	let width = options.width || 1.5;
	let salonName = options.salonName || "";
	
	// Create a material for the poster plane
	var dynamicTexture = new BABYLON.DynamicTexture("posterTexture_" + nom, { width: width * 100, height: height * 100 }, scn, true);
	var material = new BABYLON.StandardMaterial("posterMaterial_" + nom, scn);
	material.diffuseTexture = dynamicTexture;
	material.emissiveColor = BABYLON.Color3.White();
  
	// Create a plane for the poster
	var posterPlane = BABYLON.MeshBuilder.CreatePlane("posterPlane_" + nom, { height: height, width: width,sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scn);
	posterPlane.rotation.y = Math.PI;
	posterPlane.material = material;
  
	// Draw the text on the dynamic texture
	dynamicTexture.drawText(salonName, null, null, "bold 20px Arial", "white", "transparent", true);
  
	// Return the created poster
	return posterPlane;
  }
  
  
  


export {Fabrique} ; 
