const app = new Vue({
  		el: '#app',
  		data: {
  			// boxx
    		allBoxs: [
            [0,0,0],
            [0,0,0],
            [0,0,0],
        ],
    		// game is Run????
    		gameIsRunning: false,

        // have box move ????
        boxMove : false,

        // diem
        score: 0,
        historyScore: [],
        add: "",
        color: "rgb(0,0,0)",
        background: "rgb(0,145,125)",
  		},
      created(){
        let history = localStorage.getItem("history");
        if(!history){
          localStorage.setItem("history", JSON.stringify(this.historyScore))
        }else{
          this.historyScore = JSON.parse(history).splice(0, 5);
        }
      },
  		methods:{
        /* dieu khien cac nut*/
        // up down right left
        arrow(trend){
          // move
          // neu chua full cac box
          if(!this.isArrFull(this.allBoxs)){
            this.move(trend);
            this.move(trend);
            // group
            this.groupIn(trend);
            // move after group nth đặc biệt
            this.move(trend);
            // random
            setTimeout(this.random('notFirst'),500)
            ;
          }else{ // neu da full cac box
            this.move(trend);
            this.move(trend);
            this.groupIn(trend);
            this.move(trend);
            for(let i in this.allBoxs){
              for(let j in this.allBoxs[i]){
                if(this.allBoxs[i][j] == 0){ this.allBoxs[i][j] = 2; break};
              };
            };  
          }
        },

        // check ham allbox xem full chưa
        isArrFull(arr){
          let num = 0;
          for(let i of arr){
            for(let j of i){
              if(j == 0) num++
            };
          };
          if(num == 1 || num == 0){return true}else{return false};
        },
        // random ra 1-9 2 hoac 4
        random(x){
            let idRow = Math.random()*2;
            if(idRow < 0.666){idRow = 0};
            if(idRow > 0.666 && idRow < 0.666*2){idRow = 1};
            if(idRow > 0.666*2){idRow = 2};
            let idCol = Math.random()*2;
            if(idCol < 0.666){idCol = 0};
            if(idCol > 0.666 && idCol < 0.666*2){idCol = 1};
            if(idCol > 0.666*2){idCol = 2};
            let boxValue = Math.random()*2 < 1.5 ? 2 : 4 ;
            if(x == 'first') this.allBoxs[idRow][idCol] = 2;            
            if(this.allBoxs[idRow][idCol] == 0 && x == 'notFirst'){
                if(this.boxMove){
                  this.allBoxs[idRow][idCol] = boxValue;
                  this.boxMove = false;
                };
            };
            if(this.allBoxs[idRow][idCol] != 0){
              this.random('notFirst');
            }
        },

        // move
        move(trend){
          if(trend == 'up'){
            for(let i=1; i < this.allBoxs.length; i++){
              for(let j=0; j < this.allBoxs.length; j++){
                if(this.allBoxs[i][j] != 0 && this.allBoxs[i-1][j] == 0){
                  this.addCssAfterMove(i,j,trend);
                  this.allBoxs[i-1][j] = this.allBoxs[i][j];
                  this.allBoxs[i][j] = 0;
                  this.boxMove = true;
                };
              };
            };
          };
          if(trend == 'down'){
            for(let i=1; i >= 0; i--){
              for(let j=0; j < this.allBoxs.length; j++){
                if(this.allBoxs[i][j] != 0 && this.allBoxs[i+1][j] == 0){
                  this.addCssAfterMove(i,j,trend);
                  this.allBoxs[i+1][j] = this.allBoxs[i][j];
                  this.allBoxs[i][j] = 0;
                  this.boxMove = true;
                };
              }
            };
          };
          if(trend == 'right'){
            for(let i=0; i < this.allBoxs.length; i++){
              for(let j=1; j >= 0; j--){
                if(this.allBoxs[i][j] != 0 && this.allBoxs[i][j+1] == 0){
                  this.addCssAfterMove(i,j,trend);
                  this.allBoxs[i][j+1] = this.allBoxs[i][j];
                  this.allBoxs[i][j] = 0;
                  this.boxMove = true;
                };
              }
            };
          };
          if(trend == 'left'){
            for(let i=0; i < this.allBoxs.length; i++){
              for(let j=1; j < this.allBoxs.length; j++){
                if(this.allBoxs[i][j] != 0 && this.allBoxs[i][j-1] == 0){
                  this.addCssAfterMove(i,j,trend);
                  this.allBoxs[i][j-1] = this.allBoxs[i][j];
                  this.allBoxs[i][j] = 0;
                  this.boxMove = true;
                };
              }
            };
          };
        },
        // gop vao nhau neu 2 box bang nhau
        groupIn(trend){
          if(trend == 'up'){
            for(let i=1; i < this.allBoxs.length; i++){
              for(let j=0; j < this.allBoxs.length; j++){
                if(this.allBoxs[i][j] == this.allBoxs[i-1][j] && this.allBoxs[i][j] != 0){
                  this.addCssAfterMove(i,j,trend);
                  this.allBoxs[i-1][j] *= 2;
                  this.allBoxs[i][j] = 0;
                  this.score += this.allBoxs[i-1][j];
                  this.boxMove = true;
                };
              }
            };
          };
          if(trend == 'down'){
            for(let i=1; i >= 0; i--){
              for(let j=0; j < this.allBoxs.length; j++){
                if(this.allBoxs[i][j] == this.allBoxs[i+1][j] && this.allBoxs[i][j] != 0){
                  this.addCssAfterMove(i,j,trend);
                  this.allBoxs[i+1][j] *= 2;
                  this.allBoxs[i][j] = 0;
                  this.score += this.allBoxs[i+1][j];
                  this.boxMove = true;
                };
              }
            };
          };
          if(trend == 'right'){
            for(let i=0; i < this.allBoxs.length; i++){
              for(let j=1; j >= 0; j--){
                if(this.allBoxs[i][j] == this.allBoxs[i][j+1] && this.allBoxs[i][j] != 0){
                  this.addCssAfterMove(i,j,trend);
                  this.allBoxs[i][j+1] *= 2;
                  this.allBoxs[i][j] = 0;
                  this.score += this.allBoxs[i][j+1];
                  this.boxMove = true;
                };
              }
            };
          };
          if(trend == 'left'){
            for(let i=0; i < this.allBoxs.length; i++){
              for(let j=1; j <this.allBoxs.length; j++){
                if(this.allBoxs[i][j] == this.allBoxs[i][j-1] && this.allBoxs[i][j] != 0){
                  this.addCssAfterMove(i,j,trend);
                  this.allBoxs[i][j-1] *= 2;
                  this.allBoxs[i][j] = 0;
                  this.score += this.allBoxs[i][j-1];
                  this.boxMove = true;
                };
              }
            };
          };
        },

        /* css */
  			// khi box = 0 >>> an box
  			// khi box != 0 >>> hien box
  			display(x){
  				if(x==0){
  					return{
  						color : 'transparent',
              background : 'none'
  					};
  				}else if (x==2){
  					return{
  						color : "#ffffffde",
              background : '#ffc107bf'
  					}
          }else if (x==4){
            return{
              color : "#673ab791",
              background : '#8bc34ac9'
            }
          }else if (x==8){
            return{
              color : "#8bc34a",
              background : '#4caf50'
            }
          }else if (x==16){
            return{
              color : "#009688",
              background : '#00d48f'
            }
          }else if (x==32){
            return{
              color : "#8bc34a",
              background : '#2128f380'
            }
  				}else if (x==64){
            return{
              color : "#ff9800b8",
              background : '#f4433663'
            }
          }else if (x==128){
            return{
              color : "#ffeb3bcf",
              background : '#e91e63',
              fontSize: '5rem'
            }
          }else if (x==256){
            return{
              color : "#07f4ff99",
              background : '#f43636',
              fontSize: '5rem'
            }
          }else if (x==512){
            return{
              color : "#b7ff07",
              background : '#2128f3',
              fontSize: '5rem'
            }
          }else if (x==1024){
            return{
              color : "#fff",
              background : '#e91e1ec7',
              fontSize: '3.5rem'
            }
          };
  			},

        // khi ham move chay>>> hieu ung di chuyen
        addCssAfterMove(i,j,trend){
          let id = i + "_" + j;
          let x= document.getElementById(id);
          x.style.animation = trend + ' 0.2s';
        },
  		},
  		watch:{
  			// theo doi isGameRunning
  			// khi ket thuc hoac bat dau
  			gameIsRunning(){
  				if(!this.gameIsRunning){
  					this.allBoxs = [[0,0,0],[0,0,0],[0,0,0]]; 
            if(this.score !== 0){
              this.historyScore.unshift(this.score);
              localStorage.setItem("history", JSON.stringify(this.historyScore))              
            }
            console.log('GameEnd')
  				}else{
            this.score = 0;
            console.log('GameStart')
  				};
  			},
        score(){
          this.add = "pop";
          setTimeout(function() {
            app.add = ""
          }, 500);
          if (this.score > 0 && this.score < 100 ) {
            this.color = 'rgba(' + this.score + ',0,0)' 
            this.background = 'rgba(' + this.score + ',145,125)' 
          }else if (this.score > 100 && this.score < 200) {
            this.color = 'rgba(100,' + this.score + ',0)' 
            this.background = 'rgba(' + this.score*0.6 + ','+this.score*0.8+',100)' 
          }else if (this.score > 200) {
            this.color = 'rgba(100,200,' + this.score + ')' 
            this.background = 'rgba(' + this.score + ',145,100)' 
          }
        }
  		}
})
