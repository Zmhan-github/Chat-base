///////////////////
// begin view

var view = {


  scrollDown: function(){ // прокрутка вниз
    var el = document.getElementById("scrollbar");
    el.scrollTop = el.scrollHeight;
  },

  showMessage: function(data){
    var el = document.getElementById("scrollbar");
    el.insertAdjacentHTML('beforeend', `
    <div class="message-wrapper">
      <img src="img/${data.image}" alt="User photo" class="message-wrapper__user-photo">
      <div class="message-wrapper__text-box">
        <span class="message-wrapper__user-name">${data.name}</span>
        <p class="message-wrapper__paragraph">${data.message}</p>
      </div>
    </div>`);
    this.scrollDown();
  }
};


//////////////////////
// begin model

var model = {
  state:  {
    id: 123456789,
    name: "",
    message: "",
    image: '',
  },

  ws: function(msg, ws){ 
    // Context for ws
    var self = this;
    
    ws.send(msg); // отвравить

    ws.onmessage = function(response){ 
      // console.log(response.data); 
      self.pushMessage(response.data, 0);
    }   // принять
  },

  pushMessage: function(msg, ho) {
    var el = document.getElementById("scrollbar");
    if(msg === null) {
      el.innerText = "";
      return;
    }

    if(ho === 1) {
      console.log("MSG CLICK: ", msg)
      this.state.id = msg._idFrom;
      this.state.name = msg.name;
      this.state.message = msg.msg;
      this.state.image = msg.img;
      view.showMessage(this.state);
      return;
    }

    if(ho === 0) {
      this.state.id = 23132;
      this.state.name = "Джон";
      this.state.message = msg;
      this.state.image = 'user.jpg';
      view.showMessage(this.state);
      return;
    }

    
  }
};



////////////////////
// begin controller

var controller = {
  sendMessage: function(msg, ws){
    model.ws(msg, ws);
  },
};



// anonymous initialize function
(function(){
  // WS




  var app = {

    init: function(){

     
     
      var ws = this.wsInit();
      
      this.event(ws);
    },

    wsInit: function(){
      var ws = new WebSocket('wss://echo.websocket.org');

      ws.onopen = function(){
        console.log("Connect...")
      };

      ws.onclose = function(){
        console.log("DISCONNECTED");
      };

      return ws;  
    },



 

    event: function(ws){      
      
      
      window.addEventListener('load', () => {

        var elForm = document.getElementById("form-input-main"); 
        const elInput = document.getElementById("input");
        const items = document.getElementsByClassName("side-nav__item");

        var boxMsg = document.getElementById("scrollbar");

        Array.from(items).forEach( item => {
          item.addEventListener('click', (e) => {

            var idUserFrom = e.target.getAttribute('data-id');

            var attrInput = elInput.getAttribute('data-id');
            if (idUserFrom !== attrInput) {
              boxMsg.innerText = '';
            }
            
            elInput.setAttribute('data-id', idUserFrom);

            // model.pushMessage(null);

            $.post( "test.php",{id: idUserFrom }, (data) => {
              model.pushMessage(data, 1);
              // boxMsg.innerText = `response: ${data.msg}`;
            }, "json");

          });
        });


        // Fake Message START
        // =================

        var data2 = {
          "msg": "Нравится Это?. Еще через 10 с напишу))",
          "name": "Джесика",
          "img": 'user-2.jpg',
          "_idFrom": 101,
          "_idTo": 100
        };

        for(let i = 1; i < 3; i++){
          
          setTimeout(()=>{
            model.pushMessage(data2, 1);
          },10000 * i)

        }
       
        // Fake Message START
        // =================

        elForm.addEventListener('submit', function(event){
          event.preventDefault();        
   
          controller.sendMessage(elInput.value, ws);
  
          elInput.value = '';
  
        });

      });
   
        
        
  

      


            

    }    
  };

  app.init();


}());

