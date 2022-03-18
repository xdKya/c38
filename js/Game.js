class Game {
    constructor(){

    }

    getState(){
        var gamestateref = database.ref('gamestate');
        gamestateref.on("value",function(data){
            gamestate = data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gamestate: state
        });
    }

    async start(){
        if(gamestate === 0){
            player = new Player();
            var playercountref = await database.ref("playercount").once("value");
            if(playercountref.exists()){
                playercount = playercountref.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
       
        car1 = createSprite(100,200);
        car2 = createSprite(300,200);
        car3 = createSprite(500,200);
        car4 = createSprite(700,200);

        cars = [car1,car2,car3,car4];
    }

    play(){
        form.hide();
        textSize(30);
        text("Começou!",150,100);
        Player.getPlayerInfo();

        if(allPlayers !== undefined){
            //var display_pos = 130;


            //endereço da matriz dos carros
            var index = 0;
            
            // posicao x e y do carros
            var x = 0;
            var y;

            
            for(var plr in allPlayers){

                //adicione 1 para o endereço
                index = index + 1;

                // distancia de cada carro
                x = x + 200;

                //use o banco de dados p armaxenar os carros na pos y
                y = displayHeight - allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;

                if(index === player.index){
                    cars[index-1].shapeColor = "red";
                    
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;

                }else{
                    cars[index-1].shapeColor = "black";
                    //display_pos +=20;

                     //textSize(15);
                     //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
                }
            }

            
        }

        if (keyIsDown(UP_ARROW) && player.index !== null){
            player.distance +=50;
            player.update();
        }
    }


}